import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  // Identification
  ticketNumber: { type: Number, required: true, unique: true },
  channelId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true },
  
  // User Info
  userId: { type: String, required: true },
  username: { type: String, required: true },
  
  // Category
  category: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  
  // Content
  subject: { type: String, required: true },
  description: { type: String },
  
  // Assignment
  assignedTo: { type: String }, // Staff User ID
  claimedBy: { type: String }, // Staff User ID who claimed
  
  // Status
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'waiting', 'closed'],
    default: 'open'
  },
  
  // Timestamps
  openedAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
  lastActivity: { type: Date, default: Date.now },
  
  // Close Info
  closedBy: { type: String },
  closeReason: { type: String },
  
  // Participants
  participants: [{ type: String }], // Additional users added to ticket
  
  // Messages
  messageCount: { type: Number, default: 0 },
  
  // Transcript
  transcriptUrl: { type: String },
  transcriptPath: { type: String },
  
  // Metadata
  priority: { 
    type: String, 
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  tags: [{ type: String }],
  notes: { type: String },
  
}, { timestamps: true });

// Auto-increment ticket number
ticketSchema.pre('save', async function(next) {
  if (this.isNew && !this.ticketNumber) {
    const lastTicket = await this.constructor.findOne({ guildId: this.guildId })
      .sort({ ticketNumber: -1 });
    this.ticketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;
  }
  next();
});

// Indexes
ticketSchema.index({ guildId: 1, ticketNumber: 1 });
ticketSchema.index({ userId: 1, status: 1 });
ticketSchema.index({ status: 1, openedAt: -1 });

export default mongoose.model('Ticket', ticketSchema);
