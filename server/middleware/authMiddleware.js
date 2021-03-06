import jwt from 'jsonwebtoken'

const minLengthGoogleToken = 500

const auth = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < minLengthGoogleToken

    let decodeData

    if(token && isCustomAuth){
      decodeData = jwt.verify(token, process.env.SECRET)
      req.userId = decodeData?.id
    }else{
      decodeData = jwt.decode(token)
      req.userId = decodeData?.sub
    }

    next()
  }catch (e) {
    console.log(e)
  }
}

export default auth