export enum SOCKET_CONNECTION_TYPES {
    SEND_MESSAGE = "user-response",
    AGENT_CHAT = "agent-chat",
    RECEIVE_MESSAGE = "bot-response",
    RECEIVE_MESSAGE_HISTORY = "bot-response-history",
    JOIN_ROOM = "join_room",
    CONNECT = "connect",
    CONNECT_ERROR = "connect_error",
    CONNECT_TIMEOUT = "connect_timeout",
    RECONNECT = "reconnect",
    DISCONNECT = "disconnect",
    AGENT_CONNECT = "agent-connect",
    AGENT_RESPONSE = "live_agent_response",
    USER_RESPONSE = "live_user_response",
    BOT_CONVERSATION = "bot-conversation",
    BOT_CONVERSATION_PREVIEW = "bot-conversation-preview",
    BOT_CONVERSATION_HISTORY = "get-history",
    TYPING_STATUS = "typing-status",
    SET_TYPING_STATUS = "set-typing-status",
    INITIATE_BOT_SESSION = "intiate-bot",
    GET_SESSION_ID = "get-session",
    USER_CONNECT = "user-connect",
    USER_CONNECT_RESPONSE = "user-connect-response",
    USER_RECONNECT = "user-reconnect",
    USER_RECONNECT_RESPONSE = "user-reconnect-response",
    MESSAGE_READ_STATUS = "message-read-status",
    AGENT_REASSIGN = "agent-reassign",
    CHAT_AUTO_CLOSE="chat-auto-close"
  }
  
  
  export enum MESSAGE_TYPES {
    ATTACHMENT = "attachment",
    TEXT = "text",
    FILE = "file",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    LINK = "link",
    MOBILE = "mobile",
    DOCUMENT = "document",
    EMAIL = "email",
    CAROUSEL = "carousel",
    BUTTONS = "buttons",
    CHOICE = "choice",
    FLOW = "flow",
    FEEDBACK = "feedback",
    LIVE_AGENT_REQUESTED = "live_agent",
    TIMESTAMPS = "timestamps",
    ALERT = "alert",
    AWAY = "AWAY",
    TRANSFER_TO_FAQS = "TRANSFER_TO_FAQS",
    INFO = "info",
  }
  
  export enum INPUT_TYPES {
    NAME = "NAME",
    MOBILE = "MOBILE",
    WEBSITE = "WEBSITE",
    EMAIL = "EMAIL",
    QUERY = "QUERY",
    AWAY = "AWAY",
    NONE = "NONE",
    FILE = "FILE",
    FAQ = "FAQ",
    TRANSFER_TO_FAQS = "TRANSFER_TO_FAQS",
    OTP = "OTP",
    NUMBER = "NUMBER",
    DATE = "DATE",
    FEEDBACK = "FEEDBACK",
    TEXT = "TEXT",
    DATETIME = "DATETIME",
    DROPDOWN = "DROPDOWN",
    FILE_UPLOAD = "FILE_UPLOAD",
    CUSTOM = "CUSTOM",
    LIVECHAT = "LIVECHAT",
  }

  export interface IMessage {
    id: string;
    session_id: string;
    type: string;
    value: string;
    mediaUrl: string;
    senderId: string;
    seen: boolean;
  }