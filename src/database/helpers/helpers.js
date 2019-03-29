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
    removeAction,
    getContexts,
    addContext,
    getContextById,
    updateContext,
    removeContext,
    addActionContext,
    removeActionContext,
    getActionsByContext
};

async function getProjects(){
    return await db
            .select('*')
            .from('projects')
            .then(projects => {
                return projects.map(elem => {
                    return {
                        ...elem,
                        completed: Boolean(elem.completed)
                    }
                }
            )});
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
            .then(elem => {
                return {
                    ...elem,
                    completed: Boolean(elem.completed)
                }
            })
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
            .from('actions')
            .then(actions => {
                return actions.map(elem => {
                    return {
                        ...elem,
                        completed: Boolean(elem.completed)
                    }
                }
            )});
}

async function getActionById(id){
    return await db
            .select('*')
            .from('actions')
            .where({ 'id' : id})
            .first()
            .then(elem => {
                return {
                    ...elem,
                    completed: Boolean(elem.completed)
                }
            })
            .then(async res => {
                return {
                    ...res,
                    contexts: await getActionContexts(id) || []
                }
            });
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
            .where('project_id', projectId)
            .then(async actions => await actions.map(elem => {
                return {
                    id: elem.id,
                    description: elem.description,
                    notes: elem.notes,
                    completed: Boolean(elem.completed)
                }
            }));
}

async function getContexts(){
    return await db
            .select('*')
            .from('contexts');
}

async function getContextById(id){
    return await db
            .select('*')
            .from('actions')
            .where({ 'id' : id})
            .first();
}

async function addContext(context){
    return await db('contexts')
            .insert(context);
}

async function updateContext(id, context){
    return await db('contexts')
        .where('id', id)
        .update(context);
}

async function removeContext(id){
    return await db('contexts')
            .where('id', id)
            .del();
}

async function getActionContexts(id){
    return await db
            .select('contexts.name as context')
            .from('action_contexts')
            .innerJoin('contexts', 'contexts.id', 'action_contexts.context_id')
            .where('action_id', id);
}

async function getActionContextsWithIDs(id){
    return await db
            .select('*')
            .from('action_contexts')
            .innerJoin('contexts', 'contexts.id', 'action_contexts.context_id')
            .where('action_id', id);
}

async function addActionContext(action, context){
    return await getActionContextsWithIDs(action).then(async res => {
        return await res.filter(elem => elem.context_id === context).length === 0 ?
            db('action_contexts')
                .insert({
                    action_id: action,
                    context_id: context
                })
            : db('action_contexts')
                .insert({})
        }
    );
}

async function removeActionContext(action, context){
    return await db('action_contexts')
            .where('action_id', action)
            .where('context_id', context)
            .del();
}

async function getActionsByContext(id){
    return await db
            .select('projects.name as project', 'actions.description', 'actions.notes', 'actions.completed')
            .from('action_contexts')
            .innerJoin('actions', 'actions.id', 'action_contexts.action_id')
            .innerJoin('projects', 'projects.id', 'actions.project_id')
            .where('context_id', id)
            .then(actions => actions.map(elem => {
                return {
                    ...elem,
                    completed: Boolean(elem.completed)
                }
            }));
}