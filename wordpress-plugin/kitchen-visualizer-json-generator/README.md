# Kitchen Visualizer JSON Generator

A WordPress plugin that allows you to manage and generate JSON files for kitchen visualizer applications. This plugin provides a complete admin interface for managing cabinet types, textures, wall colors, and other kitchen design elements.

## Features

- **Database Management**: Store all layer data in WordPress database with full CRUD operations
- **Import/Export**: Import existing JSON files and export to the Kitchen Visualizer JSON format
- **Admin Interface**: User-friendly interface for managing layers with filtering and search
- **Multiple Kitchen Types**: Support for different kitchen layouts (L-shape, U-shape, I-shape, etc.)
- **Cabinet Categories**: Organize layers by cabinet type (Wall Cabinets, Base Cabinets, Wall Colors, etc.)
- **Media Upload**: Built-in WordPress media uploader integration for images
- **JSON Preview**: Preview generated JSON before downloading
- **Bulk Import**: Import multiple layers from existing JSON files

## Installation

### Method 1: Direct Installation

1. Download the plugin folder `kitchen-visualizer-json-generator`
2. Upload it to your WordPress installation's `/wp-content/plugins/` directory
3. Go to WordPress Admin > Plugins
4. Find "Kitchen Visualizer JSON Generator" and click "Activate"

### Method 2: ZIP Installation

1. Compress the `kitchen-visualizer-json-generator` folder into a ZIP file
2. Go to WordPress Admin > Plugins > Add New
3. Click "Upload Plugin"
4. Choose the ZIP file and click "Install Now"
5. Click "Activate Plugin"

## Usage

### Adding Layers

1. Go to **Kitchen Visualizer > Add New Layer**
2. Fill in the required fields:
   - **Item ID**: Unique numeric identifier
   - **Texture Name**: Display name (e.g., "Kb Shaker Gray")
   - **Cabinet Type**: Select from dropdown (Wall Cabinets, Base Cabinets, etc.)
   - **Kitchen Type**: Kitchen layout identifier (e.g., "kitchen_l_2")
   - **PNG Layer URL**: Path to the main layer image
   - **PNG Layer Name**: Internal layer identifier
   - **Texture URL**: Path to the thumbnail/preview image
   - **Main Background ID**: Default is 130
   - **Sort Order**: Order in which items appear
3. Click "Add Layer" or "Update Layer"

### Importing Data

1. Go to **Kitchen Visualizer > Import**
2. Enter the Kitchen Type identifier
3. Choose your JSON file (must match the Kitchen Visualizer format)
4. Click "Import JSON"

### Exporting Data

1. Go to **Kitchen Visualizer > Export**
2. Select a kitchen type
3. Click "Download JSON" to save the file
4. Or click "Preview JSON" to view the JSON in your browser

### Managing Layers

1. Go to **Kitchen Visualizer > All Layers**
2. Use filters to find specific layers by kitchen type or cabinet type
3. Click "Edit" to modify a layer
4. Click "Delete" to remove a layer

## JSON Format

The plugin generates JSON files in the following format:

```json
{
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
    }
  ]
}
```

## Database Structure

The plugin creates a table `wp_kv_layer_data` with the following fields:

- `id` - Auto-increment primary key
- `item_id` - Item ID used in JSON export
- `selected` - Boolean for default selection
- `texture_name` - Display name of the texture
- `cabinet_type_name` - Category (Wall Cabinets, Base Cabinets, etc.)
- `png_layer_url` - Path to main layer image
- `png_layer_name` - Internal layer identifier
- `texture_url` - Path to thumbnail image
- `main_background_id` - Background identifier
- `kitchen_type` - Kitchen layout identifier
- `sort_order` - Display order
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Settings

Configure default values in **Kitchen Visualizer > Settings**:

- **Default Main Background ID**: Default value for new layers
- **Export Directory**: Custom directory for saved exports

## Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- MySQL 5.6 or higher

## File Structure

```
kitchen-visualizer-json-generator/
├── assets/
│   ├── css/
│   │   └── admin.css
│   └── js/
│       └── admin.js
├── includes/
│   ├── class-kv-activator.php
│   ├── class-kv-admin.php
│   ├── class-kv-ajax.php
│   ├── class-kv-database.php
│   ├── class-kv-deactivator.php
│   ├── class-kv-download.php
│   └── class-kv-export.php
├── templates/
│   ├── admin-add.php
│   ├── admin-export.php
│   ├── admin-import.php
│   ├── admin-list.php
│   └── admin-settings.php
├── kitchen-visualizer-json-generator.php
├── uninstall.php
└── README.md
```

## Support

For issues, questions, or feature requests, please contact the plugin developer.

## License

This plugin is licensed under GPL-2.0+

## Changelog

### Version 1.0.0
- Initial release
- Full CRUD operations for layer data
- Import/Export functionality
- Admin interface with filtering
- Media upload integration
- JSON preview feature
