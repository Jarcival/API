from flask import Flask, request, jsonify

app = Flask(__name__)

# Ruta para manejar solicitudes POST
@app.route('/api', methods=['POST'])
def handle_post():
    # Obtener los datos enviados en la solicitud POST
    data = request.json
    date = data.get('date')

    # Simular una respuesta (puedes modificarla según tus necesidades)
    response_data = {
        'message': f'Recibida la fecha: {date}',
        'status': 'success'
    }

    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(port=5000)  # Ejecutar en el puerto 5000