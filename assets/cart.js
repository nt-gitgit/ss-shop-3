// AJAX cart: add/update/remove without a full page reload. The drawer's
// markup is never hand-rendered from cart.js JSON -- every mutation
// re-fetches the cart-drawer section via the Section Rendering API and
// swaps its inner HTML, so Liquid stays the single source of truth for
// cart markup. This file only owns interaction: open/close, quantity
// steppers, optimistic disables, and the add-to-cart submit delegate any
// `form[data-product-form]` on the page uses (quick-add cards, the PDP).
(function () {
  var root = document.documentElement;

  function cartDrawer() {
    return document.querySelector('[data-cart-drawer]');
  }

  function openDrawer() {
    var drawer = cartDrawer();
    if (!drawer) return;
    drawer.hidden = false;
    requestAnimationFrame(function () {
      drawer.classList.add('is-open');
    });
    root.classList.add('no-scroll');
  }

  function closeDrawer() {
    var drawer = cartDrawer();
    if (!drawer) return;
    drawer.classList.remove('is-open');
    root.classList.remove('no-scroll');
    window.setTimeout(function () {
      if (!drawer.classList.contains('is-open')) drawer.hidden = true;
    }, 500);
  }

  function cartUrl() {
    return (window.SS_ROUTES && window.SS_ROUTES.cart) || '/cart';
  }

  function refreshDrawer() {
    return fetch(cartUrl() + '?section_id=cart-drawer')
      .then(function (res) {
        return res.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var next = doc.querySelector('[data-cart-drawer]');
        var current = cartDrawer();
        if (next && current) {
          var wasOpen = current.classList.contains('is-open');
          current.replaceWith(next);
          if (wasOpen) {
            next.hidden = false;
            next.classList.add('is-open');
          }
          bindDrawerEvents();
        }
        updateCartCount();
      });
  }

  function updateCartCount() {
    fetch('/cart.js')
      .then(function (res) {
        return res.json();
      })
      .then(function (cart) {
        document.querySelectorAll('[data-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
          el.hidden = cart.item_count === 0;
        });
      });
  }

  function addToCart(formData) {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    }).then(function (res) {
      if (!res.ok) {
        return res.json().then(function (err) {
          throw err;
        });
      }
      return res.json();
    });
  }

  function changeLine(key, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    }).then(function (res) {
      return res.json();
    });
  }

  function bindDrawerEvents() {
    var drawer = cartDrawer();
    if (!drawer) return;

    drawer.querySelectorAll('[data-cart-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });

    drawer.querySelectorAll('[data-cart-line]').forEach(function (line) {
      var key = line.getAttribute('data-line-key');
      var input = line.querySelector('[data-quantity-input]');
      var dec = line.querySelector('[data-quantity-decrease]');
      var inc = line.querySelector('[data-quantity-increase]');
      var remove = line.querySelector('[data-cart-remove]');

      function apply(qty) {
        line.style.opacity = '0.5';
        changeLine(key, qty).then(function () {
          refreshDrawer();
        });
      }

      if (dec) {
        dec.addEventListener('click', function () {
          apply(Math.max(0, parseInt(input.value, 10) - 1));
        });
      }
      if (inc) {
        inc.addEventListener('click', function () {
          apply(parseInt(input.value, 10) + 1);
        });
      }
      if (input) {
        input.addEventListener('change', function () {
          apply(Math.max(0, parseInt(input.value, 10) || 0));
        });
      }
      if (remove) {
        remove.addEventListener('click', function () {
          apply(0);
        });
      }
    });
  }

  document.addEventListener('click', function (evt) {
    var trigger = evt.target.closest('[data-cart-toggle]');
    if (trigger) {
      evt.preventDefault();
      openDrawer();
    }
  });

  document.addEventListener('submit', function (evt) {
    var form = evt.target.closest('form[data-product-form]');
    if (!form) return;
    evt.preventDefault();

    var submitBtn = evt.submitter || form.querySelector('[data-add-to-cart]');
    var label = submitBtn ? (submitBtn.querySelector('.link-title') || submitBtn) : null;
    var formData = new FormData(form, evt.submitter || undefined);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.dataset.originalText || (label ? label.textContent : '');
      if (label) label.textContent = submitBtn.dataset.addingText || 'Adding…';
    }

    addToCart(formData)
      .then(function () {
        if (label) label.textContent = submitBtn.dataset.addedText || 'Added';
        refreshDrawer().then(openDrawer);
      })
      .catch(function (err) {
        if (label) label.textContent = (err && err.description) || (submitBtn && submitBtn.dataset.soldOutText) || 'Sold out';
      })
      .finally(function () {
        window.setTimeout(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (label) label.textContent = submitBtn.dataset.originalText;
          }
        }, 2000);
      });
  });

  updateCartCount();
  bindDrawerEvents();
})();
