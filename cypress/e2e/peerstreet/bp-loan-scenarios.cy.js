import { lender } from '../../../credentials';
import { lenderPortalStaging } from '../../../env';
import { borrowerPortalStaging } from '../../../env'

describe('Regression test for creating loan scenarios', () => {

    /*beforeEach(() => {
        ####
    })*/

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
   
    it('should update the rate and display them for the borrower', () => {
        cy.visit(`${lenderPortalStaging}/users/sign_in`, { failOnStatusCode: false });
        cy.get('#user_email').type(lender.email);
        cy.get('#user_password').type(lender.password);
        cy.get('input[name="commit"]').click();
        cy.log('the lender is authorized');

        cy.visit(`${lenderPortalStaging}/peersuite_settings/rates`)
        cy.get('input[name="program[residential_bridge][show_rates]"]', { timeout: 15000 }).first().click();
        cy.log('the display of rates for Residential Bridge is set');
        cy.get('input[name="program[residential_rental_long_term][show_rates]"]', { timeout: 15000 }).first().click()
        cy.log('the display of rates for Residential for Rent is set');
        cy.get('button[type="button"]').click({ multiple: true, force: true });
        cy.log('settings saved');        
    })

    it('should display rates for the borrower', () => {
        cy.visit(`${borrowerPortalStaging}/borrowers/loan-scenarios`);

        cy.get('div').contains('Residential Bridge', { timeout: 15000 }).click();
        cy.get('button').contains('Next').click();
        cy.get('div').contains('To finance an acquisition').click();
        cy.get('button').contains('Next').click();
        cy.get('#as_is_valuation').type('1200000');
        cy.get('#down_payment').type('250000');
        cy.get('#original_term').type('12');
        cy.get('button').contains('Next').click();
        cy.get('#zip_code').type('11111');
        cy.get('button').contains('Next').click();
        cy.get('div').contains('No').click();
        cy.get('button').contains('Next').click();
        cy.get('div').contains('760+').click();
        cy.get('button').contains('Next').click();
        cy.get('div').contains('6 or more').click();
        cy.get('button').contains('Next').click();
        cy.get('div').contains('As soon as possible').click();
        cy.get('button').contains('Next').click();
        cy.get('#first_name').type('qa');
        cy.get('#last_name').type('qa');
        cy.get('#phone').type('1111112222');
        cy.get('#email').type('qa@qa.qa');
        cy.get('button').contains('Next').click();

        cy.get('input[name="rate"]', { timeout: 15000 }).its('length').should('be.gte', 1)
    })
    
})