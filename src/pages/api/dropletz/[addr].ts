import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";

interface Droplet {
    appName: string;
    completed: boolean;
    desc: string;
    link: string;
    handle: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { addr } = req.query;
    let dropletz: Droplet[] = [
        {
            appName: "ENS",
            completed: false,
            desc: "Own at least one ENS domain",
            link: "https://app.ens.domains/",
            handle: "@ensdomains",
        },
        {
            appName: "Optimism",
            completed: false,
            desc: "Bridge L1 assets to Optimism using the official bridge",
            link: "https://app.optimism.io/bridge",
            handle: "@optimismPBC",
        },
    ];

    // TODO: Run these calls in parallel
    const domains = await getENSDomains(addr);
    const optiDeposits = await getOptiDeposits(addr);

    if (domains?.length > 0) dropletz[0].completed = true;
    if (optiDeposits?.length > 0) dropletz[1].completed = true;

    res.status(200).json({ dropletz: dropletz });
}

async function getENSDomains(addr: any) {
    const response = await fetch(
        `https://gateway.thegraph.com/api/${process.env.GRT_APIKEY}/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query: `
            query {
                accounts(where: {id: "${addr.toLowerCase()}"}) {
                    registrations {
                        id
                        domain {
                            name
                            labelName   
                            id
                        }
                    }
                }
            }`,
            }),
        }
    );
    const responseBody = await response.json();
    const domains = responseBody.data.accounts[0]?.registrations;
    return domains;
}

async function getOptiDeposits(addr: any) {
    const response = await fetch(
        `https://gateway.thegraph.com/api/${process.env.GRT_APIKEY}/subgraphs/id/3hF95YVM3wx6iFum9rx5BqP1srvmnkiVpHK5itt4Aqtd`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query: `
            query {
                etherReceiveds(where: {emitter: "${addr.toLowerCase()}"}) {
                    id
                    emitter
                    amount
                }
            }`,
            }),
        }
    );
    const responseBody = await response.json();
    console.log(responseBody);
    const deposits = responseBody.data.etherReceiveds;
    return deposits;
}
