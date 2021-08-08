const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    profile_picture: String,
    task_completed: Number,
    total_tasks: Number,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    create_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', UserSchema)