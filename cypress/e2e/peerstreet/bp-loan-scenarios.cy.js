import { lender } from '../../../credentials';

describe('Regression test for creating loan scenarios', () => {

    /*beforeEach(() => {
        ####
    })*/

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
   
    it('should update the rate', () => {
        cy.visit('https://peerstreet:bfbd2457@lenders.peerstreet-staging.com/users/sign_in', { failOnStatusCode: false });
        cy.get('#user_email').type(lender.email);
        cy.get('#user_password').type(lender.password);
        cy.get('input[name="commit"]').click();
        cy.visit('https://peerstreet:bfbd2457@lenders.peerstreet-staging.com/peersuite_settings/rates')

        cy.get('input[name="program[residential_bridge][show_rates]"]', { timeout: 15000 }).first().click();

        cy.get('input[name="program[residential_rental_long_term][show_rates]"]', { timeout: 15000 }).first().click()
    })
    
})