<div class="wrap">
    <h1><?php echo $is_edit ? __('Edit Layer', 'kitchen-visualizer') : __('Add New Layer', 'kitchen-visualizer'); ?></h1>

    <form method="post" action="" class="kv-form">
        <?php wp_nonce_field('kv_add_layer', 'kv_nonce'); ?>

        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="item_id"><?php _e('Item ID', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="number" name="item_id" id="item_id" class="regular-text" value="<?php echo $layer ? esc_attr($layer['item_id']) : ''; ?>" required>
                    <p class="description"><?php _e('Unique identifier for this item in the JSON export', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="texture_name"><?php _e('Texture Name', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="text" name="texture_name" id="texture_name" class="regular-text" value="<?php echo $layer ? esc_attr($layer['texture_name']) : ''; ?>" required>
                    <p class="description"><?php _e('e.g., "Kb Shaker Gray", "Sl Ashton Green"', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="cabinet_type_name"><?php _e('Cabinet Type', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <select name="cabinet_type_name" id="cabinet_type_name" class="regular-text" required>
                        <option value=""><?php _e('Select Cabinet Type', 'kitchen-visualizer'); ?></option>
                        <option value="Wall Cabinets" <?php echo ($layer && $layer['cabinet_type_name'] === 'Wall Cabinets') ? 'selected' : ''; ?>><?php _e('Wall Cabinets', 'kitchen-visualizer'); ?></option>
                        <option value="Base Cabinets" <?php echo ($layer && $layer['cabinet_type_name'] === 'Base Cabinets') ? 'selected' : ''; ?>><?php _e('Base Cabinets', 'kitchen-visualizer'); ?></option>
                        <option value="Wall Colors" <?php echo ($layer && $layer['cabinet_type_name'] === 'Wall Colors') ? 'selected' : ''; ?>><?php _e('Wall Colors', 'kitchen-visualizer'); ?></option>
                        <option value="Countertops" <?php echo ($layer && $layer['cabinet_type_name'] === 'Countertops') ? 'selected' : ''; ?>><?php _e('Countertops', 'kitchen-visualizer'); ?></option>
                        <option value="Flooring" <?php echo ($layer && $layer['cabinet_type_name'] === 'Flooring') ? 'selected' : ''; ?>><?php _e('Flooring', 'kitchen-visualizer'); ?></option>
                    </select>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="kitchen_type"><?php _e('Kitchen Type', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="text" name="kitchen_type" id="kitchen_type" class="regular-text" value="<?php echo $layer ? esc_attr($layer['kitchen_type']) : ''; ?>" required>
                    <p class="description"><?php _e('e.g., "kitchen_l_2", "kitchen_u_island", "kitchen_i_island"', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="png_layer_url"><?php _e('PNG Layer URL', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="text" name="png_layer_url" id="png_layer_url" class="large-text" value="<?php echo $layer ? esc_attr($layer['png_layer_url']) : ''; ?>" required>
                    <button type="button" class="button kv-media-upload" data-target="png_layer_url"><?php _e('Upload Image', 'kitchen-visualizer'); ?></button>
                    <p class="description"><?php _e('Main layer image path', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="png_layer_name"><?php _e('PNG Layer Name', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="text" name="png_layer_name" id="png_layer_name" class="regular-text" value="<?php echo $layer ? esc_attr($layer['png_layer_name']) : ''; ?>" required>
                    <p class="description"><?php _e('Internal layer name identifier', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="texture_url"><?php _e('Texture URL', 'kitchen-visualizer'); ?> <span class="required">*</span></label>
                </th>
                <td>
                    <input type="text" name="texture_url" id="texture_url" class="large-text" value="<?php echo $layer ? esc_attr($layer['texture_url']) : ''; ?>" required>
                    <button type="button" class="button kv-media-upload" data-target="texture_url"><?php _e('Upload Image', 'kitchen-visualizer'); ?></button>
                    <p class="description"><?php _e('Thumbnail/texture preview image', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="main_background_id"><?php _e('Main Background ID', 'kitchen-visualizer'); ?></label>
                </th>
                <td>
                    <input type="number" name="main_background_id" id="main_background_id" class="regular-text" value="<?php echo $layer ? esc_attr($layer['main_background_id']) : '130'; ?>">
                    <p class="description"><?php _e('Default: 130', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="sort_order"><?php _e('Sort Order', 'kitchen-visualizer'); ?></label>
                </th>
                <td>
                    <input type="number" name="sort_order" id="sort_order" class="regular-text" value="<?php echo $layer ? esc_attr($layer['sort_order']) : '0'; ?>">
                    <p class="description"><?php _e('Order in which items appear (lower numbers first)', 'kitchen-visualizer'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="selected"><?php _e('Selected by Default', 'kitchen-visualizer'); ?></label>
                </th>
                <td>
                    <label>
                        <input type="checkbox" name="selected" id="selected" value="1" <?php echo ($layer && $layer['selected']) ? 'checked' : ''; ?>>
                        <?php _e('Mark this layer as selected by default', 'kitchen-visualizer'); ?>
                    </label>
                </td>
            </tr>
        </table>

        <p class="submit">
            <input type="submit" name="kv_submit" class="button button-primary" value="<?php echo $is_edit ? __('Update Layer', 'kitchen-visualizer') : __('Add Layer', 'kitchen-visualizer'); ?>">
            <a href="<?php echo admin_url('admin.php?page=kitchen-visualizer'); ?>" class="button"><?php _e('Cancel', 'kitchen-visualizer'); ?></a>
        </p>
    </form>
</div>
