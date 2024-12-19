describe('Elementor Form Testing on Laptop Viewport', () => {
    before(() => {
      // Set viewport for a laptop screen
      cy.viewport(1280, 800);
    });
  
    it('Loads the website and verifies the form is visible', () => {
        // Visit the home page
        cy.visit('https://oneofus.in/');

        // Scroll down to the form
        cy.get('#home-form').scrollIntoView();

         // Wait for the modal to appear
        cy.get('.elementor-location-popup')
            .should('be.visible') // Ensure the modal is visible
            .then(() => {
            // Close the modal
            cy.get('svg.eicon-close').click(); // Adjust selector for the close button
        });

        // Verify the modal is closed
        cy.get('.elementor-location-popup').should('not.exist');

        // Check if the form exists and is visible
        cy.get('#home-form').should('be.visible');
    });
  
    it('Fills out the form and submits it', () => {
      // Check if the form exists and is visible
      cy.get('#home-form form').should('be.visible');

      // Fill out the name field
      cy.get('#form-field-name')
        .should('be.visible')
        .type('נתנאל זקן');
  
      // Fill out the phone field
      cy.get('#form-field-message')
        .should('be.visible')
        .type('0501234567');
  
      // Fill out the email field
      cy.get('#form-field-email')
        .should('be.visible')
        .type('example@domain.com');
  
      // Ensure the acceptance checkbox is checked
      cy.get('#form-field-accept')
        .should('be.visible')
        .check();
  
      // Submit the form
      cy.get('#home-form button[type="submit"]')
        .should('contain.text', 'תקבע לנו שיחה!')
        .click();
  
      // Verify submission (Adjust based on your form's behavior)
      cy.url().should('include', '/thank-you'); // Example: Verify redirect
    });
  
    it('Validates required fields', () => {
      // Try submitting without filling required fields
      cy.get('#home-form button[type="submit"]').click();
  
      // Check if validation messages are displayed
      cy.get('#form-field-email:invalid').should('exist');
    });
  });