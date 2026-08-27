// Cart page quantity/remove interactions. Same markup/data-attributes as
// the drawer (snippets/cart-line-item.liquid), but this reloads the page
// after each change instead of doing a section-render swap, since the
// cart page already is the full render.
(function () {
  var lines = document.querySelector('[data-cart-page-lines]');
  if (!lines) return;

  function changeLine(key, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    });
  }

  lines.querySelectorAll('[data-cart-line]').forEach(function (line) {
    var key = line.getAttribute('data-line-key');
    var input = line.querySelector('[data-quantity-input]');
    var dec = line.querySelector('[data-quantity-decrease]');
    var inc = line.querySelector('[data-quantity-increase]');
    var remove = line.querySelector('[data-cart-remove]');

    function apply(qty) {
      line.style.opacity = '0.5';
      changeLine(key, qty).then(function () {
        window.location.reload();
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
})();
