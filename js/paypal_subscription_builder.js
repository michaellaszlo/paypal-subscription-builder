var PayPalSubscriptionBuilder = (function () {
  'use strict';

  var unitRanges = {
        'D': { min: 1, max: 90 },
        'W': { min: 1, max: 52 },
        'M': { min: 1, max: 24 },
        'Y': { min: 1, max: 5 }
      },
      unitButtons = {},
      numericalInputs = {},
      state = {
        amount: 10,
        periodMultiple: 1,
        periodUnit: 'M',
        numPayments: 12,
        unlimitedPayments: false
      };

  function toggleUnlimitedRecurrence() {
    if (this.checked == true) {
      M.classAdd(numericalInputs.numPayments, 'disabled');
    } else {
      M.classRemove(numericalInputs.numPayments, 'disabled');
    }
  }

  function updateState(name, value) {
    state[name] = value;
    localStorage.setItem('state', JSON.stringify(state));
  }

  function updateAmount() {
    var amount = parseInt(this.value, 10);
    updateState('amount', amount);
    document.getElementById('displayAmount').innerHTML = amount;
  }

  function updateNumPayments() {
    var num = parseInt(this.value, 10);
    updateState('numPayments', num);
    document.getElementById('displayNumPayments').innerHTML = num;
  }

  function updatePeriodMultiple() {
    var multiple = parseInt(this.value, 10),
        range = unitRanges[state.periodUnit];
    if (multiple < range.min || multiple > range.max) {
      console.log('period multiple out of range');
      return;
    }
    updateState('periodMultiple', multiple);
    document.getElementById('displayPeriodMultiple').innerHTML = multiple;
  }

  function updatePeriodUnit() {
    var unit = this.value;
    updateState('periodUnit', unit);
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
    var data,
        container,
        inputs, i, input,
        button;

    // Find numerical inputs and unit buttons.
    [ 'amount', 'numPayments', 'periodMultiple' ].forEach(function (name) {
      numericalInputs[name] = document.getElementById('input'
          + name.charAt(0).toUpperCase() + name.substring(1));
    });
    [ 'D', 'W', 'M', 'Y' ].forEach(function (unit) {
      unitButtons[unit] = document.getElementById('unit' + unit);
    });

    // Load state if available.
    data = localStorage.getItem('state');
    if (data !== null) {
      state = JSON.parse(data);
    }

    // Use state to initialize input values.
    numericalInputs.amount.value = state.amount;
    numericalInputs.numPayments.value = state.numPayments;
    numericalInputs.periodMultiple.value = state.periodMultiple;
    unitButtons[state.periodUnit].checked = true;

    // Enable numerical inputs.
    setUpdater(numericalInputs.amount, updateAmount);
    setUpdater(numericalInputs.numPayments, updateNumPayments);
    setUpdater(numericalInputs.periodMultiple, updatePeriodMultiple);

    // Enable period-unit radio buttons.
    container = document.getElementById('paymentPeriodConfiguration');
    inputs = container.getElementsByTagName('input');
    for (i = 0; i < inputs.length; ++i) {
      input = inputs[i];
      if (input.name == 'inputPeriodUnit') {
        input.addEventListener('change', updatePeriodUnit);
        if (input.checked) {
          updatePeriodUnit.apply(input);
        }
      }
    }

    // Enable limited-recurrence toggle.
    button = document.getElementById('unlimitedRecurrence');
    button.onclick = toggleUnlimitedRecurrence;
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
