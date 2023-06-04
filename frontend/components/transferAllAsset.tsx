import React, { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import OpenSeaABI from "../constants/abis/openseaABI.json";

export default function TransferAllAsset() {
  const { address } = useAccount();
  const [tnxLink, setTnxLink] = useState("");

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const handleTransfer = async () => {
    try {
      const response = await fetch("api/transferAllAssetsTxnData", {
        method: "POST",
        body: JSON.stringify({
          address: address,
        }),
      });

      const data = await response.json();
      console.log(data.tokenIds);

      const { request } = await publicClient.simulateContract({
        address: "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
        abi: OpenSeaABI.abi,
        functionName: "safeBatchTransferFrom",
        account: address,
        args: [
          address?.toString(),
          data.to?.toString(),
          data.tokenIds,
          data.tokenBalances,
          "0x00",
        ],
      });

      const tx = await walletClient?.writeContract(request);

      setTnxLink("https://mumbai.polygonscan.com/tx/" + tx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleTransfer}>Transfer All Asset</button>
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
