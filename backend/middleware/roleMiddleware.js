export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied - Admins only" });
  }
  next();
};

export const requireServiceProvider = (req, res, next) => {
  if (req.user.role !== "serviceProvider") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Access denied - Service Providers only",
      });
  }
  next();
};

export const requireUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied - Users only" });
  }
  next();
};
