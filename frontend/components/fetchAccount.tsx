// Create a transfer all asset component which will fetch the data from the transferAllAssetData API and will sign a transaction using ethers.js library and send it to the safeTransferFromTxn API.

import React, { useState } from "react";

export default function FetchAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txnLink, setTxnLink] = useState("");
  const [tokenId, setTokenId] = useState("0");

  const handleTKBA = async () => {
    setLoading(true);
    try {
      await fetch("/api/fetchAccount", {
        method: "POST",
        body: JSON.stringify({
          tokenId: tokenId,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.json());
          res.json().then((data) => {
            console.log(data);
            setTxnLink(data.tkbaAddress);
          });
        } else {
          setError("Error");
          setLoading(false);
        }
      });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleTKBA}>Get TBA</button>
    </div>
  );
}
