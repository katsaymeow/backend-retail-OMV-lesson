const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag  }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagById) {
      res.status(404).json({ message: 'Sorry, that id does not exsist.'});
      return;
    }
    res.status(200).json(tagById);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(createNewTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', async (req, res) => {
//   // update a tag's name by its `id` value
//   try {
//     const updateTagById = await Tag.update(req.body, {
//       where: {
//         tag_id: req.params.tag_id,
    //   },
    // })
    // .then((updateTagById) => {
    //   return Tag.findAll({
    //     where: {
    //       tag_id: req.params.tag_id
    //     }
//       });
//     })
//     .then ((updateTagById) => {
//       const searchTagId = updateTagById.map(({
//         tag_id
//       }) => tag_id);
//       const newTagId = req.body.tag_id.filter((tag_id) => !searchTagId.includes((tag_id).map((tag_id) => {
//         return req.params.tag_id,
//       });
//     });

//   }
// });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteByTagId = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deleteByTagId) {
      res.status(404).json({ message: 'Sorry, that tag does not exsist.'});
      return;
    }
    res.status(200).json(deleteByTagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
