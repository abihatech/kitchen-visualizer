/**
 * Kitchen Visualizer Admin JavaScript
 */

(function($) {
    'use strict';

    $(document).ready(function() {

        /**
         * Media Upload
         */
        $('.kv-media-upload').on('click', function(e) {
            e.preventDefault();

            var button = $(this);
            var targetInput = $('#' + button.data('target'));

            // Create media frame
            var frame = wp.media({
                title: 'Select or Upload Image',
                button: {
                    text: 'Use this image'
                },
                multiple: false
            });

            // When an image is selected
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                targetInput.val(attachment.url);
            });

            // Open media frame
            frame.open();
        });

        /**
         * Delete confirmation
         */
        $('.kv-delete-layer').on('click', function(e) {
            if (!confirm('Are you sure you want to delete this layer?')) {
                e.preventDefault();
                return false;
            }
        });

        /**
         * Auto-generate PNG layer name from texture name
         */
        $('#texture_name').on('blur', function() {
            var textureName = $(this).val();
            var layerNameInput = $('#png_layer_name');

            // Only auto-fill if layer name is empty
            if (!layerNameInput.val() && textureName) {
                var layerName = textureName
                    .toLowerCase()
                    .replace(/\s+/g, '_')
                    .replace(/[^a-z0-9_]/g, '');
                layerNameInput.val(layerName);
            }
        });

        /**
         * Form validation
         */
        $('.kv-form').on('submit', function(e) {
            var isValid = true;
            var errorMessages = [];

            // Check required fields
            $(this).find('[required]').each(function() {
                var field = $(this);
                if (!field.val() || field.val().trim() === '') {
                    isValid = false;
                    var label = $('label[for="' + field.attr('id') + '"]').text().replace('*', '').trim();
                    errorMessages.push(label + ' is required');
                    field.css('border-color', '#dc3232');
                } else {
                    field.css('border-color', '');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields:\n\n' + errorMessages.join('\n'));
                return false;
            }
        });

        /**
         * Clear error borders on input
         */
        $('input, select, textarea').on('focus', function() {
            $(this).css('border-color', '');
        });

        /**
         * Filter form - preserve other parameters
         */
        $('.kv-filters select').on('change', function() {
            $(this).closest('form').submit();
        });

        /**
         * Bulk actions (future feature)
         */
        $('#doaction, #doaction2').on('click', function(e) {
            var action = $(this).siblings('select').val();
            if (action === '-1') {
                e.preventDefault();
                return false;
            }

            var checkedItems = $('input[name="item[]"]:checked').length;
            if (checkedItems === 0) {
                e.preventDefault();
                alert('Please select at least one item.');
                return false;
            }

            if (action === 'delete') {
                if (!confirm('Are you sure you want to delete ' + checkedItems + ' item(s)?')) {
                    e.preventDefault();
                    return false;
                }
            }
        });

        /**
         * Select all checkbox
         */
        $('#cb-select-all-1, #cb-select-all-2').on('change', function() {
            var isChecked = $(this).prop('checked');
            $('input[name="item[]"]').prop('checked', isChecked);
        });

        /**
         * Copy to clipboard helper
         */
        window.kvCopyToClipboard = function(text) {
            var $temp = $('<textarea>');
            $('body').append($temp);
            $temp.val(text).select();
            document.execCommand('copy');
            $temp.remove();
        };

        /**
         * JSON preview syntax highlighting (basic)
         */
        function highlightJSON(json) {
            if (typeof json !== 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

        /**
         * Debug logging
         */
        window.kvLog = function(message) {
            if (typeof console !== 'undefined' && console.log) {
                console.log('[Kitchen Visualizer] ' + message);
            }
        };

    });

})(jQuery);
