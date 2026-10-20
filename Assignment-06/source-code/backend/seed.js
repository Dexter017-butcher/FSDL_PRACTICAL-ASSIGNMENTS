const mongoose = require('mongoose');
const Car = require('./models/Car');

const cars = [
  {
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    price: 18500,
    mileage: 45000,
    description: 'A reliable and fuel-efficient compact car, perfect for daily commuting. Features include a rearview camera, Bluetooth connectivity, and lane departure warning.',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    price: 21000,
    mileage: 38000,
    description: 'Spacious and comfortable mid-size sedan with an excellent track record for long-term dependability. Includes advanced safety features and premium audio.',
    imageUrl: '/camry.png',
    status: 'Available'
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 32000,
    mileage: 15000,
    description: 'Iconic American muscle car with a powerful V8 engine and aggressive styling. Extremely low mileage and kept in pristine condition.',
    imageUrl: '/mustang.png',
    status: 'Available'
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 35000,
    mileage: 22000,
    description: 'Fully electric premium sedan with Autopilot capabilities and a minimalist interior. Excellent battery health and rapid acceleration.',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    make: 'BMW',
    model: 'X5',
    year: 2018,
    price: 36000,
    mileage: 55000,
    description: 'Luxury mid-size SUV combining sporty performance with high-end interior finishes. Full service history available.',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    make: 'Audi',
    model: 'A4',
    year: 2021,
    price: 29500,
    mileage: 30000,
    description: 'Sleek and highly sophisticated compact executive car. Features digital cockpit, all-wheel drive, and exceptional ride comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  }
];

mongoose.connect('mongodb://127.0.0.1:27017/autoexchange')
.then(async () => {
  console.log('Connected to MongoDB. Seeding data...');
  await Car.deleteMany({});
  await Car.insertMany(cars);
  console.log('Seed completed successfully!');
  process.exit();
})
.catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
