const filePath = 'recipe.json';
const {getRecipe}=require("./getRecipe")
const fs=require("fs")

function addRecipe(newRecipe, callback) {
    getRecipe((err, recipe) => {
        if (err) return callback(err);
        recipe.push(newRecipe);
        writeRecipeToFile(recipe, callback);
    });
}
function writeRecipeToFile(recipe, callback) {
    const json = JSON.stringify(recipe, null, 2);
    fs.writeFile(filePath, json, 'utf8', callback);
}
module.exports={addRecipe,writeRecipeToFile}
