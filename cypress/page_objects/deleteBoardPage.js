/// <reference types="Cypress" />

import { myOrganizationsPage } from '../page_objects/myOrganizationsPage';
import { createBoardPage } from '../page_objects/createBoardPage';

class DeleteBoardPage {
    
    get firstBoard() {
        return cy.get('.vs-c-organization-boards__item');
    }

    get configButton() {
        return cy.get('.vs-c-site-logo').last();
    }

    get deleteButton() {
        return cy.get('button').eq(9);
    }

    deleteBoard() {
        myOrganizationsPage.orgCard.eq(-3).click();
        createBoardPage.actionButton.click();
        this.firstBoard.click();
        createBoardPage.boardTitleHeader.should('be.visible');
        this.configButton.click();
        createBoardPage.boardTitleHeader.should('be.visible');
        cy.wait(1000);
        this.deleteButton.click();
        createBoardPage.actionButton.click();
    }
}

export const deleteBoardPage = new DeleteBoardPage();
