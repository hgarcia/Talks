```csharp
//Implements IPayment
try {
  var paymentRequestValidator = PaymentRequestValidatorFactory.Create(request.body);

  var paymentRequest = paymentRequestValidator.validate();

  var paymentProviderPayloadAdapter = PaymentProviderPayloadAdapterFactory.Create(paymentRequest.type);

  var paymentProvider = PaymentProviderFactory.Create(paymentRequest, config); //Implements IProviderFactory

  var paymentProviderResponse = paymentProvider.Pay(paymentProviderPayloadAdapter.adaptRequest(paymentRequest));

  var adaptedResponse = paymentProviderPayloadAdapter.adaptRequest(paymentProviderResponse);

} catch (ConnectException e) {

} catch (OutOfFundsException e) {

} catch (ExpiredCCException e) {

} catch (AvsException e) {

} catch (AddressMissMatchException e) {

} catch (InvalidCCForAccountException e) {

} catch (InvalidCredentialsException e) {
} catch (Exception e) {
  // Handle unknown Exception
} finally {
  // Do some clean up here
}
```

> Yes this code can be made a bit cleaner

> Not all exceptions should be handle here and not all code live at the same level.