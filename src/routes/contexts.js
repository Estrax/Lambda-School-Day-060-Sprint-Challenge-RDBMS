const router = require('express').Router();
const db = require('../database/helpers/helpers');

router.route('/')
    .get(async (req, res) => {
        await db.getContexts()
            .then(contexts => res.status(200).json(contexts))
            .catch(err => res.status(500).json({ error: "Contexts could not be retrieved."}));
    })
    .post(async (req, res) => {
        await db.addContext(req.body)
            .then(context => res.status(201).json(context))
            .catch(err => res.status(500).json({ error: "Context could not be added."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db.getContextById(req.params.id)
            .then(context => res.status(200).json(context))
            .catch(err => res.status(500).json({ error: "Context could not be retrieved."}));
    })
    .put(async (req, res) => {
        await db.updateContext(req.params.id, req.body)
            .then(
                context => context.length === 0
                ? res.status(404).json({ message: "The context with the specified ID does not exist." })
                : res.status(200).json(context)
            )
            .catch(err => res.status(500).json({ error: "Context could not be updated."}));
    })
    .delete(async (req, res) => {
        await db.removeContext(req.params.id)
            .then(
                context => context.length === 0
                ? res.status(404).json({ message: "The context with the specified ID does not exist." })
                : res.status(200).json(context))
            .catch(err => res.status(500).json({ error: "Context could not be deleted." }));
    });

router.route('/:id/actions')
    .get(async (req, res) => {
        await db.getActionsByContext(req.params.id)
            .then(actions => res.status(200).json(actions))
            .catch(err => res.status(500).json({ error: "Actions based on context could not be retrieved."}));
    })

module.exports = router;