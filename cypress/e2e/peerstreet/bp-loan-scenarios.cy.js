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

    //добавить изменение очком и спреда
    it('should update the rate in the Peersuite Settings', () => {
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

    it('should display rates for the borrower (Residential Bridge)', () => {
        cy.visit(`${borrowerPortalStaging}/borrowers/loan-scenarios`);

        cy.createResidentialBridgeLoan();

        cy.get('tr', { timeout: 15000 }).its('length').should('be.gt', 1)
    })

    it('should display rates for the borrower (Residential for Rent)', () => {
        cy.visit(`${borrowerPortalStaging}/borrowers/loan-scenarios`);

        cy.createResidentialForRentLoan();

        cy.get('tr', { timeout: 15000 }).its('length').should('be.gt', 1)
    })

    //добавить текста для Request Recieved Screen
    it('should update the Request Recieved Screen in the Peersuite Settings', () => {
        cy.visit(`${lenderPortalStaging}/users/sign_in`, { failOnStatusCode: false });
        cy.get('#user_email').type(lender.email);
        cy.get('#user_password').type(lender.password);
        cy.get('input[name="commit"]').click();
        cy.log('the lender is authorized');

        cy.visit(`${lenderPortalStaging}/peersuite_settings/rates`)
        cy.get('input[name="program[residential_bridge][show_rates]"]', { timeout: 15000 }).last().click();
        cy.log('the display of rates for Residential Bridge is set');
        cy.get('input[name="program[residential_rental_long_term][show_rates]"]', { timeout: 15000 }).last().click()
        cy.log('the display of rates for Residential for Rent is set');
        cy.get('button[type="button"]').click({ multiple: true, force: true });
        cy.log('settings saved');
    })

})