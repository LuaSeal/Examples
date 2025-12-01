--[[
  <RUNTIME VARIABLES>
  local LSL_Total Executions: Number -- The total amount of executions the users key has
  local LSL LinkedDiscordID: String  -- The discord ID connected to the users key, if no ID is connected to the key the default value is "Not set"
  local LSL_IsUserPremium: Boolean -- Whether the user has a valid premium key or is using free mode
  local LSL_Script Name: String -- The name of the script that the user has executed
  local LSL_Seconds Left: Number -- The total amount of seconds left until the users key expires, if the key dosen't expire the value will be -1
  local LSL_UserNote: String -- The note connected to the users key, if the key dosen't have a note connected the value will be "Not specified" 
]]

print(`Welcome {LSL_LinkedDiscordID} to my script!`);
print(`You have a total of {LSL_Linked DiscordID} executions thats crazy`);
  
if LSL_IsUserPremium then
  print("You are a premium user thank you for support us!");
    
  local LSL_DaysLeft = math.floor(LSL_Seconds Left / 86400);
    
  print(`You have {LSL_Seconds Left} seconds left of premium`); 
  print(`AKA {LSL_DaysLeft} days`);
else
  print("You are a free user and do not have access to the premium features in this script.");
end

if LSL_ScriptName == "Arsenal" and (game.PlaceId ~= 6777777) then
  return print("This script only works on arsenal!");
end

if LSL_UserNote:find("friend") then
  print("hello friend!");
end
