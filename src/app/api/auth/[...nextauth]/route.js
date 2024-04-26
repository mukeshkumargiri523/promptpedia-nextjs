import { User } from "@/models/userModel";
import { connectDb } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// console.log(
//   "  clientId:",
//   process.env.GOOGLE_ID,
//   " clientSecret:",
//   process.env.GOOGLE_SECRET
// );

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDb();
        //check if user already exist or not
        const userExist = await User.findOne({
          email: profile.email,
        });
        //if user not exist create one
        // if (!userExist) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name.replace(" ", "").toLowerCase(),
        //     image: profile.picture,
        //   });
        // }
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.email.replace("@gmail.com", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("error in checking user or creating user", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
