const mapDBToModel = (music) => ({
  id: music.id,
  title: music.title,
  year: music.year,
  performer: music.performer,
  genre: music.genre,
  duration: music.duration,
  insertedAt: music.inserted_at,
  updatedAt: music.updated_at,
});


module.exports = {mapDBToModel};
