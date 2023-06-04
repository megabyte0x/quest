import React, { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import CreateAccountABI from "../constants/abis/registryABI.json";

export default function CreateAccount() {
  const { address } = useAccount();
  const [tnxLink, setTnxLink] = useState("");

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const handleCreateAccount = async () => {
    try {
      const res = await fetch("/api/fetchTokenId", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          contractAddressIndex: "1",
        }),
      });
      const data1 = await res.json();

      if (data1.isMinted) {
        const tokenId = data1.tokenId;
        const { request } = await publicClient.simulateContract({
          address: "0x02101dfB77FDE026414827Fdc604ddAF224F0921",
          abi: CreateAccountABI.abi,
          functionName: "createAccount",
          account: address,
          args: [
            "0x2d25602551487c3f3354dd80d76d54383a243358",
            "80001",
            "0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5",
            tokenId,
            "0x00",
            "0x8129fc1c",
          ],
        });
        const tx = await walletClient?.writeContract(request);
        console.log(tx);
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: tx ? tx : "0xhh",
        });
        console.log(transaction);
        setTnxLink("https://mumbai.polygonscan.com/tx/" + tx);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleCreateAccount}>Create TBA</button>
      {tnxLink ? (
        <a href={tnxLink} target="_blank">
          View Transaction
        </a>
      ) : (
        <div>Not Created Yet!</div>
      )}
    </div>
  );
}
