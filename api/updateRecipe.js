const {writeRecipeToFile}=require("./addRecipe")
const {getRecipe}=require("./getRecipe")
function updateRecipe(updatedRecipe, callback) {
    getRecipe((err, Recipe) => {
        if (err) return callback(err);
        const index = Recipe.findIndex(Recipe => Recipe.id === updatedRecipe.id);
        if (index === -1) {
            return callback(new Error('Recipe not found'));
        }
        Recipe[index] = updatedRecipe;
        writeRecipeToFile(Recipe, callback);
    });
}
module.exports={updateRecipe}