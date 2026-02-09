<?php
/**
 * Uninstall Script
 *
 * This file is executed when the plugin is uninstalled
 */

// Exit if accessed directly or not uninstalling
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete database tables
global $wpdb;
$table_name = $wpdb->prefix . 'kv_layer_data';
$wpdb->query("DROP TABLE IF EXISTS $table_name");

// Delete plugin options
delete_option('kv_settings');

// Clear any cached data
wp_cache_flush();
