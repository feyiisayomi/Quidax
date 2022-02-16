import {Selector} from "../fixtures/ElementMapper"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});



describe("Given I am on https://demo.seleniumeasy.com", function () {
    beforeEach(function () {
        cy.visit("https://demo.seleniumeasy.com/");
        cy.wait(5000);
        cy.get(Selector.AdvertCLoseBtn).then($advert => {
            if ($advert.is(':visible')){
                cy.get(Selector.AdvertCLoseBtn).click();
            }

            cy.get(Selector.ModalMenu).scrollIntoView();
            cy.get(Selector.ModalMenu).click();
            cy.get(Selector.FileDownload).click();
        })


    });

    //Download and verify File
    it("I should be able to enter a message, generate a file that contains the message and download that file ", function () {
        //Download button should be disabled if Data field is empty
        cy.get(Selector.DataField).then($Data =>{
            if($Data.is(':empty')) {
                cy.get(Selector.GenerateFileBtn).should("be.disabled");
            }
            else{
                cy.get(Selector.GenerateFileBtn).should("not.be.disabled");
            }
        })
        //Enter message
        const Message = "Hey my name is Feyisayo";
        cy.get(Selector.DataField).type(Message);
        //Click Generate File Button
        cy.get(Selector.GenerateFileBtn).click();
        //Click Download FIle
        cy.get(Selector.DownloadLink).click();
        //Verify Download
        cy.verifyDownload('easyinfo.txt');
        cy.readFile('cypress/downloads/easyinfo.txt').should('eq', Message);

    })


})