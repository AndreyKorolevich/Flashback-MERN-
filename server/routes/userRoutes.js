import express from 'express'
import passportStrategy from '../passport/passportStrategy.js'
import { signin, signup, update, googleSignin } from '../controllers/userController.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/update', update)

router.get('/google', passportStrategy.authenticate('google', {
  scope: ['email', 'profile']
}))

router.get('/google/callback',
  passportStrategy.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
  }))

router.get('/google/callback/success', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/callback/failure')
  }
  res.send('Welcome ' + req.user.email)
})

router.get('/google/callback/failure', (req, res) => {
  res.send('Error')
})


export default router