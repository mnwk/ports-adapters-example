import {FetchHttpClient} from "./FetchHttpClient";

test('post request with FetchHttpClient', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            some:'value'
        }),
    });
    const httpClient = new FetchHttpClient(mockFetch);
    const response = await httpClient.post('http://localhost:3000/resource', {
        title: 'foo',
    });
    expect(response).toEqual({
        some:'value'
    });

});

test('get request with FetchHttpClient', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            some:'value'
        }),
    });
    const httpClient = new FetchHttpClient(mockFetch);
    const response = await httpClient.get('http://localhost:3000/resource');
    expect(response).toEqual({
        some:'value'
    });

});