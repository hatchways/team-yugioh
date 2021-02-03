// Environment variables
const email = Cypress.env("email");
const baseUrl = Cypress.config().baseUrl;

// Things to assert against
const loginPageTitle = "Log into your account";

describe("Display login, sign up pages", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithFailureResponse();
    cy.interceptUserDataWithFailureResponse();
    cy.visit("/login");
  });

  it("Enter email and click button", () => {
    cy.get("#email").type(email);
    cy.contains("Continue").click();
    cy.contains(email);
  });

  it("Navigate to sign up page and return to login", () => {
    cy.contains("Sign up").click();
    cy.url().should("equal", `${baseUrl}/signup`);
    cy.contains("Login").click();
    cy.contains(loginPageTitle);
  });
});

describe("Unauthenticated page returns to login", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithFailureResponse();
    cy.interceptUserDataWithFailureResponse();
  });

  it("navigate to home page", () => {
    cy.visit("/home");
  });
});

describe("Authenticated app root page", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithSuccessResponse();
  });

  it("redirect to home page", () => {
    cy.visit("/");
    cy.contains("Event Types");
  });
});
