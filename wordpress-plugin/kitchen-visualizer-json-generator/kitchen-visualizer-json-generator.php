<?php
/**
 * Plugin Name: Kitchen Visualizer JSON Generator
 * Plugin URI: https://example.com/kitchen-visualizer
 * Description: Generate JSON files for kitchen visualizer with cabinet types, textures, and wall colors
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: kitchen-visualizer
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('KV_VERSION', '1.0.0');
define('KV_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('KV_PLUGIN_URL', plugin_dir_url(__FILE__));
define('KV_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Include required files
require_once KV_PLUGIN_DIR . 'includes/class-kv-activator.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-deactivator.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-database.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-admin.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-ajax.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-export.php';
require_once KV_PLUGIN_DIR . 'includes/class-kv-download.php';

// Activation hook
register_activation_hook(__FILE__, array('KV_Activator', 'activate'));

// Deactivation hook
register_deactivation_hook(__FILE__, array('KV_Deactivator', 'deactivate'));

// Initialize the plugin
function kv_init() {
    // Initialize admin
    if (is_admin()) {
        new KV_Admin();
        new KV_Ajax();
    }
}
add_action('plugins_loaded', 'kv_init');
