const tagRouter = require('./tag-router');

const router = require('express').Router();

router.use('/tags', tagRouter);

module.exports = router;
