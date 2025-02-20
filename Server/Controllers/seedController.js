import moment from "moment";
import seedModel from "../Models/seedModel.js";

export const getAllSeedController = async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch data from third-party API",
      });
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return res.status(500).json({
        success: false,
        message: "No data received from third-party API",
      });
    }

    await seedModel.deleteMany();
    const savedData = await seedModel.insertMany(data);

    if (savedData && savedData.length > 0) {
      return res.status(201).json({
        success: true,
        message: "All data fetched and saved successfully",
        totalRecords: savedData.length,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "No new data saved!",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: `API error: ${error.message}`,
    });
  }
};

export const fetchAllSeedData = async (req, res) => {
  try {
    const { search, page = 1, per_page = 10 } = req.query;

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const filter = {
      ...searchQuery,
    };

    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(per_page);
    const skip = (pageNumber - 1) * itemsPerPage;

    const lengthFetchedSeedData = await seedModel.find(filter);

    const dataLength = lengthFetchedSeedData.length;

    const fetchedSeedData = await seedModel
      .find(filter)
      .skip(skip)
      .limit(itemsPerPage);

    if (fetchedSeedData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      dataLength,
      data: fetchedSeedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `API error: ${error.message}`,
    });
  }
};

export const selectedMonthSeedDataController = async (req, res) => {
  try {
    const { month, year = 2021 } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const startDate = moment(`${year}-${month}-01`, "YYYY-MMMM-DD").format(
      "YYYY-MM-DD"
    );

    console.log(`${startDate}T20:29:54+05:30`);
    const endDate = moment(`${year}-${month}-01`, "YYYY-MMMM-DD")
      .endOf("month")
      .format("YYYY-MM-DD");

    console.log(`${endDate}T20:29:54+05:30`);

    const salesData = await seedModel.find({
      dateOfSale: {
        $gte: `${startDate}T20:29:54+05:30`,
        $lt: `${endDate}T20:29:54+05:30`,
      },
    });

    if (!salesData) {
      return res.status(500).json({
        success: false,
        message: `Data not found for the given specific date.`,
      });
    }

    console.log(salesData.length);
    res
      .status(200)
      .json({ success: true, message: `Data fetched`, data: salesData });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
