from PIL import Image
import os, sys
p='images/social-preview.jpg'
if not os.path.exists(p):
    print('No existe:', p)
    sys.exit(1)
im=Image.open(p)
w,h=im.size
s=os.path.getsize(p)
print(f'{p} -> {w}x{h}, {s} bytes')
