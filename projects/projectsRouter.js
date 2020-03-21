const express = require('express');
const db = require("../data/helpers/projectModel");
const actionsRouter = require('../actions/actionsRouter');

const router = express.Router();


router.use("/:id", validateProjectId)


router.get("/", (req, res) => {
    db.get()
        .then(data => {
            data ? res.status(200).json(data) : res.status(404).json({ message: "There is no data" })
        })
        .catch(err => {
            res.status(500).json({ message: "internal server error" })
        })
});

router.get("/:id", (req, res) => {
    res.status(200).json(req.user);
})

router.post("/", validateProject, (req, res) => {
    db.insert(req.project)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.put("/:id", validateProject, (req, res) => {
    db.update(req.params.id, req.body)
        .then(data => {
            res.status(202).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(data => {
            res.status(204).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.get("/:id/actions", (req, res) => {
    db.getProjectActions(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.use('/:id/actions', actionsRouter);

function validateProjectId(req, res, next) {

    db.get(req.params.id)
        .then(data => {
            if (data) {
                req.project = data;
                next();
            } else {
                res.status(404).json({ message: "This project does not exsist!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "internal server error" })
        })
}

function validateProject(req, res, next) {
    if (req.body.name && req.body.description) {
        next()
    } else {
        res.status(400).json({ message: "Please provide name and/or description" })
    }
}

module.exports = router;