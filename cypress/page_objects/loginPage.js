/// <reference types="Cypress" />

class LoginPage {

    get emailInput() {
        return cy.get('input').first();
    }

    get passwordInput() {
        return cy.get('input').eq(1);
    }

    get submitButton() {
        return cy.get('button').first();
    }

    login(email, password) {
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.submitButton.click()
    }
}

export const loginPage = new LoginPage();
