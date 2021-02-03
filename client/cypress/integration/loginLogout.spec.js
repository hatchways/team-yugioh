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

  it("Should be able to enter email and click continue button", () => {
    cy.get("#email").type(email);
    cy.contains("Continue").click();
    cy.contains(email);
  });

  it("Should be able to navigate to sign up page and return to login", () => {
    cy.contains("Sign up").click();
    cy.url().should("equal", `${baseUrl}/signup`);
    cy.contains("Login").click();
    cy.contains(loginPageTitle);
  });
});

describe("Unauthenticated page ", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithFailureResponse();
    cy.interceptUserDataWithFailureResponse();
  });

  it("Should be redirected to login page", () => {
    cy.visit("/home");
    cy.get(loginPageTitle);
  });
});

describe("Authenticated and visiting root page", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithSuccessResponse();
    cy.interceptUserDataWithSuccessResponse();
  });

  it("Should be redirect to home page", () => {
    cy.visit("/");
    cy.contains("Event Types");
  });
});

describe("Log out the app", () => {
  beforeEach(() => {
    cy.interceptAuthTestWithSuccessResponse();
    cy.interceptUserDataWithSuccessResponse();
    cy.visit("/");
    cy.get("[data-cy=userMenu]").click();
    cy.contains("Logout").click();
  });

  it("Should be redirected to login page", () => {
    cy.contains(loginPageTitle);
  });
});
