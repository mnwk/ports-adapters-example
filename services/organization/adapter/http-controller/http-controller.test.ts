import {HttpController} from "./http-controller";

test('create organization', async () => {
    const createOrganizationUseCaseMock = {
        createOrganization: jest.fn().mockResolvedValue({
            id: "1",
            name: "Test Organization",
            someOrgaServiceOnlyAttribute: "attributeValue"
        })
    };

    const loadOrganizationUseCaseMock = {
        loadOrganization: jest.fn().mockResolvedValue({
            id: "1",
            name: "Test Organization",
            someOrgaServiceOnlyAttribute: "attributeValue"
        })
    };

    const requestMock = {
        name: "Test Organization"
    };

    const controller = new HttpController(
        createOrganizationUseCaseMock,
        loadOrganizationUseCaseMock
    );

    const result = await controller.createOrganization(requestMock);

    expect(createOrganizationUseCaseMock.createOrganization).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
        id: "1",
        name: "Test Organization",
        someOrgaServiceOnlyAttribute: "attributeValue"
    });
});

test('load organization', async () => {
    const createOrganizationUseCaseMock = {
        createOrganization: jest.fn().mockResolvedValue({
            id: "1",
            name: "Test Organization",
            someOrgaServiceOnlyAttribute: "attributeValue"
        })
    };

    const loadOrganizationUseCaseMock = {
        loadOrganization: jest.fn().mockResolvedValue({
            id: "1",
            name: "Test Organization",
            someOrgaServiceOnlyAttribute: "attributeValue"
        })
    };

    const requestMock = {
        organizationId: "1"
    };

    const controller = new HttpController(
        createOrganizationUseCaseMock,
        loadOrganizationUseCaseMock
    );

    const result = await controller.loadOrganization(requestMock);

    expect(loadOrganizationUseCaseMock.loadOrganization).toHaveBeenCalledWith("1");
    expect(result).toStrictEqual({
        id: "1",
        name: "Test Organization",
        someOrgaServiceOnlyAttribute: "attributeValue"
    });
});