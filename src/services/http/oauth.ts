export const githubLogin = async () => {
    const CLIENT_ID = 'aeb37125b47b33e6c3fd'
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${'http://localhost:3000/oauth/github'}&scope=user`;
}