describe('Cypress Studio Demo', () => {});



/* ==== Test Created with Cypress Studio ==== */
it('Full user journey test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.get('.bg-red-500 > a').click();
  cy.get(':nth-child(1) > .shadow').clear('V');
  cy.get(':nth-child(1) > .shadow').type('Vincent');
  cy.get('.flex > :nth-child(2) > .shadow').clear();
  cy.get('.flex > :nth-child(2) > .shadow').type('Kioko');
  cy.get('.bg-white > :nth-child(2) > .shadow').clear();
  cy.get('.bg-white > :nth-child(2) > .shadow').type('0703618918');
  cy.get(':nth-child(3) > .shadow').clear();
  cy.get(':nth-child(3) > .shadow').type('Nairobi');
  cy.get(':nth-child(4) > .shadow').clear();
  cy.get(':nth-child(4) > .shadow').type('kioko@email.com');
  cy.get(':nth-child(5) > .shadow').clear();
  cy.get(':nth-child(5) > .shadow').type('kioko12');
  cy.get(':nth-child(6) > .shadow').clear('k');
  cy.get(':nth-child(6) > .shadow').type('kioko12');
  cy.get('.py-3').click();
  cy.get(':nth-child(2) > .ml-2\\.5').click();
  cy.get('ul > :nth-child(3)').click();
  cy.get('.border > a').click();
  cy.get('[name="firstname"]').clear('V');
  cy.get('[name="firstname"]').type('Vin');
  cy.get('[name="lastname"]').clear();
  cy.get('[name="lastname"]').type('Chox');
  cy.get('[type="number"]').clear();
  cy.get('[type="number"]').type('0784344');
  cy.get('[name="address"]').clear('M');
  cy.get('[name="address"]').type('Kitui');
  cy.get('[type="email"]').clear('v');
  cy.get('[type="email"]').type('vin@email.com');
  cy.get('[name="username"]').clear('k');
  cy.get('[name="username"]').type('Fincent');
  cy.get('[type="submit"]').click();
  cy.get(':nth-child(5) > .ml-2\\.5').click();
  cy.get(':nth-child(3) > .ml-2\\.5').click();
  cy.get('.border-y-2 > .bg-red-500 > a').click();
  cy.get('ul > :nth-child(2)').click();
  cy.get(':nth-child(2) > .ml-2\\.5').click();
  cy.get(':nth-child(6) > :nth-child(6) > :nth-child(2) > a > [data-testid="VisibilityOutlinedIcon"] > path').click();
  cy.get(':nth-child(1) > .flex > .bg-red-500 > a').click();
  cy.get('#type').select('Salary Loan');
  cy.get(':nth-child(3) > .block').clear('3');
  cy.get(':nth-child(3) > .block').type('3000');
  cy.get(':nth-child(4) > .block').clear('3');
  cy.get(':nth-child(4) > .block').type('3000');
  cy.get(':nth-child(5) > .block').clear('2');
  cy.get(':nth-child(5) > .block').type('2');
  cy.get('#terms').select('3');
  cy.get(':nth-child(7) > .block').click();
  cy.get(':nth-child(8) > .block').click();
  cy.get('.w-auto').click();
  cy.get('ul > :nth-child(3) > .ml-2\\.5').click();
  cy.get(':nth-child(21) > :nth-child(10) > :nth-child(2) > a > [data-testid="EditIcon"]').click();
  cy.get('#status').select('Approved');
  cy.get('button.text-center').click();
  cy.get(':nth-child(2) > .ml-2\\.5').click();
  cy.get(':nth-child(6) > :nth-child(6) > :nth-child(2) > a > [data-testid="VisibilityOutlinedIcon"] > path').click();
  cy.get('tr > .flex > .px-4').click();
  cy.get('tr > .flex > .px-4 > a').click();
  cy.get('.grid > :nth-child(2) > .block').click();
  cy.get('.grid > :nth-child(2) > .block').click();
  cy.get(':nth-child(3) > .block').clear('2');
  cy.get(':nth-child(3) > .block').type('2000');
  cy.get(':nth-child(4) > .block').clear('K');
  cy.get(':nth-child(4) > .block').type('Kioko');
  cy.get('#method').select('ONLINE BANK');
  cy.get(':nth-child(7) > .w-auto').click();
  cy.get('ul > :nth-child(4) > .ml-2\\.5').click();
  cy.get(':nth-child(2) > .ml-2\\.5').click();
  cy.get(':nth-child(6) > :nth-child(6) > :nth-child(2) > a > [data-testid="VisibilityOutlinedIcon"] > path').click();
  cy.get('[data-testid="EditIcon"] > path').click();
  cy.get(':nth-child(4) > .ml-2\\.5').click();
  cy.get(':nth-child(2) > .ml-2\\.5').click();
  cy.get(':nth-child(6) > :nth-child(6) > :nth-child(2) > a > [data-testid="VisibilityOutlinedIcon"]').click();
  cy.get('tr > .flex > .px-4 > a').click();
  cy.get(':nth-child(3) > .block').clear('1');
  cy.get(':nth-child(3) > .block').type('1000');
  cy.get(':nth-child(5) > .block').click();
  cy.get(':nth-child(5) > .block').click();
  cy.get(':nth-child(5) > .block').click();
  cy.get(':nth-child(5) > .block').clear('0');
  cy.get(':nth-child(5) > .block').type('0');
  cy.get(':nth-child(4) > .block').clear('Kioko');
  cy.get(':nth-child(4) > .block').type('Kioko');
  cy.get('.grid > :nth-child(2) > .block').click();
  cy.get('#method').select('GCASH');
  cy.get(':nth-child(7) > .w-auto').click();
  cy.get('[data-testid="EditIcon"] > path').click();
  cy.get('#status').select('Fully Paid');
  cy.get('button.text-center').click();
  cy.get(':nth-child(5) > .ml-2\\.5').click();
  cy.get(':nth-child(6) > :nth-child(6) > .flex > :nth-child(2) > [data-testid="CheckIcon"]').click();
  cy.get('#message').click();
  cy.get('.space-y-8 > .bg-red-500').click();
  /* ==== End Cypress Studio ==== */
});



