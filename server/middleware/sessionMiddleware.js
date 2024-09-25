import Cart from "../models/cart.js";

const generateSessionId = () => {
  return 'sess_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
};

const sessionMiddleware = async (req, res, next) => {
  
  console.log('Cookies:', req.cookies);
  console.log("sessionMiddleware");
  let sessionId = req.cookies.sessionId;

  if (!sessionId || sessionId=='') 
  {
    sessionId = generateSessionId();
    await Cart.create({ sessionId, items: [] });
    res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 9990000,secure:false });
  }

  req.sessionId = sessionId;

  next();
};

export default sessionMiddleware;