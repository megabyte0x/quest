export const BALANCE_OF_FUNCTION_SIGNATURE = [
    {
        constant: true, // This is true if your function is a view or pure function
        name: "balanceOf",
        type: "function",
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        outputs: [
            {
                name: "result",
                type: "uint256",
            },
        ],
    },
];

export const ACCOUNT_FUNCTION_SIGNATURE = [
    {
        constant: true, // This is true if your function is a view or pure function
        name: "account",
        type: "function",
        inputs: [
            {
                name: "implementation",
                type: "address",
            },
            {
                name: "chainId",
                type: "uint256",
            },
            {
                name: "tokenContract",
                type: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
            },
            { name: "salt", type: "uint256" },
        ],
        outputs: [
            {
                name: "result",
                type: "address",
            },
        ],
    },
];