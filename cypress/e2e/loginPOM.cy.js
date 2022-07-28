/// <reference types="Cypress" />

import { myOrganizationsPage } from '../page_objects/myOrganizationsPage';
import { loginPage } from '../page_objects/loginPage';

describe('Login Page Test', () => {

  const email = Cypress.env('EXTERNAL_EMAIL');
  const password = Cypress.env('EXTERNAL_PASSWORD');
  const userId = JSON.parse(window.localStorage.getItem('user_id'));
  const existingOrg = 'My Organization';
  
  before('', () => {
    cy.visit('/login');
  })

  it('Login with Valid Data', () => {
    cy.url().should('include', '/login');

    cy.intercept({
      method: 'POST',
      url: Cypress.env('API_BASE_URL') + '/login'
    }).as('login');

    loginPage.login(email, password);

    cy.wait('@login').then(interception => {
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.statusMessage).eq('OK');
      expect(interception.response.body.user.id).eq(userId);
    })

    cy.url().should('include', '/my-organizations');
    myOrganizationsPage.siteLogo.should('exist')
      .and('be.visible')
      .and('have.css', 'fill', 'rgb(78, 174, 147)')

    myOrganizationsPage.orgCard.first().find('h2').should('exist')
      .and('be.visible')
      .and('have.text', existingOrg)
  })
})
