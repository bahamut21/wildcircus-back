const express = require('express');
const connection = require('./conf');

const router = express.Router();


// Get all informations from one user by id.
router.get('/:id', (request, response) => {
  connection.query('SELECT firstName, lastName, email, id, city, nbTicket1, nbTicket2, nbTicket3, event_id FROM user WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

// Get all informations from one user by id join event infos.
router.get('/tickets/:id', (request, response) => {
  connection.query('SELECT u.firstName, u.lastName, u.email, u.id, u.city, u.nbTicket1, u.nbTicket2, u.nbTicket3, u.event_id, e.name, e.city as location, e.date, e.picture1, e.tarif1, e.tarif2, e.tarif3, e.tarif1 * u.nbTicket1 as total1, e.tarif2 * u.nbTicket2 as total2, e.tarif3 * u.nbTicket3 as total3, (e.tarif1 * u.nbTicket1) + (e.tarif2 * u.nbTicket2) + (e.tarif3 * u.nbTicket3) as total FROM user as u LEFT JOIN event as e ON e.id = u.event_id WHERE u.id = ?', request.params.id, (error, results) => {
    if (error) {
      console.log(error)
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

// Update informations from an user by id.
router.put('/:id', (request, response) => {
  connection.query('UPDATE user SET ? WHERE id = ?', [request.body, request.params.id], (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

// Delete an user by id.
router.delete('/:id', (request, response) => {
  connection.query('DELETE FROM user WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

// ADD an new user.
router.post('/', (request, response) => {
  connection.query('INSERT INTO user SET ?', request.body, (error, results) => {
    if (error) {
      response.sendStatus(500);
    } else {
      response.sendStatus(201);
    }
  });
});


router.get('/', (request, response) => { // Search user by name.
  if (request.query.lastName) {
    connection.query("SELECT firstName, lastName, email, id, city, nbTicket1, nbTicket2, nbTicket2, nbTicket3, event_id FROM user WHERE lastName LIKE '%' ? '%'", request.query.lastName, (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  } else if (request.query.email) { // Search user by email.
    connection.query("SELECT firstName, lastName, email, id, city, nbTicket1, nbTicket2, nbTicket2, nbTicket3, event_id FROM user WHERE email LIKE '%' ? '%'", request.query.email, (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  } else if (request.query) { // Get all informations from all users.
    connection.query('SELECT firstName, lastName, email, id, city, nbTicket1, nbTicket2, nbTicket2, nbTicket3, event_id FROM user', (error, results) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.json(results);
      }
    });
  }
});

module.exports = router;
