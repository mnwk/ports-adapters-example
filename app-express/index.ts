import express from 'express';
import cors from 'cors';
import { createOrganizationApp } from './organization/organizationApp';

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ 
    message: 'Welcome to the Asset Management API',
    endpoints: {
      organizations: '/api/organizations'
    }
  });
});

// Mount the organization app
const organizationApp = createOrganizationApp();
app.use(organizationApp);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
