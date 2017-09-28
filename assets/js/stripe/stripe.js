
Stripe.setPublishableKey('pk_test_BR7HShIv2kTdYnhQeUw1xwLp');

$(function() {
var $form = $('#payment-form');
$form.submit(function(event) {
  // Disable the submit button to prevent repeated clicks:
  $form.find('.submit').prop('disabled', true);
  $( ).trigger( "pay" );
  // // Request a token from Stripe:
  // Stripe.card.createToken($form, function(status, res){
  //  // Grab the form:
  // var $form = $('#payment-form');

  // if (res.error) { // Problem!

  //   // Show the errors on the form:
  //   $form.find('.payment-errors').text(res.error.message);
  //   $form.find('.submit').prop('disabled', false); // Re-enable submission

  // } else { // Token was created!

  //   // Get the token ID:
  //   var token = res.id;

  //   // Insert the token ID into the form so it gets submitted to the server:
  //   $form.append($('<input type="hidden" name="stripeToken">').val(token));

  //   // Submit the form:
  //   $form.get(0).submit();
  // }

  // });

  // Prevent the form from being submitted:
  return false;
});
});