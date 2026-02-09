<?php
/**
 * Plugin Activator
 */

class KV_Activator {

    public static function activate() {
        // Create database tables
        KV_Database::create_tables();

        // Set default options
        if (!get_option('kv_settings')) {
            add_option('kv_settings', array(
                'default_main_background_id' => 130,
                'export_path' => 'kitchen-visualizer-exports'
            ));
        }

        // Flush rewrite rules
        flush_rewrite_rules();
    }
}
