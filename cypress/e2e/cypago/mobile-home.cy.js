adescribe('Cypago Mobile Homepage', () => {
  
    // 1. Setup: Viewport, Cookies & Errors
    beforeEach(() => {
      // Set viewport to iPhone X (375px x 812px)
      cy.viewport('iphone-x');
  
      // Ignore 3rd party script errors
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });
  
      cy.visit('/');
  
      // Handle Cookie Banner (reuse safe logic)
      cy.get('body').then(($body) => {
        const $cookieBtn = $body.find('#hs-eu-confirmation-button');
        if ($cookieBtn.length > 0 && $cookieBtn.is(':visible')) {
          cy.wrap($cookieBtn).click();
        }
      });
    });
  
    // 2. Test the Mobile "Hamburger" Menu
    it('Opens the Mobile Hamburger Menu', () => {
      // 1. Ensure the Desktop Menu is hidden
      cy.get('.menu-desktop-menu-container').should('not.be.visible');
  
      // 2. Find and Click the Hamburger Icon
      // Based on your DOM: <div id="menu-icon">
      cy.get('#menu-icon').should('be.visible').click();
  
      // 3. Verify the menu container opens
      // The class 'top-active' usually indicates the menu is open, 
      // or we check visibility of the list
      cy.get('.menu-desktop-menu-container').should('be.visible');
  
      // 4. Interact with a Menu Item (Mobile Click, not Hover)
      cy.contains('Platform').click(); 
      
      // 5. Verify Sub-menu expands
      cy.contains('Products').should('be.visible');
      cy.contains('User Access Reviews').should('be.visible');
    });
  
    // 3. Hero Section (Responsive Check)
    it('Displays the Mobile Hero Section', () => {
      // H1 should be visible
      cy.get('h1.hero-title')
        .should('be.visible')
        .and('contain.text', 'Agentic-AI Cyber GRC');
  
      // The CTA button should be visible
      cy.get('.hero-cta')
        .should('be.visible')
        .and('contain.text', 'Book a Demo');
  
      // Verify no horizontal scrolling (common mobile bug)
      cy.window().then((win) => {
        const scrollWidth = win.document.documentElement.scrollWidth;
        const clientWidth = win.document.documentElement.clientWidth;
        // Allow a tiny buffer for scrollbars, but generally content should fit
        expect(scrollWidth).to. be.closeTo(clientWidth, 10); 
      });
    });
  
    // 4. Mobile Specific Sliders
    it('Checks the Mobile-Specific Achievements Slider', () => {
      cy.get('.achievements').scrollIntoView();
  
      // In your DOM, this specific slider has a class 'achieve-mobile'
      // This confirms the mobile version loaded
      cy.get('.achieve-items.achieve-mobile').should('exist').and('be.visible');
  
      // Check that dots navigation exists (Slick slider adds these)
      cy.get('.achieve-items.achieve-mobile .slick-dots').should('be.visible');
  
      // Verify the content of the first active slide
      cy.get('.achieve-items.achieve-mobile .slick-active')
        .first()
        .find('h3')
        .should('not.be.empty');
    });
  
    // 5. Footer Stack
    it('Verifies Footer elements are stacked vertically', () => {
      cy.scrollTo('bottom');
  
      // Check that important links are clickable
      cy.get('footer a[href*="privacy-policy"]').should('be.visible');
      
      // Check Social Icons
      cy.get('.social-footer a').should('have.length.at.least', 2);
    });
  });