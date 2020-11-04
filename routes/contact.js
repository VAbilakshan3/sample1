const express = require('express')
const router = express.Router();


const { create , read ,contactById, remove , update, list} = require('../controllers/contact');
const { requireSignin , isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');





router.get('/contact/:contactId', read);
router.post("/contact/create/:userId", requireSignin,isAuth, create );
// router.delete('/contact/:contactId/:userId',requireSignin,isAuth,isAdmin, remove );
// router.put('/contact/:contactId/:userId',requireSignin,isAuth, update );



router.get('/contacts', list);




router.param('userId', userById);
router.param('contactId', contactById);




module.exports = router;


























































