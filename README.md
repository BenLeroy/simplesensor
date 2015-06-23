# Simplesensor

[![Build Status](https://travis-ci.org/BenLeroy/simplesensor.svg?branch=master)](https://travis-ci.org/BenLeroy/simplesensor)

## Sensor monitoring

Create a simple interface to manage sensors informations


## Requirements :

- Node.js from https://nodejs.org/ ,

- Bower, installed with node.js by running : `$ npm install bower -g` ,

- MySQL Server v5.5+.


All used dependencies are listed in [package.json](https://github.com/BenLeroy/simplesensor/blob/master/package.json)


###  How to install :

Once you have node.js, bower and MySQL Server installed, clone this repo by running :

`$ git clone https://github.com/BenLeroy/simplesensor.git`

Or download the project's [Zip](https://github.com/BenLeroy/simplesensor/archive/master.zip)

Then run :

```bash
$ npm install
$ bower install
```

Execute MySQL Server and define a new user : 

```
mysql> CREATE USER "[USERNAME]"@"localhost";
mysql> SET password FOR "[USERNAME]"@"localhost" = password('[PASSWORD]');
```

You need to create database for MySQL using : `$ NODE_ENV=DEV node server/create_database.js`


## How to use :


Run : `$ [ENV_VARS] npm start` from project's root (`$ cd simplesensor`)

Then go with your favorite browser at [http://localhost:3000/](http://localhost:3000/)


### Environment variables :

#### Required :

You must define MySQL connection by using : `$ DB_USER=[username] DB_password=[password] ...`


#### Optionnal :

To set a custom port use `$ PORT=[xxxx] ...`

To receive mail notifications, use `$ MAIL_ALERT=["yourMailAdress"] ...`


### Beware :


Any modifications made to the models implies that you run : `$ lb-ng server/server.js client/js/lb-services.js`

Be sure to have compatible versions for "loopback-datasource-juggler"(v2.3+) and "loopback-connector-mysql"(v2.1+).



The project is generated by [LoopBack](http://loopback.io).
