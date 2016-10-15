var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'todoapp',
};

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM tasklist;', function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO (task, discription, complete FROM tasklist) VALUES ($1, $2, $3)',
      [req.body.task, req.body.discription, req.body.complete], function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

router.put('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE todoapp SET task=$2, discription=$3, complete=$4 WHERE id=$1;',
                  [req.body.id, req.body.task, req.body.discription, req.body.complete],
                  function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

router.delete('/', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('DELETE FROM tasklist WHERE id=$1;', [req.body.id],
                 function (err, result) {
                  done();
                  if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                  }

                  console.log('Got rows from the DB:', result.rows);
                  res.send(result.rows);
                  res.sendStatus(204);
                  done();
                });
  });
});

module.exports = router;
