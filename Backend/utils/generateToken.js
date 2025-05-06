import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  //createing token
  const token = jwt.sign(
    {
      //payload
      userId,
    },
    //SECERT is the secret key used to sign the token
    process.env.JWT_SECRET,
    {
      expiresIn: "20d", //expire the token in 20d
    }
  );

  //SET JWT as HTTP-Only cookie
  //cookie() is function sets a cookie in the user's browser.
  res.cookie("jwt", token, {
    // jwt is name and token is value for cookie named jwt
    //options for cookie
    httpOnly: true, //This makes the cookie accessible only via HTTP requests (not via JavaScript).
    secure: process.env.NODE_ENV !== "development", // If process.env.NODE_ENV is not "development", the cookie will be marked as secure.
    sameSite: "strict", //This prevents the browser from sending the cookie with requests initiated from different sites (CSRF protection). With "strict", the cookie is only sent in requests originating from the same site.
    maxAge: 20 * 24 * 60 * 60 * 1000, //30d
  });
};

export default generateToken;
