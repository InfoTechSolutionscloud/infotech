import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from 'bcryptjs'
import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                await dbConnect();

                const user = await User.findOne({email: credentials.email})
                if(user && bcrypt.compare(credentials.password, user.password)){
                    return {id:user._id, email:user.email}
                } else {
                    return null;
                }
            }
        })
    ],
    adapter : MongoDBAdapter(dbConnect),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({session, token}){
            session.user.id = token.id;
            return session;
        },
        async jwt({token, user}){
            if(user){
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};