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