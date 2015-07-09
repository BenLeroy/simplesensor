var server = require('./server');
var ds = server.dataSources.simplesensor;

if (process.env.NODE_ENV === "DEV") {

  console.info("Check ok. WARNINGe are in DEV environnement. Creating database");
  ds.automigrate(function (err) {
    process.exit(0);
  });
}
else {
  console.warn("WARNING *********** you are not in DEV env *** DO NOT TRY TO RECREATE DATABASE");
  process.exit(1);
}
