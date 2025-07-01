import {Organization} from "../../core/entities/organization";
import {OrganizationServiceInterface} from "../../core/ports/driven/organization-service-interface";
import {FetchHttpClient} from "./FetchHttpClient";

export interface HttpClient {
    get<T>(url: string): Promise<T>

    post<T>(url: string, body: unknown): Promise<T>
}

export class HttpOrganizationGateway implements OrganizationServiceInterface {
    private httpClient: HttpClient
    private oraServiceUrl: string
    private orgaServicePort: string

    constructor(
        oraServiceUrl: string,
        orgServicePort: string,
        httpClient?: HttpClient
    ) {
        this.oraServiceUrl = oraServiceUrl;
        this.orgaServicePort = orgServicePort;
        if (!httpClient) {
            httpClient = new FetchHttpClient(fetch);
        }
        this.httpClient = httpClient;
    }

    async createOrganization(organizationName: string): Promise<Organization> {
        const url = `${this.oraServiceUrl}:${this.orgaServicePort}/organizations`;
        const response = await this.httpClient!.post<Organization>(url, {
            name: organizationName
        });
        return new Organization(response.id, response.name);

    }

    async loadOrganization(organizationId: string): Promise<Organization> {
        const url = `${this.oraServiceUrl}:${this.orgaServicePort}/organizations/${organizationId}`;
        const response = await this.httpClient!.get<Organization>(url);
        return new Organization(response.id, response.name);
    }

}