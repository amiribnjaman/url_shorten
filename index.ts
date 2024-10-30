import app from './app';
import config from './config/config'; 
const PORT: number = config.app.port;
import { setupDb } from './config/database';


/*
**
** DATABASE SETUP FUNCTION EXECUTE
**
*/
setupDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});