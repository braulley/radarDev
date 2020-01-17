const dev = require('../models/Dev')
const parseString = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {

        try{
            console.log(req.query)
            const {  techs, latitude, longitude } = req.query;

            console.log(techs, latitude, longitude);

            const techsArray = parseString(techs)

            const devs = await dev.find({
                tech: { 
                    $in: techsArray,
                },
                location: {
                    $near:{
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            })

            console.log('DEVS',devs)
            return res.json(devs)

        }catch(error){
            return res.status(400).json(error)
        }

    }
}