import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../server";
import { middleware } from "../auth";
import Koa from "koa";
import { ROLES } from "../models/user";
const expect = chai.expect;
const originalEnsure = middleware.ensureSession;

chai.use(chaiHttp);

chai.use(chaiHttp);

const userstUrl = "/api/users";

const user = {
  id: "109978389065513145342",
  displayName: "Maria Paskova",
  name: { familyName: "Paskova", givenName: "Maria" },
  role: ROLES.admin
};

describe("Users routes Unauthorized", () => {
  after(() => {
    server.close();
  });

  it("should get Unauthorized for user", done => {
    chai
      .request(server)
      .get(userstUrl)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.text).equal("Unauthorized");
        done();
      });
  });
});

describe("Users routes - admin", () => {
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

  it("should get user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);
    expect(res).to.have.status(200);
  });

  it("should have all fields for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);
    expect(JSON.parse(res.text)).to.have.all.keys(
      "id",
      "displayName",
      "name",
      "role"
    );
  });

  it("should have name for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).displayName)
      .to.be.a("string")
      .that.includes("Maria Paskova");
  });

  it("should have role for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).role).to.equal(ROLES.admin);
  });

  it("should have same id for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).id).to.equal(user.id);
  });

  it("should get users", async () => {
    const res = await chai.request(server).get(userstUrl);
    expect(res).to.have.status(200);
  });

  it("should get users array", async () => {
    const res = await chai.request(server).get(userstUrl);
    expect(JSON.parse(res.text)).to.be.an("array");
  });
});

describe("Users routes - normal user", () => {
  before(() => {
    middleware.ensureSession = async function(ctx: any, next: Koa.Next) {
      ctx.session.passport = {
        user: { ...user, role: ROLES.user }
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

  it("should get user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);
    expect(res).to.have.status(200);
  });

  it("should have all fields for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);
    expect(JSON.parse(res.text)).to.have.all.keys(
      "id",
      "displayName",
      "name",
      "role"
    );
  });

  it("should have name for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).displayName)
      .to.be.a("string")
      .that.includes("Maria Paskova");
  });

  it("should have role for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).role).to.equal(ROLES.user);
  });

  it("should have same id for user", async () => {
    const res = await chai.request(server).get(`${userstUrl}/me`);

    expect(JSON.parse(res.text).id).to.equal(user.id);
  });

  it("should not get users", async () => {
    const res = await chai.request(server).get(userstUrl);
    expect(res).to.have.status(403);
  });
});
