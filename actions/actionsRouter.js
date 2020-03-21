const express = require("express");
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.use("/:actionid", validateActionId)

router.get("/:actionid", (req, res) => {
    res.status(200).json(req.action)
});

router.post("/", validateAction, (req, res) => {
    db.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.put("/:actionid", validateAction, (req, res) => {
    db.update(req.params.actionid, req.body)
        .then(data => {
            res.status(202).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

router.delete("/:actionid", (req, res) => {
    db.remove(req.params.actionid)
        .then(data => {
            res.status(204).json(data)
        })
        .catch(err => res.status(500).json({ message: "internal server error" }))
})

function validateActionId(req, res, next) {

    db.get(req.params.actionid)
        .then(data => {
            if (data) {
                req.action = data;
                next();
            } else {
                res.status(404).json({ message: "This action does not exsist!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "internal server error" })
        })
}

function validateAction(req, res, next) {
    if (req.body.notes && req.body.description && req.body.project_id) {
        next()
    } else {
        res.status(400).json({ message: "Please provide project_id, description and/or notes" })
    }
}
module.exports = router;