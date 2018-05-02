const Question = require('../models/Question');

module.exports = {
  searchPeerQuestion: (req, res) => {
    const { type } = req.query;
    let { /* major, */ keyword } = req.query;
    // major = major.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    req.app.get('socket').emit('data', req.user._id);
    Question.find({
      type,
      // major,
      $or: [{ body: new RegExp(keyword, 'i') }, { title: new RegExp(keyword, 'i') }],
    }, (err, questions) => {
      if (err) return res.send(err);
      return res.send(questions);
    });
  },
};
