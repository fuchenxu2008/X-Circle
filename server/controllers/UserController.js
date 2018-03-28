/* eslint consistent-return:0 */

const path = require('path');
const { unlink } = require('fs');
const User = require('../models/User');
const { uploadAvatar } = require('../middlewares/multer');

module.exports = {
  getUser: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err || !user) return res.status(400).send('Unknown error occured');
      return res.json(user);
    });
  },
  changeAvatar: (req, res) => {
    uploadAvatar(req, res, err => {
      if (err) return res.status(400).send(err);
      User.findByIdAndUpdate(req.user._id, { avatar: `/api/user/avatar/${req.file.filename}` }, (err2, user) => {
        if (err2 || !user) return res.status(400).send('Unknown error occured');
        if (user.avatar) {
          const oldAvatarPath = user.avatar.split('/').pop();
          unlink(`${global.__root}/storage/avatar/${oldAvatarPath}`);
        }
        return res.json({ avatar: `/api/user/avatar/${req.file.filename}` });
      });
    });
  },
  getAvatar: (req, res) => {
    try {
      res.sendFile(path.join(global.__root, `storage/avatar/${req.params.userId}`));
    } catch (error) {
      res.json(error);
    }
  },
};
