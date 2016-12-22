var PayPalSubscriptionBuilder = (function () {

  function load() {
    console.log('loading');
  }

  return {
    load: load
  };
})();

onload = PayPalSubscriptionBuilder.load;
