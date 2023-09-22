import jwt from "jsonwebtoken";

export const createToken = (userId) => {
    const token = jwt.sign({
        id: userId,
    }, process.env.JWT_SECRET, { expiresIn: "1d"} );
    return token;
}

export const authorizeToken = (req, res, next) => {
    const token = req.cookies.actk;
    if (!token) {
      return res.redirect("/login");
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = data.id;
      return next();
    } catch {
      res.clearCookie("actk");
      return res.redirect("/login");
    }
};

export const authorizeLogin = (req, res, next) => {
    const token = req.cookies.actk;
    if (token) return res.redirect("/dashboard");
    return next();
}