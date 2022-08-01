describe('', () => {
    beforeEach(() => {
        cy.visit(`https://lenders-co.peersuite-staging.io/borrowers-ch172478/loan-scenarios`);
    })
   
    it('...', () => {
        cy.get('div').contains('Residential Brodge', { timeout: 15000 }).click();
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

        cy.intercept(
            'POST',
            '**/graphql',
            { statusCode: 500 }
          ).as('getServerFailure')

        cy.get('button').contains('Start your Application').click();

        cy.wait('@getServerFailure')
    })
})