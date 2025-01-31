const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "6796d74b0482a48f10c46297",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			geometry: { type: "Point", coordinates: [-122.330284, 47.603245] },
			images: [
				{
					url: "https://res.cloudinary.com/dnoiwueuc/image/upload/v1738165920/YelpCamp/chjnxmokyrenzyaiotzn.jpg",
					filename: "YelpCamp/chjnxmokyrenzyaiotzn",
				},
				{
					url: "https://res.cloudinary.com/dnoiwueuc/image/upload/v1738165924/YelpCamp/gtc1hmckgaob4dmjciod.jpg",
					filename: "YelpCamp/gtc1hmckgaob4dmjciod",
				},
			],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, corrupti dicta saepe earum veniam quod, magni eveniet dignissimos porro placeat exercitationem officia accusamus eius. Alias officiis reprehenderit quae accusantium! Quia?",
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
