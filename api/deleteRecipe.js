const {writeRecipeToFile}=require("./addRecipe");
const { getRecipe } = require("./getRecipe");

function deleteRecipe(RecipeId, callback) {

    getRecipe((err, Recipe) => {
        if (err) return callback(err);
        const index = Recipe.findIndex(Recipe => Recipe.id === parseInt(RecipeId));
        console.log("Index:", index);

        if (index === -1) {
            return callback(new Error('Recipe not found'));
        }
        Recipe.splice(index, 1);
        writeRecipeToFile(Recipe, callback);
    });
}
module.exports={deleteRecipe}