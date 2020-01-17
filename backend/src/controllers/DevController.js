const devModel = require('../models/Dev')
const parseString = require('../utils/parseStringAsArray')
const { findConnections } = require('../../websocket')
const { sendMessage } = require('../../websocket')
const axios = require('axios')

class DevController {

    async index(req, res) {
        try{
            const dev = await devModel.find()

            return res.json(dev)
        }catch(error){
            return res.status(400).json(error)
        }
    }


    async store(req, res) {
        
        try{
            const { github_username, tech, latitude, longitude } = req.body

            let dev = await devModel.findOne({github_username}) 
            
            if(!dev){
                const response = await axios.get(`https://api.github.com/users/${github_username}`)
            
                const { name = login, avatar_url, bio } = response.data 
                
                const techsArray = parseString(tech)
                
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
                
                dev = await devModel.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    tech: techsArray,
                    location
                })

                //Filtrar as conexões que estão no máximo há 10Km de distância
                //e que o novo dev tenha pelo menos uma das tecnologias pesquisadas
                const sendSocketMessageTo = findConnections(
                    { latitude, longitude },
                    techsArray,
                )
                console.log(sendSocketMessageTo)
            }           

            console.log(dev)
            return res.json(dev)
        }catch(error){
            console.log('error',error)
            return res.status(400).json(error)
        }
       
    }


    async update (req, res) {
        try{

            const dev_id = req.params.id;

            const dev = await devModel.findByIdAndUpdate(dev_id, req.body,{
                new: true
            })

            return res.json(dev)
            

        }catch(error){
            return res.status(400).json(error)
        }
    }

    async destroy (req, res) {
        try{
            const dev_id = req.params.id;
            const dev = await devModel.findByIdAndDelete(dev_id);
            return res.json({"message": "deleted"}) 

        }catch(error){
            return res.status(400).json(error)
        }
    }
}

module.exports = new DevController()