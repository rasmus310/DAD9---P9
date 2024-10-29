import mysql.connector
from mysql.connector import errorcode

def get_database_connection():
    try:
        # Establish a database connection
        cnx = mysql.connector.connect(
            user='scotty',
            password='doesnt know',
            host='127.0.0.1',
            database='dont tell scotty'
        )
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None

def search_filter(query):
    cnx = get_database_connection()
    if cnx is None:
        return []

    cursor = cnx.cursor()
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return []
    finally:
        cursor.close()
        cnx.close()

# This is an example of how to use the search_filter function
query = "SELECT * FROM your_table WHERE your_column LIKE '%search_term%'"
results = search_filter(query)
for row in results:
    print(row)

