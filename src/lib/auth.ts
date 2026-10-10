if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";


// Reuse one client across hot reloads / serverless invocations.
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URI ?? "");
if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;

const db = client.db(process.env.MONGODB_DB || "bazardor");

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  // Email verification and password reset are intentionally NOT enabled.
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, // after sign up the user is sent to the sign in page
  },
  socialProviders: { ...google, ...github },
  plugins: [nextCookies()], // keeps cookies in sync for server actions / RSC
});
