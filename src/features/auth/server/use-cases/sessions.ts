import crypto from "crypto";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { getIPAddress } from "./location";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { SESSION_LIFETIME } from "@/config/constant";

type CreateSessionData = {
  userAgent: string;
  userId: number;
  ip: string;
  token: string;
};

const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

//generates a 256 bit cryptographically secure token.
//Buffer 4f 8a 9b 12...(raw binary and non-readable)
//Convert that Binary data to hexadecimal string
//This ensures that string is in Unicode Normalization Form(NFC)

export const createUserSession = async ({
  token,
  userAgent,
  userId,
  ip,
}: CreateSessionData) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const [result] = await db.insert(sessions).values({
    id: hashedToken,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
    ip,
    userAgent,
  });
  return result;
};

export const createSessionAndSetCookies = async (userId: number) => {
  const token = generateSessionToken();

  const ip = await getIPAddress();
  const headerslist = await headers();

  await createUserSession({
    token,
    userId: userId,

    userAgent: headerslist.get("user-agent") || "",
    ip: ip,
  });
};
