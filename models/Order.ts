import { Schema, model, models } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productId: String,
    name: String,
    price: Number,
    quantity: Number
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'paid' },
    paymentId: { type: String, default: '' },
    shippingAddress: { type: String, default: '' }
  },
  { timestamps: true }
);

const Order = models.Order || model('Order', orderSchema);
export default Order;