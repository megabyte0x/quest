import axios from "axios";
import { CONTRACT_ADDRESSES } from "../config/contract";

export const getTokenIdResponseData = async (
  address: string,
  contractAddressIndex: number
) => {
  const options = {
    method: "GET",
    url: `https://polygon-mumbai.g.alchemy.com/nft/v3/${process.env.ALCHEMY_KEY}/getNFTsForOwner`,
    params: {
      owner: address,
      "contractAddresses[]": CONTRACT_ADDRESSES[contractAddressIndex],
      withMetadata: "false",
      pageSize: "100",
    },
    headers: { accept: "application/json" },
  };

  const response = await axios.request(options);

  return response.data;
};
