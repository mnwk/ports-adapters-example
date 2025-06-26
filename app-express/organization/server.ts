import { createOrganizationApp } from './organizationApp';

// Create the organization app
const app = createOrganizationApp();

// Define port
const port = process.env.PORT || 3001;

// Start server
app.listen(port, () => {
  console.log(`Organization service running on port ${port}`);
});
