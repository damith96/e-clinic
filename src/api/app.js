const express = require("express");
const multer = require('multer');
const cors = require('cors');
const app = express();

const { login, reservation, schedule, dashboard, pharmacy, reservationInformation, profile, updateProfile } = require('../api/controllers/user/user.controller');
const { doctor, doctors, day, appointment, updatePatient } = require("../api/controllers/channeling/channeling.controller");
const { checkToken } = require('../api/controllers/token_validation');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(error,'images');
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})
  
app.use(express.json()); // Convert json into javascript object
app.use(cors());

app.post('/login',login); 
app.put('/reserve',  checkToken, reservation); // we set middlewares seperated by ,(commas) and it excute left to right
app.put('/appointment', checkToken, appointment);
app.get('/schedule/:type',checkToken, schedule);
app.get('/dashboard/:id', checkToken, dashboard);
app.get('/doctors',checkToken,doctors);
app.get('/doctor/:doctorId',checkToken,doctor);
app.get('/days/:doctorId', checkToken,day);
app.put('/appointment/:doctorId/:date', checkToken,updatePatient);
app.put('/pharmacy',checkToken,multer({storage:storage}).single('prescription') ,pharmacy); //Extract single file from the request
app.get('/reserve/:id',checkToken,reservationInformation);
app.get('/profile/:id', checkToken, profile);
app.put('/profile/:id', checkToken, updateProfile);


const port = 3000; // If you define a port in .env(dotenv package) file you can access it through process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));