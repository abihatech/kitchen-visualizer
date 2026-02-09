<?php
/**
 * Database Handler
 */

class KV_Database {

    /**
     * Create database tables
     */
    public static function create_tables() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'kv_layer_data';

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            item_id bigint(20) NOT NULL,
            selected tinyint(1) DEFAULT 0,
            texture_name varchar(255) NOT NULL,
            cabinet_type_name varchar(100) NOT NULL,
            png_layer_url text NOT NULL,
            png_layer_name varchar(255) NOT NULL,
            texture_url text NOT NULL,
            main_background_id bigint(20) DEFAULT 130,
            kitchen_type varchar(50) NOT NULL,
            sort_order int(11) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY item_id (item_id),
            KEY cabinet_type_name (cabinet_type_name),
            KEY kitchen_type (kitchen_type)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Get all layer data
     */
    public static function get_all_layers($kitchen_type = '', $cabinet_type = '') {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        $where = array();
        if (!empty($kitchen_type)) {
            $where[] = $wpdb->prepare("kitchen_type = %s", $kitchen_type);
        }
        if (!empty($cabinet_type)) {
            $where[] = $wpdb->prepare("cabinet_type_name = %s", $cabinet_type);
        }

        $where_clause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

        $sql = "SELECT * FROM $table_name $where_clause ORDER BY sort_order ASC, id ASC";
        return $wpdb->get_results($sql, ARRAY_A);
    }

    /**
     * Get single layer by ID
     */
    public static function get_layer($id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE id = %d",
            $id
        ), ARRAY_A);
    }

    /**
     * Insert layer data
     */
    public static function insert_layer($data) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        $wpdb->insert($table_name, $data);
        return $wpdb->insert_id;
    }

    /**
     * Update layer data
     */
    public static function update_layer($id, $data) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        return $wpdb->update(
            $table_name,
            $data,
            array('id' => $id),
            null,
            array('%d')
        );
    }

    /**
     * Delete layer
     */
    public static function delete_layer($id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        return $wpdb->delete(
            $table_name,
            array('id' => $id),
            array('%d')
        );
    }

    /**
     * Get distinct kitchen types
     */
    public static function get_kitchen_types() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        return $wpdb->get_col("SELECT DISTINCT kitchen_type FROM $table_name ORDER BY kitchen_type");
    }

    /**
     * Get distinct cabinet types
     */
    public static function get_cabinet_types() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        return $wpdb->get_col("SELECT DISTINCT cabinet_type_name FROM $table_name ORDER BY cabinet_type_name");
    }

    /**
     * Bulk import from JSON
     */
    public static function import_from_json($json_data, $kitchen_type) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'kv_layer_data';

        $data = json_decode($json_data, true);
        if (!isset($data['layerdata']) || !is_array($data['layerdata'])) {
            return false;
        }

        $imported = 0;
        foreach ($data['layerdata'] as $layer) {
            $insert_data = array(
                'item_id' => isset($layer['id']) ? $layer['id'] : 0,
                'selected' => isset($layer['selected']) ? $layer['selected'] : 0,
                'texture_name' => isset($layer['texture_name']) ? $layer['texture_name'] : '',
                'cabinet_type_name' => isset($layer['cabinet_type_name']) ? $layer['cabinet_type_name'] : '',
                'png_layer_url' => isset($layer['png_layer_url']) ? $layer['png_layer_url'] : '',
                'png_layer_name' => isset($layer['png_layer_name']) ? $layer['png_layer_name'] : '',
                'texture_url' => isset($layer['texture_url']) ? $layer['texture_url'] : '',
                'main_background_id' => isset($layer['main_background_id']) ? $layer['main_background_id'] : 130,
                'kitchen_type' => $kitchen_type
            );

            if (self::insert_layer($insert_data)) {
                $imported++;
            }
        }

        return $imported;
    }
}
