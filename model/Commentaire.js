const mongoose = require('mongoose') ;

const commentaireShma= new mongoose.Shema({
    
        user: {
          type: Schema.Types.ObjectId, 
          ref: "user", 
          required: true,
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
