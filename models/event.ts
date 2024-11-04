import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  time: {
    start: String,
    end: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft',
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  duration: String,
  image: String,
  features: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);