<div class="wrap">
    <h1><?php _e('Export Kitchen Visualizer Data', 'kitchen-visualizer'); ?></h1>

    <div class="kv-export-section" style="max-width: 800px;">
        <h2><?php _e('Export to JSON File', 'kitchen-visualizer'); ?></h2>
        <p><?php _e('Select a kitchen type to export all its layer data to a JSON file.', 'kitchen-visualizer'); ?></p>

        <?php if (empty($kitchen_types)): ?>
            <div class="notice notice-warning inline">
                <p><?php _e('No kitchen types found. Please add some layers first.', 'kitchen-visualizer'); ?></p>
            </div>
        <?php else: ?>
            <div class="kv-export-options" style="margin: 30px 0;">
                <?php foreach ($kitchen_types as $type): ?>
                    <div class="kv-export-item" style="margin-bottom: 20px; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px;">
                        <h3 style="margin-top: 0;"><?php echo esc_html($type); ?></h3>

                        <?php
                        $count = count(KV_Database::get_all_layers($type));
                        ?>
                        <p><?php printf(__('Contains %d layers', 'kitchen-visualizer'), $count); ?></p>

                        <a href="<?php echo admin_url('admin-post.php?action=kv_download_json&kitchen_type=' . urlencode($type) . '&_wpnonce=' . wp_create_nonce('kv_export_' . $type)); ?>" class="button button-primary">
                            <?php _e('Download JSON', 'kitchen-visualizer'); ?>
                        </a>

                        <button type="button" class="button kv-preview-json" data-kitchen-type="<?php echo esc_attr($type); ?>">
                            <?php _e('Preview JSON', 'kitchen-visualizer'); ?>
                        </button>
                    </div>
                <?php endforeach; ?>
            </div>

            <div id="kv-json-preview" style="display: none; margin-top: 30px;">
                <h3><?php _e('JSON Preview', 'kitchen-visualizer'); ?></h3>
                <button type="button" class="button" id="kv-copy-json"><?php _e('Copy to Clipboard', 'kitchen-visualizer'); ?></button>
                <button type="button" class="button" id="kv-close-preview"><?php _e('Close', 'kitchen-visualizer'); ?></button>
                <pre id="kv-json-content" style="background: #f5f5f5; padding: 20px; border: 1px solid #ddd; overflow-x: auto; max-height: 600px; overflow-y: auto; margin-top: 10px;"><code></code></pre>
            </div>
        <?php endif; ?>

        <hr style="margin: 40px 0;">

        <div class="notice notice-info inline">
            <p><strong><?php _e('How to use:', 'kitchen-visualizer'); ?></strong></p>
            <ol style="margin-left: 20px;">
                <li><?php _e('Click "Download JSON" to download the file directly to your computer', 'kitchen-visualizer'); ?></li>
                <li><?php _e('Click "Preview JSON" to see the JSON content in your browser', 'kitchen-visualizer'); ?></li>
                <li><?php _e('Use the generated JSON file in your Kitchen Visualizer application', 'kitchen-visualizer'); ?></li>
            </ol>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    $('.kv-preview-json').on('click', function() {
        var kitchenType = $(this).data('kitchen-type');
        var button = $(this);

        button.prop('disabled', true).text('<?php _e('Loading...', 'kitchen-visualizer'); ?>');

        $.ajax({
            url: kvAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'kv_export_json',
                nonce: kvAjax.nonce,
                kitchen_type: kitchenType
            },
            success: function(response) {
                if (response.success) {
                    $('#kv-json-content code').text(response.data.json);
                    $('#kv-json-preview').slideDown();
                    $('html, body').animate({
                        scrollTop: $('#kv-json-preview').offset().top - 100
                    }, 500);
                } else {
                    alert('<?php _e('Failed to generate JSON', 'kitchen-visualizer'); ?>');
                }
            },
            error: function() {
                alert('<?php _e('An error occurred', 'kitchen-visualizer'); ?>');
            },
            complete: function() {
                button.prop('disabled', false).text('<?php _e('Preview JSON', 'kitchen-visualizer'); ?>');
            }
        });
    });

    $('#kv-copy-json').on('click', function() {
        var content = $('#kv-json-content code').text();
        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(content).select();
        document.execCommand('copy');
        $temp.remove();

        $(this).text('<?php _e('Copied!', 'kitchen-visualizer'); ?>');
        setTimeout(function() {
            $('#kv-copy-json').text('<?php _e('Copy to Clipboard', 'kitchen-visualizer'); ?>');
        }, 2000);
    });

    $('#kv-close-preview').on('click', function() {
        $('#kv-json-preview').slideUp();
    });
});
</script>
