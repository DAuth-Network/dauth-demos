import axios, { AxiosResponse } from 'axios';
import forge from "node-forge"

const instance = axios.create({
    baseURL: 'https://demo.keysafe.network:30002/dauth'
});

interface RequestPayload {
    [key: string]: any;
}

interface ResponsePayload<T> {
    data: T;
    status: string;
}
// Exchange key
interface exchangeKeyEequestPayload {
    key: string

}
export const dauth_exchangeKey = async (payload: exchangeKeyEequestPayload): Promise<any> => {
    try {
        const response: AxiosResponse = await instance.post(`/exchange_key`, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Register email
interface registerEmailEequestPayload {

    cipher_email: string,
    session_id: string
}
export const dauth_registerEmail = async (payload: RequestPayload): Promise<any> => {
    try {
        const response: AxiosResponse = await instance.post(`/register_email`, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Confirm registered email
interface registerEmailEequestPayload {

    cipher_code: string,
    session_id: string
}
export const dauth_confirmRegisteredEmail = async (payload: RequestPayload): Promise<any> => {
    try {
        const response: AxiosResponse = await instance.post(`/register_email_confirm`, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Get user info
export interface IProfileItem {
    auth_hash: string
    auth_id: string
    auth_signature: string
    auth_type: string
}

export const dauth_getUserInfo = async (): Promise<ResponsePayload<IProfileItem[]>> => {
    try {
        const response: AxiosResponse = await instance.get(`/info`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        console.log(response)
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
