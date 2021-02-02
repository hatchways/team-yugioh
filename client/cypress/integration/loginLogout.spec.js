// Environment variables
const email = Cypress.env("email");
const baseUrl = Cypress.config().baseUrl;

// Things to assert against
const loginPageTitle = "Log into your account";

describe("Display login, sign up pages", () => {
  beforeEach(() => {
    cy.interceptApiAuthTestWithFailureResponse();
    cy.interceptApiUserDataWithFailureResponse();
    cy.visit("/login");
  });

  it("Enter email and click button", () => {
    cy.get("#email").type(email);
    cy.contains("Continue").click();
    cy.contains(email);
  });

  it("Navigate to sign up page and return to login", () => {
    cy.contains("Sign up").click();
    cy.log(cy.url());
    cy.contains("Login").click();
    cy.contains(loginPageTitle);
  });
});
