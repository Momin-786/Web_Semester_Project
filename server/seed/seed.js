
import WeatherReport from "../src/model/weatherReport.js";
import mongoose from 'mongoose';


mongoose.connect('mongodb://127.0.0.1:27017/mominweather', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  initializeData();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const initializeData = async () => {
  const sampleData = [
    {
      location: 'Abbottabad',
      temperature: 23.42,
      description: 'clear sky',
      windSpeed: 2.09,
      dateTime: '2024-07-25T00:00:00Z'
    },
    {
      location: 'Karachi',
      temperature: 30.42,
      description: 'partly cloudy',
      windSpeed: 3.25,
      dateTime: '2024-07-26T03:00:00Z'
    },
    {
      location: 'Islamabad',
      temperature: 28.75,
      description: 'rainy',
      windSpeed: 1.85,
      dateTime: '2024-07-27T06:00:00Z'
    },
    {
      location: 'Lahore',
      temperature: 34.91,
      description: 'sunny',
      windSpeed: 2.95,
      dateTime: '2024-07-28T09:00:00Z'
    }
  ];

  try {
    await WeatherReport.deleteMany({});
    await WeatherReport.insertMany(sampleData);
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data', error);
  } finally {
    mongoose.connection.close();
  }
};
