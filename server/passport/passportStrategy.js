import GoogleStrategy from 'passport-google-oauth2'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const passportStrategy = () => {
  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/user/google/callback',
      passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //get the user data from google
      // const newUser = {
      //   googleId: profile.id,
      //   displayName: profile.displayName,
      //   firstName: profile.name.givenName,
      //   lastName: profile.name.familyName,
      //   image: profile.photos[0].value,
      //   email: profile.emails[0].value
      // }
      console.log(profile)
      try {
        let user = await User.findOne({ googleId: profile.id })

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  return passport
}


export default passportStrategy(passport)

