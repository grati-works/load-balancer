import { logger } from './utils/logger';
import { app } from './app';

const { PORT } = process.env;

app.listen(PORT, error => {
  error
    ? logger.error(`Failed to listen Load Balancer on PORT ${PORT}`)
    : logger.info(`Load Balancer Server is running on port ${PORT}!`);
});
