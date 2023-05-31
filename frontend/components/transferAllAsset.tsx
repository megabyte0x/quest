// Create a transfer all asset component which will fetch the data from the transferAllAssetData API and will sign a transaction using ethers.js library and send it to the safeTransferFromTxn API.

import React, { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export default function TransferAllAsset() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTransfer = async () => {
    try {
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleTransfer}>Transfer All Asset</button>
    </div>
  );
}
