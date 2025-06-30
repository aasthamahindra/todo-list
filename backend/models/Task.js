const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String },
  completed:   { type: Boolean, default: false },
  user:        { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = model('Task', taskSchema);
