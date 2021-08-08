const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    is_complete: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    create_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', TaskSchema)