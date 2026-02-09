<div class="wrap">
    <h1 class="wp-heading-inline"><?php _e('Kitchen Visualizer Layers', 'kitchen-visualizer'); ?></h1>
    <a href="<?php echo admin_url('admin.php?page=kitchen-visualizer-add'); ?>" class="page-title-action"><?php _e('Add New', 'kitchen-visualizer'); ?></a>
    <hr class="wp-header-end">

    <div class="kv-filters" style="margin: 20px 0;">
        <form method="get" action="">
            <input type="hidden" name="page" value="kitchen-visualizer">

            <select name="kitchen_type">
                <option value=""><?php _e('All Kitchen Types', 'kitchen-visualizer'); ?></option>
                <?php foreach ($kitchen_types as $type): ?>
                    <option value="<?php echo esc_attr($type); ?>" <?php selected($kitchen_type, $type); ?>>
                        <?php echo esc_html($type); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <select name="cabinet_type">
                <option value=""><?php _e('All Cabinet Types', 'kitchen-visualizer'); ?></option>
                <?php foreach ($cabinet_types as $type): ?>
                    <option value="<?php echo esc_attr($type); ?>" <?php selected($cabinet_type, $type); ?>>
                        <?php echo esc_html($type); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <input type="submit" class="button" value="<?php _e('Filter', 'kitchen-visualizer'); ?>">

            <?php if ($kitchen_type || $cabinet_type): ?>
                <a href="<?php echo admin_url('admin.php?page=kitchen-visualizer'); ?>" class="button"><?php _e('Clear Filters', 'kitchen-visualizer'); ?></a>
            <?php endif; ?>
        </form>
    </div>

    <?php if (empty($layers)): ?>
        <p><?php _e('No layers found. Add your first layer!', 'kitchen-visualizer'); ?></p>
    <?php else: ?>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('ID', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Item ID', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Texture Name', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Cabinet Type', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Kitchen Type', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Layer Name', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Selected', 'kitchen-visualizer'); ?></th>
                    <th><?php _e('Actions', 'kitchen-visualizer'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($layers as $layer): ?>
                    <tr>
                        <td><?php echo esc_html($layer['id']); ?></td>
                        <td><?php echo esc_html($layer['item_id']); ?></td>
                        <td><strong><?php echo esc_html($layer['texture_name']); ?></strong></td>
                        <td><?php echo esc_html($layer['cabinet_type_name']); ?></td>
                        <td><?php echo esc_html($layer['kitchen_type']); ?></td>
                        <td><?php echo esc_html($layer['png_layer_name']); ?></td>
                        <td><?php echo $layer['selected'] ? '✓' : ''; ?></td>
                        <td>
                            <a href="<?php echo admin_url('admin.php?page=kitchen-visualizer-add&edit=1&id=' . $layer['id']); ?>" class="button button-small"><?php _e('Edit', 'kitchen-visualizer'); ?></a>
                            <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=kitchen-visualizer&action=delete&id=' . $layer['id']), 'delete_layer_' . $layer['id']); ?>" class="button button-small" onclick="return confirm('<?php _e('Are you sure you want to delete this layer?', 'kitchen-visualizer'); ?>');"><?php _e('Delete', 'kitchen-visualizer'); ?></a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <p style="margin-top: 20px;">
            <?php printf(__('Total: %d layers', 'kitchen-visualizer'), count($layers)); ?>
        </p>
    <?php endif; ?>
</div>
