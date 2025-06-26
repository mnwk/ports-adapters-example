import * as fs from 'fs/promises';
import * as path from 'path';
import {FileOrganizationRepository} from "./file-organization-repository";
import {Organization} from "../../core/entities/organization";


jest.mock('fs/promises');

const storagePath = './test-storage';
let repository: FileOrganizationRepository;

beforeEach(() => {
    repository = new FileOrganizationRepository(storagePath);
    jest.clearAllMocks();
});

test('save orga', async () => {
    const mockOrganization = new Organization('321', 'Test Organization','someOrgaServiceOnlyAttribute');
    const expectedFilePath = path.join(storagePath, 'orga-321.json');
    const expectedSerializedData = JSON.stringify({
        id: '321',
        name: 'Test Organization',
        someOrgaServiceOnlyAttribute: 'someOrgaServiceOnlyAttribute'
    }, null, 2);

    await repository.storeOrganization(mockOrganization);

    expect(fs.writeFile).toHaveBeenCalledWith(
        expectedFilePath,
        expectedSerializedData,
        'utf8'
    );
});

test('load orga', async () => {
    const mockData = JSON.stringify({
        id: '321',
        name: 'Test Organization',
        someOrgaServiceOnlyAttribute: 'someOrgaServiceOnlyAttribute'
    });

    const expectedFilePath = path.join(storagePath, 'orga-321.json');
    (fs.readFile as jest.Mock).mockResolvedValueOnce(mockData);

    const organization = await repository.findOrganizationById('321');

    expect(fs.readFile).toHaveBeenCalledWith(expectedFilePath, 'utf8');
    expect(organization).toEqual(new Organization('321', 'Test Organization', "someOrgaServiceOnlyAttribute"));
});


