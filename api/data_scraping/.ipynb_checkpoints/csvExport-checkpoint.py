import mysql.connector
import csv


db_config = {
    'host': 'localhost',    
    'user': 'ivy',        
    'password': '',           
    'database': 'Soridata_kpop_db' 
}

def get_db_connection():
    """Establish connection to the MySQL database."""
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def export_to_csv(query, filename):
    """Exports data from the database to a CSV file."""
    conn = get_db_connection()
    
    if conn is None:
        print("Failed to connect to the database.")
        return
    
    cursor = conn.cursor()
    
    try:
        cursor.execute(query)
        rows = cursor.fetchall()

        # get col names
        columns = [column[0] for column in cursor.description]

        # write to csv
        with open(filename, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(columns)  # column headers
            writer.writerows(rows)    # rows
        
        print(f"Data exported to {filename} successfully.")
    
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        conn.close()


queryAll = """
    SELECT s.original_name, s.vlink, s.releasedate, g.members, g.name AS group_name 
    FROM app_kpop s, app_kpop_group g 
    WHERE s.id_artist = g.id AND s.original_name LIKE '%dance practice%';
    """
queryGG = """
    SELECT s.original_name, s.vlink, s.releasedate, g.name AS group_name 
    FROM app_kpop s, app_kpop_group g 
    WHERE s.id_artist = g.id AND s.original_name LIKE '%dance practice%' AND g.members='female';
    """
queryBG = """
    SELECT s.original_name, s.vlink, s.releasedate, g.name AS group_name 
    FROM app_kpop s, app_kpop_group g 
    WHERE s.id_artist = g.id AND s.original_name LIKE '%dance practice%' AND g.members='male';
    """

export_to_csv(queryAll, "allDances.csv")
export_to_csv(queryGG, "ggDances.csv")
export_to_csv(queryBG, "bgDances.csv")




