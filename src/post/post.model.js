import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    course:{
        type: String,
        enum: ['Technology', 'Workshop', 'Supervised Practice'],
        required: true
    },
    comments:{
        type :[{
            username:{
                type:String,
                required: true,
            },
            text:{
                type: String,
                required: true,
            },
            date:{
                type: Date,
                default: Date.now
            }
        }],
        default: []
        
    },
    date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    },
}, 
{
    timestamps: true,
    versionKey: false
})

PostSchema.methods.toJSON = function () {
    const { __v, _id, ...post } = this.toObject();
    post.pid = _id;
    return post;
}

export default model('Post', PostSchema);