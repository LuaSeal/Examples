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
async function blacklistKey(userKey, body = {}) {
    const response = await fetch(`https://luaseal.com/api/projects/${projectId}/blacklist`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({
            user_key: userKey,
            reason: body.reason || null,
            expire_time: body.expire_time || -1
        })
    });

    const responseData = await response.json();

    if (responseData.success !== true)
        throw new Error("Failed to generate key: " + responseData.response);

    console.log("User successfully blacklisted");

    return true;
}

async function unblacklistKey(userKey) {
    const response = await fetch(`http://localhost/api/projects/${projectId}/unblacklist`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({
            user_key: userKey
        })
    });

    const responseData = await response.json();

    if (responseData.success !== true)
        throw new Error("Failed to unblacklist user: " + responseData.response);

    console.log("User successfully unblacklisted");

    return true;
}

// Example Usage
(async() => {
    await blacklistKey("key_to_blacklist", { reason: "Fuck you", expire_time: 7 }); // Expires in 7 days
    await unblacklistKey("key_to_unblacklist");
})();
