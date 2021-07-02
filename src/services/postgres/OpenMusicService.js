const {Pool} = require('pg');
const {nanoid} = require('nanoid');

/**
 * @Desc custom error
 */
const NotFoundError = require('../../exceptions/NotFoundError');

/**
 * @Desc mapping field db to model
 */
const {mapDBToModel} = require('../../utils/index');


class OpenMusicService {
  constructor() {
    this._pool = new Pool();
  }


  async postOpenMusicService(dataPayload) {
    const {title, year, performer, genre, duration} = dataPayload;
    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: `INSERT INTO openmusic 
                VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      values: [id, title, year, performer,
        genre, duration, insertedAt, updatedAt],
    };
    const Result = await this._pool.query(query);

    if (!Result.rowCount) throw new Error('Gagal menambahkan Data Music...!');
    return Result.rows[0].id;
  }


  async getOpenMusicService() {
    const Result = await this._pool.query('SELECT * FROM openmusic');
    const data = Result.rows.map((music) => {
      return {
        id: music.id,
        title: music.title,
        performer: music.performer,
      };
    });

    return data;
  }


  async getOpenMusicByIdService(id) {
    const query = {
      text: 'SELECT * FROM openmusic WHERE id = $1',
      values: [id],
    };
    const Result = await this._pool.query(query);

    if (!Result.rowCount) throw new NotFoundError('Music tidak ditemukan...!');

    return Result.rows.map(mapDBToModel);
  }


  async putOpenMusicByIdService(id, newData) {
    const {title, year, performer, genre, duration} = newData;

    const query = {
      text: `UPDATE openmusic
             SET title=$1, year=$2, performer=$3, genre=$4, duration=$5
             WHERE id=$6`,
      values: [title, year, performer, genre, duration, id],
    };
    const Result = await this._pool.query(query);

    if (!Result.rowCount) {
      throw new NotFoundError('Gagal memperbarui music, id tidak ditemukan');
    }
  }


  async deleteOpenMusicByIdService(id) {
    const query = {
      text: 'DELETE FROM openmusic WHERE id=$1',
      values: [id],
    };
    const Result = await this._pool.query(query);

    if (!Result.rowCount) throw new NotFoundError('Music gagal dihapus, id tidak ditemukan');
  }
}


module.exports = OpenMusicService;
