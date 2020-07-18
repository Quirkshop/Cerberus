# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :heidi,
  namespace: Broadcast

config :heidi_web,
  namespace: BroadcastWeb,
  generators: [context_app: :heidi]

# Configures the endpoint
config :heidi_web, BroadcastWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "y0+iuHq0oNEm+2iKsPZDbCC83HGz6ck40DGGZcx4DXIq52mm+kj0o5h6kKMBu1hp",
  render_errors: [view: BroadcastWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: BroadcastWeb.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "4IhkR3TW"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
