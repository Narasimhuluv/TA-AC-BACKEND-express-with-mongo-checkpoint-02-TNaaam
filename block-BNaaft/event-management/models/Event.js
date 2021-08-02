let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let eventSchema = new Schema({
    title : {type: String, required : true},
    summery : {type: String, required : true},
    host : {type : String, required : true},
    start_date : {type : Date, required : true},
    end_date : {type : Date, required : true},
    event_category : {type : String, required : true},
    location : {type : String, required : true},
    likes : {type : Number , required : true},
    comments : [{type : Schema.Types.ObjectId, ref : 'Comment'}]
},{timestamps : true})

let Event = mongoose.model("Event", eventSchema)
module.exports = Event;