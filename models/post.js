const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    data: {
      type: String
    },
    number: {
      type: String
    },
    time: {
      type: String
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

schema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Post", schema);
