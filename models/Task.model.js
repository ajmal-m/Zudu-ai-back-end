const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new  Schema({
    title: String,
    description: String,
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['ToDo', 'InProgress', 'Done'],
        default: 'ToDo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    managedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Task', TaskSchema);