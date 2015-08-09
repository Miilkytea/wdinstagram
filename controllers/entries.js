// Controller for Entries

// GET '/' - renders entries index page

module.exports.renderEntriesIndex = function(req, res, next) {
  res.render('entries/index', { title: 'WDInstagram' });
  Entry.find(function(error, entries) {
    if (error) res.send(error);
    res.render('entries', {title: 'Entries', entries: entries});
  });
};

module.exports.renderEntriesNew = function(req, res, next) {
  res.render('entries/new', { title: 'Create new Entry' });
};

module.exports.renderEntriesCreate = function(req, res, next) {
  var entry = new Entry();
  entry.author = req.body.author;
  entry.photo_url = req.body.photo_url;
  entry.date_taken = req.body.date_taken;
  entry.likes = req.body.likes;

  entry.save();
  res.redirect('/entries');
};

module.exports.renderEntriesShow = function(req, res, next) {
  Entry.findOne({_id: request.params.id}, function(error, entry){
    if(error) res.send(error);
    res.send('show', {title: entry.author, entry: entry});
  });
};

module.exports.renderEntriesEdit = function(req, res, next) {
  Entry.findOne({ _id: req.params.id }, function(error, entry){
    res.render('entries/index', { title: 'Edit an Entry', entry: entry });
  });
};

module.exports.renderEntriesUpdate = function(req, res, next) {
  Entry.update({_id: req.params.id}, {
    author: req.body.author,
    photo_url: req.body.photo_url,
    date_taken: req.body.date_taken,
    likes: req.body.likes
  }, function(error){
      if (error) return res.send(error);
      res.redirect('/entries');
  });
};

module.exports.renderEntriesDelete = function(req, res, next) {
  Entry.findAndRemoveById(request.params.id, function(error){
    if (error) res.send(error);
    response.redirect('/entries');
  });
};
