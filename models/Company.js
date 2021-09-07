const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("company",CompanySchema)