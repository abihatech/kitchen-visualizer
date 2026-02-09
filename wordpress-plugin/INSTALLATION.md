# Kitchen Visualizer JSON Generator - Installation Guide

## Quick Start

### Option 1: Upload via WordPress Admin (Recommended)

1. **Create a ZIP file**
   - Navigate to the `wordpress-plugin` folder
   - Right-click on the `kitchen-visualizer-json-generator` folder
   - Select "Send to > Compressed (zipped) folder" (Windows) or "Compress" (Mac)
   - This creates `kitchen-visualizer-json-generator.zip`

2. **Install in WordPress**
   - Log in to your WordPress admin dashboard
   - Go to **Plugins > Add New**
   - Click **Upload Plugin** at the top
   - Click **Choose File** and select your ZIP file
   - Click **Install Now**
   - Click **Activate Plugin**

3. **Verify Installation**
   - You should see "Kitchen Visualizer" in your WordPress admin menu
   - The plugin icon looks like a house (dashicon)

### Option 2: Manual FTP/File Manager Installation

1. **Upload via FTP or File Manager**
   - Connect to your WordPress site via FTP or cPanel File Manager
   - Navigate to `/wp-content/plugins/`
   - Upload the entire `kitchen-visualizer-json-generator` folder
   - The final path should be: `/wp-content/plugins/kitchen-visualizer-json-generator/`

2. **Activate the Plugin**
   - Log in to WordPress admin
   - Go to **Plugins > Installed Plugins**
   - Find "Kitchen Visualizer JSON Generator"
   - Click **Activate**

## After Installation

### Step 1: Verify Database Tables

The plugin automatically creates a database table on activation:
- Table name: `wp_kv_layer_data` (prefix may vary)
- Go to **Kitchen Visualizer > Settings** to verify the table was created

### Step 2: Import Existing Data (Optional)

If you have existing JSON files:

1. Go to **Kitchen Visualizer > Import**
2. Enter the kitchen type (e.g., "kitchen_l_2")
3. Select your JSON file
4. Click **Import JSON**

### Step 3: Start Adding Layers

1. Go to **Kitchen Visualizer > Add New Layer**
2. Fill in the form with your layer data
3. Click **Add Layer**

## Testing the Plugin

### Test Import Function

1. Use one of the existing JSON files from your project:
   - `kitchen_l_2.json`
   - `kitchen_u_island.json`
   - etc.

2. Go to **Kitchen Visualizer > Import**
3. Enter the kitchen type matching your file (e.g., "kitchen_l_2")
4. Upload the JSON file
5. Check **Kitchen Visualizer > All Layers** to see imported data

### Test Export Function

1. After importing or adding data, go to **Kitchen Visualizer > Export**
2. Select a kitchen type
3. Click **Preview JSON** to view the generated JSON
4. Click **Download JSON** to save the file
5. Compare with your original JSON to verify format

## Troubleshooting

### Plugin Won't Activate

**Issue**: Error message when activating
**Solution**:
- Ensure you have WordPress 5.0+ and PHP 7.0+
- Check file permissions (folders: 755, files: 644)
- Verify all plugin files are present

### Database Table Not Created

**Issue**: Settings page shows no data
**Solution**:
- Deactivate and reactivate the plugin
- Check database user has CREATE TABLE privileges
- Manually run the SQL from `includes/class-kv-database.php`

### Import Fails

**Issue**: JSON import returns error
**Solution**:
- Verify JSON file is valid (use JSONLint.com)
- Check file format matches the example in the Import page
- Ensure `layerdata` array exists in JSON
- Check file upload size limits in PHP

### Images Not Uploading

**Issue**: Media upload button doesn't work
**Solution**:
- Ensure WordPress media library is functional
- Check if you're on the Add/Edit Layer page
- Verify JavaScript is enabled in browser
- Check browser console for errors

### Export Returns Empty

**Issue**: Export shows no data
**Solution**:
- Verify you have layers in the database for that kitchen type
- Check the filter settings on All Layers page
- Ensure kitchen type name matches exactly (case-sensitive)

## Uninstalling

### Safe Uninstall (Keeps Data)

1. Go to **Plugins > Installed Plugins**
2. Find "Kitchen Visualizer JSON Generator"
3. Click **Deactivate**
- This keeps all your data in the database

### Complete Uninstall (Removes Data)

1. Go to **Plugins > Installed Plugins**
2. Make sure the plugin is deactivated
3. Click **Delete**
- This removes the plugin files AND database tables
- **Warning**: All layer data will be permanently deleted
- Export your data first if you need to keep it!

## Backup Recommendations

Before making major changes:

1. **Export all kitchen types** to JSON files
2. **Backup your database** using phpMyAdmin or a backup plugin
3. Store JSON exports in a safe location

## Next Steps

1. **Import your existing JSON data** from the project
2. **Configure settings** (Kitchen Visualizer > Settings)
3. **Add new layers** as needed
4. **Export JSON files** for use in your Kitchen Visualizer application

## Support

If you encounter issues:
1. Check this installation guide
2. Review the README.md file
3. Verify WordPress and PHP versions meet requirements
4. Check WordPress debug.log for errors
5. Contact the developer with error details

## File Permissions

Recommended permissions:
- Folders: `755` (rwxr-xr-x)
- Files: `644` (rw-r--r--)
- wp-content/uploads: `755` (for image uploads)

## System Requirements

- WordPress: 5.0 or higher
- PHP: 7.0 or higher
- MySQL: 5.6 or higher
- Recommended: 64MB+ memory limit
- Max upload file size: 10MB+ (for JSON imports)
