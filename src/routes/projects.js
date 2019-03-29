const router = require('express').Router();
const db = require('../database/helpers/helpers');

router.route('/')
    .get(async (req, res) => {
        await db.getProjects()
            .then(projects => res.status(200).json(projects))
            .catch(err => res.status(500).json({ error: "Projects could not be retrieved."}));
    })
    .post(async (req, res) => {
        await db.addProject(req.body)
            .then(project => res.status(201).json(project))
            .catch(err => res.status(500).json({ error: "Project could not be added."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db.getProjectById(req.params.id)
            .then(project => res.status(200).json(project))
            .catch(err => res.status(500).json({ error: "Project could not be retrieved."}));
    })
    .put(async (req, res) => {
        await db.updateProject(req.params.id, req.body)
            .then(
                project => project.length === 0
                ? res.status(404).json({ message: "The project with the specified ID does not exist." })
                : res.status(200).json(project)
            )
            .catch(err => res.status(500).json({ error: "Project could not be updated."}));
    })
    .delete(async (req, res) => {
        await db.removeProject(req.params.id)
            .then(
                project => project.length === 0
                ? res.status(404).json({ message: "The project with the specified ID does not exist." })
                : res.status(200).json(project))
            .catch(err => res.status(500).json({ error: "Project could not be deleted." }));
    });

module.exports = router;