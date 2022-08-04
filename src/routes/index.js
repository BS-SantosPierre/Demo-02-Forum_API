const authRouter = require('./auth-router');
const tagRouter = require('./tag-router');

const router = require('express').Router();

router.use('/tags', tagRouter);
router.use('/auth', authRouter);

module.exports = router;
