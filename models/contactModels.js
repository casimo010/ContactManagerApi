import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",

    },
    name: {
      type: String,
      required: [true, "Please enter the contact number"],
    },
    email: {
      type: String,
      required: [true, "Please enter the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter the contact phone"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("contact", contactSchema);
