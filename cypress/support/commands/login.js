Cypress.Commands.add('login', (username, password) => {
  username = username || 'test'
  password = password || 'secret'

  cy.session(
    username,
    () => {
      let log = Cypress.log({
        name: 'login',
        message: [username],
        consoleProps: { username, password },
      })

      const nolog = { log: false }

      // Do the login
      cy.visit('/login', nolog)
      cy.get('#id_login', nolog).type(username, nolog)
      cy.get('#id_password', nolog).type(password, nolog)
      cy.get(':submit', nolog)
        .click(nolog)
        .then(() => {
          log.snapshot().end()
        })
    },
    { cacheAcrossSpecs: true }
  )
})
