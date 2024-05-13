const fs = require('fs');
const filePath = 'recipe.json';

function getRecipe(callback) {
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, []);
            } else {
                return callback(err);
            }
        }
        try {
            const recipe = JSON.parse(data);
            console.log(recipe)
            callback(null, recipe);
        } catch (parseError) {
            callback(parseError);
        }
    });
}
module.exports={getRecipe}
