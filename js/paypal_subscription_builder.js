var PayPalSubscriptionBuilder = (function () {

  function toggleIndefinitePayments() {
    var numberInput = document.getElementById('inputPaymentNumber');
    if (this.checked == true) {
      M.classAdd(numberInput, 'disabled');
    } else {
      M.classRemove(numberInput, 'disabled');
    }
  }

  function load() {
    var button;
    // Enable indefinite-payment selector.
    button = document.getElementById('paymentRecursIndefinitely');
    button.onclick = toggleIndefinitePayments;
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
