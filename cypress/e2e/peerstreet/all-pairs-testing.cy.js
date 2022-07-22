import { user } from '../../../credentials';
import { borrowerPortal } from '../../../env';
import { userScenarios } from '../../../user-scenarios';

const random = require('random-name');
const randomEmail = require('random-email');
const createMobilePhoneNumber = require("random-mobile-numbers");

function fillOutTheLeadForm(loanDetails) {
    fillOutTheLoanInfo(loanDetails);
    fillOutTheBorrowerInfo(loanDetails);
    fillOutTheContacts();
    selectRate();
}

function fillOutTheLoanInfo(loanDetails) {
    cy.get('div').contains(loanDetails.loanType, { timeout: 15000 }).click();
    cy.get('button').contains('Next').click();
    cy.get('div').contains(loanDetails.purpose).click();
    cy.get('button').contains('Next').click();

    if (loanDetails.loanType == 'Residential Bridge') {

        if (loanDetails.purpose == 'To finance an acquisition') {
            cy.get('#as_is_valuation').type(loanDetails.purchasePrice);
            cy.get('#down_payment').type(loanDetails.downPayment);
            cy.get('#original_term').type(loanDetails.months);
            cy.get('button').contains('Next').click();
            cy.get('#zip_code').type(loanDetails.zipCode);
            cy.get('button').contains('Next').click();
            cy.get('div').contains(loanDetails.isRhab).click();
            cy.get('button').contains('Next').click();
            if (loanDetails.isRhab == 'Yes') {                
                cy.get('#estimated_construction_cost').type(loanDetails.rehabBudget);
                cy.get('button').contains('Next').click();
                cy.get('#arv').type(loanDetails.afterRepairValue);
                cy.get('button').contains('Next').click();
            }
        }
        //For a cash-out refinance && To refinance my mortgage
        else {
            cy.get('#purchase_date').click();
            cy.get('a').contains('1').click();
            cy.get('#as_is_valuation').type(loanDetails.purchasePrice);
            cy.get('#loan_payoff_amount').type(loanDetails.loanPayoffAmount);
            cy.get('button').contains('Next').click();
            cy.get('#zip_code').type(loanDetails.zipCode);
            cy.get('button').contains('Next').click();
            cy.get('div').contains(loanDetails.isRhab).click();
            cy.get('button').contains('Next').click();
            if (loanDetails.isRhab == 'Yes') {                
                cy.get('#estimated_construction_cost').type(loanDetails.rehabBudget);
                cy.get('button').contains('Next').click();
                cy.get('#arv').type(loanDetails.afterRepairValue);
                cy.get('button').contains('Next').click();
            }
        }
    }
    //Residential for Rent
    else {
        cy.get('#zip_code').type(loanDetails.zipCode);
        cy.get('#property_type').select(loanDetails.kindOfProperty);
        cy.get('#purchase_price').type(loanDetails.purchasePrice);
        cy.get('#estimated_value').type(loanDetails.estimatedPropertyValue);
        cy.get('button').contains('Next').click();
        cy.get('#annual_tax').type(loanDetails.annualTax);
        cy.get('#annual_insurance').type(loanDetails.annualInsurance);
        cy.get('#monthly_hoa_dues').type(loanDetails.monthlyHoaDues);
        cy.get('button').contains('Next').click();
        if (loanDetails.isLeaseInPlace == 'Yes') {
            cy.get('input[name = "property_leased"]').first().click( {force: true} );
        }
        else {
            cy.get('input[name = "property_leased"]').last().click( {force: true} );
        }
        cy.get('#monthly_rent').type(loanDetails.monthlyRent);
        if (loanDetails.usingManager == 'Yes') {
            cy.get('input[name = "professionally_managed"]').first().click( {force: true} );
        }
        else {
            cy.get('input[name = "professionally_managed"]').last().click( {force: true} );
        }
        if (loanDetails.twoYearsExperience == 'Yes') {
            cy.get('input[name = "management_experience"]').first().click( {force: true} );
        }
        else {
            cy.get('input[name = "management_experience"]').last().click( {force: true} );
        }
        cy.get('button').contains('Next').click();
        cy.get('#residency').select(loanDetails.residencyStatus);
        cy.get(`input[value = ${loanDetails.typeOfPurchaser}]`).click( {force: true} );
        cy.get('button').contains('Next').click();
    }

}

function fillOutTheBorrowerInfo(borrowerInfo) {
    cy.get('div').contains(borrowerInfo.ficoScore).click();
    cy.get('button').contains('Next').click();
    cy.get('div').contains(borrowerInfo.trackRecord).click();
    cy.get('button').contains('Next').click();
    cy.get('div').contains(borrowerInfo.closingTimeframe).click();
    cy.get('button').contains('Next').click();
}

function fillOutTheContacts() {
    cy.get('#first_name').type(random.first());
    cy.get('#last_name').type(random.last());
    cy.get('#phone').type(createMobilePhoneNumber('USA'));
    cy.get('#email').type(randomEmail({domain: 'peerstreet.com'}));
    cy.get('button').contains('Next').click();
}

function selectRate() {
    cy.get('input[name = "rate"]', { timeout: 15000 }).first().click( {force: true} );
    cy.get('button').contains('Start your Application').click()
}

describe('', () => {
    beforeEach(() => {
        cy.visit(`${borrowerPortal}/borrowers/loan-scenarios`);
    })
   
    it('should create a lead: Residential Bridge - To finance an acquisition', () => {
        fillOutTheLeadForm(userScenarios[0])
    })

    it('should create a lead: Residential Bridge - For a cash-out refinance', () => {
        fillOutTheLeadForm(userScenarios[1])
    })

    it('should create a lead: Residential Bridge - To refinance my mortgage', () => {
        fillOutTheLeadForm(userScenarios[2])
    })

    it('should create a lead: Residential for Rent - To finance an acquisition', () => {
        fillOutTheLeadForm(userScenarios[3])
    })

    it('should create a lead: Residential for Rent - For a cash-out refinance', () => {
        fillOutTheLeadForm(userScenarios[4])
    })

    it('should create a lead: Residential for Rent - To refinance my mortgage', () => {
        fillOutTheLeadForm(userScenarios[5])
    })
})