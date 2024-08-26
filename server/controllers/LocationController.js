import dbConnection from "../config/db.js";

export const getLocation = async (req, res) => {
    const pincode = req.params.pincode;
    console.log("Received pincode:", pincode);

    try {
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

        const [addressRows] = await dbConnection.promise().query(
            'SELECT * FROM addresses WHERE location_id = ?',
            [location.id]
        );

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
    const connection = await dbConnection.promise();
    try {
        const { pincode, addresses, city, state } = req.body;

        const [locationResult] = await connection.query(
            'INSERT INTO locations (pincode, city, state) VALUES (?, ?, ?)',
            [pincode, city, state]
        );

        for (const address of addresses) {
            await connection.query( 
                'INSERT INTO addresses ( location_id, location_name) VALUES (?, ?)',
                [locationResult.insertId, address.location_name]
            );
        }

        res.status(201).json({
            message: "location created successfully",
            location: { pincode, addresses, city, state, id: locationResult.insertId }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        if (connection) {
            try {
                await connection.end(); 
            } catch (err) {
                console.error('Error closing the connection:', err.message);
            }
        }
    }
};
