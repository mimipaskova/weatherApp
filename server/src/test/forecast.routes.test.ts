import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../server";
import { middleware } from "../auth";
import Koa from "koa";
const expect = chai.expect;
const originalEnsure = middleware.ensureSession;

chai.use(chaiHttp);

chai.use(chaiHttp);

const forecastUrl = "/api/forecast";

const user = {
  id: "109978389065513145342",
  displayName: "Maria Paskova",
  name: { familyName: "Paskova", givenName: "Maria" },
  role: 10
};

describe("Forecast routes Unauthorized", () => {
  after(() => {
    server.close();
  });

  it("should get Unauthorized for weather cast", done => {
    chai
      .request(server)
      .get(forecastUrl)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.text).equal("Unauthorized");
        done();
      });
  });
});

describe("Forecast routes", () => {
  before(() => {
    middleware.ensureSession = async function(ctx: any, next: Koa.Next) {
      ctx.session.passport = {
        user: user
      };
      return next();
    };
  });

  after(() => {
    middleware.ensureSession = originalEnsure;
  });

  after(() => {
    server.close();
  });

  it("should get 200 for weather cast", async () => {
    const res = await chai.request(server).get(forecastUrl);
    expect(res).to.have.status(200);
  });

  it("should have all fields in city", async () => {
    const res = await chai.request(server).get(forecastUrl);
    expect(JSON.parse(res.text)).to.have.any.keys("city");
    expect(JSON.parse(res.text)).to.have.any.keys("list");
  });

  it("should have city and list keys", async () => {
    const res = await chai.request(server).get(forecastUrl);

    expect(JSON.parse(res.text).city).to.have.all.keys(
      "id",
      "name",
      "country",
      "population",
      "timezone",
      "sunrise",
      "sunset",
      "coord"
    );
  });

  it("should have country Bulgaria", async () => {
    const res = await chai.request(server).get(forecastUrl);

    expect(JSON.parse(res.text).city.country)
      .to.be.a("string")
      .that.includes("BG");
  });

  it("should have city Sofia", async () => {
    const res = await chai.request(server).get(forecastUrl);

    expect(JSON.parse(res.text).city.name)
      .to.be.a("string")
      .that.includes("Sofia");
  });

  it("should have city Plovdiv", async () => {
    const res = await chai.request(server).get(`${forecastUrl}?city=Plovdiv`);

    expect(JSON.parse(res.text).city.name)
      .to.be.a("string")
      .that.includes("Plovdiv");
  });
});
