defmodule Broadcast.JanusSupervisor do
  # Automatically defines child_spec/1
  use DynamicSupervisor

  def child_spec(arg) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [arg]},
      restart: :transient,
      shutdown: 5000,
      type: :supervisor
    }
  end

  def start_link(_) do
    # opts = [debug: :trace, name: __MODULE__, timeout: :infinity, spawn_opt: :link, hibernate_after: :infinity]
    opts = [debug: :log]
    DynamicSupervisor.start_link(__MODULE__, [] , opts )
  end

  def create_janus_connection(socket) do
    # require IEx; IEx.pry
    # IO.puts "Called create_janus_connection\n\n\n"
    DynamicSupervisor.start_child(__MODULE__, Broadcast.JanusHandler.child_spec(socket, self()))
    # DynamicSupervisor.start_child(Broadcast.JanusHandler, Broadcast.JanusHandler.child_spec(self()))
  end
  

  def init(_) do
    # IO.puts "Called start in janus_sup\n\n\n"
    # children = [
    #   %{
    #     id: Broadcast.JanusHandler,
    #     start: {Broadcast.JanusHandler, :start_link, [:supervisor]},
    #     restart: :transient,
    #     shutdown: 5000,
    #     type: :worker,
    #   }
    # ]
    # Supervisor.init(children, %{strategy: :one_for_one, max_restarts: 10, max_seconds: 10})
    # Supervisor.init(children, strategy: :one_for_one)
    DynamicSupervisor.init(strategy: :one_for_one)
  end
end
