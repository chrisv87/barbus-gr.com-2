import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  type: {
    type: String,
    enum: ['single', 'return', 'allNight'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'used', 'expired'],
    default: 'active',
  },
  qrCode: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  validFor: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);