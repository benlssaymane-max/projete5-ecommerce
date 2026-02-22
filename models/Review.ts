import { Schema, model, models } from 'mongoose';

const reviewSchema = new Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

const Review = models.Review || model('Review', reviewSchema);
export default Review;