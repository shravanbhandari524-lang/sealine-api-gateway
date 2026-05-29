import Assign from "../02_models/assign.models.js";
export const getAssign = async (req, res) => {
  const { id } = req.params;
  try {
    const assign = await Assign.findById(id);
    if (!assign) {
      return res
        .status(404)
        .json({ success: false, message: "Assignement not found" });
    }
    res.json({ success: true, data: assign });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
export const create = async (req, res) => {
  const { req_id, off_id, service, coordinates } = req.body;
  try {
    const newAssign = await Assign.create({
      req_id: req_id,
      off_id: off_id,
      service: service,
      coordinates: coordinates,
    });
    res.json({ success: true, data: newAssign });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  const { req_id, off_id, service, coordinates } = req.body;
  try {
    const updatedAssign = await Assign.findByIdAndUpdate(
      id,
      {
        req_id: req_id,
        off_id: off_id,
        service: service,
        coordinates: coordinates,
      },
      { returnDocument: "after" },
    );
    if (!updatedAssign) {
      return res
        .status(404)
        .json({ success: false, message: "Assignement not found" });
    }
    res.json({ success: true, data: updatedAssign });
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
    const deletedAssign = await Assign.findByIdAndDelete(id);
    if (!deletedAssign) {
      return res
        .status(404)
        .json({ success: false, message: "Assignement not found" });
    }
    res.json({ success: true, data: deletedAssign });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message:
        "internal server error. Please contact devs at aquaverntechnologies@gmail.com",
    });
  }
};
