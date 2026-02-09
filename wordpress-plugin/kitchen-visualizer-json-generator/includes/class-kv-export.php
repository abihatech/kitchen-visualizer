<?php
/**
 * Export Handler
 */

class KV_Export {

    /**
     * Generate JSON for a specific kitchen type
     */
    public static function generate_json($kitchen_type) {
        $layers = KV_Database::get_all_layers($kitchen_type);

        if (empty($layers)) {
            return false;
        }

        $layerdata = array();

        foreach ($layers as $layer) {
            $layerdata[] = array(
                'id' => intval($layer['item_id']),
                'selected' => intval($layer['selected']),
                'texture_name' => $layer['texture_name'],
                'cabinet_type_name' => $layer['cabinet_type_name'],
                'png_layer_url' => $layer['png_layer_url'],
                'png_layer_name' => $layer['png_layer_name'],
                'texture_url' => $layer['texture_url'],
                'main_background_id' => intval($layer['main_background_id'])
            );
        }

        $output = array('layerdata' => $layerdata);

        return json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Save JSON to file
     */
    public static function save_to_file($kitchen_type, $custom_path = null) {
        $json = self::generate_json($kitchen_type);

        if (!$json) {
            return false;
        }

        $settings = get_option('kv_settings');
        $upload_dir = wp_upload_dir();

        if ($custom_path) {
            $export_dir = $upload_dir['basedir'] . '/' . $custom_path;
        } else {
            $export_dir = $upload_dir['basedir'] . '/' . $settings['export_path'];
        }

        if (!file_exists($export_dir)) {
            wp_mkdir_p($export_dir);
        }

        $filename = sanitize_file_name($kitchen_type) . '.json';
        $filepath = $export_dir . '/' . $filename;

        $result = file_put_contents($filepath, $json);

        if ($result !== false) {
            return $filepath;
        }

        return false;
    }

    /**
     * Download JSON file
     */
    public static function download($kitchen_type) {
        $json = self::generate_json($kitchen_type);

        if (!$json) {
            return false;
        }

        $filename = sanitize_file_name($kitchen_type) . '.json';

        header('Content-Type: application/json');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Content-Length: ' . strlen($json));
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: 0');

        echo $json;
        exit;
    }
}
