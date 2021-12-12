describe("Should book an interview", ()=>{

  beforeEach(()=>{
    cy.request("GET",`/api/debug/reset`)
    cy.visit("/");
    cy.contains("li", "Monday")
  })

  it("Book an interview on Monday", ()=>{
   
    cy.contains("li", "Monday")
      .click()
      .should("have.class", "day-list__item--selected")
    
    cy.get("[alt=Add]")
    .first()
    .click()
    
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    .should("have.value","Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']")
    .click()

    cy.contains("button", "Save")
      .click()

    cy.contains(".appointment__card--show","Lydia Miller-Jones")
    cy.contains(".appointment__card--show","Sylvia Palmer")

  

  })

  it("Should edit an already made appointment", ()=>{
    cy.contains("li", "Monday")
      .click()
      .should("have.class", "day-list__item--selected")
    
    cy.get("[alt=Add]")
    .first()
    .click()
    
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    .should("have.value","Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']")
    .click()

    cy.contains("button", "Save")
      .click()

    cy.contains(".appointment__card--show","Lydia Miller-Jones")
    cy.contains(".appointment__card--show","Sylvia Palmer")

    cy.contains("main","Lydia Miller-Jones")
      .find("[alt=Edit]")
      .click({force:true})

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click()
    
    cy.contains("button", "Save")
      .click()

      cy.contains(".appointment__card--show","Lydia Miller-Jones")
      cy.contains(".appointment__card--show","Tori Malcolm")

  })

  it("Should cancel an appointment",()=>{
    cy.contains("main","Archie Cohen")
    .find("[alt=Delete]")
    .click({force:true})

  cy.contains("button", "Confirm")
    .click()

  cy.contains("Saving")

  cy.get("Saving").should("not.exist")

  cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist")


  })
})
