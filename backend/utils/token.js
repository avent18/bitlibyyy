import jwt from 'jsonwebtoken';

export const generateToken = (userId)=>{
 try {
   const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
  return token;
 } catch (error) {
  return res.status(500).json({message: 'Internal server error'});
 }
}