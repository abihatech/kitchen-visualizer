<?php
/**
 * AJAX Handler
 */

class KV_Ajax {

    public function __construct() {
        add_action('wp_ajax_kv_delete_layer', array($this, 'delete_layer'));
        add_action('wp_ajax_kv_export_json', array($this, 'export_json'));
    }

    /**
     * Delete layer via AJAX
     */
    public function delete_layer() {
        check_ajax_referer('kv_ajax_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error('Unauthorized');
        }

        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

        if ($id && KV_Database::delete_layer($id)) {
            wp_send_json_success('Layer deleted successfully');
        } else {
            wp_send_json_error('Failed to delete layer');
        }
    }

    /**
     * Export JSON via AJAX
     */
    public function export_json() {
        check_ajax_referer('kv_ajax_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error('Unauthorized');
        }

        $kitchen_type = isset($_POST['kitchen_type']) ? sanitize_text_field($_POST['kitchen_type']) : '';

        if (empty($kitchen_type)) {
            wp_send_json_error('Kitchen type is required');
        }

        $json = KV_Export::generate_json($kitchen_type);

        if ($json) {
            wp_send_json_success(array(
                'json' => $json,
                'filename' => sanitize_file_name($kitchen_type) . '.json'
            ));
        } else {
            wp_send_json_error('Failed to generate JSON');
        }
    }
}
