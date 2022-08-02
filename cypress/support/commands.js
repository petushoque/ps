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