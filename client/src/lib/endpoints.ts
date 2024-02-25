export class API_ENDPOINTS {
    //auth
    public static LOGIN = "/api/auth/login";
    public static SIGNUP = "/api/auth/signup";
    public static LOGOUT = "/api/auth/logout";

    //files
    public static UPLOAD = "/api/upload";

    //users
    public static USERS = "/api/users";


    public static CONVERSATIONS = (userId: string) => `/api/users/${userId}/conversations`;
    public static MESSAGES = (userId: string, id: string) => `/api/users/${userId}/conversations/${id}/messages`;

    //single
    public static USER = (id: string) => `/api/users/${id}`;
    public static CONVERSATION = (id: string) => `/api/conversations/${id}`;
    public static SEND_MESSAGE = (id: string) => `/api/messages/${id}`;

    //search
    public static SEARCH_USERS = (query: string) => `/api/search/users/${query}`;
    public static SEARCH_CONVERSATIONS = (query: string) => `/api/search/conversations/${query}`;

} 