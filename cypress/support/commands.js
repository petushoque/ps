import { borrower } from '../../credentials'

Cypress.Commands.add('getHydraBorrowerCookie', () => {
  const hydraUrl = 'https://lenders-co.auth.us-west-2.amazoncognito.com/login?client_id=1stb6mkb03ce8megforcd3rdis&redirect_uri=https%3A%2F%2Flenders-co.peersuite-staging.io%2Fauth%2Fapi%2Ftenant%2Faccess_code%2Flenders-co&response_type=code&scope=email+openid+profile&state=https%253A%252F%252Flenders-co.peersuite-staging.io%252Fborrowers-ch172478%252F'//Cypress.env('HYDRA_LOGIN_STAGING_URL')
  const username = borrower.email
  const password = borrower.password

  cy.log('LOGGING IN THROUGH HYDRA BORROWER STEP 1/3')
  cy.request(hydraUrl).then((req) => {
    const lines = req.body.split('\n')
    const line_with_csrf = lines.filter((line) => line.includes('_csrf'))[0].split('"')
    const csrf = line_with_csrf[line_with_csrf.length - 2]

    return csrf
  }).then((csrf) => {
    cy.log('LOGGING IN THROUGH HYDRA BORROWER STEP 2/3')
    cy.request({
      url: hydraUrl,
      method: 'POST',
      body: {
        _csrf: csrf,
        username,
        password,
        signInSubmitButton: 'Sign in',
      },
      failOnStatusCode: false,
      followRedirect: false,
      form: true,
    }).then((resp) => {
      cy.log('LOGGING IN THROUGH HYDRA BORROWER STEP 3/3')
      cy.request({
        url: resp.headers['location'],
        method: 'GET',
        failOnStatusCode: false,
        followRedirect: false,
      })
    })
  })

  cy.log('HYDRA BORROWER AUTHENTICATION COMPLETE')
})

Cypress.Commands.add('createResidentialBridgeLoan', () => {
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
})

Cypress.Commands.add('createResidentialForRentLoan', () => {
  cy.get('div').contains('Residential for Rent', { timeout: 15000 }).click();
  cy.get('button').contains('Next').click();
  cy.get('div').contains('To finance an acquisition').click();
  cy.get('button').contains('Next').click();
  cy.get('#zip_code').type('22222');
  cy.get('#property_type').select('Single Family Residental (SFR)');
  cy.get('#purchase_price').type('1150000');
  cy.get('#estimated_value').type('1500000');
  cy.get('button').contains('Next').click();
  cy.get('#annual_tax').type('9100');
  cy.get('#annual_insurance').type('845');
  cy.get('#monthly_hoa_dues').type('100');
  cy.get('button').contains('Next').click();
  cy.get('input[name = "property_leased"]').first().click( {force: true} );
  cy.get('#monthly_rent').type('5555');
  cy.get('input[name = "professionally_managed"]').first().click( {force: true} );cy.get('input[name = "management_experience"]').first().click( {force: true} );
  cy.get('button').contains('Next').click();
  cy.get('#residency').select('US Citizen');
  cy.get(`input[value = individual]`).click( {force: true} );
  cy.get('button').contains('Next').click();
  cy.get('div').contains('760+').click();
  cy.get('button').contains('Next').click();
  cy.get('div').contains('6 or more').click();
  cy.get('button').contains('Next').click();
  cy.get('div').contains('As soon as possible').click();
  cy.get('button').contains('Next').click();
  cy.get('#first_name').type('qa');
  cy.get('#last_name').type('qa');
  cy.get('#phone').type('2222223333');
  cy.get('#email').type('qa@qa.qa');
  cy.get('button').contains('Next').click();
})