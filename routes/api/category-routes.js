const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(allCategories);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'Nothing found with that id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const newData = await Category.create(req.body);
    res.status(200).json(newData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  const updatedData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  res.status(200).json(updatedData);
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDestroyed = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!readerData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(categoryDestroyed);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
