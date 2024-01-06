import pyodbc

def database_connection():
    server = '192.168.0.12,1600' 
    username = 'sa'
    password = 'Maco2000'
    database_name = 'gammawatch' 
    db_connection_string = "Driver={ODBC Driver 17 for SQL Server};Server=" + server + ";Database=" + database_name + ";UID=" + username + ";PWD=" + password + ";"
    
    return pyodbc.connect(db_connection_string, autocommit=True)

def execute_query(sql_query):
    conn = database_connection()
    cursor = conn.cursor()
    cursor.execute(sql_query)
    
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    
    cursor.close()
    conn.close()

    return columns, rows

def test_connection():
    try:
        conn = database_connection()
        print("Connection successful!")
        conn.close()
    except Exception as e:
        print("Connection failed with error:", e)