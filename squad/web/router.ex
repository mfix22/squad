defmodule Squad.Router do
  use Phoenix.Router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Squad do
    pipe_through :api
    get "/event/:id", ApiController, :show
    post "/event", ApiController, :create
    get "/events", ApiController, :list
    get "/healthcheck", ApiController, :healthcheck
  end
end
