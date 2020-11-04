const express = require('express')
const router = express.Router();


const { create , detailById , read , remove , update, list, photo} = require('../controllers/detail');
const { requireSignin , isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');





router.get('/detail/:detailId', read);
router.post("/detail/create/:userId", requireSignin,isAuth, create );
router.delete('/detail/:detailId/:userId',requireSignin,isAuth,isAdmin, remove );
router.put('/detail/:detailId/:userId',requireSignin,isAuth, update );



router.get('/details', list);

router.get('/detail/photo/:detailId', photo);



router.param('userId', userById);
router.param('detailId', detailById);



module.exports = router;


























































