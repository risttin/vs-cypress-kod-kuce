/// <reference types="Cypress" />

import { loginPage } from '../page_objects/loginPage';
import { deleteBoardPage } from '../page_objects/deleteBoardPage';
import { boardId } from '../../boardData.json'
import { boardTitle } from '../../boardData.json'
import { orgId } from '../../boardData.json'

describe('Delete Board Test', () => {

    const email = Cypress.env('EXTERNAL_EMAIL');
    const password = Cypress.env('EXTERNAL_PASSWORD');

    before('Login Data', () => {
        cy.visit('/');
        loginPage.login(email, password);
    })

    it('Delete a Board', () => {

        cy.url().should('include', '/my-organizations');
        
        cy.intercept({
            method: 'DELETE',
            url: Cypress.env('API_BASE_URL') + '/boards/' + JSON.stringify(boardId)
          }).as('deleteBoard');  

        deleteBoardPage.deleteBoard();
        
        cy.wait('@deleteBoard').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.body.name).have.string(boardTitle);
          })
      
          cy.url().should('include', '/organizations/' + orgId + '/boards');
          deleteBoardPage.firstBoard.should('not.exist');

    })
})
