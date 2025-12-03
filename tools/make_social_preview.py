from PIL import Image
import sys

IN = 'images/mi-foto.jpg'
OUT = 'images/social-preview.jpg'
TARGET_W, TARGET_H = 1200, 630

try:
    img = Image.open(IN).convert('RGB')
except FileNotFoundError:
    print(f"Error: archivo fuente no encontrado: {IN}")
    sys.exit(1)

src_w, src_h = img.size

# Scale to cover target (similar to CSS background-size: cover)
scale = max(TARGET_W / src_w, TARGET_H / src_h)
new_w = int(src_w * scale)
new_h = int(src_h * scale)
img = img.resize((new_w, new_h), Image.LANCZOS)

# Center crop
left = (new_w - TARGET_W) // 2
top = (new_h - TARGET_H) // 2
right = left + TARGET_W
bottom = top + TARGET_H
img = img.crop((left, top, right, bottom))

# Save
img.save(OUT, format='JPEG', quality=85)
print(f"Guardado: {OUT} ({TARGET_W}x{TARGET_H})")
