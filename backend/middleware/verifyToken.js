// verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid or cannot be decoded
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    // Attach user information to the request object
    req.user = {
      id: decoded.id,
      role: decoded.role, // Attach role for role-based control
    };

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Error in verifyToken middleware: ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
