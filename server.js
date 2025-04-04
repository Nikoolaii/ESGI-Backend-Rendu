const http = require("http");
const app = require("./app");
const commentRoutes = require("./routes/Commentaire.route");


const port = 3000;

const server = http.createServer(app);


server.on("error", (error) => {
    console.log(error);
    process.exit(1);
});

server.on("listening", () => {
    console.log(`Server is listening on port ${port}`);
});

app.use("/comments", commentRoutes);

server.listen(port);