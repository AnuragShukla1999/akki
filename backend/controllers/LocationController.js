import sequelize from "../config/db.js";
import Address from "../models/addressSchema.js";
import Location from "../models/LocationSchema.js";


export const createLocation = async (req, res) => {
    const { pincode, addresses, city, state } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const location = await Location.create({
            pincode,
            city,
            state
        }, { transaction });

        
        const addressData = addresses.map(address => ({
            ...address,
            locationId: location.id
        }));

        
        await Address.bulkCreate(addressData, { transaction });

       
        await transaction.commit();

        res.status(201).json({
            message: "Location and addresses created successfully",
            location: { pincode, city, state, id: location.id }
        });
    } catch (error) {
        await transaction.rollback();

        res.status(500).json({
            message: error.message
        });
    }
};


export const getLocation = async (req, res) => {
    const pincode = req.params.pincode;
    console.log("Received pincode:", pincode);

    try {
        const location = await Location.findOne({
            where: { pincode },
            include: [{
                model: Address,
                as: 'addresses',
                attributes: ['id', 'locationName']
            }]
        });

        if (!location) {
            return res.status(404).json({
                message: "Pincode not found"
            });
        }

        res.status(200).json({
            _id: location.id,
            pincode: location.pincode,
            city: location.city,
            state: location.state,
            addresses: location.addresses.map(address => ({
                _id: address.id,
                locationName: address.locationName
            })),
            createdAt: location.createdAt,
            updatedAt: location.updatedAt
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};