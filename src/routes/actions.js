const router = require('express').Router();
const db = require('../database/helpers/helpers');

router.route('/')
    .get(async (req, res) => {
        await db.getActions()
            .then(actions => res.status(200).json(actions))
            .catch(err => res.status(500).json({ error: "Actions could not be retrieved."}));
    })
    .post(async (req, res) => {
        await db.addAction(req.body)
            .then(action => res.status(201).json(action))
            .catch(err => res.status(500).json({ error: "Action could not be added."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db.getActionById(req.params.id)
            .then(action => res.status(200).json(action))
            .catch(err => res.status(500).json({ error: "Action could not be retrieved."}));
    })
    .put(async (req, res) => {
        await db.updateAction(req.params.id, req.body)
            .then(
                action => action.length === 0
                ? res.status(404).json({ message: "The action with the specified ID does not exist." })
                : res.status(200).json(action)
            )
            .catch(err => res.status(500).json({ error: "Action could not be updated."}));
    })
    .delete(async (req, res) => {
        await db.removeAction(req.params.id)
            .then(
                action => action.length === 0
                ? res.status(404).json({ message: "The action with the specified ID does not exist." })
                : res.status(200).json(action))
            .catch(err => res.status(500).json({ error: "Action could not be deleted." }));
    });

module.exports = router;