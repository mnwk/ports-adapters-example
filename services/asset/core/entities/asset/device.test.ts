import {Device} from "./device";

test("generate dto", () => {
    const device = new Device("1", "Device");
    const dto = device.toDto();
    expect(dto.id).toBe("1");
    expect(dto.name).toBe("Device");
    expect(dto.assignedComponent).toBe(undefined);
});

test("generate dto with assigned component", () => {
    const device = new Device("1", "Device");
    device.assignComponent("Component");
    const dto = device.toDto();
    expect(dto.id).toBe("1");
    expect(dto.name).toBe("Device");
    expect(dto.assignedComponent!.name).toBe("Component");
});

test("accessors", () => {
    const device = new Device("1", "Device");
    expect(device.id).toBe("1");
    expect(device.name).toBe("Device");
});

test("with assigned component", () => {
    const device = new Device("1", "Device");
    device.assignComponent("Component");
    expect(device.assignedComponent!.name).toBe("Component");
});