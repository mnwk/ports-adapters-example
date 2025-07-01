import express from 'express';
import cors from 'cors';
import {OrganizationController} from './controllers/organizationController';
import {createOrganizationRouter} from './routes/organizationRoutes';
import {HttpController} from "../../services/organization/adapter/http-controller/http-controller";
import {
    FileOrganizationRepository
} from "../../services/organization/adapter/repository-implementation/file-organization-repository";
import {CreateOrganization} from "../../services/organization/core/usecases/create-organization";
import {LoadOrganization} from "../../services/organization/core/usecases/load-organization";

export function createOrganizationApp() {
    // Create Express app
    const app = express();

    // Configure middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // DI part
    const orgaFileRepository = new FileOrganizationRepository('./app-express/data/');
    const orgaService = new HttpController(
        new CreateOrganization(orgaFileRepository),
        new LoadOrganization(orgaFileRepository)
    )

    // Create organization controller
    const organizationController = new OrganizationController(
        orgaService
    );

    // Create and use organization routes
    const organizationRouter = createOrganizationRouter(organizationController);
    app.use('/', organizationRouter);

    // Health check endpoint
    app.get('/health', (req, res) => {
        res.status(200).json({status: 'ok', service: 'organization-service'});
    });

    return app;
}
