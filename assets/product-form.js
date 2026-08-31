// PDP variant selection. Reads the embedded product JSON (no second fetch
// to /products/{handle}.js), matches selected option values against
// product.variants, and keeps the hidden variant-id input, price display,
// submit button and gallery main image in sync. The actual add-to-cart
// submit is handled by the shared delegate in cart.js -- this file only
// owns variant state and the PDP's own quantity stepper and thumbnails.
(function () {
  // The main image renders with a srcset (see main-product.liquid), and a
  // srcset always wins over src once present, so swapping just .src has no
  // visible effect -- srcset has to go too.
  function setMainImage(mainImg, src) {
    if (!mainImg) return;
    mainImg.removeAttribute('srcset');
    mainImg.removeAttribute('sizes');
    mainImg.src = src;
  }

  var form = document.querySelector('[data-product-form-main]');
  if (!form) return;

  var jsonEl = form.querySelector('[data-product-json]');
  if (!jsonEl) return;

  var product;
  try {
    product = JSON.parse(jsonEl.textContent);
  } catch (e) {
    return;
  }

  var variantInput = form.querySelector('[data-variant-id-input]');
  var priceAmount = document.querySelector('[data-price-amount]');
  var priceCompareAt = document.querySelector('[data-price-compare-at]');
  var submitBtn = form.querySelector('[data-add-to-cart]');
  var submitLabel = form.querySelector('[data-product-submit-label]');
  var optionGroups = form.querySelectorAll('[data-option-index]');

  var selected = [];
  (product.variants || []).some(function (v) {
    if (v.id === Number(variantInput.value)) {
      selected = v.options.slice();
      return true;
    }
    return false;
  });

  function formatMoney(cents) {
    var format = window.SS_MONEY_FORMAT || '${{amount}}';
    var amount = (cents / 100).toFixed(2);
    var parts = amount.split('.');
    var withThousands = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var value = withThousands + '.' + parts[1];
    return format.replace(/\{\{\s*amount\s*\}\}/, value);
  }

  function findVariant() {
    for (var i = 0; i < product.variants.length; i++) {
      var v = product.variants[i];
      var matches = true;
      for (var j = 0; j < selected.length; j++) {
        if (v.options[j] !== selected[j]) {
          matches = false;
          break;
        }
      }
      if (matches) return v;
    }
    return null;
  }

  function render() {
    var variant = findVariant();

    optionGroups.forEach(function (group) {
      var index = Number(group.getAttribute('data-option-index'));
      group.querySelectorAll('[data-option-value]').forEach(function (btn) {
        var value = btn.getAttribute('data-option-value');
        btn.classList.toggle('is-selected', selected[index] === value);

        // Disable a value if no variant with the currently-selected values
        // plus this one exists at all (regardless of availability), so a
        // shopper never lands on a nonexistent combination.
        var probe = selected.slice();
        probe[index] = value;
        var exists = product.variants.some(function (v) {
          return probe.every(function (val, i) {
            return val == null || v.options[i] === val;
          });
        });
        btn.disabled = !exists;
      });
    });

    if (!variant) {
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = form.dataset.unavailableText || 'Unavailable';
      return;
    }

    if (variantInput) variantInput.value = variant.id;
    if (priceAmount) priceAmount.textContent = formatMoney(variant.price);
    if (priceCompareAt) {
      if (variant.compare_at_price > variant.price) {
        priceCompareAt.textContent = formatMoney(variant.compare_at_price);
        priceCompareAt.hidden = false;
      } else {
        priceCompareAt.hidden = true;
      }
    }

    if (submitBtn) submitBtn.disabled = !variant.available;
    if (submitLabel) {
      submitLabel.textContent = variant.available
        ? (submitBtn.dataset.originalAddLabel || submitLabel.textContent)
        : (submitBtn.dataset.soldOutText || 'Sold out');
    }

    if (variant.featured_image && variant.featured_image.src) {
      setMainImage(document.getElementById('product-main-image'), variant.featured_image.src);
    }

    if (history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      history.replaceState({}, '', url);
    }
  }

  optionGroups.forEach(function (group) {
    var index = Number(group.getAttribute('data-option-index'));
    group.querySelectorAll('[data-option-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selected[index] = btn.getAttribute('data-option-value');
        render();
      });
    });
  });

  // Thumbnails swap the main image and figure label; no variant implications.
  var thumbs = form.closest('.product').querySelectorAll('[data-product-thumb]');
  var figureLabel = document.querySelector('[data-figure-label]');
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      setMainImage(document.getElementById('product-main-image'), thumb.getAttribute('data-image-src'));
      thumbs.forEach(function (t) { t.classList.toggle('is-active', t === thumb); });
      if (figureLabel) figureLabel.textContent = thumb.getAttribute('data-image-label') || '';
    });
  });

  // The PDP's own quantity stepper (distinct from the cart drawer's, which
  // cart.js binds separately per line item).
  var qty = form.querySelector('[data-quantity-selector]');
  if (qty) {
    var input = qty.querySelector('[data-quantity-input]');
    var dec = qty.querySelector('[data-quantity-decrease]');
    var inc = qty.querySelector('[data-quantity-increase]');
    if (dec) {
      dec.addEventListener('click', function () {
        input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
      });
    }
    if (inc) {
      inc.addEventListener('click', function () {
        input.value = (parseInt(input.value, 10) || 1) + 1;
      });
    }
  }

  render();
})();
