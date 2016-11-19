defmodule Squad.Router do
  use Squad.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Squad do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Squad do
    pipe_through :api
    get "/events", ApiController, :list_events
    get "/event/:id", ApiController, :show_event
    post "/event", ApiController, :create_event
  end
end
