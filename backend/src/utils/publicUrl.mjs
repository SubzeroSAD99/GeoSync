import crypto from "crypto";

const SECRET = process.env.PUBLIC_LINK_SECRET;

const base64url = (buf) => {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const makeChecksum = (id, { len = 24 } = {}) => {
  const h = crypto.createHmac("sha256", SECRET).update(String(id)).digest();
  return base64url(h).slice(0, len);
};

const timingSafeEqualStr = (a, b) => {
  const ab = Buffer.from(a || "");
  const bb = Buffer.from(b || "");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
};

const requireChecksum = (req, res, next) => {
  const { id, chk } = {
    id: req.body.id,
    chk: req.body.chk || req.query.chk,
  };

  if (!id || !chk) return res.status(404).end();

  const expected = makeChecksum(id);
  if (!timingSafeEqualStr(chk, expected)) return res.status(404).end();

  next();
};

export { makeChecksum, requireChecksum };
