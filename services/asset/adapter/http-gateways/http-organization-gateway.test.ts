import {HttpClient, HttpOrganizationGateway} from "./http-organization-gateway";

let serviceGateway: HttpOrganizationGateway;
let httpClientMock: HttpClient
beforeEach(() => {
    httpClientMock = {
        get: jest.fn().mockResolvedValue({id: 'org-123', name: 'Test Organization'}),
        post: jest.fn().mockResolvedValue({id: 'org-123', name: 'Test Organization'})
    }
    serviceGateway = new HttpOrganizationGateway(
        'http://localhost',
        '3000',
        httpClientMock
    );
    jest.clearAllMocks();
});

test('save orga', async () => {
    await serviceGateway.createOrganization('Test Organization');
    expect(httpClientMock.post).toBeCalledWith(
        'http://localhost:3000/organizations',
        {name: 'Test Organization'}
    );
});

test('load orga', async () => {
    const organization = await serviceGateway.loadOrganization('org-123');
    expect(httpClientMock.get).toBeCalledWith(
        'http://localhost:3000/organizations/org-123'
    );
})
