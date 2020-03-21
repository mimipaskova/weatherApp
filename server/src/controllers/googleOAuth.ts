import passport from "koa-passport";
import "passport-google-oauth20";
import { config } from "./config";
// import User from "../models/user";

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
    function(token: any, tokenSecret: any, profile: any, done: any) {
      // retrieve user ...
      done(null, profile);
      //   User.findOne({ google_id: profile.id }, );
    }
  )
);
