import jwt from "jsonwebtoken";  // Middleware to protect routes by verifying JWT tokens


// Middleware to protect routes by verifying JWT tokens
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });


  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  
  // Handle invalid token
  catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
