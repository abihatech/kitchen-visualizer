<?php
/**
 * Download Handler
 */

class KV_Download {

    public function __construct() {
        add_action('admin_post_kv_download_json', array($this, 'handle_download'));
    }

    /**
     * Handle JSON download
     */
    public function handle_download() {
        // Check user capability
        if (!current_user_can('manage_options')) {
            wp_die(__('Unauthorized access', 'kitchen-visualizer'));
        }

        // Get kitchen type
        $kitchen_type = isset($_GET['kitchen_type']) ? sanitize_text_field($_GET['kitchen_type']) : '';

        if (empty($kitchen_type)) {
            wp_die(__('Kitchen type is required', 'kitchen-visualizer'));
        }

        // Verify nonce
        if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'kv_export_' . $kitchen_type)) {
            wp_die(__('Security check failed', 'kitchen-visualizer'));
        }

        // Generate and download JSON
        KV_Export::download($kitchen_type);
    }
}

// Initialize download handler
new KV_Download();
