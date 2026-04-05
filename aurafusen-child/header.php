<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0a0a0f">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <a href="#main-content" class="skip-link">Skip to content</a>

    <nav class="af-nav" aria-label="Main navigation">
        <div class="af-nav-inner">
            <a href="https://www.aurafusen.com/" class="af-logo">
                <img src="https://www.aurafusen.com/images/logo-horizontal.png" alt="AuraFusen" class="af-logo-img">
            </a>
            <div class="af-nav-links" id="af-nav-links">
                <a href="https://www.aurafusen.com/" class="af-nav-link">Home</a>
                <a href="https://www.aurafusen.com/product.html" class="af-nav-link">Product</a>
                <a href="https://www.aurafusen.com/why.html" class="af-nav-link">Why</a>
                <a href="https://www.aurafusen.com/pilot.html" class="af-nav-link">Pilot</a>
                <a href="/blog/" class="af-nav-link active">Blog</a>
            </div>
            <div class="af-nav-actions">
                <a href="https://www.aurafusen.com/pilot.html" class="af-btn-cta">Join the Pilot</a>
            </div>
            <button class="af-mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false"
                onclick="var n=document.getElementById('af-nav-links');n.classList.toggle('open');this.setAttribute('aria-expanded',n.classList.contains('open'))">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>
        </div>
    </nav>
