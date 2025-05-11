const fs = require("fs");
const path = require("path");
const { SERVICE_SUCCESS, SERVICE_FAILURE } = require("../common/constants");

const fetchData = async (fileName) => {
  try {
    const filePath = path.join(__dirname, "../assets/data", fileName);
    console.log("file", filePath);
    const data = await fs.readFileSync(filePath, "utf-8");
    console.log("data", data);
    return { status: SERVICE_SUCCESS, data: JSON.parse(data) };
  } catch (error) {
    return { status: SERVICE_FAILURE, error: error.message };
  }
};

let imagesObject = {
  officer1: "assets/images/cops/officer4.png",

  officer2: "assets/images/cops/officer2.jpg",

  officer3: "assets/images/cops/officer3.jpg",

  criminal1: "assets/images/criminal/criminal1.jpg",
};

const fetchFile = (id) => {
  try {
    let filePath = imagesObject[id];
    if (!filePath) throw new Error("Invalid File Id");
    const absolutePath = path.join(__dirname, "../", filePath);
    if (fs.existsSync(absolutePath)) {
      return { status: SERVICE_SUCCESS, filePath: absolutePath };
    } else {
      return { status: SERVICE_FAILURE, error: "File not found" };
    }
  } catch (error) {
    console.log("Error occured in fetchFile", error.message, error);
    return { status: SERVICE_FAILURE, error: error.message };
  }
};

// Fetch a random city from the cities.json file
const getRandomCity = async () => {
  try {
    const { status, data } = await fetchData("cities.json");
    if (status === SERVICE_SUCCESS) {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    } else {
      throw new Error("Failed to fetch cities data");
    }
  } catch (error) {
    console.error("Error in getRandomCity:", error.message);
    throw new Error("Failed to select a random city");
  }
};

// Check if any cop can catch the criminal in the random city
const checkCriminal = async (cops) => {
  try {
    // Fetch a random city
    const randomCity = await getRandomCity();

    console.log("random", randomCity, cops);

    // Filter cops who can reach the random city
    const copsWhoCanCatch = cops.find(
      (cop) => cop.selectedCity?.id === randomCity.id
    );

    // Fetch criminal data
    const { status, data: criminal } = await fetchData("criminals.json");
    if (status !== SERVICE_SUCCESS) {
      throw new Error("Failed to fetch criminals data");
    }

    // Update criminal data
    const updatedCriminal = { ...criminal, hiddenCity: randomCity };

    if (copsWhoCanCatch) {
      return {
        status: SERVICE_SUCCESS,
        data: {
          found: true,
          successfulCop: copsWhoCanCatch,
          updatedCriminal,
        },
      };
    }
    return {
      status: SERVICE_SUCCESS,
      data: {
        found: false,
        successfulCop: null,
        updatedCriminal,
      },
    };
  } catch (error) {
    console.error("Error in checkCriminal:", error.message);
    // throw new Error("Failed to check criminal");
    return {
      status: SERVICE_FAILURE,
      message: error.message,
    };
  }
};

module.exports = { fetchData, fetchFile, checkCriminal };
