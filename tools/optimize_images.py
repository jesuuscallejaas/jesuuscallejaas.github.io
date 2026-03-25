from PIL import Image
from pathlib import Path

BASE = Path(__file__).resolve().parents[1] / 'images'

CONFIG = {
    'mi-foto.jpg': [400, 800, 1200],
    'social-preview.jpg': [600, 1200]
}

OUT_QUALITY = 85

for fname, sizes in CONFIG.items():
    src = BASE / fname
    if not src.exists():
        print(f"Source not found: {src}")
        continue
    with Image.open(src) as im:
        for w in sizes:
            # calculate height keeping aspect
            ratio = w / im.width
            h = int(im.height * ratio)
            out_jpg = BASE / f"{src.stem}-{w}.jpg"
            out_webp = BASE / f"{src.stem}-{w}.webp"
            resized = im.resize((w, h), Image.LANCZOS)
            resized.save(out_jpg, format='JPEG', quality=OUT_QUALITY, optimize=True)
            resized.save(out_webp, format='WEBP', quality=OUT_QUALITY)
            print(f"Wrote: {out_jpg} and {out_webp}")

print('Done')
