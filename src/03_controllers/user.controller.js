import User from "../../02_models/user.model.js";

export const getMe = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
