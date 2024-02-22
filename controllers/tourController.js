const fs = require('fs');
// const { writeFile } = require('node:fs/promises');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || req.body.price) {
    // if (!req.body.hasOwnProperty('name') || req.body.hasOwnProperty('price')) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // const newTour = { id: newId, ...req.body };
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  // await writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, tours);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) throw err;
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
  // MY SOLUTION
  //   if (!tours.some((el) => el.id === +req.params.id)) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Invalid ID',
  //     });
  //   }

  //   let updateTour = tours.find((el) => el.id === +req.params.id);
  //   if (updateTour) {
  //     updateTour = { ...updateTour, ...req.body };
  //   }

  //   const indexOfUpdatedTour = tours.findIndex((el) => el.id === +req.params.id);

  //   if (indexOfUpdatedTour !== -1) {
  //     tours[indexOfUpdatedTour] = updateTour;
  //   }
  //   fs.writeFile(
  //     `${__dirname}/dev-data/data/tours-simple.json`,
  //     JSON.stringify(tours),
  //     (err) => {
  //       res.status(200).json({
  //         status: 'success',
  //         data: {
  //           tour: updateTour,
  //         },
  //       });
  //     }
  //   );
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
