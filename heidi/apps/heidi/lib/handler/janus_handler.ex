defmodule Broadcast.JanusHandler do
  use WebSockex
  require Logger

  def child_spec(socket, pid) do
    %{
     id: __MODULE__,
     start: {__MODULE__, :start_link, [socket, pid]},
     restart: :transient,
     shutdown: 5000,
     type: :worker
   }
  end

  def start_link(conn, pid) do
    Logger.info "Called Broadcast.JanusHandler.start_link(from)"
    IO.inspect(conn, label: "conn")
    IO.inspect(pid, label: "pid")

    state = %{phx_sock: conn, phx_pid: pid}
    opts = [{:extra_headers, [{"Sec-WebSocket-Protocol", "janus-protocol"}]}]
    ws_url = ""
    ws_url = if (Application.get_env(:heidi, :environment) == :prod) do
              "https://quirkshop.org/janus"
              # Logger.info "\n\n\n PROD ENV \n"
              # ws_url = "https://quirkshop.org/janus"
              # {:ok, pid} = WebSockex.start_link("https://quirkshop.org/janus", __MODULE__, state, opts)
            else 
              "ws://localhost:8188/janus"
              # {:ok, pid} = WebSockex.start_link("ws://localhost:8188/janus", __MODULE__, state, opts)
            end
    {:ok, pid} = WebSockex.start_link(ws_url, __MODULE__, state, opts)
    IO.inspect(pid, label: "pid")
    {:ok, pid}
  end

  

  # def init(from, conn) do
  #   Logger.info "Called Broadcast.JanusHandler.init(from, conn)"
  #   IO.inspect(from, label: "from")
  #   IO.inspect(conn, label: "conn")
  #   # IO.puts "Here from: #{from}"
  #   # Logger.info("From: #{from}")
  #   {:ok, %{:from => from}}
  # end

  # Websockex Handler
  def handle_connect(conn, state) do
    Logger.info "Called Broadcast.JanusHandler.handle_connect(conn, state)"
    IO.inspect(state, label: "state")
    IO.inspect(conn, label: "conn")
    
    {:ok, state}
  end

  def handle_frame({:text, msg}, state) do
    # require IEx; IEx.pry
    Logger.info "Called Broadcast.JanusHandler.handle_frame({:text, msg}, state)"
    IO.inspect(msg, label: "msg")
    IO.inspect(state, label: "state")
    decoded_msg = Jason.decode!(msg)
    msg_out = process(decoded_msg, state)
    Logger.info "About to broadcast message"
    IO.inspect(msg_out, label: "msg_out")
    :ok = BroadcastWeb.Endpoint.broadcast!(state.phx_sock.topic, "janus_handler", msg_out)
    Logger.info "Message broadcasted"
    {:ok, state}
    # Broadcast.Endpoint.broadcast!("broadcast:lobby" <> state.room, "new_msg", %{message: msg})
  end

  # internal
  def process(%{"transaction" => "create_session", "data" => %{"id" => sessionId}} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(create_session)"
    IO.inspect(sessionId, label: "sessionId")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:session_id => sessionId}}
    msg
  end

  def process(%{"transaction" => "create_handle", "data" => %{"id" => handleId}} , state) do
    # require IEx; IEx.pry
    Logger.info "Called Broadcast.JanusHandler.process(create_handle)"
    IO.inspect(handleId, label: "handleId")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:handle_id => handleId}}
    msg
  end

  def process(%{"transaction" => "create_room", "plugindata" => %{  "data" => %{"room" => roomId}}} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(create_room)"
    IO.inspect(roomId, label: "roomId")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:room_id => roomId}}
    msg
  end

  def process(%{"transaction" => "join_publisher", "plugindata" => %{  "data" => %{"id" => pubId}}} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(join_publisher)"
    IO.inspect(pubId, label: "pubId")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:publisher_id => pubId}}
    msg
  end

  def process(%{"transaction" => "join_subscriber", "jsep" => offer} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(join_subscriber)"
    IO.inspect(offer, label: "offer")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:jsep => offer}}
    msg
  end

  def process(%{"transaction" => "publish", "jsep" => answer} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(publish)"
    IO.inspect(answer, label: "answer")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:jsep => answer}}
    msg
  end
  
  def process(%{"transaction" => "listen", "jsep" => answer} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(listen)"
    IO.inspect(answer, label: "answer")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:jsep => answer}}
    msg
  end

  def process(%{"transaction" => "trickle", "candidate" => candidate} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(trickle)"
    IO.inspect(candidate, label: "candidate")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:candidate => candidate}}
    msg
  end

  def process(%{"transaction" => "keepalive", "data" => %{"id" => sessionId}} , state) do
    Logger.info "Called Broadcast.JanusHandler.process(keepalive)"
    IO.inspect(sessionId, label: "sessionId")
    IO.inspect(state, label: "state")
    msg = %{:ref => %{:session_id => sessionId}}
    msg
  end
  
  def process(msg, state) do
    Logger.info "Called Broadcast.JanusHandler.process(_)"
    IO.inspect(msg, label: "msg")
    IO.inspect(state, label: "state")
    msg_out = %{:ref => %{:ok => :ok}}
    msg_out
  end
    
end
