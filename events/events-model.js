const db = require('../data/dbConfig.js');

function getEvents() {
    return db('events');
}

function getVendors() {
    return db('vendors');
}

// function getTodos() {
//     return db('todos as t')
//     .join('events as e', 'e.id', 't.event_id')
//     .select('t.id', 'e.name as event', 'e.datetime as date_and_time', 't.name as todo', 't.completed');
// }

function getEventById(id) {
    return db('events')
    .where({ id })
    .first();
}

function getVendorById(id) {
    return db('vendors')
    .where({ id })
    .first();
}

function getTodoById(id) {
    return db('todos')
    .where({ id })
    .first();
}

function getTodosByEvent(id) {
    return db('todos as t')
    .where({ event_id: id })
    .join('events as e', 'e.id', 't.event_id')
    .select('t.id', 't.name', 't.completed');
}

function getVendorsByEvent(id) {
    return db('events-vendors as ev')
    .where({ event_id: id })
    .join('vendors as v', 'v.id', 'ev.vendor_id')
    .select('v.id', 'v.name')
}

function addEvent(event) {
    return db('events')
    .insert(event, 'id')
    .then(id => {
        return getEventById(id[0]);
    });
}

function addVendor(vendor) {
    return db('vendors')
    .insert(vendor, 'id')
    .then(id => {
        return getVendorById(id[0]);
    });
}

function addTodo(todo) {
    return db('todos')
    .insert(todo, 'id')
    .then(id => {
        return getTodoById(id[0]);
    });
}

function deleteEvent(id) {
    return db('events')
    .where({ id })
    .del();
}

function deleteVendor(id) {
    return db('vendors')
    .where({ id })
    .del()
}

function deleteTodo(id) {
    return db('todos')
    .where({ id })
    .del()
}

function updateEvent(update, id) {
    return db('events')
    .where({ id })
    .update(update)
    .then((ids) => ids);
}

function updateVendor(update, id) {
    return db('vendors')
    .where({ id })
    .update(update)
    .then(count => count);
}

function updateTodo(update, id) {
    return db('todos')
    .where({ id })
    .update(update)
    .then(count => count);
}

module.exports = {
    getEvents,
    getVendors,
    getEventById,
    getVendorById,
    getTodoById,
    getTodosByEvent,
    getVendorsByEvent,
    addEvent,
    addVendor,
    addTodo,
    deleteEvent,
    deleteVendor,
    deleteTodo,
    updateEvent,
    updateVendor,
    updateTodo
}