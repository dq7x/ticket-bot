import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  
  // Channels
  ticketCategoryId: { type: String }, // Discord category for tickets
  createTicketChannelId: { type: String }, // Channel with panel
  ticketLogChannelId: { type: String }, // Logging channel
  transcriptChannelId: { type: String }, // Optional transcript channel
  
  // Roles
  staffRoleId: { type: String },
  adminRoleId: { type: String },
  
  // Limits
  maxTicketsPerUser: { type: Number, default: 3 },
  
  // Auto-Close
  autoCloseEnabled: { type: Boolean, default: false },
  autoCloseDays: { type: Number, default: 7 },
  autoCloseWarningDays: { type: Number, default: 5 },
  
  // Naming
  ticketNameFormat: { 
    type: String, 
    default: 'ticket-{number}' // {number}, {username}, {category}
  },
  
  // Messages
  welcomeMessage: { type: String },
  closeMessage: { type: String },
  
  // Features
  transcriptsEnabled: { type: Boolean, default: true },
  claimEnabled: { type: Boolean, default: true },
  ratingsEnabled: { type: Boolean, default: false },
  
  // Panel Message ID
  panelMessageId: { type: String },
  
}, { timestamps: true });

export default mongoose.model('Config', configSchema);
