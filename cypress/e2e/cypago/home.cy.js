describe('Homepage Sanity Check', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Displays the Hero section and Logo', () => {
      // 1. Check Logo
      cy.get('.elementor-element-aac92ba img')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'Group-1.svg');
  
      // 2. Check Main Heading
      cy.get('.elementor-element-5c8a7b2 h1')
        .should('contain.text', 'Dedicated')
        .and('contain.text', 'Web Development');
    });
  
    it('Verifies Footer Contact Info', () => {
      cy.scrollTo('bottom');
  
      // 1. Check Address
      cy.get('.elementor-element-26a84e5')
        .should('contain.text', 'King George St 20, Jerusalem');
  
      // 2. Check Phone
      cy.get('.elementor-element-2b2cf10')
        .should('contain.text', '050-333-1728');
  
      // 3. Check Email (The selector is fixed here!)
      // The link is on the container itself
      cy.get('.elementor-element-6ee1219')
        .should('have.attr', 'href')
        .and('include', 'mailto:');
      
      // The text is inside
      cy.get('.elementor-element-41f1e40')
        .should('contain.text', 'netanel@oneofus.com');
    });
  
    it('Fills the Lead Form successfully', () => {
      const uniqueEmail = `test+${Date.now()}@oneofus.in`;
  
      // Handle Popup if it appears on load
      cy.wait(1000);
      cy.closePopup();
  
      // Fill Email
      cy.get('#form-field-email')
        .should('be.visible')
        .type(uniqueEmail);
  
      // Submit
      cy.get('form.elementor-form').submit();
  
      // Verify Success Message
      cy.get('.elementor-message-success', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'successful');
    });
  });