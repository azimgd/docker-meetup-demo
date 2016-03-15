import express from 'express';
import { createClient } from 'then-redis'

// Use the default config
const app = express();
const db = createClient(process.env.REDIS_PORT || null);

app.get('/', (req, res) => {
  const key = 'foo';
  const output = (number) => {
    res.send(`hello #${number}`);
  }

  return db.setnx(key, 0)
    .then(() => db.incr(key))
    .then(() => db.get(key))
    .then(output);
});

app.listen(3000);
