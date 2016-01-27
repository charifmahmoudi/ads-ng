/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/zones              ->  index
 * POST    /api/zones              ->  create
 * GET     /api/zones/:id          ->  show
 * PUT     /api/zones/:id          ->  update
 * DELETE  /api/zones/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Zone from './zone.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Zones
export function index(req, res) {
    Zone.findAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Zone from the DB
export function show(req, res) {
    Zone.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Zone in the DB
export function create(req, res) {
    // don't include the date, if a user specified it
    delete req.body.date;

    var comment = new Comment(_.merge({ author: req.user._id }, req.body));
    comment.save(function (err, comment) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, comment);
    });

    Zone.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Zone in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Zone.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Zone from the DB
export function destroy(req, res) {
    Zone.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}


// Get list of comments
exports.index = function (req, res) {
    Comment.loadRecent(function (err, comments) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, comments);
    });
};

// Creates a new comment in the DB.
exports.create = function (req, res) {
    // don't include the date, if a user specified it
    delete req.body.date;

    var comment = new Comment(_.merge({ author: req.user._id }, req.body));
    comment.save(function (err, comment) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, comment);
    });
};