import { WebBundlr } from "@bundlr-network/client";
import { TypedEthereumSigner } from "arbundles";

const key = process.env.PRIVATE_KEY; // your private key
if (!key) throw new Error("Private key is undefined!");
const signer = new TypedEthereumSigner(key);
const publicKeyInHex = signer.publicKey.toString("hex");
const publicKey = Buffer.from(publicKeyInHex, "hex");
const provider = {
    getPublicKey: async () => {
        return publicKey;
    },
    getSigner: () => {
        return {
            getAddress: () => publicKey,
            _signTypedData: async (
                _domain: never,
                _types: never,
                message: { address: string; "Transaction hash": Uint8Array }
            ) => {
                let convertedMsg = Buffer.from(message["Transaction hash"]).toString(
                    "hex"
                );
                const signatureData = Buffer.from(convertedMsg, "hex");
                const sign = Buffer.from(await signer.sign(signatureData));
                const signature = sign.toString("hex");
                const bSig = Buffer.from(signature, "hex");
                // pad & convert so it's in the format the signer expects to have to convert from.
                const pad = Buffer.concat([
                    Buffer.from([0]),
                    Buffer.from(bSig),
                ]).toString("hex");
                return pad;
            },
        };
    },

    _ready: () => { },
};
const bundlr = new WebBundlr(
    "https://devnet.bundlr.network",
    "matic",
    provider
);


export const uploadImg = async (fileToUpload: any, fileType: any) => {
    try {
        await bundlr.ready();
        console.log("bundlr.ready()=", bundlr);
        const dataStream = fileToUpload;

        const tx = await bundlr.upload(
            Buffer.from(await dataStream.arrayBuffer()),
            {
                tags: [{ name: "Content-Type", value: fileType }],
            }
        );
        console.log("upload tx=", tx);
        return tx
    } catch (error) {
        throw error
    }
}