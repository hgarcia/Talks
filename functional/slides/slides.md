# OO <span class="highlight">|></span> FP

/*split*/

Presentation original y cambio de idea.
List of presentations and blog post about OO to Funtional

/*split*/

# Porqué?

> Aplicando solid y refactoreando el codigo termina con clases pequeñas con uno o dos metodos a lo sumo.

> 90% de las aplicaciones que hacemos solo procesan y transforman data.

> FP es perfecto para eso

> Codigo mas simple

> Codigo mas facil de leer

> Codigo mas facil de mantener

/*split*/

# Ejemplo 1: Proveedores de pagos

> Transformar la data que uno recibe al request necesario para cada proveedor.
> La respuesta viene y con multiple respuestas posibles (pattern matching).
> Transformar las posibles respuestas en un formato unico para que la aplication puede mostrar y entender.

> OO Adapters, encoders, decoders.

> FP, functions, pipelines, pattern matching.

/*split*/

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

/*split*/
```c#
public static class PaymentProviderPayloadAdapterFactory
```
```c#
public static class PaymentProviderFactory
```
```c#
public static class PaymentRequestValidatorFactory
```
```c#
public class AuthPaymentRequestValidator : IPaymentRequestValidator
```
```c#
public class PPPaymentRequestValidator : IPaymentRequestValidator
```
```c#
public class AuthPaymentRequest : IPaymentRequest
```
```c#
public class PPPaymentRequest : IPaymentRequest
```
```c#
public class AuthPayloadAdapter : IPaymentProviderPayloadAdapter
```
```c#
public class PPPayloadAdapter : IPaymentProviderPayloadAdapter
```
```c#
public class AuthPaymentProvider : IPaymentProvider
```
```c#
public class PPPaymentProvider : IPaymentProvider
```
```c#
public class AuthPaymentRequest
```
```c#
public class PPPaymentRequest
```
```c#
public class PaymentResponse : IPaymentResponse
```

/*split*/

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

/*split*/

```elixir
def do_payment(args) do
  validate_payment(args)
    |> prepare_payment_request
    |> send_payment
    |> prepare_response
end
```

> Donde estan las factories?

> Donde esta el error handler!!!!

/*split*/

```elixir

//there is an error, so we just send it up the pipe.
def prepare_payment_request({:error, error}) do {:error, error}

def prepare_payment_request({:ok, payment}) when payment.type === "PP" do
  // code for PP
end

def prepare_payment_request({:ok, payment}) when payment.type === "AN" do
  // code for AN
end

def prepare_payment_request({:ok, payment}) do
  // code for ???
end
```

> Much elegant

/*split*/

```elixir

//there is an error, so we just send it up the pipe.
def prepare_payment_request({:error, _, error}) do {:error, error}
def prepare_payment_request({:ok, :pp, payment}) do
  // code for PP
end

def prepare_payment_request({:ok, :an, payment}) do
  // code for AN
end

def prepare_payment_request({:ok, _, payment}) do
  // code for ???
end
```

/*split*/

```elixir
require OK

def do_payment(args) do
  OK.with do
    cart <- create_payment(args)
    payment <- prepare_payment_request(cart)
    response <- send_payment(payment)
    result <- prepare_response(response)
    OK.success result
  else
    :connection_error -> OK.failure :problems_connecting
    :out_of_funds -> OK.failure :run_out_of_funds
    :expired -> OK.failure :cc_expired
    :avs -> OK.failure :address_verification_problems
    :address_mismatch -> OK.failure :address_problems
    //...
    :error -> OK.failure :error
  end
end
```

> Even if you need to catch errors and match or whatever you can ether use the Elixir with or the library OK

/*split*/

# Ejemplo 2: db mapping

/*split*/

# Ejemplo 3: streams

/*split*/

# Gracias!