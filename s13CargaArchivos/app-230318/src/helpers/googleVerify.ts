import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (idToken: string): Promise<TokenPayload> => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  if (payload?.email_verified) {
    return payload;
  } else {
    throw new Error("Google email not verified");
  }
};
