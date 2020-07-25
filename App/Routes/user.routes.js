module.exports = (app) => {
  const user = require("../Controllers/user.controller");
  var router = require("express").Router();

  router.post("/", user.create);

  router.get("/", user.findAll);

  router.get('/:id', user.fineOne);

  router.delete("/", user.deleteAll);

  app.use("/api/users", router);
};
