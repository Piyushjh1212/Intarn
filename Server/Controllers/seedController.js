import moment from "moment";
import seedModel from "../Models/seedModel.js";

export const getAllSeedController = async (req, res) => {
  console.log("Fetching and seeding data...");

  try {
    const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

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

    console.log(data);
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
    const { month, search, page = 1, per_page = 10 } = req.query;

    // Build search query if search term is provided
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Search in title
            { description: { $regex: search, $options: "i" } }, // Search in description
            { price: { $regex: search, $options: "i" } }, // Search in price (as a string)
          ],
        }
      : {};

    // Build date filter if month is provided
    const dateFilter = month
      ? {
          dateOfSale: {
            $gte: moment(`${month} 01`, "MMMM DD").startOf("month").toDate(), // First day of the month
            $lt: moment(`${month} 01`, "MMMM DD").endOf("month").toDate(), // Last day of the month
          },
        }
      : {};

    // Combine filters: date and search
    const filter = {
      ...dateFilter,
      ...searchQuery,
    };

    // Pagination setup
    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(per_page);
    const skip = (pageNumber - 1) * itemsPerPage; // Number of items to skip based on page number

    // Fetch filtered data from MongoDB
    const fetchedSeedData = await seedModel
      .find(filter)
      .skip(skip) // Pagination
      .limit(itemsPerPage); // Pagination

    if (fetchedSeedData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found!",
      });
    }

    // Return success response with fetched data
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: fetchedSeedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `API error: ${error.message}`,
    });
  }
};