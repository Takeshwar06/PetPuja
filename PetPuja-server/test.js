

import Qr from "qrcode";

Qr.toDataURL("tiger", async (err, url) => {
    if (err) {
      console.log(err);
    }
  console.log(url);
  });