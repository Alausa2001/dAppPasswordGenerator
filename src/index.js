// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here
const { ethers } = require("ethers");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

function hex2str(hex) {
  return ethers.toUtf8String(hex);
}

function str2hex(payload) {
  return ethers.hexlify(ethers.toUtf8Bytes(payload));
}

function isNumeric(num) {
  return !isNaN(num);
}

// My Password Generator
function generatePassword(numChars, numNumbers) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  
  let password = "";
  
  for (let i = 0; i < numChars; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  for (let i = 0; i < numNumbers; i++) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Shuffle the password to mix letters and numbers
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  return password;
}

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));

  const payload = hex2str(data["payload"]);
  const parts = payload.split(" ");

  if (parts.length !== 2 || !isNumeric(parts[0]) || !isNumeric(parts[1])) {
    const report_req = await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: str2hex("Invalid format. Provide two numbers: <numChars> <numNumbers>") }),
    });

    return "reject";
  }

  const numChars = parseInt(parts[0]);
  const numNumbers = parseInt(parts[1]);

  const password = generatePassword(numChars, numNumbers);

  const notice_req = await fetch(rollup_server + "/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: str2hex(password) }),
  });

  return "accept";
}

async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));

  const payload = data["payload"];
  const route = hex2str(payload);

  const responseObject = "Inspect route not implemented for password generator";

  const report_req = await fetch(rollup_server + "/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: str2hex(responseObject) }),
  });

  return "accept";
}

var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
