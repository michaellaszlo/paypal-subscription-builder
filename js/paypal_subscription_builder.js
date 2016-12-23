var PayPalSubscriptionBuilder = (function () {

  function toggleIndefinitePayments() {
    console.log('toggling');
  }

  function load() {
    var button;
    console.log('loading');
    // Enable indefinite-payment selector.
    button = document.getElementById('paymentRecursIndefinitely');
    button.onclick = toggleIndefinitePayments;
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
