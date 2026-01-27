const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/embedded/hyperswitch", async (req, res) => {
  try {
    const response = await axios.get(
      "https://integ.hyperswitch.io/api/embedded/token",
      {
        headers: {
          "api-key":
            "",
          "x-profile-id": "",
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
