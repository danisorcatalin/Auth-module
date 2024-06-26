import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

require('dotenv').config();

const prisma = new PrismaClient();

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: {
                    type: 'email'
                },
                password: { type: 'password' }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: email }
                });
                if (!user) return null;

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.hashedPassword
                );

                if (!passwordMatch) return null;

                return user;
            }
        })
    ],
    session: { strategy: 'jwt' },
    pages: {
        login: '/login',
        error: '/login'
    },
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.admin = token.admin;
                session.user.image = token.image;
            }

            return session;
        },
        async jwt({ token, user }) {
            const email = token.email;

            const dbUser = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!dbUser) {
                token.id = user?.id;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                image: dbUser.image,
                email: dbUser.email,
                admin: dbUser.admin
            };
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
