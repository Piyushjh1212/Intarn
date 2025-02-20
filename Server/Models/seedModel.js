import mongoose from "mongoose";

const seedSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  dateOfSale: {
    type: String,
    require: true,
  },
});

const seedModelel =
  mongoose.models.SeedData || mongoose.model("SeedData", seedSchema);

export default seedModelel;
