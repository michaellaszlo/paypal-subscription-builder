var PayPalSubscriptionBuilder = (function () {

  function toggleUnlimitedRecurrence() {
    var numberInput = document.getElementById('inputPaymentCount');
    if (this.checked == true) {
      M.classAdd(numberInput, 'disabled');
    } else {
      M.classRemove(numberInput, 'disabled');
    }
  }

  function updatePaymentValue() {
    var value = parseInt(this.value, 10);
    document.getElementById('displayPaymentValue').innerHTML = value;
  }

  function updatePeriodCount() {
    var value = parseInt(this.value, 10);
    document.getElementById('displayPeriodCount').innerHTML = value;
  }

  function updatePaymentCount() {
    var value = parseInt(this.value, 10);
    document.getElementById('displayPaymentCount').innerHTML = value;
  }

  function setUpdater(inputElement, updateFunction) {
    [ 'change', 'keydown', 'keyup', 'click', 'mousedown' ].forEach(
      function (eventName) {
        inputElement.addEventListener(eventName, updateFunction);
      }
    );
    updateFunction.apply(inputElement, updateFunction);
  }

  function load() {
    var button;
    // Enable numerical inputs.
    setUpdater(document.getElementById('inputPaymentValue'),
        updatePaymentValue);
    setUpdater(document.getElementById('inputPeriodCount'),
        updatePeriodCount);
    setUpdater(document.getElementById('inputPaymentCount'),
        updatePaymentCount);
    // Enable unlimited-recurrence toggle.
    button = document.getElementById('unlimitedRecurrence');
    button.onclick = toggleUnlimitedRecurrence;
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
