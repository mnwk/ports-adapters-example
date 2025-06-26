import {Organization} from "./organization";


test("test accessors",()=>{
    const org = new Organization("1", "Organization");
    expect(org.id).toBe("1");
    expect(org.name).toBe("Organization");
});
