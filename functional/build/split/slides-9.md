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