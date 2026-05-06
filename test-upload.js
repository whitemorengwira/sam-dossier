const fs = require('fs');
fetch("https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev/sam-dossier/public/received-verified-documents/test.txt")
  .then(res => console.log(res.status))
  .catch(err => console.error(err));
