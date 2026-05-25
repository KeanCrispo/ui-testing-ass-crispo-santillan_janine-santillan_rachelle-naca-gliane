// Ignore demo-site errors from OrangeHRM itself
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('OrangeHRM UI Testing', () => {

  beforeEach(() => {

    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )

    // Wait until login page loads
    cy.get('input[name="username"]', { timeout: 15000 })
      .should('be.visible')

  })


  // TEST CASE 1
  // Valid Login
  it('Valid Login', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/dashboard')

  })


  // TEST CASE 2
  // Invalid Login
  it('Invalid Login', () => {

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('WrongPass')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials',
      { timeout: 10000 })
      .should('be.visible')

  })


  // TEST CASE 3
  // User Action: Search employee in PIM
  it('User Action Search Employee', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/dashboard')

    cy.contains('PIM')
      .click()

    cy.url()
      .should('include', '/pim')

    cy.get('.oxd-input')
      .eq(1)
      .type('Linda')

    cy.contains('Search')
      .click()

    cy.contains('Records Found',
      { timeout:10000 })
      .should('exist')

  })


  // TEST CASE 4
  // Logout
  it('Logout', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include','/dashboard')

    cy.get('.oxd-userdropdown-name',
      { timeout:15000 })
      .should('be.visible')
      .click()

    cy.contains('Logout')
      .should('be.visible')
      .click()

    cy.url({
      timeout:15000
    }).should('include',
      '/auth/login')

  })

})