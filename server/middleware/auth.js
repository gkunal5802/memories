import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      const decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // sub is id for google auth that differentiates different user.
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
