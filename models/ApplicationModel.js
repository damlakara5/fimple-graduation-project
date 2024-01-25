const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ApplicationSchema = mongoose.Schema({
    name: {
        required : [true, "Please provide a name"],
        type: String,
    },
    lastName: {
        required: [true, "Please provide a last name"],
        type: String,
    },
    age: {
        required: [true, "Please provide age"],
        type: String,
    },
    tc: {
        required: [true, "Please provide tc"],
        type: String,
    },
    applicationReason: {
        required: [true, "Please provide reason"],
        type: String,
    },
    address: {
        required: [true, "Please provide address"],
        type: String,
    },
    file: {
      filename: String,
      path: String,
      originalname: String,
  },
    appCode: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: "bekliyor"
    },
    statusHistory: [{
        status: String,
        updatedDate: {
          type: Date,
          default: Date.now
        }
      }],
      answers: [{
        answer: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
})

// Middleware to track status changes
ApplicationSchema.pre('save', function(next, options) {

      //const userId = this.user._id; // Fetch userId from the request context

      this.statusHistory.push({
        status: this.status,
        updatedBy: options.userId,
        updatedDate: new Date()
      });
    
    next();
  });

const Application = mongoose.model("Application", ApplicationSchema)

module.exports = Application