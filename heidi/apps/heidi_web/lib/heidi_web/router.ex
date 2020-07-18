defmodule BroadcastWeb.Router do
  use BroadcastWeb, :router

  pipeline :api do
    plug :accepts, ["json"]

    # if Application.get_env(:heidi_web, :force_ssl) do
    #   plug(Plug.SSL, rewrite_on: [:x_forwarded_proto], host: nil)
    # end
  end

  scope "/api", BroadcastWeb do
    pipe_through :api
  end
end
