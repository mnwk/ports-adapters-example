import {Organization} from "./organization";


test("test accessors",()=>{
    const org = new Organization("1", "Organization","foo");
    expect(org.id).toBe("1");
    expect(org.name).toBe("Organization");
    expect(org.someOrgaServiceOnlyAttribute).toBe("foo");
});
