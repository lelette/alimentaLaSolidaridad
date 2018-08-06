
app.directive('actionStripe', function() {
  return {
    link: function(scope, elm, attrs, ctrl) {

      Stripe.setPublishableKey('pk_test_LNmVmGs1NRu9PjqYUFwhTxuv');

      $(elm).on('click', function(){
        var $form = $('#payment-form');

        // Disable the submit button to prevent repeated clicks:
        attrs['disabled'] = true;
        // Request a token from Stripe:
        Stripe.card.createToken($form, function(status, res){
          // Grab the form:
          var $form = $('#payment-form');
            // console.log(res);
          if (res.error) { // Problem!
            // Show the errors on the form:
            $form.find('.payment-errors').text(res.error.message);
            attrs['disabled']=false; // Re-enable submission

          } else { // Token was created!

            // Get the token ID:
            var token = res.id;

            // Insert the token ID into the form so it gets submitted to the server:
            scope.recharge.tokenStripe= token;
            scope.$emit( "pay" );
          }

        });
        return false;
      });


    }
  };
});
