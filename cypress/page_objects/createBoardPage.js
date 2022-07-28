/// <reference types="Cypress" />

import { myOrganizationsPage } from '../page_objects/myOrganizationsPage';

class CreateBoardPage {
    
    get modalWindow() {
        return cy.get('.vs-c-modal');
    }

    get boardCard() {
        return cy.get('.vs-c-organization-boards__item--add-new');
    }

    get actionButton() {
        return this.modalWindow.find('button').last();
    }

    get boardTitleInput() {
        return this.modalWindow.find('input').last();
    }

    get scrumRadioButton() {
        return this.modalWindow.find('.vs-c-radio-check').first();
    }

    get boardTitleHeader() {
        return cy.get('h1').find('span').last();
    }

    createBoard(title) {
        myOrganizationsPage.orgCard.first().click();
        this.actionButton.click();
        this.boardCard.first().click();
        this.boardTitleInput.type(title);
        this.actionButton.click();
        this.scrumRadioButton.click();
        this.actionButton.click().click().click();
    }
}

export const createBoardPage = new CreateBoardPage();
