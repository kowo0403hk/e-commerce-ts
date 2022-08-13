export {};

declare global {
  namespace Express {
    interface Request {
      session: {
        userID: number;
      };
    }
  }
}
