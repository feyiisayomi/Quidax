import {Selector} from "../fixtures/ElementMapper"
let value_a;
value_a = 7;

let value_b;
value_b = 9;

let Total;
Total=value_a+value_b;

let Message = "Hey, My name is Feyi.";

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

            cy.get(Selector.InputFormMenu).click();
            cy.get(Selector.SimpleFormDemoMenu).click();
        })


    });

    //Single Input
    it("I should be able to enter your message and message entered should be displayed when user clicks on 'Show Message' button", function () {
        //I enter a message
        cy.get(Selector.SingleInputMsgField).type(Message);
        //I Click Show message button
        cy.get(Selector.SingleInputBtn).click();
        //The message i entered should be displayed to me
        cy.get(Selector.SingleInputMsgDisplay).contains(Message);
    })
    //Two Input
    it("I should be able to enter value for a and value for b, sum of a and b should be displayed when you click 'Get Total' button", function () {
        //I scroll into two input section
        cy.get(Selector.TwoInputSection).scrollIntoView();
        //I enter variable a
        cy.get(Selector.VariableAField).type(value_a);
        //I enter variable b
        cy.get(Selector.VariableBField).type(value_b);
        //I click get Total button
        cy.get(Selector.TwoInputBtn).click();
        //sum of variable a and b should be displayed
        cy.get(Selector.TwoInputTotal).contains(Total)
    })



})