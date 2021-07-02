require('dotenv').config();
const Hapi = require('@hapi/hapi');

const OpenMusicService = require('./services/postgres/OpenMusicService');

/**
 * @Desc validator
 */
const ValidatorOpenMusic = require('./validator/openmusic');


const init = async () => {
  const openMusicService = new OpenMusicService();

  /**
   * @Desc configuration server
   */
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  /**
   * @Desc registrasi plugin
   */
  await server.register([
    {
      plugin: require('./api/openmusic'),
      options: {
        service: openMusicService,
        validator: ValidatorOpenMusic,
      },
    },
  ]);

  await server.start();
  console.log(`Server Running on ${server.info.uri}`);
};


init();
