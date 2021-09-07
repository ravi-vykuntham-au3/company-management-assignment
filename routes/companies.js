const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');

const User = require("../models/User")
const Company = require("../models/Company")

// @route    GET api/company
// @desc     Get all users companies
// @access   Private
router.get( "/", auth, async (req,res)=>{
    try {
        const company = await Company.find({user: req.user.id}).sort({date: -1})
        res.json(company);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// @route    POST api/company
// @desc     Add new company
// @access   Private
router.post( "/", [auth, [
    check("name","Name is required").not().isEmpty()
]] , async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, industry, website, email} = req.body;
    
    try {
        const newCompany = new Company({
            name,
            industry,
            website,
            email,
            user: req.user.id
        })
        const company = await newCompany.save();
        res.json(company)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// @route    PUT api/company/:id
// @desc     Update company
// @access   Private
router.put( "/:id", auth, async (req,res)=>{
    const {name, industry, website, email} = req.body;

    // Build company object
    const companyFields = {};
    if(name) companyFields.name = name;
    if(industry) companyFields.industry = industry;
    if(website) companyFields.website = website;
    if(email) companyFields.email = email;

    try {
        let company = await Company.findById(req.params.id);

        if(!company) return res.status(404).json({msg: "Company not found"});
        
        // Make sure user owns company
        if(company.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Not Authorized"});
        }
        company = await Company.findByIdAndUpdate(req.params.id, { $set: companyFields}, {new: true});
        res.json(company);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }

});

// @route    DELETE api/company
// @desc     Delete company
// @access   Private
router.delete( "/:id",auth, async (req,res)=>{
    try {
        let company = await Company.findById(req.params.id);

        if(!company) return res.status(404).json({msg: "Company not found"});
        
        // Make sure user owns company
        if(company.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Not Authorized"});
        }
        await Company.findByIdAndRemove(req.params.id)
        res.json({msg:"Company Removed"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;