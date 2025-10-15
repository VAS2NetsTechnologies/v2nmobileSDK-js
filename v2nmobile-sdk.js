// v2nmobile-sdk.js

class V2NMobileSDK {
  constructor(username, password) {
    if (!username || !password) {
      throw new Error('V2NMobileSDK requires a username and password for Basic Authentication.');
    }
    this.username = username;
    this.password = password;
    this.baseUrl = 'https://v2nmobile.com/api';
  }

  _getAuthHeader() {
    const credentials = btoa(`${this.username}:${this.password}`);
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    };
  }

  async getUserDetails() {
    try {
      const response = await fetch(`${this.baseUrl}/info`, {
        method: 'GET',
        headers: this._getAuthHeader()
      });

      if (response.status === 401) {
        throw new Error('Invalid credentials. Please check your username and password.');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  async pushSMS(smsPayload) {
    if (!Array.isArray(smsPayload) || smsPayload.length === 0) {
      throw new Error('SMS payload must be a non-empty array of SMS objects.');
    }

    // Basic validation for each SMS object
    for (const sms of smsPayload) {
      if (!sms.id || !sms.receiver || !sms.sender || !sms.message || !sms.type) {
        throw new Error('Each SMS object must have id, receiver, sender, message, and type properties.');
      }
      if (!['flash', 'sms'].includes(sms.type)) {
        throw new Error('SMS type must be either "flash" or "sms".');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/push`, {
        method: 'POST',
        headers: this._getAuthHeader(),
        body: JSON.stringify({ sms: smsPayload })
      });

      if (response.status === 401) {
        throw new Error('Invalid credentials. Please check your username and password.');
      }
      if (response.status === 412) {
        throw new Error('Insufficient wallet balance.');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error pushing SMS:', error);
      throw error;
    }
  }
}

// For Node.js environments, export the module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = V2NMobileSDK;
}
