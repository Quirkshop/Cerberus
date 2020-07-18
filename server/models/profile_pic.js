  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// library for handling autoincrement in mongoose
// https://github.com/ramiel/mongoose-sequence
const AutoIncrement = require("mongoose-sequence")(mongoose);

let ProfilePicSchema = new Schema(
  {
    user: {type: String},
    document_id: { type: Number, default: 0 },
    description: { type: String },
    fileLink: { type: String },
    s3_key: { type: String }
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

ProfilePicSchema.plugin(AutoIncrement, { inc_field: "document_id" });

module.exports = mongoose.model("profile_pics", ProfilePicSchema);