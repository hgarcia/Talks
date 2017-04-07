```csharp

//Implements IPayment
 // get request from the UI
  var paymentRequestValidator = PaymentRequestValidatorFactory.Create(request.body);

  var paymentRequest = paymentRequestValidator.validate();

  var paymentProviderPayloadAdapter = PaymentProviderPayloadAdapterFactory.Create(paymentRequest.type);

  var paymentProvider = PaymentProviderFactory.Create(paymentRequest, config); //Implements IProviderFactory

  var paymentProviderResponse = paymentProvider.Pay(paymentProviderPayloadAdapter.adaptRequest(paymentRequest));

  var adaptedResponse = paymentProviderPayloadAdapter.adaptRequest(paymentProviderResponse);
  // send response up to the user
```

> Look at all the mappings we are doing

> And we are not even handling any errors here.