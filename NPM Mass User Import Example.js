// NPM EXAMPLE
// Requires
const LuaSeal = require("luaseal");

const seal = new LuaSeal(process.env.luaseal_api_key, process.env.luaseal_project_id);

// Functions
function generate_random_string(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function get_future_unix(days) {
    return Math.floor(Date.now() / 1000) + days * 86400;
}

// Generating the test key enteries
const key_list = [];

for (let x = 0; x < 10000; x++) {
    const data = {
        key_value: generate_random_string(12), // This field is ALWAYS REQUIRED / String type
        discord_id: generate_random_string(10), // Not Required / String type
        key_days: 31, // Not Required / Number type
        note: generate_random_string(20) // Not Required / String type
    }

    /* [REMEMBER]
        The key_days value can also be a future unix timestamp
        An example of that would be: 
        key_days: get_future_unix(7) -- would return something like 1765430164
    */
    
    key_list.push(data);
}

console.log("generated 10000 key enteries");

// Importing all of the keys
(async() => {
    const res = await seal.importMassKeys(key_list);
    console.log(res);
})();
