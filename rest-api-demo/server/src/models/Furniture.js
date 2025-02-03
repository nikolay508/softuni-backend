import {Schema, model, Types} from 'mongoose';

const furnitureSchema = new Schema({
    make: String,
    price: {type: Number, min: 0},
    model: {type: String, minLength: 4},
    img: {type: String, required: true},
    year: {type: Number, min: 1990, max: 2050},
    material: String,
    description: {type: String, minLength: 10},
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
    }
})

const Furniture = model('Furniture', furnitureSchema);

export default Furniture;