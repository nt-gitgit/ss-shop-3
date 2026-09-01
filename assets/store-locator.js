// Store locator map. Reads the location list out of its JSON data island
// and plots one numbered pin per store on a Leaflet map (free Esri
// basemap, no API key). Clicking a card's name chip or a pin focuses the
// other -- see sections/store-locator.liquid for the markup this expects.
(function () {
  var TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  var TILE_ATTRIBUTION =
    'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> &mdash; Esri, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors, GIS user community';

  function escapeHtml(value) {
    var div = document.createElement('div');
    div.textContent = value || '';
    return div.innerHTML;
  }

  function buildPopup(location, directionsLabel) {
    var html = '<div class="store-locator__popup-inner">';
    html += '<strong class="ts-label-s store-locator__popup-name">' + escapeHtml(location.name) + '</strong>';
    if (location.address) {
      html += '<div class="store-locator__popup-address">' + escapeHtml(location.address).replace(/\n/g, '<br>') + '</div>';
    }
    if (location.mapHref) {
      html +=
        '<a class="store-locator__popup-link" href="' +
        location.mapHref +
        '" target="_blank" rel="noopener"><span>' +
        escapeHtml(directionsLabel) +
        '</span></a>';
    }
    html += '</div>';
    return html;
  }

  // A small radar-style ring behind each pin, staggered per marker so the
  // map doesn't pulse in lockstep.
  function pinIcon(delay) {
    return L.divIcon({
      className: 'store-locator__pin',
      html:
        '<span class="store-locator__pin-pulse" style="animation-delay:' + delay + 's" aria-hidden="true"></span>' +
        '<svg viewBox="0 0 30 38" width="30" height="38" aria-hidden="true">' +
        '<path d="M15 37S28 22.7 28 14.7C28 7.1 22.2 1 15 1S2 7.1 2 14.7C2 22.7 15 37 15 37z"/>' +
        '</svg>',
      iconSize: [30, 38],
      iconAnchor: [15, 36],
      popupAnchor: [0, -32]
    });
  }

  function initStoreLocator(root) {
    if (root.hasAttribute('data-store-locator-ready')) return;

    var mapEl = root.querySelector('[data-store-locator-map]');
    var dataEl = root.querySelector('[data-store-locator-data]');
    if (!mapEl || !dataEl || typeof L === 'undefined') return;

    var locations;
    try {
      locations = JSON.parse(dataEl.textContent).filter(function (location) {
        return typeof location.lat === 'number' && typeof location.lng === 'number';
      });
    } catch (error) {
      return;
    }
    if (!locations.length) return;

    root.setAttribute('data-store-locator-ready', 'true');

    var directionsLabel = root.getAttribute('data-directions-label') || 'Get directions';

    var map = L.map(mapEl, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION, maxZoom: 16 }).addTo(map);

    var markers = {};
    var bounds = [];
    var cards = root.querySelectorAll('[data-store-locator-card]');

    function setActive(id) {
      cards.forEach(function (card) {
        card.classList.toggle('is-active', card.getAttribute('data-store-locator-card') === id);
      });
      Object.keys(markers).forEach(function (markerId) {
        var el = markers[markerId].getElement();
        if (el) el.classList.toggle('is-active', markerId === id);
      });
    }

    locations.forEach(function (location, index) {
      var marker = L.marker([location.lat, location.lng], {
        icon: pinIcon((index % 5) * 0.4),
        alt: location.name
      }).addTo(map);
      marker.bindPopup(buildPopup(location, directionsLabel), { closeButton: false, className: 'store-locator__popup' });
      marker.on('click', function () {
        setActive(location.id);
      });
      markers[location.id] = marker;
      bounds.push([location.lat, location.lng]);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    } else {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    root.querySelectorAll('[data-store-locator-locate]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-store-locator-locate');
        var marker = markers[id];
        if (!marker) return;
        setActive(id);
        map.panTo(marker.getLatLng());
        marker.openPopup();
      });
    });
  }

  function init() {
    document.querySelectorAll('[data-store-locator]').forEach(initStoreLocator);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function (event) {
    var root = event.target.querySelector('[data-store-locator]');
    if (root) initStoreLocator(root);
  });
})();
