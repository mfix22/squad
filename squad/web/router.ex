defmodule Squad.Router do
  use Phoenix.Router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Squad do
    pipe_through :api
    get "/", ApiController, :index
  end
end
