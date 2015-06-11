var stackWeb = [];
var isRunning = false;


module.exports = function compteur (data, app) {

  if (!isRunning) {
    stackWeb.push(data);
    if (stackWeb.length >= 5) {
      clearTimeout(timeWeb);
      app.io.emit('newEvent', stackWeb);
      stackWeb = [];
    }

    var timeWeb = setTimeout(function (obj) {
      if(stackWeb.length >= 1) {
        app.io.emit('newEvent', stackWeb);
        console.log('----stackWeb----');
        console.log(stackWeb);
        console.log('------------');
        isRunning = true;
        stackWeb = [];
      }
      isRunning = false;
    }
    , 5000
    , data
    );
  }
};
