require('dotenv').config();
const app = require('./app');
const DbConnect = require('./configs/db.Config');

const PORT = process.env.PORT || 5000;

DbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
