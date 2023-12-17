const jwt = require('jsonwebtoken');
 /*
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
       //req.id=req.cookies['userid']
	next();
   } catch(error) {
        console.log(error)
       res.status(401).json({ error });
   }
};
*/
module.exports = (req, res, next) => {
    console.log('Contenu de req.session:', req.session);
    try {
        if (req.session.userId) {
            console.log(req.session.userId)
            req.auth = { userId: req.session.userId };
            console.log(req.auth.userId)
            next();
        } else {
            throw new Error('Session non authentifiée');
        }
    } catch(error) {
        console.error(error);
        res.status(401).json({ error: 'Non authentifié' });
    }
};
