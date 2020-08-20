describe('The file upload function', function () {
  beforeEach(function () {
    cy.login()
  })

  it('should be able to upload a file', function () {
    cy.visit('/librecat/record/new?type=book')

    cy.server()
    cy.route({
      url: '/librecat/upload',
      method: 'POST',
      response: {
        success: 1,
        tempid: 'abc123',
        access_level: 'abc234',
        date_updated: 'abc345',
        creator: 'abc456',
        relation: 'abc567',
      },
    }).as('upload')

    cy.get('.dz-file-preview').should('have.length', 0)

    cy.get('#licenses').as('licenses').should('exist').should('not.be.visible')

    cy.get('#has_accepted_license_alert')
      .as('license-alert')
      .should('have.class', 'alert-info')
      .should('not.have.class', 'alert-danger')

    cy.fixture('logo.png')
      .as('logo')
      .get('#uploadFiles.dropzone')
      .then(function ($dz) {
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
        blob.name = 'logo.png'

        let dropzone = $dz.prop('dropzone')
        dropzone.addFile(blob)

        cy.log('Added file logo.png')
      })

    cy.wait('@upload')

    cy.get('.dz-file-preview').should('have.length', 1)

    cy.get('#filename_abc123 strong').prop('innerText').should('eq', 'logo.png')

    cy.get('#access_abc123').should('have.text', 'abc234')
    cy.get('#updated_abc123').should('have.text', 'abc345')
    cy.get('#creator_abc123').should('have.text', 'abc456')
    cy.get('#relation_abc123').should('have.text', 'abc567')

    cy.get('@licenses').should('be.visible')

    cy.get('@license-alert')
      .should('not.have.class', 'alert-info')
      .should('have.class', 'alert-danger')
  })
})
