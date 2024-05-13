const http = require("http");
const url = require("url");
const {getRecipe} = require("./api/getRecipe");
const {addRecipe} = require("./api/addRecipe");
const {updateRecipe} = require("./api/updateRecipe");
const {deleteRecipe} = require("./api/deleteRecipe");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const { pathname } = reqUrl;
  if (req.method === "GET" && pathname === "/getRecipe") {
    getRecipe((err, Recipe) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log(Recipe)
      res.end(JSON.stringify(Recipe));
    });
} else if (req.method === "POST" && pathname === "/addRecipe") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newRecipe = JSON.parse(body);
      console.log("NewRecipe" + JSON.stringify(newRecipe))
      addRecipe(newRecipe, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err.message }));
          return;
        }
        res.writeHead(201, { "Content-Type": "application/json" });

        res.end(JSON.stringify(newRecipe));
      });
    });
} else if (req.method === "PUT" && pathname.startsWith("/updateRecipe/")) {
    const RecipeId = parseInt(pathname.split("/").pop());
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedRecipe = JSON.parse(body);
      updatedRecipe.id =   RecipeId;
      updateRecipe(updatedRecipe, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        const response = {
          message: "Recipe updated successfully",
          data: updatedRecipe,
        };
        res.end(JSON.stringify(response));
      });
    });
  }
else if (req.method === "DELETE" && pathname === "/deleteRecipe") {
    const RecipeId = reqUrl.query.id;
    console.log(RecipeId);
    deleteRecipe(RecipeId, (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      const response = {
        message: "Recipe deleted successfully",
        deletedRecipeId: RecipeId,
      };
      res.end(JSON.stringify(response));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
