LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_ingredients.csv' INTO TABLE Ingredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (aliasID, ingredientName);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_alias.csv' INTO TABLE IngredientsAlias FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (@aliasID, alias);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_directions.csv' INTO TABLE RecipeDirections FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, step, description);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_nutrition.csv' INTO TABLE RecipeNutritionInformation FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, calories, totalFat, sugar, sodium, protien, saturatedFat);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipe_ingredients.csv' INTO TABLE RecipeIngredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, ingredientID);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipe_tags.csv' INTO TABLE RecipeTags FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, tagID);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipes.csv' INTO TABLE Recipe FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, name, authorID, cookTime, date, description);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, userID, rating, date, review);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_users.csv' INTO TABLE Users FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (userID, firstName, lastName, email, phoneNumber, gender, birthday, dateJoined);

LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_tags.csv' INTO TABLE Tags FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (tagID, tag);
