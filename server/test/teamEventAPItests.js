const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

const EMAILS = [
  "mattcharlesh@gmail.com",
  "kozaktaras15@gmail.com",
  "uesttser@gmail.com",
  "alvyjudy@gmail.com",
];

const TEAM_NAME = "Team Yu Gi Oh";

const UPDATE_USER_EMAILS = [
  "mattcharlesh@gmail.com",
  "kozaktaras15@gmail.com",
  "alvyjudy@gmail.com",
  "daniel@hatchways.io"
];

const EVENT_TYPE_ID = "601af6fce7743b6d7b22eb15";

const NON_TEAM_EMAILS = [
  "asdfsdf@ggg.ca",
  "effffff@erer.com",
  "mattcharlesh@gmail.com",
  "sdfsdfsdf@ddfd.ca"
]


describe("/POST Create New Team Event ", () => {
  it("it should return 200", (done) => {
    chai
      .request(app)
      .post(`/api/team-event/create`)
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
