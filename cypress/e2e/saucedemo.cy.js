describe('OrangeHRM UI Testing', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // wait for page load
    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
  })


  // Test Case 1: Valid Login
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


  // Test Case 2: Invalid Login
  it('Invalid Login', () => {

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('WrongPass')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

  })


  // Test Case 3: User Action (Search Employee)
  it('Search Employee', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('PIM')
      .click()

    cy.get('.oxd-input')
      .eq(1)
      .type('Linda')

    cy.contains('Search')
      .click()

    cy.contains('Records Found')
      .should('exist')

  })


  // Test Case 4: Logout
  it('Logout', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.oxd-userdropdown-name')
      .click()

    cy.contains('Logout')
      .click()

    cy.url()
      .should('include','/auth/login')

  })

})