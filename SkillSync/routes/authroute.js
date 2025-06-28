const express = require('express');
const authcontroller = require('../controler/authcontroler');   

const router = express.Router();

router.post('/login', authcontroller.login);
router.post('/register', authcontroller.register);
router.get('/users', authcontroller.showSkillCards);
router.get('/showSkillCards', authcontroller.getUsersBySkill);
router.get('/search', async (req, res) => {
  const skills = await User.distinct('skills'); // to populate dropdown
  res.render('search', { skills });
});

module.exports = router;