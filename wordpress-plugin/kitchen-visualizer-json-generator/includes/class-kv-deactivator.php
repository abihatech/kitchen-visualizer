<?php
/**
 * Plugin Deactivator
 */

class KV_Deactivator {

    public static function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();

        // Note: We don't delete database tables on deactivation
        // Only on uninstall (see uninstall.php)
    }
}
