import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    passkey : {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

export default model('Project', projectSchema);