// Close Elementor Popups if they exist
Cypress.Commands.add('closePopup', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.dialog-close-button').length > 0) {
        cy.get('.dialog-close-button').click({ multiple: true, force: true });
      }
    });
  });
  
  // Ignore common Elementor/ResizeObserver errors so tests don't fail unnecessarily
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver') || err.message.includes('jQuery')) {
      return false;
    }
  });