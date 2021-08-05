// Test for https://github.com/LibreCat/LibreCat/issues/305

describe('Issue #305: Language switch + login issue', function () {
  const dict = {
    de: 'Publikationen an der Universität LibreCat',
    en: 'Publications at LibreCat University',
  }

  Object.keys(dict).forEach(lang =>
    it(`should keep the current language after login (${lang})`, function () {
      cy.visit(`/set_language?lang=${lang}`)

      cy.get('h1').should('have.text', dict[lang])

      cy.visit('/login')

      cy.get('#id_login').type('test')
      cy.get('#id_password').type('secret{ENTER}')

      cy.visit('/')

      cy.get('h1').should('have.text', dict[lang])
    })
  )
})
