import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    player: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
    },
    playerAdded: { type: Date },
    worlds: [
        {
            worldId: {type: Number, required: true},
            player_id: Schema.ObjectId,
            playerId: {type: Number, required: true},
            worldName: {type: String, required: true},
            allianceId: {type: Number, required: true},
        },
    ],
    isVerified: { type: Boolean, default: false },
    password: String,
    role: {type: String,
        enum: ['player', 'admin'],
        default: 'player'
    },
});

// generating a hash
userSchema.methods.generateHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
export default mongoose.model('User', userSchema);
