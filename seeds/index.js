const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67d4402434eb49c62c731168',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dl23ydibz/image/upload/v1742126690/YelpCamp/yh33qlx94jc9ggm9cvjd.jpg',
                    filename: 'YelpCamp/yh33qlx94jc9ggm9cvjd',

                },
                {
                    url: 'https://res.cloudinary.com/dl23ydibz/image/upload/v1742126690/YelpCamp/ethvbfajaxrezoxmyraj.jpg',
                    filename: 'YelpCamp/ethvbfajaxrezoxmyraj',

                },
                {
                    url: 'https://res.cloudinary.com/dl23ydibz/image/upload/v1742126690/YelpCamp/y22cxdfn5nll2b25xuhz.jpg',
                    filename: 'YelpCamp/y22cxdfn5nll2b25xuhz',

                },
                {
                    url: 'https://res.cloudinary.com/dl23ydibz/image/upload/v1742126690/YelpCamp/ohf6yzolmb7uk59ve2b6.jpg',
                    filename: 'YelpCamp/ohf6yzolmb7uk59ve2b6',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
