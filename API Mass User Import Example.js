// Functions
function generate_random_string(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Generating the test key enteries
const key_list = [
    {
        key_value: "example_key",
        discord_id: "example_discord_id",
        key_days: 31,
        note: "user note"
    }
];

// Importing all of the keys
(async() => {
    const request = await fetch(`https://luaseal.com/api/projects/${process.env.luaseal_project_id}/massusers`, {
        method: "POST",
        headers: {
            ["Content-Type"]: "application/json",
            ["authorization"]: process.env.luaseal_api_key
        },
        body: JSON.stringify({ key_list })
    });

    const requestResponse = await request.json();
    console.log(requestResponse)
})();
