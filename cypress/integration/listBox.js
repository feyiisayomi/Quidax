import {Selector} from "../fixtures/ElementMapper"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

describe("Given I am on https://demo.seleniumeasy.com", function () {
    beforeEach(function () {
        // let cyEnv = Cypress.env();
        // Cypress.config('baseUrl', cyEnv.baseUrl);
        // cy.visit(cyEnv.baseUrl);
        cy.visit("https://demo.seleniumeasy.com/");
        cy.wait(5000);
        cy.get(Selector.AdvertCLoseBtn).then($advert => {
            if ($advert.is(':visible')){
                cy.get(Selector.AdvertCLoseBtn).click();
            }

            cy.get(Selector.ListboxMenu).scrollIntoView();
            cy.get(Selector.ListboxMenu).click();
            cy.get(Selector.JQueryListBoxMenu).click();
        })


    });

    //Download and verify File
    it("I should be able to pick any value from list and Add to other list ", function () {
        cy.get(Selector.ListData).select('Alice')
        cy.get(Selector.AddBtn).click();
        cy.get(Selector.ListResult).children('option').should('have.attr','data-id','3');
    })

    it("I should be able to select multiple list values and add to other list ", function () {
        cy.get(Selector.ListData).select('Alice')
        cy.get(Selector.AddBtn).click();
        cy.get(Selector.ListData).select('Isis')
        cy.get(Selector.AddBtn).click();
        cy.get(Selector.ListResult).select(0).should('contain', 'Alice')
        cy.get(Selector.ListResult).select(1).should('contain', 'Isis')
        //cy.get(Selector.ListResult).children('option').each((opt => cy.log(opt.attr("data-id"))))
    })

    it("I should be able to pick click Add all to add all list values to other list ", function () {
        cy.get(Selector.AddAllBtn).click();
        cy.get(Selector.ListResult).children('option').each((opt => cy.log(opt.attr("data-id")))).invoke('text').then($List =>{
            cy.log($List.toString())
        });
    })


})