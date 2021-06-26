const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const readerData = await Tag.findAll({
      // Add Book as a second model to JOIN with
      include: [{ model: Product }],
    });
    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const readerData = await Tag.create(req.body);
    res.status(200).json(readerData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  const updatedTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  res.status(200).json(updatedTag);
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagDestroyed = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(TagDestroyed);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
