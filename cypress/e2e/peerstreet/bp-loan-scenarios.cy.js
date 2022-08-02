import { lender } from '../../../credentials';
import { lenderPortalStaging } from '../../../env'

describe('Regression test for creating loan scenarios', () => {

    /*beforeEach(() => {
        ####
    })*/

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
   
    it('should update the rate', () => {
        cy.visit(`${lenderPortalStaging}/users/sign_in`, { failOnStatusCode: false });
        cy.get('#user_email').type(lender.email);
        cy.get('#user_password').type(lender.password);
        cy.get('input[name="commit"]').click();
        cy.visit(`${lenderPortalStaging}/peersuite_settings/rates`)

        cy.get('input[name="program[residential_bridge][show_rates]"]', { timeout: 15000 }).first().click();

        cy.get('input[name="program[residential_rental_long_term][show_rates]"]', { timeout: 15000 }).first().click()
    })
    
})