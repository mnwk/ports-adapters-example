import {Organization} from "../entities/organization";
import {LoadOrganization} from "./load-organization";

test("load organization", async () => {

    const orgaRepoMock = {
        storeOrganization: jest.fn().mockRejectedValue(new Error("should not be used")),
        findOrganizationById: jest.fn().mockResolvedValue(new Organization("111-22", "MyOrganization", "foo"))
    }

    const orgaUseCase = new LoadOrganization(orgaRepoMock);
    const result = await orgaUseCase.loadOrganization("111-22");
    expect(result).toStrictEqual(new Organization("111-22", "MyOrganization", "foo"));
});