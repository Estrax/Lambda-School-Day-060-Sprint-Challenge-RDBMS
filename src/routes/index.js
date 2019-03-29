const router = require('express').Router();
const projects = require('./projects');
const actions = require('./actions');

router.use('/projects', projects);
router.use('/actions', actions);

module.exports = router;