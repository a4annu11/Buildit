import { sendEmailToAdmin } from "../mail/mailfunction.js";
import { User } from "../models/user.model.js";

// Register service provider
export const registerServiceProvider = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "serviceProvider",
    });

    await sendEmailToAdmin(user); // Send email to admin

    res.status(201).json({
      message: "Service provider registered. Awaiting admin approval.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
