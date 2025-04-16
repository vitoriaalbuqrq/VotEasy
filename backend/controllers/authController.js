const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const authController = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatório." });
    }
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório." });
    }
    if (!password) {
      return res.status(422).json({ msg: "O password é obrigatório." });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res
        .status(422)
        .json({ msg: "Este endereço de e-mail já está cadastrado." });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role: role?.toUpperCase() === 'ORGANIZER' ? 'ORGANIZER' : 'USER',
        },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject:
          "Confirme seu email clicando no link abaixo e comece a utilizar o app.",
        text: `http://localhost:3333/api/auth/confirm?token=${user.validation_id}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ msg: "Erro ao enviar e-mail!" });
        }
      });

      res.status(200).json({ msg: "Cadastro realizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no sevidor!" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório." });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatório." });
    }
    //check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "Usuario não encontrado." });
    }

    if (!user.checked) {
      return res
        .status(403)
        .json({ msg: "Confirme seu e-mail antes de fazer login." });
    }

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        secret,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
        path: "/",
      });

      res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        token,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        }
      });      
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro no sevidor!" });
    }
  },

  confirmEmail: async (req, res) => {
    const { token } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        validation_id: token,
      },
    });

    if (!user) {
      return res.status(404).send();
    }

    await prisma.user.update({
      data: {
        checked: new Date(),
        validation_id: "",
      },
      where: {
        id: user.id,
      },
    });
    return res.redirect("http://localhost:3000/auth/organizer/login?emailConfirmed=true");
    //return res.status(200).json({ msg: "Email confirmado com sucesso." });
  },
};

module.exports = authController;
