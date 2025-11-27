/*
    You can visit https://docs.luaseal.com for information about what each endpoint expects.
*/

// Variables
const api_key = process.env.luaseal_api_key;
const projectId = process.env.luaseal_project_id;

const postHeaders = {
    "Content-Type": "application/json",
    "authorization": api_key
};

// Functions
async function generateKey(body = {}) {
    const response = await fetch(`https://luaseal.com/api/projects/${projectId}/users`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({
            note: body.note || null,
            key_days: body.key_days || -1
        })
    });

    const responseData = await response.json();

    if (responseData.success !== true)
        throw new Error("Failed to generate key: " + responseData.response);

    console.log(`Key successfully generated: ${responseData.user_key}`);

    return responseData.user_key;
}

async function whitelistDiscordUser(discordId, body = {}) {
    const response = await fetch(`https://luaseal.com/api/projects/${projectId}/users`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({
            discord_id: discordId,
            note: body.note || null,
            key_days: body.key_days || -1
        })
    });

    const responseData = await response.json();

    if (responseData.success !== true)
        throw new Error("Failed to generate key: " + responseData.response);

    console.log(`${discordId} has successfully been whitelisted to the key ${responseData.user_key}`);

    return responseData.user_key;
}

async function updateKey(userKey, body = {}) {
    const response = await fetch(`https://luaseal.com/api/projects/${projectId}/users`, {
        method: "PATCH",
        headers: postHeaders,
        body: JSON.stringify({
            user_key: userKey,
            key_days: body.key_days || -1,
            key_expire: body.key_expire || null,
            discord_id: body.discord_id || null,
            note: body.note || null
        })
    });

    const responseData = await response.json();

    if (responseData.success !== true)
        throw new Error("Failed to update key: " + responseData.response);

    console.log(`Key successfully updated: ${userKey}`);

    return responseData;
}

// Example Usage
(async() => {
    const unclaimedKey = await generateKey({ note: "Unclaimed Key", key_days: 30 });
    const claimedKey = await whitelistDiscordUser("977654321098765732", { note: "Claimed From Discord" });

    await updateKey(unclaimedKey, { discord_id: "1234" }); 
    await updateKey(claimedKey, { discord_id: "123" }); // this WILL error since the key already has a discord ID linked to it
})();
