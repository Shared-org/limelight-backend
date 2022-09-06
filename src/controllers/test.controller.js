exports.test = async (req, res) => {
  try {
    return res.status(200).json({ message: "successfully hit api" });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
