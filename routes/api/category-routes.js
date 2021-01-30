const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }).then(categroyData => {
    res.json(categroyData);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    },
    where: {
      id: req.params.id
    }
  }).then(categroyData => {
    res.json(categroyData);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(categroyData => {
    return res.json(categroyData);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(categroyData => {
    if (!categroyData) {
      res.status(404).json({ message: 'No category with that id exists! '})
    }
    return res.json(categroyData);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categroyData => {
    return res.json(categroyData);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  })
});

module.exports = router;
