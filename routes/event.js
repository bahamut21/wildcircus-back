const express = require('express');
const connection = require('./conf');

const router = express.Router();

// Get all informations from one event by id.
router.get('/:id', (request, response) => {
  connection.query('SELECT id, name, city, date, picture1, picture2, picture3, picture4, picture5, tarif1, tarif2, tarif3, description FROM event WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

// Update informations from an event by id.
router.put('/:id', (request, response) => {
  connection.query('UPDATE event SET ? WHERE id = ?', [request.body, request.params.id], (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

// Delete an event by id.
router.delete('/:id', (request, response) => {
  connection.query('DELETE FROM event WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

// ADD an new event.
router.post('/', (request, response) => {
  connection.query('INSERT INTO event SET ?', request.body, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(201);
    }
  });
});


router.get('/', (request, response) => { // Search event by name.
  if (request.query.name) {
    connection.query("SELECT id, name, city, date, picture1, picture2, picture3, picture4, picture5, tarif1, tarif2, tarif3, description FROM event WHERE name LIKE '%' ? '%'", request.query.name, (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  } else if (request.query.city) { // Search event by city.
    connection.query("SELECT id, name, city, date, picture1, picture2, picture3, picture4, picture5, tarif1, tarif2, tarif3, description FROM event WHERE city LIKE '%' ? '%'", request.query.city, (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  } else if (request.query) { // Get all informations from all events.
    connection.query('SELECT id, name, city, date, picture1, picture2, picture3, picture4, picture5, tarif1, tarif2, tarif3, description FROM event', (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  }
});


module.exports = router;
