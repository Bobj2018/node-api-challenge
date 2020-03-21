require("dotenv").config();
const app = require('./server');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`***\\ Listening on PORT ${PORT} /***`);
});