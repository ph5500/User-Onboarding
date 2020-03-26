describe('Test our inputs and submit our form', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/');
    });
    it('add text to inputs and submit form', function () {
        cy.get('input[name="name"]')
            .type('Phil')
            .should("have.value", "Phil");
        cy.get("input[name='email']")
            .type("phil@yahoo.com")
            .should("have.value", "phil@yahoo.com");
        cy.get("input[name='password']")
            .type("menshay55")
        cy.get("textarea")
            .type("I want to help people!")
        cy.get("#positions")
            .select("Head Coach")
            .should("have.value", "Head Coach");
        cy.get("[type='checkbox']")
            .check()
            .should('be.checked');
        cy.get("button").click();

    });
});