const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token inválido!" });
  }
};

function checkRole(requireRole) {
  return (req, res, next) => {
    if (req.user?.role !== requireRole) {
      return res.status(403).json({ message: "Acesso negado!" });
    }
    next();
  };
}

module.exports = { checkToken, checkRole };
