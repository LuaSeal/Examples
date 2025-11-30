// Main Repository Link: https://github.com/LuaSeal/LuaSeal-NPM

import LuaSeal from "luaseal";
//const LuaSeal = require("luaseal");

const seal = new LuaSeal("seal_yourApiKeyHere", "yourProjectId");

function getFutureUnix(days) {
    return Math.floor(Date.now() / 1000) + days * 86400;
}

(async () => {
    const key = await seal.generateKey({ key_days: 31 });
    console.log("Generated Key:", key);

    // await seal.generateKey({ key_days: getFutureUnix(31) }); // will be a specific unix timestamp instead of just amount of days
    // await seal.whitelistDiscordUser("314159265358979", { key_days: 10, note: "Auto linked to discord ID" }); // instead of just generating a unclaimed key, it will automatically link the generated key to the given ID

    await seal.updateKey(key, { discord_id: "314159265358979" });
    console.log("Key updated");

    await seal.blacklistKey(key);
    console.log("Key blacklisted");

    // await seal.blacklistKey(key, { expire_time: 31, reason: "Broke TOS" }); // this will blacklist the key for 31 days instead of a lifetime blacklist
    
    await seal.unblacklistKey(key);
    console.log("Key unblacklisted");

    try {
        await seal.resetKeyHwid(key, { force: true }); // There is a automatic system where users can only reset their hwid once a week, if they try reset it before 7 days this function will error responding "You must wait x day(s) before resetting HWID again" so to avoid this and bypass that cooldown you can use force. 
        console.log("HWID reset");
    } catch (error) {
        if (error.unix) { // error.unix will be avaiable if the user is on reset cooldown and "force" wasn't set true
            console.log(`You are current on cooldown from resetting your hwid, this cooldown will expire <t:${error.unix}:R>.`);
        } else {
            console.log("Error resetting HWID:", error.message);
        }
    }

    const info = await seal.getKeyInfo({ user_key: key }); 
    console.log(info);
    console.log(info[0].user_key);
    console.log(info[0].banned);

    const allKeys = await seal.getAllKeys();
    const randomEntry = allKeys[Math.floor(Math.random() * allKeys.length)];
    console.log(allKeys[randomEntry].user_key);
    console.log(allKeys[randomEntry].discord_id)

    // Note: getKeyInfo and getAllKeys always return arrays. 
    // Make sure to access the correct entry by index or other methods.

    await seal.unwhitelistKey(key);
})();