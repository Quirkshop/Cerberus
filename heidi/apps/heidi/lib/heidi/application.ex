defmodule Broadcast.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false
  use Application

  def start(_type, _args) do
    # children = [
    #   #  JanusSupervisor.child_spec(Kernel.self()),
    #   # {DynamicSupervisor, name: JanusSupervisor, strategy: :one_for_one}
    # ]

    opts = [strategy: :one_for_one, name: Broadcast.Supervisor]
    # Supervisor.init(children, opts)
    # Broadcast.Supervisor.start_link(children, opts)
    # JanusSupervisor.start_link()
    Broadcast.Supervisor.start_link(opts)
  end

end
