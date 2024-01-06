import csv
import requests 
# Está a fazer a leitura do CSV corretamente, no entanto é necessário criar regras por estação

## Estação x: lê com determinada frequencia
## Tipo
## Morada e Coordenadas

## Sensor: Frequencia de envio de dados
## Tipo
## Intervalos de Leitura

def getCoordinates(city):

    api_url = 'https://api.api-ninjas.com/v1/geocoding?city={}'.format(city)
    api_url = 'https://api.api-ninjas.com/v1/geocoding?city={}'.format(city)
    params = {'city': city, 'country': "PT", 'limit': '1'}
    headers = {'X-Api-Key': 'pvn8OQpvv4txewdZW8L8EA==LtGumDYuRL1vjRoW'}
    response = requests.get(api_url, params=params, headers=headers)    

    latitude = 0.0
    longitude = 0.0

    if response.status_code == requests.codes.ok:
        print("\n", city, ":")
        data = response.json()
        if data:  # Check if data is not empty
            location = data[0]  # Access the first element of the list
            latitude = location["latitude"]
            longitude = location["longitude"]
            print(f"Latitude: {latitude}, Longitude: {longitude}")
            return latitude, longitude, city
        else:
            print("No data received for the city:", city)
            return 0, 0, city
    else:
        print("Error:", response.status_code, response.text)
        return None, None


def generate_sql_inserts(csv_file):

    with open(csv_file, 'r') as file:
        reader = csv.reader(file, delimiter=';')
        data = list(reader)

    sql_script = ''

#     # Nomes das estações
#     stations = data[0][1:]

#     print("Estações: ", stations)

#     # Create INSERT INTO statements for Estacao 
#     for idx, station in enumerate(stations, start=1):

#         if '(estacao submersa)' in station.lower():
#             # Remove '(estacao submersa)' from the station name
#             station = station.replace('(estacao submersa)', '').strip()
#             latitude, longitude, city = getCoordinates(station)
#             # tipo estacao permanente - submersa
#             tipoEstacao = 2
#         else:
#             latitude, longitude, city = getCoordinates(station)
#             # tipo estacao permanente - fixa
#             tipoEstacao = 1

#         sql_script += f"INSERT INTO Estacao (IDE, latitude, longitude, morada, codigoPostal, data_instalacao, tipo) VALUES ({idx}, '{latitude}', '{longitude}', '{city}', '2745-373','2022-01-01', {tipoEstacao});\n"

# # Create INSERT INTO statements for Sensor and Leitura
#     for idx, station in enumerate(stations, start=1):
#         for sensor_id in range(1, 3):
#             sql_script += f"INSERT INTO Sensor (IDS, IDE, IDTS, IDF) VALUES ({sensor_id}, {idx}, {sensor_id}, 3);\n"

    for row in data[1:]:
        date_time = row[0].strip('"')  # Remove quotes around the date-time string
        date, time = date_time.split(" ")
        radiation_values = row[1:]

        for idx, value in enumerate(radiation_values, start=1):
            if value.strip():  # Check if the value is not empty or whitespace
                # # Convert nSv to mSv before inserting into the database
                # value_in_mSv = float(value) / 1000000.0  # Convert from nSv to mSv

                # # if value_in_mSv >= 0.00001 and value_in_mSv <= 2:
                # #     tipo_sensor = 1
                # #     ids = 1
                # # elif value_in_mSv > 2 and value_in_mSv <= 10000:
                # #     tipo_sensor = 2
                # #     ids = 2
                    
                # # Verifica em qual intervalo o valor se encaixa e atualiza o nivel_radiacao correspondente
                # if value_in_mSv >= 6000:
                #     # Acute Radiation Poisoning
                #     nivel_radiacao = 7
                # elif value_in_mSv >= 3000 and value_in_mSv < 6000:
                #     # dose received by Chernobyl workers
                #     nivel_radiacao = 6
                # elif value_in_mSv >= 1000 and value_in_mSv < 3000:
                #     # Survival rate of 50%
                #     nivel_radiacao = 5
                # elif value_in_mSv >= 700 and value_in_mSv < 1000:
                #     # Vomiting Hair loss within 2-3 weeks
                #     nivel_radiacao = 4
                # elif value_in_mSv >= 250 and value_in_mSv < 700:
                #     # Allowable Short Term dose for workers controlling 2011 Fukushima Accident
                #     nivel_radiacao = 3
                # elif value_in_mSv >= 100 and value_in_mSv < 250:
                #     # Lowest Level linked to increased Cancer Risk  
                #     nivel_radiacao = 2
                # elif value_in_mSv >= 10 and value_in_mSv < 100:
                #     # Average Limit for nuclear industry workers
                #     nivel_radiacao = 1
                # elif value_in_mSv >= 0 and value_in_mSv < 10:
                #     # Full body CT Scan
                #     nivel_radiacao = 0

                # Use the converted value_in_mSv in your SQL INSERT statement
                sql_script += f"EXEC InsertRadiationReading {value}, '{date}', '{time}', {idx};\n"
                
    return sql_script

# Sua lista de ficheiros
meses = [
    "ValoresTP_Janeiro", "ValoresTP_Fevereiro", "ValoresTP_Marco", "ValoresTP_Abril", "ValoresTP_Maio", "ValoresTP_Junho",
    "ValoresTP_Julho", "ValoresTP_Agosto", "ValoresTP_Setembro", "ValoresTP_Outubro", "ValoresTP_Novembro", "ValoresTP_Dezembro", "minas"
]

# Gerar e escrever os arquivos .sql para cada elemento da lista
for nome_ficheiro in meses:
    # Gerar os SQL inserts para o nome do ficheiro atual
    sql_inserts = generate_sql_inserts(f"{nome_ficheiro}.csv")
    
    # Nome do arquivo .sql a ser gerado
    nome_arquivo_sql = f"{nome_ficheiro}.sql"
    
    # Escrever os SQL inserts no arquivo .sql
    with open(nome_arquivo_sql, 'w') as sql_file:
        sql_file.write(sql_inserts)
    
    print(f"Arquivo {nome_arquivo_sql} gerado com sucesso!")

print("Todos os arquivos .sql foram gerados!")