import time
from urllib.request import urlopen
from urllib.error import URLError, HTTPError

URL='https://jesuuscallejaas.github.io/'
TARGET='social-preview.jpg'

for i in range(1,11):
    try:
        with urlopen(URL, timeout=10) as r:
            html = r.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Intento {i}: error al conectar: {e}")
        html=''
    if TARGET in html:
        print(f"Intento {i}: encontrado '{TARGET}' en la página.")
        break
    else:
        print(f"Intento {i}: aún no actualizado. Esperando 10s...")
        time.sleep(10)
else:
    print(f"No se detectó '{TARGET}' después de varios intentos.")
