const express = require("express");
const { uuid } = require("uuidv4");
const { request, response } = require("express");

const app = express();

app.use(express.json());

const repositories = []

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;

    const repository = {
        id: uuid(),
        title: title,
        url: url,
        techs: techs,
        like: 0
    };

    repositories.push(repository);

    return response.status(201).json(repository);

});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    repository = repositories.find(repository => repository.id === id);

    console.log(repository);

    if( repository === undefined ) {
        return response.status(400).json({ error: "Repository not found" });
    } 

    repository.like = repository.like + 1;

    return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
    const { title, url, techs} = request.body;
    const { id } = request.params;

    repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if( repositoryIndex < 0){
        return response.status(400).json({ error: "Repository not found" });
    }

    const repository = {
        id: id,
        title: title,
        url: url,
        techs: techs
    };

    repositories[repositoryIndex] = repository;

    return response.status(202).json(repository);

});


app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0){
        return response.status(400).json({ error: "Repository not found" });
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).json();

});




module.exports = app;
