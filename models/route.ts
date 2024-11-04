import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  days: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  }],
  stops: [stopSchema],
  returnPrice: {
    type: Number,
    required: true,
  },
  allNightPass: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Route || mongoose.model('Route', routeSchema);