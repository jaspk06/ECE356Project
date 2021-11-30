# ECE 356 Project

## Contents
  - [Get Started](#get-started)
  - [Features](#features)

# Get Started

**You will need to set up Docker to run this code!**

To run the code locally, follow the steps below  
1. Run `git clone git@github.com:jaspk06/ECE356Project.git` make sure you have your SSH key set up
2. `cd` into the project repository  
3. Run `docker-compose up -d` from the project root directory to run the development environment. This will create a mysql db container and node client container.
4. Go into the client-app container by running `docker exec -it client-app bash`.
5. Within the container, you can now run `yarn dev-load` to run the csv data insertion script or `yarn dev` to run the server.

If you are missing the CSV data files
1. Download [recipe.csv](https://www.kaggle.com/kanaryayi/recipe-ingredients-and-reviews?select=recipes.csv) and [review.csv](https://www.kaggle.com/kanaryayi/recipe-ingredients-and-reviews?select=reviews.csv) from the dataset
2. Move it to the directory `ECE356Project/client-app/data/*.csv`

This is what your directory tree should look like:
```
├── client-app
│   ├── data
│   │   ├── *.csv
│   ├── src
│   │   ├── ...
│   ├── ...
```


# Features

- Use [mysql2](https://github.com/sidorares/node-mysql2) to make queries
- Use [csv-parse](https://github.com/adaltas/node-csv) to parse data
- Nodemon enables hot-reloading on the dev env

