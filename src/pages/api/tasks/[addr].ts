import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { addr } = req.query;
    let tasks = {
        ownsEns: false,
    };
    const domains = await getENSDomains(addr);
    if (domains?.length > 0) tasks.ownsEns = true;

    res.status(200).json({ tasks: tasks });
}

async function getENSDomains(addr) {
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
    console.log(domains);
    return domains;
}
