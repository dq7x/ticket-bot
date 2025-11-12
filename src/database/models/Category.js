import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  guildId: { type: String, required: true },
  name: { type: String, required: true },
  emoji: { type: String, default: '🎟️' },
  description: { type: String },
  
  // Staff Settings
  staffRoleId: { type: String }, // Specific role for this category
  mentionOnCreate: { type: Boolean, default: false },
  
  // Visibility
  isActive: { type: Boolean, default: true },
  staffOnly: { type: Boolean, default: false }, // Only staff can select
  
  // Channel Settings
  categoryChannelId: { type: String }, // Discord category to create tickets in
  
  // Modal Fields (optional custom questions)
  modalFields: [{
    label: String,
    placeholder: String,
    required: Boolean,
    minLength: Number,
    maxLength: Number
  }],
  
  // Statistics
  ticketCount: { type: Number, default: 0 },
  
  // Display Order
  order: { type: Number, default: 0 },
  
}, { timestamps: true });

categorySchema.index({ guildId: 1, name: 1 }, { unique: true });

export default mongoose.model('Category', categorySchema);
