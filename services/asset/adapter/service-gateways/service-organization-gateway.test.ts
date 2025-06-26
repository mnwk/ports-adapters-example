import {ServiceOrganizationGateway} from "./service-organization-gateway";
import {OrganizationServiceAdapter} from "../../../organization/adapter/service/OrganizationServiceAdapter";

let serviceGateway: ServiceOrganizationGateway;
let serviceAdapterMock: OrganizationServiceAdapter;
beforeEach(() => {
    serviceAdapterMock = {
        createOrganization: jest.fn().mockResolvedValue({id: 'org-123', name: 'Test Organization'}),
        getOrganization: jest.fn().mockResolvedValue({id: 'org-123', name: 'Test Organization'})
    } as unknown as OrganizationServiceAdapter;
    serviceGateway = new ServiceOrganizationGateway(serviceAdapterMock);
    jest.clearAllMocks();
});

test('save orga', async () => {
    await serviceGateway.createOrganization('Test Organization');
    expect(serviceAdapterMock.createOrganization).toBeCalledWith('Test Organization');
});

test('load orga', async () => {
});


