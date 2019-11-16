
function getEvents() {
    return db('events');
}

function getVendors() {
    return db('vendors');
}

function getTodos() {
    return db('todos as t')
    .join('events as e', 'e.id', 't.event_id')
    .select('t.id', 'e.name as event', 'e.datetime as date_and_time', 't.name as todo', 't.completed');
}

function getEventById(id) {
    return db('events')
    .where({ id })
    .first();
}

function getVendorsById(id) {
    return db('vendors')
    .where({ id })
    .first();
}

function getTodoById(id) {
    return db('todos')
    .where({ id })
    .first();
}

function getTodoByProject(id) {
    return db('todos as t')
    .where({ event_id: id })
    .join('events as e', 'e.id', 't.events_id')
    .select('t.id', 't.name', 't.completed');
}

function getResourcesByProject(id) {
    return db('projects-resources as pr')
    .where({ project_id: id })
    .join('resources as r', 'r.id', 'pr.resource_id')
    .select('r.id', 'r.name', 'r.description')
}

function addProject(project) {
    return db('projects')
    .insert(project, 'id')
    .then(id => {
        return getProjectById(id[0]);
    });
}

function addResource(resource) {
    return db('resources')
    .insert(resource, 'id')
    .then(id => {
        return getResourceById(id[0]);
    });
}

function addTask(task) {
    return db('tasks')
    .insert(task, 'id')
    .then(id => {
        return getTaskById(id[0]);
    });
}

function deleteProject(id) {
    return db('projects')
    .where({id})
    .del();
}

function deleteResource(id) {
    return db('resources')
    .where({id})
    .del()
}

function deleteTask(id) {
    return db('tasks')
    .where({id})
    .del()
}

function updateProject(update, id) {
    return db('projects')
    .where({ id })
    .update(update)
    .then((ids) => ids);
}

function updateResource(update, id) {
    return db('resources')
    .where({ id })
    .update(update)
    .then(count => count);
}

function updateTask(update, id) {
    return db('tasks')
    .where({ id })
    .update(update)
    .then(count => count);
}

module.exports = {
    getProjects,
    getResources,
    getTasks,
    getProjectById,
    getResourceById,
    getTaskById,
    getTasksByProject,
    getResourcesByProject,
    addProject,
    addResource,
    addTask,
    deleteProject,
    deleteResource,
    deleteTask,
    updateProject,
    updateResource,
    updateTask
}