Cypress.Commands.add('login', (username, password) => {
  username = username || 'test'
  password = password || 'secret'

  // Initiate command log
  let consoleProps = {
    username: username,
    password: password
  }

  let log = Cypress.log({
    name: 'login',
    message: [username, password],
    consoleProps: () => {
      return consoleProps
    }
  })

  const nolog = { log: false }

  // Clear the previous cookie
  cy.clearCookie('plack_session', nolog)

  // Do the login
  cy.visit('/login', nolog)
  cy.get('#id_login', nolog).type(username, nolog)
  cy.get('#id_password', nolog).type(password, nolog)
  cy.get(':submit', nolog)
    .click(nolog)
    .then(() => {
      log.snapshot().end()
    })
})
