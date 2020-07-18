import React, { createContext, useState, useEffect } from "react";
import { Socket, Presence } from "phoenix";
export const BroadcastContext = createContext();

export const BroadcastProvider = (props) => {
	// Real Time Data
	const [messages, setMessages] = useState([]);
	const [presences, setPresences] = useState([]);

	// Global Variables & Data
	// const [sessionId, setSessionId] = useState(-1);
	// const [handleId, setHandleId] = useState(-1);
	// const [publisherId, setPublisherId] = useState(-1);
	// const [roomId, setRoomId] = useState(-1);
	// const [feedId, setFeedId] = useState(-1);
	// const [answer, setAnswer] = useState(-1);
	// const [isPublisher, setIsPublisher] = useState(false);

	return (
		<BroadcastContext.Provider
			value={{
				msgs: messages,
				setMsgs: setMessages,
				activity: presences,
				setActivity: setPresences,
				// session: sessionId,
				// setSession: setSessionId,
				// handle: handleId,
				// setHandle: setHandleId,
				// publisher: publisherId,
				// setPublisher: setPublisherId,
				// room: roomId,
				// setRoom: setRoomId,
				// feed: feedId,
				// setFeed: setFeedId,
				// ans: answer,
				// setAns: setAnswer,
				// isPub: isPublisher,
				// setPub: setIsPublisher,
			}}
		>
			{props.children}
		</BroadcastContext.Provider>
	);
};
