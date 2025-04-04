const mongoose = require('mongoose');
const { Schema } = require("mongoose");


const commentaireSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  creaDate: {
    type: Date,
    default: Date.now,
  },
});

const Commentaire = mongoose.model('Commentaire', commentaireSchema)

module.exports = Commentaire