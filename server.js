const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const HYPERSWITCH_API_KEY = process.env.HYPERSWITCH_API_KEY;
const HYPERSWITCH_PROFILE_ID = process.env.HYPERSWITCH_PROFILE_ID;

if (!HYPERSWITCH_API_KEY || !HYPERSWITCH_PROFILE_ID) {
  console.warn(
    "Warning: HYPERSWITCH_API_KEY or HYPERSWITCH_PROFILE_ID is not set. " +
      "The /embedded/hyperswitch endpoint will fail until these environment variables are configured.",
  );
}

app.use(cors());
app.use(express.json());

app.get("/embedded/hyperswitch", async (req, res) => {
  try {
    if (!HYPERSWITCH_API_KEY || !HYPERSWITCH_PROFILE_ID) {
      return res.status(500).json({
        error:
          "Server is not configured with Hyperswitch credentials. Please set HYPERSWITCH_API_KEY and HYPERSWITCH_PROFILE_ID.",
      });
    }

    const response = await axios.get(
      "https://app.hyperswitch.io/api/embedded/token",
      {
        headers: {
          "api-key": HYPERSWITCH_API_KEY,
          "x-profile-id": HYPERSWITCH_PROFILE_ID,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Hyperswitch API response:", response.data);
    res.json({
      success: true,
      message: "Token fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error calling Hyperswitch API:", error.message);
    res.status(500).json({
      error: "Failed to fetch token from Hyperswitch API",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
