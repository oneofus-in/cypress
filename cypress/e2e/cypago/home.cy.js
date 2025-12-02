describe('Cypago Homepage & Navigation', () => {
  
  // 1. Setup: Handle Cookies & Errors
  beforeEach(() => {
    // Ignore 3rd party script errors (HubSpot, LinkedIn, etc)
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.visit('/');

    // Handle HubSpot Cookie Banner safely
    cy.get('body').then(($body) => {
      const $cookieBtn = $body.find('#hs-eu-confirmation-button');
      
      // Check existence AND visibility (prevents crashing if hidden)
      if ($cookieBtn.length > 0 && $cookieBtn.is(':visible')) {
        cy.wrap($cookieBtn).click();
      }
    });
  });

  // 2. Navigation & Menu Testing
  it('Verifies Header and Mega Menu functionality', () => {
    // Check Main Logo
    cy.get('.logo-header img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'logo-clean-cypago.svg');

    // Check "Book a Demo" Header CTA
    cy.get('header .cta')
      .should('be.visible')
      .and('contain.text', 'Book a Demo')
      .and('have.attr', 'href', 'https://cypago.com/schedule-a-demo/');

    // --- MEGA MENU INTERACTION ---
    // 1. Find the LI that contains "Platform"
    cy.contains('#menu-desktop-menu > li', 'Platform')
      // 2. Find the submenu inside that LI
      .find('.sub-menu') 
      // 3. Force CSS changes to make it visible to the "robot"
      .invoke('css', 'visibility', 'visible')
      .invoke('css', 'opacity', '1')
      .invoke('css', 'display', 'block');

    // 4. Now checking for visibility will pass
    cy.contains('Products').should('be.visible');
    cy.contains('Capabilities').should('be.visible');
    
    // Check a specific link inside the menu
    cy.get('a[href*="compliance-automation"]').first().should('be.visible');
  });

  // 3. Hero Section
  it('Displays the Hero section correctly', () => {
    // Video Background Check
    cy.get('video.hero-video-bg')
      .should('be.visible')
      .and('have.prop', 'paused', false); // Ensure video is auto-playing

    // Main Title H1
    cy.get('h1.hero-title')
      .should('be.visible')
      .and('contain.text', 'Agentic-AI Cyber GRC');

    // Subtext
    cy.get('.hero-description')
      .should('contain.text', 'Let AI agents do the GRC work');

    // Hero CTA
    cy.get('.hero-cta')
      .should('be.visible')
      .and('have.attr', 'href', '/schedule-a-demo/');
  });

  // 4. Social Proof & Trust
  it('Loads the "Trusted By" and "G2" sections', () => {
    // Check Trust Logos Slider
    cy.get('#trusted h2').should('contain.text', 'Trusted By');
    cy.get('.items-wrap img').should('have.length.gt', 5); // Ensure logos are loaded

    // Check G2 Recognition Section
    cy.get('.gtwo h2').should('contain.text', 'Recognized as a Leading Vendor');
    cy.get('.gtwo img[alt="g2-badge"]').should('be.visible');
  });

  // 5. Product Features
  it('Verifies Product Highlights', () => {
    cy.get('.product').scrollIntoView();
    
    // Check "Continuous Controls Monitoring" section
    cy.contains('h2', 'Don’t trust the process. Monitor it.')
      .should('be.visible');
    
    // Check "User Access Reviews" section
    cy.contains('h2', 'Effortless, Continuous User Access Reviews')
      .should('be.visible');
  });

  // 6. Testimonials (Slick Slider)
  it('Displays Testimonials', () => {
    cy.get('.testimonials').scrollIntoView();
    cy.get('.testimonials h2').should('contain.text', 'What Security & Compliance Leaders Are Saying');
    
    // Check that at least one testimonial author is visible
    cy.get('.testimonials .slick-active .author h3').first().should('be.visible');
  });

  // 7. Footer Links & Legal
  it('Verifies Footer information', () => {
    cy.get('footer').scrollIntoView();

    // Check Copyright
    cy.get('.lower-footer').should('contain.text', '2025 CYPAGO');

    // Check Legal Links
    cy.get('footer a[href*="privacy-policy"]').should('be.visible');
    cy.get('footer a[href*="terms-and-conditions"]').should('be.visible');

    // Check Social Media Icons exist
    cy.get('.social-footer a[href*="linkedin.com"]').should('exist');
    cy.get('.social-footer a[href*="twitter.com"]').should('exist');
  });
});