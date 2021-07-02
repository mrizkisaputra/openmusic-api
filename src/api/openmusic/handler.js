const ClientError = require('../../exceptions/ClientError');


class OpenMusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    /**
     * @Desc mengikat implementation fungsi dengan method bind()
     *       agar tetap memiliki konteks nilai yang ditetapkan pada argumen.
     */
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }


  async postSongHandler(request, h) {
    try {
      this._validator.validate(request.payload);

      const songId = await this._service.postOpenMusicService(request.payload);
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR!
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  }


  async getSongsHandler(request, h) {
    const songs = await this._service.getOpenMusicService();
    const response = h.response({
      status: 'success',
      data: {
        songs,
      },
    });
    response.code(200);
    return response;
  }


  async getSongByIdHandler(request, h) {
    const {songId} = request.params;

    try {
      const song = await this._service.getOpenMusicByIdService(songId);
      const response = h.response({
        status: 'success',
        data: {
          song: song[0],
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR!
      const response = h.response({
        status: 'error',
        message: 'Server sedang bermasalah',
      });
      response.code(500);
      return response;
    }
  }


  async putSongByIdHandler(request, h) {
    const {songId} = request.params;

    try {
      this._validator.validate(request.payload);

      await this._service.putOpenMusicByIdService(songId, request.payload);
      const response = h.response({
        status: 'success',
        message: 'lagu berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR!
      const response = h.response({
        status: 'error',
        message: 'Server sedang bermasalah',
      });
      response.code(500);
      return response;
    }
  }


  async deleteSongByIdHandler(request, h) {
    const {songId} = request.params;

    try {
      await this._service.deleteOpenMusicByIdService(songId);
      const response = h.response({
        status: 'success',
        message: 'lagu berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR!
      const response = h.response({
        status: 'error',
        message: 'Server sedang bermasalah',
      });
      response.code(500);
      return response;
    }
  }
}


module.exports = OpenMusicHandler;
