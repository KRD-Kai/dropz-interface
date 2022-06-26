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
        {
            appName: "Polygon",
            completed: false,
            desc: "Bridge L1 assets to Polygon",
            link: "https://wallet.polygon.technology/login/",
            handle: "@0xpolygon"
        },
        {
            appName: "Polygon",
            completed: false,
            desc: "Validate on the Heimdall, Polygon's POS Verifier layer",
            link: "https://docs.polygon.technology/docs/maintain/validate/validator-index/",
            handle: "@0xpolygon"

        },
        {
            appName: "POAP",
            completed: false,
            desc: "Own a POAP token",
            link: "https://poap.xyz/",
            handle: "@poapxyz"
        }
    ];

    // TODO: Run these calls in parallel
    const domains = await getENSDomains(addr);
    const optiDeposits = await getOptiDeposits(addr);
    const poly = await getPolyDeposit(addr);
    // TODO: fixed potential undefined
    const polyDeposits = poly[0];
    const polyValidate = poly[1];
    const poap = await getPoap(addr);

    if (domains?.length > 0) dropletz[0].completed = true;
    if (optiDeposits?.length > 0) dropletz[1].completed = true;
    if (polyDeposits?.length > 0) dropletz[2].completed = true;
    if (polyValidate?.length > 0) dropletz[3].completed = true;
    if (poap?.length > 0) dropletz[4].completed = true;

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
    console.log("response is: ", responseBody);
    const deposits = responseBody.data.etherReceiveds;
    return deposits;
}

async function getPolyDeposit(addr: any) {
    const response = await fetch(
        `https://gateway.thegraph.com/api/${process.env.GRT_APIKEY}/subgraphs/id/FDrqtqbp8LhG1hSnwtWB2hE6C97FWA54irrozjb2TtMH`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query: `
            query {
                    fxDeposits(where: {depositor: "${addr.toLowerCase()}"}) {
                      id
                      depositor
                      amount
                    }
                    validators(where: {owner: "${addr.toLowerCase()}"}){
                        owner
                    }
            }`,
            }),
        }
    );
    const responseBody = await response.json();
    console.log("poly response: ", responseBody);
    console.log("poly deposit", responseBody.data.fxDeposits);
    console.log("poly validate: ", responseBody.data.validators);
    // console.log("polygon response: ", responseBody)
    try{
        const deposit = responseBody.data.fxDeposits;
        const validate = responseBody.data.validators;
        return [deposit, validate];
    }
    catch{
        console.log("this was an error");
    }
    
    // console.log("Polygon depo:", deposit);
    
}

async function getValidator(addr: any) {
    const response = await fetch(
        `https://gateway.thegraph.com/api/${process.env.GRT_APIKEY}/subgraphs/id/FDrqtqbp8LhG1hSnwtWB2hE6C97FWA54irrozjb2TtMH`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query: `
            query {
                    fxDeposits(where: {depositor: "${addr.toLowerCase()}"}) {
                      id
                      depositor
                      amount
                    }
            }`,
            }),
        }
    );
    const responseBody = await response.json();
    console.log("poly response: ", responseBody);
    // console.log("polygon response: ", responseBody)
    try{
        const deposit = responseBody.data.fxDeposits;
        return deposit;
    }
    catch{
        console.log("this was an error");
    }
    
    // console.log("Polygon depo:", deposit);
    
}

// Add checks for POAP tasks
async function getPoap(addr: any) {
    const response = await fetch(
        `https://gateway.thegraph.com/api/${process.env.GRT_APIKEY}/subgraphs/id/3wrR9hnVGJvVhgdBsTywu9Xnu5sntVKWwphuossQmuV8`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query: `
            query {
                accounts(where: {id: "${addr.toLowerCase()}"}) {
                    id
                    tokensOwned
                }
            }`,
            }),
        }
    );
    const responseBody = await response.json();
    console.log("poap response: ", responseBody);
    // console.log("polygon response: ", responseBody)
    try{
        const poap = responseBody.data.accounts;
        console.log("poap", poap);
        return poap;
    }
    catch{
        console.log("poap error");
    }
    
    // console.log("Polygon depo:", deposit);
    
}
