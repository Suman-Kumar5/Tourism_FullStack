const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err);
})

const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '67d1bed05df8dc5fc8798eb9' }));
    await listing.insertMany(initData.data);
    console.log("data was initialized");

}

initDB();