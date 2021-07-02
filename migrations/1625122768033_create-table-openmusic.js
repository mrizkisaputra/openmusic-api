exports.up = (pgm) => {
  pgm.createTable('openmusic', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'smallint',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: true,
    },
    inserted_at: {
      type: 'VARCHAR(50)',
      notNUll: true,
    },
    updated_at: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};


exports.down = (pgm) => {
  pgm.dropTable('openmusic');
};
