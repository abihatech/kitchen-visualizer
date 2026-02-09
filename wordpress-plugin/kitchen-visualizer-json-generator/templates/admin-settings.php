<div class="wrap">
    <h1><?php _e('Kitchen Visualizer Settings', 'kitchen-visualizer'); ?></h1>

    <form method="post" action="" class="kv-settings-form">
        <?php wp_nonce_field('kv_settings', 'kv_nonce'); ?>

        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="default_main_background_id"><?php _e('Default Main Background ID', 'kitchen-visualizer'); ?></label>
                </th>
                <td>
                    <input type="number" name="default_main_background_id" id="default_main_background_id" class="regular-text" value="<?php echo esc_attr($settings['default_main_background_id']); ?>">
                    <p class="description"><?php _e('Default value for main_background_id when creating new layers', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="export_path"><?php _e('Export Directory', 'kitchen-visualizer'); ?></label>
                </th>
                <td>
                    <input type="text" name="export_path" id="export_path" class="regular-text" value="<?php echo esc_attr($settings['export_path']); ?>">
                    <p class="description">
                        <?php
                        $upload_dir = wp_upload_dir();
                        printf(__('Relative to WordPress uploads directory: %s', 'kitchen-visualizer'), $upload_dir['basedir']);
                        ?>
                    </p>
                </td>
            </tr>
        </table>

        <p class="submit">
            <input type="submit" name="kv_settings_submit" class="button button-primary" value="<?php _e('Save Settings', 'kitchen-visualizer'); ?>">
        </p>
    </form>

    <hr style="margin: 40px 0;">

    <h2><?php _e('Database Information', 'kitchen-visualizer'); ?></h2>

    <?php
    global $wpdb;
    $table_name = $wpdb->prefix . 'kv_layer_data';
    $total_layers = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    $kitchen_types = KV_Database::get_kitchen_types();
    $cabinet_types = KV_Database::get_cabinet_types();
    ?>

    <table class="widefat">
        <tr>
            <th style="width: 300px;"><?php _e('Total Layers', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html($total_layers); ?></td>
        </tr>
        <tr>
            <th><?php _e('Kitchen Types', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html(implode(', ', $kitchen_types)); ?></td>
        </tr>
        <tr>
            <th><?php _e('Cabinet Types', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html(implode(', ', $cabinet_types)); ?></td>
        </tr>
        <tr>
            <th><?php _e('Database Table', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html($table_name); ?></td>
        </tr>
    </table>

    <hr style="margin: 40px 0;">

    <h2><?php _e('Plugin Information', 'kitchen-visualizer'); ?></h2>

    <table class="widefat">
        <tr>
            <th style="width: 300px;"><?php _e('Version', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html(KV_VERSION); ?></td>
        </tr>
        <tr>
            <th><?php _e('Plugin Directory', 'kitchen-visualizer'); ?></th>
            <td><?php echo esc_html(KV_PLUGIN_DIR); ?></td>
        </tr>
    </table>
</div>
