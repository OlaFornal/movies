/* eslint-disable */

describe('Movie Browser - homepage', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays header, search and menu items', () => {
        cy.get('.header h1').should('have.text', 'Movie browser')
        cy.get('.mainMenu .mainMenuItem').should('have.length', 5)
    })
})
