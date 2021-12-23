use recipes_db;
SET
  FOREIGN_KEY_CHECKS = 0;
SET
  @tables = NULL;
SET
  GROUP_CONCAT_MAX_LEN = 32768;
SELECT
  GROUP_CONCAT('', table_schema, '.', table_name, '') INTO @tables
FROM
  information_schema.tables
WHERE
  table_schema = (
    SELECT
      DATABASE()
  );
SELECT
  IFNULL(@tables, '') INTO @tables;
SET
  @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt
FROM
  @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET
  FOREIGN_KEY_CHECKS = 1;
  CREATE TABLE Recipe (
    recipeID int PRIMARY KEY,
    name varchar(255),
    authorID int,
    cookTime int,
    date date,
    description mediumtext
  );
CREATE TABLE RecipeIngredients (
    recipeID int,
    ingredientID int,
    PRIMARY KEY (recipeID, ingredientID)
  );
CREATE TABLE RecipeTags (
    recipeID int,
    tagID int,
    PRIMARY KEY (recipeID, tagID)
  );
CREATE TABLE Tags (
    tagID int PRIMARY KEY,
    tag varchar(255)
  );
CREATE TABLE Ingredients (
    ingredientID int PRIMARY KEY,
    ingredientName varchar(255),
    aliasID int
  );
CREATE TABLE IngredientAlias (
    aliasID int PRIMARY KEY,
    alias varchar(255)
  );
CREATE TABLE Reviews (
    recipeID int,
    userID int,
    rating int,
    date date,
    review mediumtext,
    PRIMARY KEY (recipeID, userID)
  );
CREATE TABLE RecipeDirections (
    recipeID int,
    step int,
    description mediumtext,
    PRIMARY KEY (recipeID, step)
  );
CREATE TABLE RecipeNutritionInformation (
    recipeID int PRIMARY KEY,
    calories decimal,
    totalFat decimal,
    sugar decimal,
    sodium decimal,
    protien decimal,
    saturatedFat decimal
  );
CREATE TABLE Users (
    userID int PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255),
    phoneNumber varchar(255),
    gender varchar(255),
    birthday date,
    dateJoined date
  );
CREATE TABLE UserSavedRecipes (
    userID int,
    recipeID int,
    comment varchar(255),
    PRIMARY KEY (userID, recipeID)
  );
CREATE TABLE UserFollowing (
    userID int,
    followingUserID int,
    PRIMARY KEY (userID, followingUserID)
  );
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_ingredients.csv' INTO TABLE Ingredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (ingredientID, aliasID, ingredientName);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_alias.csv' INTO TABLE IngredientAlias FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (aliasID, alias);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_directions.csv' INTO TABLE RecipeDirections FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, step, description);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_nutrition.csv' INTO TABLE RecipeNutritionInformation FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (
    recipeID,
    calories,
    totalFat,
    sugar,
    sodium,
    protien,
    saturatedFat
  );
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipe_ingredients.csv' INTO TABLE RecipeIngredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, ingredientID);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipe_tags.csv' INTO TABLE RecipeTags FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, tagID);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_recipes.csv' INTO TABLE Recipe FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (
    recipeID,
    name,
    authorID,
    cookTime,
    date,
    description
  );
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (recipeID, userID, rating, date, review);
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_users.csv' INTO TABLE Users FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (
    userID,
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthday,
    dateJoined
  );
LOAD DATA LOCAL INFILE 'var/lib/mysql/PARSED_tags.csv' INTO TABLE Tags FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (tagID, tag);

DELETE FROM
  RecipeDirections
WHERE
  recipeID NOT IN (
    select
      recipeID
    from
      Recipe
  );
DELETE FROM
  RecipeNutritionInformation
WHERE
  recipeID NOT IN (
    select
      recipeID
    from
      Recipe
  );
DELETE FROM
  RecipeIngredients
WHERE
  recipeID NOT IN (
    select
      recipeID
    from
      Recipe
  );
DELETE FROM
  RecipeTags
WHERE
  recipeID NOT IN (
    select
      recipeID
    from
      Recipe
  );
DELETE FROM
  Reviews
WHERE
  recipeID NOT IN (
    select
      recipeID
    from
      Recipe
  );
ALTER TABLE
  Recipe
MODIFY
  COLUMN recipeID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE
  Tags
MODIFY
  COLUMN tagID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE
  Ingredients
MODIFY
  COLUMN ingredientID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE
  IngredientAlias
MODIFY
  COLUMN aliasID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE
  Users
MODIFY
  COLUMN userID INT NOT NULL AUTO_INCREMENT;
ALTER TABLE
  Recipe
ADD
  FOREIGN KEY (authorID) REFERENCES Users (userID);
ALTER TABLE
  RecipeIngredients
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID) ON DELETE CASCADE;
ALTER TABLE
  RecipeIngredients
ADD
  FOREIGN KEY (ingredientID) REFERENCES Ingredients (ingredientID);
ALTER TABLE
  RecipeTags
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID) ON DELETE CASCADE;
ALTER TABLE
  RecipeTags
ADD
  FOREIGN KEY (tagID) REFERENCES Tags (tagID);
ALTER TABLE
  Ingredients
ADD
  FOREIGN KEY (aliasID) REFERENCES IngredientAlias (aliasID);
ALTER TABLE
  Reviews
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID) ON DELETE CASCADE;
ALTER TABLE
  Reviews
ADD
  FOREIGN KEY (userID) REFERENCES Users (userID);
ALTER TABLE
  RecipeDirections
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID) ON DELETE CASCADE;
ALTER TABLE
  RecipeNutritionInformation
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID) ON DELETE CASCADE;
ALTER TABLE
  UserSavedRecipes
ADD
  FOREIGN KEY (userID) REFERENCES Users (userID);
ALTER TABLE
  UserSavedRecipes
ADD
  FOREIGN KEY (recipeID) REFERENCES Recipe (recipeID);
ALTER TABLE
  UserFollowing
ADD
  FOREIGN KEY (userID) REFERENCES Users (userID);
ALTER TABLE
  UserFollowing
ADD
  FOREIGN KEY (followingUserID) REFERENCES Users (userID);

CREATE INDEX recipeIdx ON Recipe(name, cookTime, rating);
CREATE INDEX reviewIdx ON Reviews(rating, date);
CREATE INDEX userIdx ON Users(firstName, lastName);