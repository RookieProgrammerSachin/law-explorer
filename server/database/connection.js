import { connect } from "mongoose";

const connectToDB = async () => {
    try {
        return await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDB;