const { checkCriminal } = require("../services/data-service");

const checkCriminalController = async (req, res) => {
  try {
    const { cops } = req.body;

    if (!cops || !Array.isArray(cops)) {
      return res.status(400).json({ error: "Invalid or missing cops data" });
    }

    const result = await checkCriminal(cops);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in checkCriminalController:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
};

module.exports = { checkCriminalController };
