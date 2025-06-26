import {AssignedOrganizationId} from "./assigned-organization-id";

test("create assigned organization", () => {
    const orga = new AssignedOrganizationId("1");
    expect(orga.id).toBe("1");
});