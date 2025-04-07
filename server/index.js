// server.js
import {app, pool} from './app.js';

const PORT = 8000;
//
pool.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  {
    app.listen(PORT, () => {
      console.log(`Server has started on http://localhost:${PORT}`);
    });
  }
});
