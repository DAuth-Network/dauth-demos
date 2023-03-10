import forge from 'node-forge'
async function encrypt(rawText: string, key: string) {
    if (key === "") {
        alert(
            "Secure Channel to Keysafe Node is not setup correctly. Please refresh page and try again."
        )
        throw Error("Error")
    }
    console.log("prepare key")
    var aesKey = forge.util.hexToBytes(key)
    var cipher = forge.cipher.createCipher("AES-GCM", aesKey)
    const iv = new Uint8Array(12) as any
    console.log("prepare iv")
    cipher.start({
        iv,
        tagLength: 0,
    })
    console.log(cipher)
    cipher.update(forge.util.createBuffer(rawText, "raw"))
    console.log("finish.")
    cipher.finish()
    const a = cipher.output.toHex()
    console.log("encrypted ", a)
    cipher.output.getBytes()
    return a
}
export function hashStr(cond: string) {
    var md = forge.md.sha256.create()
    md.update(cond)
    return md.digest().toHex()
}
export async function hashAndEncrypt(rawText: string, key: string) {
    const hash = hashStr(rawText)
    const encrypted = await encrypt(hash, key)
    return encrypted
}