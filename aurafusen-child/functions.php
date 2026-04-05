<?php
/**
 * AuraFusen Child Theme Functions
 *
 * @package AuraFusen
 */

// Enqueue parent + child styles and Inter font
function aurafusen_enqueue_styles() {
    // Google Fonts - Inter
    wp_enqueue_style(
        'google-fonts-inter',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        array(),
        null
    );

    // Parent theme
    // NOTE: Update handle to match your parent theme's registered style handle.
    // GeneratePress uses 'generate-style', flavor uses 'flavor-style', etc.
    wp_enqueue_style('flavor-style', get_template_directory_uri() . '/style.css');

    // Child theme
    wp_enqueue_style(
        'aurafusen-style',
        get_stylesheet_uri(),
        array('flavor-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'aurafusen_enqueue_styles');

// Theme setup
function aurafusen_setup() {
    // Register nav menu
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'aurafusen'),
    ));

    // Theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Custom image sizes for blog cards
    add_image_size('blog-card', 600, 400, true);
}
add_action('after_setup_theme', 'aurafusen_setup');

// Disable comments (blog is content-only for now)
function aurafusen_disable_comments() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
}
add_action('init', 'aurafusen_disable_comments');
