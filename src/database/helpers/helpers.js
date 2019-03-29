const knex = require('knex');
const dbConfig = require('../../../knexfile');
const db = knex(dbConfig.development);

module.exports = {
    getProjects,
    addProject,
    getProjectById,
    updateProject,
    removeProject,
    getActions,
    addAction,
    getActionById,
    updateAction,
    removeAction
};

async function getProjects(){
    return await db
            .select('*')
            .from('projects');
}

async function addProject(project){
    return await db('projects')
            .insert(project);
}

async function getProjectById(id){
    return await db
            .select('*')
            .from('projects')
            .where({ 'id' : id})
            .first()
            .then(async res => {
                return {
                    ...res,
                    actions: await getActionsForProject(id) || []
                }
            });
}

async function updateProject(id, project){
    return await db('projects')
        .where('id', id)
        .update(project);
}

async function removeProject(id){
    return await db('projects')
            .where('id', id)
            .del();
}

async function getActions(){
    return await db
            .select('*')
            .from('actions');
}

async function getActionById(id){
    return await db
            .select('*')
            .from('actions')
            .where({ 'id' : id})
            .first();
}

async function addAction(action){
    return await db('actions')
            .insert(action);
}

async function updateAction(id, action){
    return await db('actions')
        .where('id', id)
        .update(action);
}

async function removeAction(id){
    return await db('actions')
            .where('id', id)
            .del();
}

async function getActionsForProject(projectId){
    return await db
            .select('*')
            .from('actions')
            .where('project_id', projectId);
}