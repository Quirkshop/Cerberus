# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
   "nNt7cf4H60llt92WlTc+QkW19LKZ5CY+GZtSRvH2bbqvRnAucje8jlaDN+fMRQWT"

# config :heidi_web, 

config :heidi_web, BroadcastWeb.Endpoint,
  
  http: [
    port: String.to_integer(System.get_env("PORT") || "4000"),
    transport_options: [socket_opts: [:inet6]]
  ],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :heidi_web, BroadcastWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
