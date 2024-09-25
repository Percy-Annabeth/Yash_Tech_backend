const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// connect database is a function that connects to mongodb database.


dotenv.config({path:"backend/config/config.env"});

connectDatabase();

app.listen(process.env.PORT,()=>{

    console.log(`server is running on http://localhost:${process.env.PORT}`);
})