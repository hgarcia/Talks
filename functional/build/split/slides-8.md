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