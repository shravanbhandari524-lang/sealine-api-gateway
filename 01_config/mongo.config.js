import mongoose from "mongoose";
const connectdb = async () => {
  try {
    console.log("trying to connect to sealinedb ......");
    await mongoose.connect(process.env.CLOUDDB_URL);
    console.log("DB sealinedb connected");
  } catch (err) {
    console.log(err);
  }
};
export default connectdb;
