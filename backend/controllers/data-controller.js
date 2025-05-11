const { fetchData, fetchFile } = require("../services/data-service");
const { SERVICE_SUCCESS, SERVICE_FAILURE } = require("../common/constants");

const getCities = async (req, res) => {
 
  const result = await fetchData("cities.json");
  if (result.status === SERVICE_SUCCESS) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

const getVehicles = async (req, res) => {
  const result =await fetchData("vehicles.json");
  if (result.status === SERVICE_SUCCESS) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

const getCriminals =async (req, res) => {
  const result = await fetchData("criminals.json");
  if (result.status === SERVICE_SUCCESS) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

const getOfficers = async (req, res) => {
  const result = await fetchData("officers.json");
  if (result.status === SERVICE_SUCCESS) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

const getFile = (req, res) => {
  const { id } = req.params;
  const result = fetchFile(id);
  if (result.status === SERVICE_SUCCESS) {
    res.status(200).sendFile(result.filePath);
  } else {
    res.status(404).json({ error: result.error });
  }
};

module.exports = { getCities, getVehicles, getCriminals, getOfficers, getFile };
