const baseUrl = Cypress.config().baseUrl;

Cypress.Commands.add("interceptApiAuthTestWithFailureResponse", () => {
  // Effectively stubbing the failure response in auth.js middleware
  cy.intercept(`${baseUrl}/api/authentication/test`, { statusCode: 401 });
});

Cypress.Commands.add("interceptApiUserDataWithFailureResponse", () => {
  cy.intercept(`${baseUrl}/api/user/data`, { statusCode: 401 });
});
