import passport from "koa-passport";
import "passport-google-oauth20";
import { config } from "./config";
import { User, ROLES } from "../models/user";

passport.serializeUser(function(user: any, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("clientID"),
      clientSecret: config.get("clientSecret"),
      callbackURL:
        "http://localhost:" +
        (process.env.PORT || 3000) +
        "/api/auth/google/callback"
    },
    async function(token: any, tokenSecret: any, profile: any, done: any) {
      try {
        const adminUser: any = await User.findOne({ role: 10 });
        const currentUser: any = await User.findOne({ googleId: profile.id });
        const allUsers = await User.find({});
        let role;

        if (allUsers.length === 0) {
          role = ROLES.admin;
        } else {
          role = ROLES.user;
        }
        if (
          currentUser !== null &&
          adminUser !== null &&
          currentUser.googleId === adminUser.googleId
        ) {
          role = ROLES.admin;
        }

        const updatedUser: any = await User.findOneAndUpdate(
          {
            googleId: profile.id
          },
          {
            googleId: profile.id,
            name: profile.displayName,
            role: role
          },
          { upsert: true, setDefaultsOnInsert: true, new: true }
        );
        done(null, { ...profile, role: updatedUser.role });
      } catch (error) {
        done(error);
      }
    }
  )
);
