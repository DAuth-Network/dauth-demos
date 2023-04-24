import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
const pn = new ParticleNetwork({
    projectId: "dc8c16f2-bbd2-42ce-aa7f-71fefd7a37c1",
    clientKey: "xx",
    appId: "xx",
    chainName: "Ethereum", //optional: current chain name, default Ethereum.
    chainId: 1, //optional: current chain id, default 1.
    wallet: {   //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
        displayWalletEntry: true,  //show wallet entry when connect particle.
        defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
        uiMode: "dark",  //optional: light or dark, if not set, the default is the same as web auth.
        supportChains: [{ id: 1, name: "Ethereum" }, { id: 5, name: "Ethereum" }], // optional: web wallet support chains.
        customStyle: {}, //optional: custom wallet style
    }
});

export const loginWithPN =async (jwt: string) => {
    const userInfo = await pn.auth.login({
        // when set social login auth type, will open thirdparty auth page directly.
        preferredAuthType: 'jwt',
        account: jwt,
        hideLoading: true, //hide particle loading when use jwt authorization.
    })
    return userInfo
}