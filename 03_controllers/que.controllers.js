import Que from "../02_models/que.model.js";
export const getQue = async (req, res) => {
  const { id } = req.params;
  try {
    const que = await Que.findById(id);
    if (!que) {
      return res
        .status(404)
        .json({ success: false, message: "query not found" });
    }
    res.json({ success: true, data: que });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
export const create = async (req, res) => {
  const { user_id } = req.params;
  const { service, coordinates, typed, quantity } = req.body;
  try {
    const newQue = await Que.create({
      user_id: user_id,
      service: service,
      typed: typed,
      quantity: quantity,
      location: {
        coordinates: coordinates,
      },
    });
    res.json({ success: true, data: newQue });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  const { service, coordinates, quantity } = req.body;
  try {
    const updatedQue = await Que.findByIdAndUpdate(
      id,
      {
        service: service,
        quantity: quantity,
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      },
      { returnDocument: "after" },
    );
    if (!updatedQue) {
      return res
        .status(404)
        .json({ success: false, message: "query not found" });
    }
    res.json({ success: true, data: updatedQue });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
export const delet = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQue = await Que.findByIdAndDelete(id);
    if (!deletedQue) {
      return res
        .status(404)
        .json({ success: false, message: "query not found" });
    }
    res.json({ success: true, data: deletedQue });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
