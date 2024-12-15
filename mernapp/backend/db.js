const mongoose = require("mongoose");
const mongooseURl =
  "mongodb+srv://gofood:Rahul@123@cluster0.qrw9r.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  await mongoose.connect(mongooseURl, { useNewUrlParser: true }, async () => {
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection(
        "foodCategory"
      );
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) console.log(err);
        else {
          global.food_items = data;
          global.foodCategory = catData;
        }
      });
      // if(err) console.log(err);
      // else {
      //     global.food_items = data;
      //     // console.log(global.food_items);
      // }
    });
  });
};

module.exports = mongoDB;
