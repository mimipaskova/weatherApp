import convict from "convict";

export const config = convict({
  appId: {
    doc: "The weather app key.",
    format: String,
    default: "c8931a82f375503088eb77975609aad6",
    env: "KEY"
  }
});
// Perform validation
config.validate({ allowed: "strict" });
