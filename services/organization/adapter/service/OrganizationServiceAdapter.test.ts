import {OrganizationServiceAdapter} from "./OrganizationServiceAdapter";
import {Organization} from "../../core/entities/organization";
import {CreateOrganizationInterface} from "../../core/ports/driver/create-organization-interface";
import {LoadOrganizationInterface} from "../../core/ports/driver/load-organization-interface";

test("create new organization", async () => {
    const createUsecaseMock: CreateOrganizationInterface = {
        createOrganization: jest.fn().mockResolvedValue(new Organization("111-222-333", "orga1", "someOrgaServiceOnlyAttribute"))
    }
    const loadUsecaseMock: LoadOrganizationInterface = {
        loadOrganization: jest.fn().mockResolvedValue(new Organization("111-222-333", "orga1", "someOrgaServiceOnlyAttribute"))
    }
    const orga = new OrganizationServiceAdapter(createUsecaseMock, loadUsecaseMock);
    const result = await orga.createOrganization('orga1');
    expect(result).toStrictEqual({id: "111-222-333", name: "orga1"});
});

test("load organization", async () => {
    const createUsecaseMock: CreateOrganizationInterface = {
        createOrganization: jest.fn().mockResolvedValue(new Organization("111-222-333", "orga1", "someOrgaServiceOnlyAttribute"))
    }
    const loadUsecaseMock: LoadOrganizationInterface = {
        loadOrganization: jest.fn().mockResolvedValue(new Organization("111-222-333", "orga", "someOrgaServiceOnlyAttribute"))
    }
    const orga = new OrganizationServiceAdapter(createUsecaseMock, loadUsecaseMock);
    const result = await orga.getOrganization('111-222-333');
    expect(result).toStrictEqual({id: "111-222-333", name: "orga"});
});