<?php
/**
 * Admin Interface Handler
 */

class KV_Admin {

    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            __('Kitchen Visualizer', 'kitchen-visualizer'),
            __('Kitchen Visualizer', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer',
            array($this, 'display_main_page'),
            'dashicons-admin-home',
            30
        );

        add_submenu_page(
            'kitchen-visualizer',
            __('All Layers', 'kitchen-visualizer'),
            __('All Layers', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer',
            array($this, 'display_main_page')
        );

        add_submenu_page(
            'kitchen-visualizer',
            __('Add New Layer', 'kitchen-visualizer'),
            __('Add New Layer', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer-add',
            array($this, 'display_add_page')
        );

        add_submenu_page(
            'kitchen-visualizer',
            __('Import', 'kitchen-visualizer'),
            __('Import', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer-import',
            array($this, 'display_import_page')
        );

        add_submenu_page(
            'kitchen-visualizer',
            __('Export', 'kitchen-visualizer'),
            __('Export', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer-export',
            array($this, 'display_export_page')
        );

        add_submenu_page(
            'kitchen-visualizer',
            __('Settings', 'kitchen-visualizer'),
            __('Settings', 'kitchen-visualizer'),
            'manage_options',
            'kitchen-visualizer-settings',
            array($this, 'display_settings_page')
        );
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'kitchen-visualizer') === false) {
            return;
        }

        wp_enqueue_style('kv-admin-css', KV_PLUGIN_URL . 'assets/css/admin.css', array(), KV_VERSION);
        wp_enqueue_script('kv-admin-js', KV_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), KV_VERSION, true);

        wp_localize_script('kv-admin-js', 'kvAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('kv_ajax_nonce')
        ));
    }

    /**
     * Display main page (list all layers)
     */
    public function display_main_page() {
        // Handle delete action
        if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id']) && isset($_GET['_wpnonce'])) {
            if (wp_verify_nonce($_GET['_wpnonce'], 'delete_layer_' . $_GET['id'])) {
                KV_Database::delete_layer($_GET['id']);
                echo '<div class="notice notice-success"><p>' . __('Layer deleted successfully.', 'kitchen-visualizer') . '</p></div>';
            }
        }

        // Get filter parameters
        $kitchen_type = isset($_GET['kitchen_type']) ? sanitize_text_field($_GET['kitchen_type']) : '';
        $cabinet_type = isset($_GET['cabinet_type']) ? sanitize_text_field($_GET['cabinet_type']) : '';

        // Get layers
        $layers = KV_Database::get_all_layers($kitchen_type, $cabinet_type);
        $kitchen_types = KV_Database::get_kitchen_types();
        $cabinet_types = KV_Database::get_cabinet_types();

        include KV_PLUGIN_DIR . 'templates/admin-list.php';
    }

    /**
     * Display add/edit page
     */
    public function display_add_page() {
        $layer = null;
        $is_edit = false;

        // Check if editing
        if (isset($_GET['edit']) && isset($_GET['id'])) {
            $is_edit = true;
            $layer = KV_Database::get_layer($_GET['id']);
        }

        // Handle form submission
        if (isset($_POST['kv_submit']) && wp_verify_nonce($_POST['kv_nonce'], 'kv_add_layer')) {
            $data = array(
                'item_id' => intval($_POST['item_id']),
                'selected' => isset($_POST['selected']) ? 1 : 0,
                'texture_name' => sanitize_text_field($_POST['texture_name']),
                'cabinet_type_name' => sanitize_text_field($_POST['cabinet_type_name']),
                'png_layer_url' => esc_url_raw($_POST['png_layer_url']),
                'png_layer_name' => sanitize_text_field($_POST['png_layer_name']),
                'texture_url' => esc_url_raw($_POST['texture_url']),
                'main_background_id' => intval($_POST['main_background_id']),
                'kitchen_type' => sanitize_text_field($_POST['kitchen_type']),
                'sort_order' => intval($_POST['sort_order'])
            );

            if ($is_edit && isset($_GET['id'])) {
                KV_Database::update_layer($_GET['id'], $data);
                echo '<div class="notice notice-success"><p>' . __('Layer updated successfully.', 'kitchen-visualizer') . '</p></div>';
                $layer = KV_Database::get_layer($_GET['id']);
            } else {
                $id = KV_Database::insert_layer($data);
                if ($id) {
                    echo '<div class="notice notice-success"><p>' . __('Layer added successfully.', 'kitchen-visualizer') . ' <a href="?page=kitchen-visualizer-add&edit=1&id=' . $id . '">' . __('Edit', 'kitchen-visualizer') . '</a></p></div>';
                    $layer = null; // Reset form
                }
            }
        }

        include KV_PLUGIN_DIR . 'templates/admin-add.php';
    }

    /**
     * Display import page
     */
    public function display_import_page() {
        // Handle import
        if (isset($_POST['kv_import']) && wp_verify_nonce($_POST['kv_nonce'], 'kv_import')) {
            if (isset($_FILES['json_file']) && $_FILES['json_file']['error'] === UPLOAD_ERR_OK) {
                $json_content = file_get_contents($_FILES['json_file']['tmp_name']);
                $kitchen_type = sanitize_text_field($_POST['kitchen_type']);

                $imported = KV_Database::import_from_json($json_content, $kitchen_type);

                if ($imported !== false) {
                    echo '<div class="notice notice-success"><p>' . sprintf(__('%d layers imported successfully.', 'kitchen-visualizer'), $imported) . '</p></div>';
                } else {
                    echo '<div class="notice notice-error"><p>' . __('Failed to import JSON file.', 'kitchen-visualizer') . '</p></div>';
                }
            }
        }

        include KV_PLUGIN_DIR . 'templates/admin-import.php';
    }

    /**
     * Display export page
     */
    public function display_export_page() {
        $kitchen_types = KV_Database::get_kitchen_types();
        include KV_PLUGIN_DIR . 'templates/admin-export.php';
    }

    /**
     * Display settings page
     */
    public function display_settings_page() {
        // Handle settings save
        if (isset($_POST['kv_settings_submit']) && wp_verify_nonce($_POST['kv_nonce'], 'kv_settings')) {
            $settings = array(
                'default_main_background_id' => intval($_POST['default_main_background_id']),
                'export_path' => sanitize_text_field($_POST['export_path'])
            );
            update_option('kv_settings', $settings);
            echo '<div class="notice notice-success"><p>' . __('Settings saved successfully.', 'kitchen-visualizer') . '</p></div>';
        }

        $settings = get_option('kv_settings', array(
            'default_main_background_id' => 130,
            'export_path' => 'kitchen-visualizer-exports'
        ));

        include KV_PLUGIN_DIR . 'templates/admin-settings.php';
    }
}
