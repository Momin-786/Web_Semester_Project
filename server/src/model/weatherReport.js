import mongoose from 'mongoose';
const { Schema } = mongoose;

const weatherReportSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});


const WeatherReport = mongoose.model('WeatherReport', weatherReportSchema);

export default WeatherReport
