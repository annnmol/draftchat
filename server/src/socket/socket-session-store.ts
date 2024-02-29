interface Session {
    [key: string]: string;
}
  
class InMemorySocketSessionStore {
    private sessions: Map<string, Session>;
  
    constructor() {
      this.sessions = new Map();
    }
  
    public findSession(id: string): Session | undefined {
      return this.sessions.get(id);
    }
  
    public saveSession(id: string, session: Session): void {
      this.sessions.set(id, session);
    }
  
    public findAllSessions(): Map<string, Session> {
      return this.sessions;
    }
}

export const socketSessionStore = new InMemorySocketSessionStore();