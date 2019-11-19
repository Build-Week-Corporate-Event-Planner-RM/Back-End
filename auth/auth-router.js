const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model')

const secret = require('../config/secrets')


router.post('/register', (req, res) => {
  const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;

    Users.add(user)
        .then(userN => {
            const token = generateToken(userN)
            res.status(200).json({token: token})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
          });
});



router.post('/login', (req, res) => {
  let { username, password } = req.body;

    Users.findBy({username})
        .then(user => {
            user = user[0]
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}! Here's a token...`,
                    token,
                  });
            }
            else{
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: `error logging user in!`})
        })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Users.findById(id)
    .then(user => {
        const username = user.username;
        res.status(200).json({ username: username });
    })
    .catch(err => res.status(500).json({ message: 'User with specified ID does not exist.', error: error }));
})

function generateToken(user){
  const payload = {
      username: user.username,
      password: user.password
  };
  const options ={
      expiresIn: '1d'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;
