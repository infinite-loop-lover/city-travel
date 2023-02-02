import cypress from "cypress";

describe('Verify BrowserStackHomePage', () => {
    it('Verify City home page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Home');
        cy.get('#originCity').get('input').should('be.exist');
        cy.get('#interCity').get('input').should('be.exist');
        cy.get('#destCity').get('input').should('be.exist');
        cy.get('button').should('be.disabled')
    })
    it('Verify Search Result page', () => {
        cy.visit('http://localhost:3000/searchResult');
        cy.location().should((loc) => {
            expect(loc.host).to.eq('localhost:3000')
            expect(loc.hostname).to.eq('localhost')
          })
    })

})
