const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
