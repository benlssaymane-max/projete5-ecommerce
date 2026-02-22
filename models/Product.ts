import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    modelUrl: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', productSchema);
export default Product;