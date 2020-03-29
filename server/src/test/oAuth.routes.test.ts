import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../server";
import { config } from "../controllers/config";
const expect = chai.expect;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

chai.use(chaiHttp);

describe("OAuth routes - google strategy", () => {
  after(() => {
    server.close();
  });

  describe("constructed", function() {
    var strategy = new GoogleStrategy(
      {
        clientID: config.get("clientID"),
        clientSecret: config.get("clientSecret")
      },
      function() {}
    );

    it("should be named google", function() {
      expect(strategy.name).to.equal("google");
    });
  });

  describe("constructed with undefined options", function() {
    it("should throw", function() {
      expect(function() {
        var strategy = new GoogleStrategy(undefined, function() {});
      }).to.throw(Error);
    });
  });
});
