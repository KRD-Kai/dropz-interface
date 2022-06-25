import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { addr } = req.query;
    let tasks = {
        ownsEns: false,
        depositedOpti: false,
    };

    // TODO: Run these calls in parallel
    const domains = await getENSDomains(addr);
    const optiDeposits = await getOptiDeposits(addr);

    if (domains?.length > 0) tasks.ownsEns = true;
    if (optiDeposits?.length > 0) tasks.depositedOpti = true;

    res.status(200).json({ tasks: tasks });
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
