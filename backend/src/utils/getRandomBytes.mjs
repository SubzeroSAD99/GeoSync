import crypto from "crypto";
const rnd = crypto.randomBytes(32);
console.log(crypto.createHash("sha256").update(rnd).digest("hex"));
