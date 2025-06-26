import {Organization} from "../entities/organization";
import {CreateOrganization} from "./create-organization";

test("create organization", async () => {

    const orgaRepoMock = {
        storeOrganization: jest.fn().mockImplementation((organization: Organization) => Promise.resolve(organization.id)),
        findOrganizationById: jest.fn().mockRejectedValue(new Error("should not be used"))
    }
    const uuidMock = () => "111-22-3333";
    const orgaUseCase = new CreateOrganization(orgaRepoMock, uuidMock);
    const result = await orgaUseCase.createOrganization("MyNewOrganization");
    expect(result).toStrictEqual(new Organization("111-22-3333", "MyNewOrganization", "someOrgaServiceOnlyAttribute"));
});