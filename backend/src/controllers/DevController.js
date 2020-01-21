const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res){
    const devs = await Dev.find();

      return res.json(devs);
  },

async store (req, res) {
  const { github_username, techs, latitude, longitude } = req.body;

  // Verificando se existe um usuário já cadastrado
  let dev = await Dev.findOne({ github_username });

  if (!dev){
 // Puxando dados da api
 const response = await axios.get(`https://api.github.com/users/${github_username}`);

 // Pegando os dados que serão utilizados
 const { name = login, avatar_url, bio } = response.data;

 // Converte string em um array
 // Map: percorre um array e para cada tecnologia ele retira os espaçamentos antes e depois de uma string
 const techsArray = parseStringAsArray(techs);

 const location = {
   type: 'Point',
   coordinates: [longitude, latitude],
 };


 // Cadastrando novo usuário
 dev = await Dev.create({
   github_username,
   name,
   avatar_url,
   bio,
   techs: techsArray,
   location,
 })

 // Filtrar as conexões que estão no máximo 10km de distância e uma tech filtrada
 const sendSocketMessageTo = findConnections(
   { latitude, longitude },
   techsArray,
 )
  sendMessage(sendSocketMessageTo, 'new-dev', dev);
  }

  return res.json(dev);
}
};

// teste