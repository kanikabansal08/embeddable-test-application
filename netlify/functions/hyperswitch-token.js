const axios = require("axios");

exports.handler = async () => {
  const apiKey = process.env.HYPERSWITCH_API_KEY;
  const profileId = process.env.HYPERSWITCH_PROFILE_ID;

  if (!apiKey || !profileId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Server is not configured with Hyperswitch credentials. Please set HYPERSWITCH_API_KEY and HYPERSWITCH_PROFILE_ID.",
      }),
    };
  }

  try {
    const response = await axios.get(
      "https://app.hyperswitch.io/api/embedded/token",
      {
        headers: {
          "api-key": apiKey,
          "x-profile-id": profileId,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Token fetched successfully",
        data: response.data,
      }),
    };
  } catch (error) {
    console.error("Error calling Hyperswitch API:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch token from Hyperswitch API",
        details: error.message,
      }),
    };
  }
};


