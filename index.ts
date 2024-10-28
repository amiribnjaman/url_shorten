import app from './app';
import config from './config/config'; 
const PORT: number = config.app.port;

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});