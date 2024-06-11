import multer from 'multer';

// !todo: change the destination to multer-s3
export const UploadFile = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname +
          '-' +
          Date.now() +
          '.' +
          file.mimetype.split('/')[1],
      );
    },
  }),
});
