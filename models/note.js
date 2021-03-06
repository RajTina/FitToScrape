var  mongoose = require("mongoose");
var Schema = mongoose.Schema;
var noteSchema = new Schema({
headline: {
    type: String,
    required: true,
    unique: true
},
summary:{
    type: String,
    required: true
},
date: String,
saved: {
    type: Boolean,
    default: false
}
});

var HeadLine = mongoose.model("HeadLine", headLineSchema);

module.exports = HeadLine;