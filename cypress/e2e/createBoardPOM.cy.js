/// <reference types="Cypress" />

import { loginPage } from '../page_objects/loginPage';
import { createBoardPage } from '../page_objects/createBoardPage';

describe('Create Board Test', () => {

    let boardTitle = 'Board';
    let boardId;
    let orgId;

    const email = Cypress.env('EXTERNAL_EMAIL');
    const password = Cypress.env('EXTERNAL_PASSWORD');

    before('Login Data', () => {
        cy.visit('/');
        loginPage.login(email, password);
    })

    it('Create a Board', () => {
        cy.url().should('include', '/my-organizations');

        cy.intercept({
            method: 'POST',
            url: Cypress.env('API_BASE_URL') + '/boards'
          }).as('createBoard');

        createBoardPage.createBoard(boardTitle);

        cy.wait('@createBoard').then(interception => {
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
            expect(interception.response.body.name).have.string(boardTitle);
            orgId = interception.response.body.organization_id;
            boardId = interception.response.body.id;
            cy.writeFile('boardData.json', {boardId, orgId, boardTitle});
          })

        createBoardPage.boardTitleHeader.should('exist')
          .and('be.visible')
          .and('have.text', boardTitle)
    })
})
