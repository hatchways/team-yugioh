const baseUrl = Cypress.config().baseUrl;

Cypress.Commands.add("interceptAuthTestWithFailureResponse", () => {
  // Effectively stubbing the failure response in auth.js middleware
  cy.intercept(`${baseUrl}/api/authentication/test`, { statusCode: 401 });
});

Cypress.Commands.add("interceptAuthTestWithSuccessResponse", () => {
  // Effectively stubbing the failure response in auth.js middleware
  cy.intercept(`${baseUrl}/api/authentication/test`, { statusCode: 200 });
});

Cypress.Commands.add("interceptUserDataWithFailureResponse", () => {
  cy.intercept(`${baseUrl}/api/user/data`, { statusCode: 401 });
});
