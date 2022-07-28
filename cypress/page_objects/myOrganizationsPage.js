/// <reference types="Cypress" />

class MyOrganizationsPage {
    
    get siteLogo() {
        return cy.get('.vs-c-site-sign');
    }

    get orgCard() {
        return cy.get('.vs-c-my-organization');
    }

    get modalWindow() {
        return cy.get('.vs-c-modal');
    }

    get actionButton() {
        return this.modalWindow.find('button').last();
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
