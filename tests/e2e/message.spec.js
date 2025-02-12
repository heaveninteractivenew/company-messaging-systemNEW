describe('Messaging System', () => {
  beforeEach(() => {
    cy.login('testuser', 'validpassword');
  });

  it('should send a message successfully', () => {
    cy.get('[data-testid="recipient-input"]').type('john.doe');
    cy.get('[data-testid="message-input"]').type('Hello, this is a test message');
    cy.get('[data-testid="send-button"]').click();

    cy.get('[data-testid="success-notification"]')
      .should('be.visible')
      .and('contain', 'Message sent successfully');
  });

  it('should display received messages', () => {
    cy.get('[data-testid="messages-list"]').should('be.visible');
    cy.get('[data-testid="message-item"]').should('have.length.at.least', 1);
  });

  it('should handle message errors gracefully', () => {
    cy.get('[data-testid="recipient-input"]').type('invalid@user');
    cy.get('[data-testid="message-input"]').type('Test message');
    cy.get('[data-testid="send-button"]').click();

    cy.get('[data-testid="error-notification"]')
      .should('be.visible')
      .and('contain', 'Failed to send message');
  });

  it('should validate empty messages', () => {
    cy.get('[data-testid="recipient-input"]').type('john.doe');
    cy.get('[data-testid="send-button"]').click();

    cy.get('[data-testid="message-input-error"]')
      .should('be.visible')
      .and('contain', 'Message cannot be empty');
  });
});
