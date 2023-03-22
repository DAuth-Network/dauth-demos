export const githubLogin = async () => {
    const host = window.location.protocol + '//' +  window.location.host + '/oauth/github'
    const CLIENT_ID = 'aeb37125b47b33e6c3fd'
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${host}&scope=user`;
}