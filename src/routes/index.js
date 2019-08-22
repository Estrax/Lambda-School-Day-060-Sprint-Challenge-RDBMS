const router = require('express').Router();
const projects = require('./projects');
const actions = require('./actions');
const contexts = require('./contexts');

router.use('/projects', projects);
router.use('/actions', actions);
router.use('/contexts', contexts);

module.exports = router;