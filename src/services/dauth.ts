// @ts-ignore
import DAuth from "@dauth/core"
export const dauth = new DAuth({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    clientID: "demo",
});
export function githubOauth(code: string, account: string) {
    return dauth.service.authOauth({
        token: code,
        request_id: account,
        id_type: "github",
        mode: 'proof',
        withPlainAccount: true
    })
}
export function googleOauth(code: string, account: string) {
    return dauth.service.authOauth({
        token: code,
        request_id: account,
        id_type: "google",
        mode: 'proof',
        withPlainAccount: true
    })
}