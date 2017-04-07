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