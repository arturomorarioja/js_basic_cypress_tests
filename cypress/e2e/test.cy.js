/// <reference types="Cypress" />
import { myAPI } from '../../api/my-api';

describe('template spec', () => {

    beforeEach(() => {
        cy.visit('')
    });

    it('basic usage passes', () => {
        cy.get('input[name="language"]').last().check();
        cy.get('input[type="checkbox"]').eq(1).check();
        cy.get('header > h1').contains('Cypress');
        cy.get('#btnShowText').trigger('click');
        cy.get('#text').trigger('dblclick');

        cy.get('#moreText')
            .should('exist')
            .should('be.visible')
            .should('have.attr', 'data-source', 'mySource')
            .should('have.class', 'dblClickedDiv')
            .should('have.css', 'background-color', 'rgb(255, 248, 252)');

        cy.get('#moreText').invoke('text')
            .should('equal', 'Double clicked!')
            .should('not.equal', 'Something else')
            .should('have.length', 15)
    })

    it('contextual usage passes', () => {
        cy.get('[data-cy=mainHeader').contains('Cypress');
        
        cy.get('body > main > form > button#btnShowText').as('myButton');
        cy.get('@myButton').contains('Show');

        cy.get('label').eq(2).as('thirdRadio');
        cy.get('@thirdRadio').contains('Node');
    });

    it('filtering passes', () => {
        cy.get('section > div').filter('.orange').should('have.css', 'background-color', 'rgb(255, 165, 0)');
        cy.get('section > div').not('.orange').should('have.css', 'background-color', 'rgb(238, 130, 238)');
    });

    it('then passes', () => {
        cy.log('The next log will show nothing');
        cy.log(cy.get('.line').length);

        cy.log('The next log will show the number of .line elements');
        cy.get('.line').then($line => {
            let lineLength = $line.length;
            cy.log(lineLength);
        });

        cy.log('The next log will show nothing, due to scope');
        let lineLength;
        cy.get('.line').then($line => {
            lineLength = $line.length;
        });
        cy.log(lineLength);

        // Within then(), expect() must be used instead of should()
        cy.get('#btnShowText').then($button => {
            expect($button).to.have.text('Show text');
        });
        
        // There is also a modern syntax with wrap()
        cy.get('#btnShowText').then($button => {
            cy.wrap($button).should('have.text', 'Show text');
        });
    });

    it('environment variables pass', () => {
        // Environment variable set in cypress.config.js
        cy.log(Cypress.env('userName'));

        // Environment variable set in cypress.env.json
        cy.log(Cypress.env('appName'));
    });

    it('test doubles pass', () => {
        const apiCall = new myAPI;

        cy.stub(apiCall, 'getSchool')
            .onFirstCall().returns('EK')
            .onSecondCall().returns('DTU')
            .onThirdCall().returns('ITU');

        expect(apiCall.getSchool()).to.equal('EK');
        expect(apiCall.getSchool()).to.equal('DTU');
        expect(apiCall.getSchool()).to.equal('ITU');

        // Simulation of a service being down
        cy.stub(apiCall, 'getBudget').rejects(new Error('503 Service unavailable'));
    });
});