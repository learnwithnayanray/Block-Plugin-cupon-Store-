<?php
/**
 * Plugin Name: Coupon Block
 * Description: A custom block for displaying coupon store content.
 * Version: 1.0
 * Author: Nayan Ray
 */

function enqueue_coupon_block_assets() {
    wp_enqueue_script(
        'coupon-block',
        plugins_url('coupon-block.js', __FILE__),
        array('wp-blocks', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'coupon-block.js')
    );

    wp_enqueue_style(
        'coupon-block-style',
        plugins_url('style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );
}

add_action('enqueue_block_editor_assets', 'enqueue_coupon_block_assets');
