import cv2
from pyzbar.pyzbar import decode
import requests

# Función para enviar el código de barras al servidor
def enviar_codigo_barras(code):
    # Cambia la dirección IP y el puerto según la configuración de tu servidor
    url = "http://192.168.1.100:5000/barcode"
    payload = {"code": code}
    try:
        requests.post(url, json=payload)
        print("Código de barras enviado exitosamente al servidor.")
    except Exception as e:
        print("Error al enviar el código de barras al servidor:", e)

# Función para capturar video desde la cámara
def capturar_video():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        cv2.imshow('Escaneo de Código de Barras', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        decoded_objects = decode(gray)
        for obj in decoded_objects:
            code = obj.data.decode('utf-8')
            print("Código de barras detectado:", code)
            enviar_codigo_barras(code)
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    capturar_video()
