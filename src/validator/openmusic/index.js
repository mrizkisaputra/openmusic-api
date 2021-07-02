const {schemaOpenMusic} = require('./schema');
const BadRequestError = require('../../exceptions/BadRequestError');


const ValidatorOpenMusic = {
  validate: function(dataPayload) {
    const validateResult = schemaOpenMusic.validate(dataPayload);
    if (validateResult.error) throw new BadRequestError(validateResult.error.message);
  },
};


module.exports = ValidatorOpenMusic;
