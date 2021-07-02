const OpenMusicHandler = require('./handler');
const routes = require('./routes');


const openMusicPlugin = {
  name: 'OpenMusic',
  version: '1.0.0',
  register: async function(server, options) {
    const {service, validator} = options;

    const openMusicHandler = new OpenMusicHandler(service, validator);

    server.route(routes(openMusicHandler));
  },
};


module.exports = openMusicPlugin;
