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

  function updatePaymentCount() {
    var value = parseInt(this.value, 10);
    document.getElementById('displayPaymentCount').innerHTML = value;
  }

  function updatePeriodCount() {
    var value = parseInt(this.value, 10);
    document.getElementById('displayPeriodCount').innerHTML = value;
  }

  function updatePeriodUnit() {
    var unit = this.value;
    document.getElementById('displayPeriodUnit').innerHTML = unit;
  }

  function setUpdater(inputElement, updateFunction) {
    [ 'change', 'keydown', 'keyup', 'click', 'mousedown' ].forEach(
      function (eventName) {
        inputElement.addEventListener(eventName, updateFunction);
      }
    );
    updateFunction.apply(inputElement);
  }

  function load() {
    var container,
        inputs, i, input,
        button;
    // Numerical inputs.
    setUpdater(document.getElementById('inputPaymentValue'),
        updatePaymentValue);
    setUpdater(document.getElementById('inputPeriodCount'),
        updatePeriodCount);
    setUpdater(document.getElementById('inputPaymentCount'),
        updatePaymentCount);
    // Period-unit radio buttons.
    container = document.getElementById('paymentPeriodConfiguration');
    inputs = container.getElementsByTagName('input');
    for (i = 0; i < inputs.length; ++i) {
      input = inputs[i];
      if (input.name == 'inputPeriodUnit') {
        input.addEventListener('change', updatePeriodUnit);
        if (input.value == 'M') {
          input.click();
        }
      }
    }
    // Unlimited-recurrence toggle.
    button = document.getElementById('unlimitedRecurrence');
    button.onclick = toggleUnlimitedRecurrence;
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
