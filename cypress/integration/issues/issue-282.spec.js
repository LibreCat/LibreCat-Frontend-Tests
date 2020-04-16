// Test for https://github.com/LibreCat/LibreCat/issues/282

import { loremIpsum } from 'lorem-ipsum'

describe('Issue #282: Deleted records', function () {
  it('should not be visible to anyone', function () {
    cy.login()

    cy.visit('/librecat/record/new?type=book')

    let title = loremIpsum({ count: 1, unit: 'sentences' })
    cy.get('#id_title').type(title, { delay: 1 })
    cy.get('#id_year').type(new Date().getFullYear())
    cy.get(':submit').first().click()

    cy.contains('a', title).then(function ($a) {
      let url = $a.prop('href')
      let id = parseInt(url.match(/\/librecat\/record\/edit\/(\d+)$/)[1])

      cy.login('einstein', 'einstein')
      cy.deleteRecord(id)

      cy.login()
      cy.visit('/librecat/search')

      // Make sure we are logged on correctly (as regular user)
      cy.get('a:contains("All Publications")').should('not.exist')
      cy.get('a[href*="/librecat/search/admin"]').should('not.exist')
      cy.get('a:contains("Publications")')
        .should('be.visible')
        .should('have.attr', 'href')
        .should('match', /\/librecat\/search$/)

      // Actual test
      cy.contains('LibreCat-ID: ' + id).should('not.exist')
      cy.contains(title).should('not.exist')
    })
  })
})
