import convict from "convict";

export const config = convict({
  appId: {
    doc: "The weather app key.",
    format: String,
    default: "c8931a82f375503088eb77975609aad6",
    env: "KEY"
  },
  clientID: {
    doc: "Google client id",
    format: String,
    default:
      "350501287082-n45gagrgbk2lvpt2tctefk2a3rm19qgl.apps.googleusercontent.com",
    env: "KEY"
  },
  clientSecret: {
    doc: "Google client secter",
    format: String,
    default: "e1CQCMXW8xrr1kI0sU1rzFJu",
    env: "KEY"
  }
});
config.validate({ allowed: "strict" });
