import csv
import requests 

def getCoordinates(city):

    api_url = 'https://api.api-ninjas.com/v1/geocoding?city={}'.format(city)
    params = {'city': city, 'country': "PT", 'limit': '1'}
    headers = {'X-Api-Key': 'xxxxxxxxxxxxxxxxxxx'}
    response = requests.get(api_url, params=params, headers=headers)    

    latitude = 0.0
    longitude = 0.0

    if response.status_code == requests.codes.ok:
        print("\n", city, ":")
        data = response.json()
        if data:  # Check if data is not empty
            location = data[0]  # Access the first element of the list

            return location["latitude"], location["longitude"], city
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

    # Nomes das estações
    stations = data[0][1:]

    print("Estações: ", stations)

    # Create INSERT INTO statements for Estacao 
    for idx, station in enumerate(stations, start=1):

        if '(estacao submersa)' in station.lower():
            # Remove '(estacao submersa)' from the station name
            station = station.replace('(estacao submersa)', '').strip()
            latitude, longitude, city = getCoordinates(station)
            # tipo estacao permanente - submersa
            tipoEstacao = 2
        else:
            latitude, longitude, city = getCoordinates(station)
            # tipo estacao permanente - fixa
            tipoEstacao = 1

        sql_script += f"INSERT INTO Estacao (IDE, latitude, longitude, morada, codigoPostal, data_instalacao, tipo) VALUES ({idx}, '{latitude}', '{longitude}', '{city}', '0000-111','2022-01-01', {tipoEstacao});\n"

    # Create INSERT INTO statements for Sensor and Leitura
    for idx, station in enumerate(stations, start=1):
        for sensor_id in range(1, 3):
            sql_script += f"INSERT INTO Sensor (IDS, IDE, IDTS, IDF) VALUES ({sensor_id}, {idx}, {sensor_id}, 3);\n"

    for row in data[1:]:
        date_time = row[0].strip('"')
        date, time = date_time.split(" ")
        radiation_values = row[1:]

        for idx, value in enumerate(radiation_values, start=1):
            if value.strip():  # Check if the value is not empty or whitespace
                # Use the converted value_in_mSv in your SQL INSERT statement
                sql_script += f"EXEC InsertRadiationReading {value}, '{date}', '{time}', {idx};\n"
    return sql_script

meses = [
    "ValoresTP_Janeiro", "ValoresTP_Fevereiro", "ValoresTP_Marco", "ValoresTP_Abril", "ValoresTP_Maio", "ValoresTP_Junho",
    "ValoresTP_Julho", "ValoresTP_Agosto", "ValoresTP_Setembro", "ValoresTP_Outubro", "ValoresTP_Novembro", "ValoresTP_Dezembro"
]

# Generate .sql files for every element in the list
for nome_ficheiro in meses:
    # Generate sql inserts
    sql_inserts = generate_sql_inserts(f"{nome_ficheiro}.csv")
    
    nome_arquivo_sql = f"{nome_ficheiro}.sql"
    
    with open(nome_arquivo_sql, 'w') as sql_file:
        sql_file.write(sql_inserts)
    
    print(f"Arquivo {nome_arquivo_sql} gerado com sucesso!")

print("Todos os arquivos .sql foram gerados!")