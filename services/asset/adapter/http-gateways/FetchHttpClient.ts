import {HttpClient} from "./http-organization-gateway";


export class FetchHttpClient implements HttpClient {
    constructor(private readonly fetchFn: typeof fetch) {}

    async get(url: string): Promise<any> {
        const response = await this.fetchFn(url)
        if (!response.ok) throw new Error(`GET failed: ${response.status}`)
        return response.json()
    }

    async post(url: string, body: unknown): Promise<any> {
        const response = await this.fetchFn(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (!response.ok) throw new Error(`POST failed: ${response.status}`)
        return response.json()
    }
}