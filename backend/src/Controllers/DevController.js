const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringToArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs); 
    },
    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({github_username});
        if(!dev){
            const apiResponse =  await axios.get(`https://api.github.com/users/${github_username}`);
            let { name = login, avatar_url, bio} = apiResponse.data;
            //transforma as tecnologias em array
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
         dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
            // Filtrar conexões que estão há no máximo 10km de distância 
            //e que o dev tenha pelo menos uma das techs filtradas
            const sendSocketMessageTo = findConnections(
                    {latitude, longitude},
                    techsArray,
                )

                sendMessage(sendSocketMessageTo, 'new-dev', dev);


        }
        return response.json(dev);
    }
}