const { getHomePages } = require("../services/contentService");

exports.homePagesList = function (req, res, next) {
    getHomePages()
      .then(function (data) {
        return res.render('index', {title: "Home Pages", data: data});
      }).catch(function (error) {
      next(error);
      })
}
