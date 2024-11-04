import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  xp: {
    type: Number,
    default: 0,
  },
  history: [{
    action: String,
    xp: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Reward || mongoose.model('Reward', rewardSchema);