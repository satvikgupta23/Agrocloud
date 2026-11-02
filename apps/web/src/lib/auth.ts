import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { logger } from "@/lib/logger";

import type { NextAuthOptions } from "next-auth";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

// Seamless guest provider: no credentials required
providers.push(
    CredentialsProvider({
        id: "guest",
        name: "Guest Operator",
        credentials: {},
        async authorize() {
            return {
                id: "guest-operator",
                name: "Field Operator",
                email: "operator@openfarm.earth",
                image: null,
            };
        },
    })
);

export const authOptions: NextAuthOptions = {
    providers,
    callbacks: {
        async signIn({ user }) {
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.dbId = (user as any).dbId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.dbId;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/",
        error: "/",
    },
};
