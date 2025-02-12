describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  it('should successfully login with valid credentials', () => {
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="password-input"]').type('validpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-profile"]').should('be.visible');
  });

  it('should show error message with invalid credentials', () => {
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('should successfully logout', () => {
    // Login first
    cy.login('testuser', 'validpassword');

    // Perform logout
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-testid="login-form"]').should('be.visible');
  });
});
