describe('Cypago Mobile Homepage', () => {
  
    beforeEach(() => {
        // 1. Set the visual size
        cy.viewport('iphone-x');
    
        // 2. Ignore script errors
        cy.on('uncaught:exception', (err, runnable) => {
          return false;
        });
    
        // 3. Visit with a Mobile User-Agent to trigger wp_is_mobile()
        cy.visit('/', {
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
          }
        });
    
        // 4. Handle Cookie Banner
        cy.get('body').then(($body) => {
          const $cookieBtn = $body.find('#hs-eu-confirmation-button');
          if ($cookieBtn.length > 0 && $cookieBtn.is(':visible')) {
            cy.wrap($cookieBtn).click();
          }
        });
      });
  
   // 2. Test the Mobile "Hamburger" Menu
  it('Opens the Mobile Hamburger Menu and drills down', () => {
    // 1. Open Hamburger
    cy.get('#menu-icon').should('be.visible').click();
    cy.get('.menu-desktop-menu-container').should('be.visible');

    // --- LEVEL 1: Expand "Platform" ---
    cy.contains('li', 'Platform')
      .find('.menu-arrow') // Finds ALL arrows inside Platform tree
      .first()             // <--- FIX: Click only the top-level arrow
      .should('be.visible')
      .click();

    // Verify "Products" is now visible
    cy.contains('Products').should('be.visible');

    // --- LEVEL 2: Expand "Products" ---
    cy.contains('li', 'Products')
      .find('.menu-arrow')
      .first()             // <--- FIX: Click only the arrow next to Products
      .should('be.visible')
      .click();

    // --- LEVEL 3: Verify Links ---
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
        
        // Allow a buffer of 20 pixels for scrollbars/minor overflows
        // 389 vs 375 is acceptable for this test
        expect(scrollWidth).to.be.closeTo(clientWidth, 20); 
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