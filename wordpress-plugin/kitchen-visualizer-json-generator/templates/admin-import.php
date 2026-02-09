<div class="wrap">
    <h1><?php _e('Import Kitchen Visualizer Data', 'kitchen-visualizer'); ?></h1>

    <div class="kv-import-section" style="max-width: 800px;">
        <h2><?php _e('Import from JSON File', 'kitchen-visualizer'); ?></h2>
        <p><?php _e('Upload a JSON file to import layer data. The file should match the Kitchen Visualizer JSON format.', 'kitchen-visualizer'); ?></p>

        <form method="post" action="" enctype="multipart/form-data" class="kv-import-form">
            <?php wp_nonce_field('kv_import', 'kv_nonce'); ?>

            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="kitchen_type"><?php _e('Kitchen Type', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                    </th>
                    <td>
                        <input type="text" name="kitchen_type" id="kitchen_type" class="regular-text" required placeholder="e.g., kitchen_l_2">
                        <p class="description"><?php _e('Enter the kitchen type identifier for this import (e.g., kitchen_l_2, kitchen_u_island)', 'kitchen-visualizer'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="json_file"><?php _e('JSON File', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                    </th>
                    <td>
                        <input type="file" name="json_file" id="json_file" accept=".json" required>
                        <p class="description"><?php _e('Select a JSON file to import', 'kitchen-visualizer'); ?></p>
                    </td>
                </tr>
            </table>

            <p class="submit">
                <input type="submit" name="kv_import" class="button button-primary" value="<?php _e('Import JSON', 'kitchen-visualizer'); ?>">
            </p>
        </form>

        <hr style="margin: 40px 0;">

        <h2><?php _e('JSON Format Example', 'kitchen-visualizer'); ?></h2>
        <p><?php _e('Your JSON file should follow this structure:', 'kitchen-visualizer'); ?></p>

        <pre style="background: #f5f5f5; padding: 20px; border: 1px solid #ddd; overflow-x: auto;"><code>{
  "layerdata": [
    {
      "id": 2,
      "selected": 0,
      "texture_name": "Kb Shaker Gray",
      "cabinet_type_name": "Wall Cabinets",
      "png_layer_url": "/assets/space/kitchen/l_shape/l_2/cabinet/wall/framed/kb_shaker_gray_framed_main.webp",
      "png_layer_name": "kb_shaker_gray_framed",
      "texture_url": "/assets/popup_imgs/door/framed/kb_shaker_gray_framed.jpg",
      "main_background_id": 130
    },
    {
      "id": 4,
      "selected": 0,
      "texture_name": "Kb Shaker White",
      "cabinet_type_name": "Wall Cabinets",
      "png_layer_url": "/assets/space/kitchen/l_shape/l_2/cabinet/wall/framed/kb_shaker_white_framed_main.webp",
      "png_layer_name": "kb_shaker_white_framed",
      "texture_url": "/assets/popup_imgs/door/framed/kb_shaker_white_framed.jpg",
      "main_background_id": 130
    }
  ]
}</code></pre>

        <div class="notice notice-info inline" style="margin-top: 20px;">
            <p><strong><?php _e('Note:', 'kitchen-visualizer'); ?></strong> <?php _e('Importing will add new records to the database. Existing records will not be modified. Make sure to backup your database before importing large datasets.', 'kitchen-visualizer'); ?></p>
        </div>
    </div>
</div>
