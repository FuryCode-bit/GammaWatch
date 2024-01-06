# Flask
from flask import Flask, render_template, request, jsonify
from database.connection import test_connection, database_connection, execute_query
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="./build", static_url_path="/")
cors = CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})

@app.route("/")
def hello_world():
        return app.send_static_file("index.html")

@app.route("/testConnection")
def hello_world2():
        test_connection()
        return "<h2>Posta de Bacalhau!</h2>"

@app.route("/estacoes")
@cross_origin(origin='*',headers=['Content-Type'])
def main():
    resultado = []
    conn = database_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM dbo.Estacao")
    columns = [column[0] for column in cursor.description]
    
    for row in cursor.fetchall():
        resultado.append(dict(zip(columns, row)))

    conn.close()
    return jsonify(resultado)

@app.route("/estacaoById", methods=['GET', 'POST'])
@cross_origin(origin='*',headers=['Content-Type'])
def estacaoById():
    try:
        obj = request.json
        print(obj['id'])
        ide = obj['id']
        
        conn = database_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM Estacao WHERE IDE = ?"
        cursor.execute(query, ide)

        rows = cursor.fetchall()

        # Get column names from cursor.description
        columns = [col[0] for col in cursor.description]

        # Convert rows into a list of dictionaries
        result = []
        for row in rows:
            result.append(dict(zip(columns, row)))

        conn.close()

        return jsonify(result)
    except Exception as e:
        print(e)

@app.route("/LeiturasEstacao", methods=['GET', 'POST'])
@cross_origin(origin='*',headers=['Content-Type'])
def get_leituras_estacao():
    try:
        obj = request.json["id"]
        ide = obj["IDE"]
        
        conn = database_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM Leitura WHERE IDE = ? ORDER BY CONVERT(DATE, dia, 103);"
        cursor.execute(query, ide)
        
        columns = [column[0] for column in cursor.description]
        leituras = []
        for row in cursor.fetchall():
            leituras.append(dict(zip(columns, row)))

        conn.close()
        return jsonify(leituras)
    except Exception as e:
        print(e)
    
@app.route("/sensoresEstacao", methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type'])
def get_sensores_estacao():
    try:
        obj = request.json["id"]
        ide = obj['IDE']
        conn = database_connection()
        cursor = conn.cursor()

        # Query para buscar informações dos sensores associados à estação
        query = """
        SELECT S.IDE, S.IDS, TS.modelo, TS.max_sensibilidade, TS.min_sensibilidade,
               TS.max_gama_radiacao, TS.min_gama_radiacao, FL.frequencia
        FROM Sensor S
        JOIN TipoSensor TS ON S.IDTS = TS.IDTS
        JOIN FreqLeitura FL ON S.IDF = FL.IDF
        WHERE S.IDE = ?
        """
        cursor.execute(query, ide)
        print("Query executed!")
        columns = [column[0] for column in cursor.description]
        sensores = []
        for row in cursor.fetchall():
            sensores.append(dict(zip(columns, row)))
        conn.close()
        return jsonify(sensores)
    except Exception as e:
        print(e)

@app.route("/alertasEstacao", methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type'])
def get_alertas_estacao():
    try:
        obj = request.json["id"]
        ide = obj['IDE']
        conn = database_connection()
        cursor = conn.cursor()

        # Query para buscar informações dos sensores associados à estação
        query = """
            SELECT L.IDS, L.valor, A.hora, A.dia, L.IDNR, STRING_AGG(Ac.descricao_accao, ', ') AS descricao_accao_list
            FROM [gammawatch].[dbo].[Leitura] AS L
            INNER JOIN [gammawatch].[dbo].[Alerta] AS A ON L.IDS = A.IDS AND L.IDE = A.IDE AND L.dia = A.dia AND L.hora = A.hora
            INNER JOIN [gammawatch].[dbo].[AcoesTomar] AS Act ON A.IDNA = Act.IDNA
            INNER JOIN [gammawatch].[dbo].[Accao] AS Ac ON Act.IDA = Ac.IDA
            WHERE A.IDE = ?
            GROUP BY L.valor, A.hora, A.dia, L.IDNR, L.IDS;
        """
        cursor.execute(query, ide)
        print("Query executed!")
        columns = [column[0] for column in cursor.description]
        alertas = []
        for row in cursor.fetchall():
            alertas.append(dict(zip(columns, row)))
        conn.close()
        return jsonify(alertas)
    except Exception as e:
        print(e)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@app.errorhandler(404)
def catch_all(path):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(debug=True)
