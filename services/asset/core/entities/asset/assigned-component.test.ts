import {AssignedComponent} from "./assigned-component";

test("accessors", ()=>{
    const assignedComponent = new AssignedComponent( "Component");
    expect(assignedComponent.name).toBe("Component");
});