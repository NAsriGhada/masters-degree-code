import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;
          const name = profile.displayName;

          // if Google didn't provide email, you can decide how to handle
          if (!email) return done(null, false);

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name,
              email,
              googleId,
              provider: "google",
            });
          } else {
            // if user existed but no googleId, link it
            if (!user.googleId) {
              user.googleId = googleId;
              user.provider = user.provider === "local" ? "local" : "google";
              await user.save();
            }
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      },
    ),
  );
};
