// import locationModal from "../models/LocationSchema.js";


// export const getLocation = async (req, res) => {

//     const pincode = req.params.pincode;
//     console.log("Received pincode:", pincode);
//     try {
//         const pinCode = await locationModal.findOne({ pincode })

//         if (!pinCode) {
//             return res.status(401).json({
//                 message: "pincode not found"
//             })
//         }

//         res.status(201).json({
//             data: pinCode
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// };





// export const createLocation = async (req, res) => {

//     try {
//         const { pincode, addresses, city, state } = req.body;

//         const location = new locationModal({ pincode, addresses, city, state });

//         await location.save();

//         res.status(201).json({
//             message: "location created successfully",
//             location
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }





import dbConnection from "../config/db.js";

export const getLocation = async (req, res) => {
    const pincode = req.params.pincode;
    console.log("Received pincode:", pincode);

    try {
        // Get location details
        const [locationRows] = await dbConnection.promise().query(
            'SELECT * FROM locations WHERE pincode = ?',
            [pincode]
        );

        if (locationRows.length === 0) {
            return res.status(404).json({
                message: "Pincode not found"
            });
        }

        const location = locationRows[0];

        // Get associated addresses
        const [addressRows] = await dbConnection.promise().query(
            'SELECT * FROM addresses WHERE location_id = ?',
            [location.id]
        );

        // Format the response
        res.status(200).json({
            _id: location.id,
            pincode: location.pincode,
            city: location.city,
            state: location.state,
            addresses: addressRows.map(address => ({
                _id: address.id,
                locationName: address.location_name
            })),
            createdAt: location.created_at,
            updatedAt: location.updated_at
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// export const createLocation = async (req, res) => {
//     try {
//         const { pincode, addresses, city, state } = req.body;

//         const [result] = await dbConnection.promise().query(
//             'INSERT INTO locations (pincode, addresses, city, state) VALUES (?, ?, ?, ?)',
//             [pincode, addresses, city, state]
//         );

//         res.status(201).json({
//             message: "location created successfully",
//             location: { pincode, addresses, city, state, id: result.insertId }
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };








export const createLocation = async (req, res) => {
    const connection = dbConnection.promise();

    try {
        const { pincode, addresses, city, state } = req.body;

        // Start a transaction
        await connection.query('START TRANSACTION');

        // Insert into locations table
        const [result] = await connection.query(
            'INSERT INTO locations (pincode, city, state) VALUES (?, ?, ?)',
            [pincode, city, state]
        );
        const locationId = result.insertId;

        // Insert into addresses table
        const addressPromises = addresses.map(address =>
            connection.query(
                'INSERT INTO addresses (location_name, location_id) VALUES (?, ?)',
                [address.locationName, locationId]
            )
        );
        await Promise.all(addressPromises);

        // Commit the transaction
        await connection.query('COMMIT');

        res.status(201).json({
            message: "Location and addresses created successfully",
            location: { pincode, city, state, id: locationId }
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.query('ROLLBACK');

        res.status(500).json({
            message: error.message
        });
    }
};