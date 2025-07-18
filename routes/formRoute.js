const express = require("express");
const router  = express.Router();
const Form     = require("../models/Form")

router.get('/:form', (req, res)=>{
    const {form} = req.params;    
    res.render("contact", {form});
});

router.post('/:action', (req, res)=>{
    const {action} = req.params;
    const Inputs = req.body;
    const form = new Form({
        inputs: Inputs,
        action,
    });
    form.save();
    res.redirect(`/form/thank-you/${action}`);
});

router.get("/thank-you/:action", (req, res)=>{

});

