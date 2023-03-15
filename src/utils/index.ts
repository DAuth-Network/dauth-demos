export const shorterString = (str: string) => {
    return str.length > 16 ? str.slice(0, 7) + "***" + str.slice(-7) : str;
}
export const sleep = (seconds = 2) => {
    return new Promise((resolve: any) => {
        setTimeout(() => {resolve()}, seconds * 1000)
    })
}