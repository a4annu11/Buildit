import { sendWelcomeEmail } from "../mail/mailfunction.js";
import { User } from "../models/user.model.js";

// Admin verification of service provider
export const verifyServiceProvider = async (req, res) => {
  const { serviceProviderId } = req.body;

  try {
    const serviceProvider = await User.findById(serviceProviderId);

    if (!serviceProvider || serviceProvider.role !== "serviceProvider") {
      return res.status(404).json({ message: "Service provider not found" });
    }

    serviceProvider.isVerified = true;
    await serviceProvider.save();

    await sendWelcomeEmail(serviceProvider.email, serviceProvider.name);

    res.status(200).json({ message: "Service provider verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
