import express, { Router } from 'express';
import { OrganizationController } from '../controllers/organizationController';

export function createOrganizationRouter(organizationController: OrganizationController): Router {
  const router = express.Router();

  // Create a new organization
  router.post('/organizations', (req, res) => organizationController.createOrganization(req, res));

  // Get organization by ID
  router.get('/organizations/:id', (req, res) => organizationController.getOrganization(req, res));

  // Get all organizations (placeholder for future implementation)
  router.get('/', (req, res) => organizationController.getAllOrganizations(req, res));

  return router;
}
