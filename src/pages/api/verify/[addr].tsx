import type { NextApiRequest, NextApiResponse } from "next";

const verifiedAddrs: string[] = [];
const verifiedNullHashes: string[] = [];
export function verifyAddress(addr: string, nullHash: string) {
    console.log(verifiedNullHashes, verifiedNullHashes.includes(nullHash));
    if (verifiedNullHashes.includes(nullHash)) {
        throw "Person has already verified";
    }
    if (isVerifiedAddr(addr)) {
        throw "Address has already been verified";
    }
    verifiedAddrs.push(addr);
    verifiedNullHashes.push(nullHash);
    console.log("Verified", addr);
}
export function isVerifiedAddr(addr: string): boolean {
    return verifiedAddrs.includes(addr);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        console.log("HII");
        try {
            verifyAddress(req.body.addr, req.body.nullHash);
            res.status(200).json({ 1: 1 });
        } catch {
            res.status(409).send({
                message: "Error: Already verified a wallet",
            });
        }
    } else if (req.method === "GET") {
        const { addr } = req.query;
        console.log(addr, verifiedAddrs);
        const isVerified = isVerifiedAddr(addr);
        res.status(200).json({ isVerified: isVerified });
    }
}
