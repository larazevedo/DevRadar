const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    // Buscar todos os devs em um raio de 10km e filtrar por tecnologias
      const { latitude, longitude, techs } = req.query;
    
      const techsArray = parseStringAsArray(techs);
      
      // Formando lista de devs
      const devs = await Dev.find({
        // Filtra devs pelas tecnologias passadas na query
        techs:{
          $in: techsArray,
        },
        // Filtra pela localização
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            // Distância máxima
            $maxDistance: 1000,
          }
        }
      });

      return res.json({ devs });
  
  }
}