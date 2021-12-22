
# ECE 356 Project

  

## Contents

-  [Get Started](#get-started)

-  [Features](#features)

  

# Get Started

  

**You will need to set up Docker to run this code!**

  

To run the code locally, follow the steps below

1. Run `git clone git@github.com:jaspk06/ECE356Project.git` make sure you have your SSH key set up

2.  `cd` into the project repository

3. Run `docker-compose up -d` from the project root directory to run the development environment. This will create a mysql db container on `localhost:3306`, nodejs server container, and React UI on `localhost:3000`.

4. Go into the client-app container by running `docker exec -it client-app bash`.

5. Within the container, you can now run `yarn dev-load` to run the csv data insertion script or `yarn dev` to run the Express server on `localhost:8080`.

  

## If you are missing the CSV data files

Locally parsing the dataset:
1. Download [PP_recipes.csv](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=PP_recipes.csv), [PP_users.csv](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=PP_users.csv), [RAW_interactions.csv](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_interactions.csv), [RAW_recipes.csv](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv), and parsed [ingr_map.pkl](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=ingr_map.pkl) from the dataset

2. Move it to the directory `ECE356Project/client-app/data/*.csv`
3. Go into the client-app container using `docker exec -it client-app bash` and run `yarn process-data` to process the dataset CSV files.

OR

[Download the parsed CSV files](https://drive.google.com/drive/folders/1D_Vd6cjL7tTgIL8spZp-c6kjpFtAEhtG?usp=sharing)

This is what your directory tree should look like:

```

├── client-app

│ ├── data

│ │ ├── *.csv

│ ├── src

│ │ ├── ...

│ ├── ...

```

[Click here](https://dbdiagram.io/d/61a168448c901501c0d4b260) to view the diagram of the schema

  ## Loading Data
In order to populate the database with the CSVs, they must be moved to inside the container of the MySQL instance. To achieve this, run the command 
`sh copytodocker.sh`.

After all the appropriate CSVs have been copied, they can be loaded. For our environment, we can use the command 

    LOAD DATA LOCAL INFILE 'var/lib/mysql/<CSV_NAME>.csv' INTO TABLE <TABLE_NAME> FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (col [,col...]);
For example, loading ingredients would look like

    LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_ingredients.csv' INTO TABLE Ingredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (aliasID, ingredientName);
    
Refer to [this guide](https://stackoverflow.com/a/60717467/13013612) to enable file loading. After logging into the MySQL CLI with file loading enabled, run `createtables.sql`

# Features

  

- Use [mysql2](https://github.com/sidorares/node-mysql2) to make queries

- Use [csv-parse](https://github.com/adaltas/node-csv) to parse data

- Express for the server to handle HTTP requests from the front end

- Nodemon enables hot-reloading on the dev env
