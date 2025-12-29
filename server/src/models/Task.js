import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    priority: {
        type: String,
        enum: ["lowest", "low", "medium", "high", "urgent", "critical"],
        default: "low"
    }
}, { timestamps: true} );

export default model('Task', taskSchema);