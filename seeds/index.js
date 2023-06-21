const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedhelper')

 //mongoose.connect(process.env.MONGO_DB, {
    mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,

    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 200)
        const price = Math.floor(Math.random() * 700) + 10
        const camp = new Campground({
            author: '63de3ee06dbc3f237d3b0e70',
            location: `${cities[random1000].City},${cities[random1000].State}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].Longitude, cities[random1000].Latitude]
            },
            images: [{
                url: 'https://res.cloudinary.com/djdq19ule/image/upload/v1680511305/CampSter/siv1et7zwbgv7i2oxk3z.jpg',
                filename: 'CampSter/csemm5yikyqrfn5t2zap',
            },
            {
                url: 'https://res.cloudinary.com/djdq19ule/image/upload/v1680511297/CampSter/wulcypec7tsvd1qnbdnl.jpg',
                filename: 'CampSter/wcwldqnpjbmymngxaptv',
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => { mongoose.connection.close() });

