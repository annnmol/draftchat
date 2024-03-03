import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export const AUTH_HEADERS = (token: string) => ({
    ...DEFAULT_HEADERS,
    Authorization: `Bearer ${token}`,
    token,
})

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL as string ?? "http://localhost:5002";

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID! as string,
        secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY! as string,
    },
});

export class Network {
    constructor() { }

    public async get<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
        const fullUrl = `${SERVER_BASE_URL}${url}`;
        const response = await fetch(fullUrl, { headers, credentials: "include" });
        if (response.status === 401) {
            localStorage.clear();
        }
        return response.json();
    }

    public async post<T>(
        url: string,
        body: any,
        headers = DEFAULT_HEADERS
    ): Promise<T> {
        const fullUrl = `${SERVER_BASE_URL}${url}`;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            credentials: "include"
        });
        if (response.status === 401) {
            localStorage.clear();
        }
        return response.json();
    }

    public async put<T>(
        url: string,
        body: any,
        headers = DEFAULT_HEADERS
    ): Promise<T> {
        const fullUrl = `${SERVER_BASE_URL}${url}`;
        const response = await fetch(fullUrl, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
            credentials: "include"
        });
        if (response.status === 401) {
            localStorage.clear();
        }
        return response.json();
    }

    public async delete<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
        const fullUrl = `${SERVER_BASE_URL}${url}`;
        const response = await fetch(fullUrl, {
            method: "DELETE", headers,
            credentials: "include"
        });
        if (response.status === 401) {
            localStorage.clear();
        }
        return response.json();
    }

    public async upload(
        bucket: string,
        key: string,
        file: File,
    ): Promise<any> {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file,
            ContentType: file.type,
        });

        try {
            await s3Client.send(command);
            const url = `https://${bucket}.s3.ap-south-1.amazonaws.com/${key}`;
            return url;
        } catch (err) {
            return err;
        }
    }

}

export const NetworkService = new Network();