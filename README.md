# V2nmobile

A JavaScript SDK for interacting with the V2NMobile API, enabling developers to easily integrate SMS sending and user details retrieval into their applications.

## Features

- **User Details Retrieval**: Fetch user information from the V2NMobile API.
- **SMS Sending**: Send single or multiple SMS messages, including flash SMS.
- **Error Handling**: Comprehensive error handling for authentication, validation, and API responses.
- **Node.js Compatible**: Designed for Node.js environments with CommonJS module support.

## Installation

### Prerequisites

- Node.js (version 18 or higher recommended for native `fetch` support)
- Valid V2NMobile API credentials (username and password)

### Install via npm (if published)

```bash
npm install v2nmobile
```

### Manual Installation

1. Download the `v2nmobile-sdk.js` file from the repository.
2. Place it in your project directory.

## Usage

### Initialization

First, import the SDK and create an instance with your API credentials:

```javascript
const V2nmobile = require('./v2nmobile-sdk');

const sdk = new V2nmobile('your_username', 'your_password');
```

Replace `'your_username'` and `'your_password'` with your actual V2NMobile API credentials.

### Getting User Details

Retrieve user information from the API:

```javascript
async function getUserInfo() {
  try {
    const userDetails = await sdk.profile();
    console.log('User Details:', userDetails);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getUserInfo();
```

### Sending SMS

Send one or more SMS messages. Each SMS object must include `id`, `receiver`, `sender`, `message`, and `type` (either `'sms'` or `'flash'`).

```javascript
async function sendSMS() {
  const smsPayload = [
    {
      id: 'unique-id-1',
      receiver: '2348123456789', // Recipient phone number (international format)
      sender: 'YourSenderID',
      message: 'Hello, this is a test SMS!',
      type: 'sms' // or 'flash'
    },
    {
      id: 'unique-id-2',
      receiver: '2349012345678',
      sender: 'FlashSender',
      message: 'This is a flash message!',
      type: 'flash'
    }
  ];

  try {
    const result = await sdk.send(smsPayload);
    console.log('SMS Send Result:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendSMS();
```

### Error Handling

The SDK throws errors for various scenarios:

- **Invalid Credentials**: When username/password is incorrect (401 status).
- **Insufficient Balance**: When wallet balance is low (412 status).
- **Validation Errors**: For invalid SMS payload structure.
- **Network Errors**: For connectivity or API issues.

Always wrap API calls in try-catch blocks:

```javascript
try {
  const result = await sdk.send(smsPayload);
} catch (error) {
  if (error.message.includes('Invalid credentials')) {
    // Handle auth error
  } else if (error.message.includes('Insufficient wallet balance')) {
    // Handle balance error
  } else {
    // Handle other errors
  }
}
```

## API Reference

### Constructor

```javascript
new V2nmobile(username, password)
```

- `username` (string): Your V2NMobile API username.
- `password` (string): Your V2NMobile API password.

Throws an error if username or password is not provided.

### Methods

#### `profile()`

Fetches user details from the API.

- **Returns**: Promise resolving to user details object.
- **Throws**: Error for authentication failures or API errors.

#### `send(smsPayload)`

Sends SMS messages to the API.

- **Parameters**:
  - `smsPayload` (array): Array of SMS objects. Each object must have:
    - `id` (string): Unique identifier for the SMS.
    - `receiver` (string): Recipient phone number in international format.
    - `sender` (string): Sender ID.
    - `message` (string): SMS content.
    - `type` (string): Either `'sms'` or `'flash'`.
- **Returns**: Promise resolving to API response.
- **Throws**: Error for validation failures, authentication issues, insufficient balance, or API errors.

## Examples

See `example.js` in the repository for a complete example demonstrating all features, including error handling.

## Contributing

Contributions are welcome! Please submit issues and pull requests on the GitHub repository.

## License

This project is licensed under the MIT License.
