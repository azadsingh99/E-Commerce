export const getCategories = async (req, res) => {
  try {
    const categories = await req.db.collection('products')
      .distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
