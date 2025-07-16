const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  console.log("checkToken executado");
  console.log("Cookies recebidos:", req.cookies);
  console.log("Headers:", req.headers.authorization || "Sem header Authorization");

  const token = req.cookies.token;

  if (!token) {
    console.log("Token não encontrado!");
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); 
    req.user = decoded;
    console.log("Token decodificado com sucesso:", decoded);
    next();
  } catch (error) {
    console.log("Erro ao verificar o token:", error.message);
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

