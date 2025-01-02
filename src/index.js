import  express from 'express';
import  bodyParser from 'body-parser';
import  crypto from 'crypto';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 3000;

app.use(bodyParser.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message : "Too many requests from this IP"
})

app.use(limiter);

const users = {
    'rahul@gmail.com': {
        password: 'password123',
        otp: null
    }
};

function generateOTP() {
    return Math.round(Math.random()*99900 + 1000);
}



// Verify OTP route
app.post('/verify-otp', (req, res) => {
    // console.log("req get huyi")
    const { email, otp } = req.body;
    if (users[email] && users[email].otp == otp) {
        users[email].otp = null; 
        res.status(200).send({
            message: 'OTP verified successfully',
            success : true
        });
        console.log("login success")
    } else {
        res.status(200).send({
            message: 'Invalid OTP',
            success : false
        });
    }
});

// Request OTP route
app.post('/request-otp', (req, res) => {
    const { email } = req.body;
    if (users[email]) {
        const otp = generateOTP();
        users[email].otp = otp;
        // In a real application, you would send the OTP via email or SMS
        console.log(`OTP for ${email}: ${otp}`);
        res.status(200).send('OTP sent successfully');
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/', (req, res) => {
    res.json({
        users
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});