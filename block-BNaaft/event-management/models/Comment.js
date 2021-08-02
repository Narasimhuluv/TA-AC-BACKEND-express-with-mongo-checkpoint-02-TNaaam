let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment : String,
    likes : {type : Number},
    eventId : [{type : Schema.Types.ObjectId, ref : 'Event'}]
},{timestamps : true})

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;