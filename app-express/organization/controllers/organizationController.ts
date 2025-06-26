import { Request, Response } from 'express';
import {
  CreateOrganizationInterface
} from "../../../services/organization/core/ports/driver/create-organization-interface";
import {LoadOrganizationInterface} from "../../../services/organization/core/ports/driver/load-organization-interface";
import {HttpController} from "../../../services/organization/adapter/http-controller/http-controller";

export class OrganizationController {
  constructor(
    private orgaAdapter: HttpController
  ) {}

  /**
   * Create a new organization
   * @param req Express request object with name in the body
   * @param res Express response object
   */
  async createOrganization(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Organization name is required and must be a string' });
        return;
      }
      const adapterRequest = {
        name: name
      }

      const organization = await this.orgaAdapter.createOrganization(adapterRequest);
      
      res.status(201).json({
        id: organization.id,
        name: organization.name,
        someOrgaServiceOnlyAttribute: organization.someOrgaServiceOnlyAttribute
      });
    } catch (error) {
      console.error('Error creating organization:', error);
      res.status(500).json({ error: 'Failed to create organization' });
    }
  }

  /**
   * Get organization by ID
   * @param req Express request object with id in the params
   * @param res Express response object
   */
  async getOrganization(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'Organization ID is required' });
        return;
      }
      const adapterRequest = {
        organizationId: id
      }

      const organization = await this.orgaAdapter.loadOrganization(adapterRequest);
      
      if (!organization) {
        res.status(404).json({ error: 'Organization not found' });
        return;
      }

      res.status(200).json({
        id: organization.id,
        name: organization.name,
        someOrgaServiceOnlyAttribute: organization.someOrgaServiceOnlyAttribute
      });
    } catch (error) {
      console.error('Error loading organization:', error);
      res.status(500).json({ error: 'Failed to load organization' });
    }
  }

  /**
   * Get all organizations (placeholder for future implementation)
   * @param req Express request object
   * @param res Express response object
   */
  async getAllOrganizations(req: Request, res: Response): Promise<void> {
    try {
      // This would be implemented when the service supports listing all organizations
      res.status(501).json({ message: 'Get all organizations not implemented yet' });
    } catch (error) {
      console.error('Error getting organizations:', error);
      res.status(500).json({ error: 'Failed to get organizations' });
    }
  }
}
