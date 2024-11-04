import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['red', 'yellow', 'green'],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'promoter', 'client'],
    default: 'client',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active',
  },
  profile: {
    name: { type: String, required: true },
    phone: String,
    dateOfBirth: Date,
    agreedToTerms: { type: Boolean, default: false },
    termsAgreedDate: Date,
  },
  rewards: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    lastActivity: Date,
  },
  employeeDetails: {
    position: String,
    hireDate: Date,
    permissions: [String],
  },
  notes: [noteSchema],
  isNewUser: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);