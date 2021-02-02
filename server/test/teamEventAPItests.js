const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

const user1 = {
  _id: "600817aa8a879f137234447b",
  name: "test subject",
  email: "test@gmail.com",
};
const user2 = {
  _id: "600817e2420075139bba2a13",
  name: "test subject",
  email: "test2@gmail.com",
};

const user3 = {
  _id:"6008a3e03d7fa706967aa202",email:"mattcharlesh@gmail.com",name:"Matt H"}

const user4 = { _id:"600abd338b4a2e049404b3e5",email:"kozaktaras15@gmail.com",name:"Taras Kozak"
}

const newTeamEventObj = {
  duration: 20,
  name: "New Team",
  members: [user3, user4],
};

describe("/POST Create New Team Event ", () => {
  it("it should return 200", (done) => {
    chai
      .request(app)
      .post(`/api/team-event/`)
      .send(newTeamEventObj)
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.have
        //   .property("response")
        //   .eql("Shums is not part of the team. Modify your .env");
        done();
      });
  });
});
