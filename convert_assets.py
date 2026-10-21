import os
import sys
import json
import re
from concurrent.futures import ThreadPoolExecutor

try:
    from PIL import Image
except ImportError:
    print("PIL (Pillow) is not installed. Please run 'pip install pillow' first.")
    sys.exit(1)

# Directories and files
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(WORKSPACE_DIR, 'public', 'assets')

def convert_image(file_path):
    """Converts a single image file to webp format."""
    ext = os.path.splitext(file_path)[1].lower()
    if ext not in ['.png', '.jpg', '.jpeg']:
        return None
    
    webp_path = os.path.splitext(file_path)[0] + '.webp'
    
    try:
        with Image.open(file_path) as im:
            # We save with quality 85 which provides an excellent quality to size ratio.
            # WebP natively supports transparency (alpha channel).
            im.save(webp_path, 'WEBP', quality=85)
        
        # Calculate size reduction
        orig_size = os.path.getsize(file_path)
        new_size = os.path.getsize(webp_path)
        reduction = (orig_size - new_size) / (1024 * 1024) # MB
        percent = (orig_size - new_size) / orig_size * 100
        
        print(f"Converted: {os.path.relpath(file_path, WORKSPACE_DIR)} -> .webp "
              f"({orig_size/(1024*1024):.2f}MB to {new_size/(1024*1024):.2f}MB, "
              f"Saved: {reduction:.2f}MB, -{percent:.1f}%)")
        return file_path
    except Exception as e:
        print(f"Error converting {file_path}: {e}")
        return None

def update_json_files():
    """Finds all JSON files in the workspace root and updates PNG/JPG paths to WebP."""
    json_files = [f for f in os.listdir(WORKSPACE_DIR) if f.endswith('.json')]
    
    print("\nUpdating image paths in JSON configurations...")
    for jf in json_files:
        json_path = os.path.join(WORKSPACE_DIR, jf)
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find and replace extensions inside /assets/ paths.
            # Match paths like /assets/.../filename.png or /assets/.../filename.jpg
            # We match patterns like "/assets/[^"]+\.(png|jpg|jpeg)"
            def replace_match(match):
                path = match.group(0)
                # Replace the extension with .webp, retaining the trailing quote
                new_path = re.sub(r'\.(png|jpg|jpeg)(")$', r'.webp\2', path, flags=re.IGNORECASE)
                return new_path
            
            pattern = r'"[^"]*assets/[^"]+\.(?:png|jpg|jpeg)"'
            updated_content, count = re.subn(pattern, replace_match, content, flags=re.IGNORECASE)
            
            if count > 0:
                with open(json_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"Updated {jf}: replaced {count} image paths.")
            else:
                print(f"No asset path changes needed for {jf}.")
        except Exception as e:
            print(f"Error updating JSON file {jf}: {e}")

def delete_old_images(converted_files):
    """Deletes the original PNG/JPG files that were successfully converted."""
    print("\nCleaning up original PNG/JPG files...")
    deleted_count = 0
    for file_path in converted_files:
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
                deleted_count += 1
            except Exception as e:
                print(f"Failed to delete {file_path}: {e}")
    print(f"Deleted {deleted_count} original images.")

def main():
    print(f"Scanning assets directory: {ASSETS_DIR}")
    
    image_files = []
    for root, dirs, files in os.walk(ASSETS_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.png', '.jpg', '.jpeg']:
                image_files.append(os.path.join(root, file))
                
    total_files = len(image_files)
    print(f"Found {total_files} image files to convert.")
    
    if total_files == 0:
        print("No images found to convert. Running JSON path updates just in case.")
        update_json_files()
        return

    # Use ThreadPoolExecutor to run conversions in parallel
    print("Starting parallel conversion...")
    converted_files = []
    with ThreadPoolExecutor(max_workers=os.cpu_count() or 4) as executor:
        results = executor.map(convert_image, image_files)
        for res in results:
            if res:
                converted_files.append(res)
                
    print(f"\nSuccessfully converted {len(converted_files)} / {total_files} images.")
    
    # Update JSON references
    update_json_files()
    
    # Delete original large files to free up space
    if len(converted_files) > 0:
        delete_old_images(converted_files)

if __name__ == '__main__':
    main()
