// example.js
const V2NMobileSDK = require('./v2nmobile-sdk');

// Replace with your actual V2NMobile API credentials
const USERNAME = 'your_username';
const PASSWORD = 'your_password';

const sdk = new V2NMobileSDK(USERNAME, PASSWORD);

async function runExample() {
  console.log('--- Getting User Details ---');
  try {
    const userDetails = await sdk.getUserDetails();
    console.log('User Details:', JSON.stringify(userDetails, null, 2));
  } catch (error) {
    console.error('Failed to get user details:', error.message);
  }

  console.log('\n--- Pushing SMS ---');
  const smsPayload = [
    {
      id: 'test-sms-1',
      receiver: '2348123456789', // Replace with a valid phone number
      sender: 'V2NTEST',
      message: 'Hello from V2NMobile SDK!',
      type: 'sms'
    },
    {
      id: 'test-flash-2',
      receiver: '2349012345678', // Replace with another valid phone number
      sender: 'V2NFLASH',
      message: 'This is a flash message!',
      type: 'flash'
    }
  ];

  try {
    const smsResult = await sdk.pushSMS(smsPayload);
    console.log('SMS Push Result:', JSON.stringify(smsResult, null, 2));
  } catch (error) {
    console.error('Failed to push SMS:', error.message);
  }

  console.log('\n--- Testing Invalid SMS Payload ---');
  const invalidSmsPayload = [
    {
      id: 'invalid-sms-1',
      receiver: '2348123456789',
      sender: 'V2NTEST',
      // message is missing
      type: 'sms'
    }
  ];

  try {
    await sdk.pushSMS(invalidSmsPayload);
  } catch (error) {
    console.error('Expected error for invalid SMS payload:', error.message);
  }

  console.log('\n--- Testing Invalid Credentials (simulated) ---');
  const invalidSdk = new V2NMobileSDK('wrong_username', 'wrong_password');
  try {
    await invalidSdk.getUserDetails();
  } catch (error) {
    console.error('Expected error for invalid credentials:', error.message);
  }
}

runExample();
