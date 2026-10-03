import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  outfitId: { type: String, required: true },
  outfitName: { type: String, default: '' },
  customerName: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  deliveryLocation: { type: String, default: '' },
  selectedDates: [{ type: String }],
  paymentMethod: { type: String, default: 'trial' },
  totalRent: { type: Number, default: 0 },
  refundableDeposit: { type: Number, default: 0 },
  time: { type: String }
}, {
  versionKey: false
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
