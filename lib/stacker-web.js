//var stackWeb = [];
//var isRunning = false;


module.exports = function compteur (data, app) {

  app.io.emit('newEvent', data);
  /*if (!isRunning) {
    stackWeb.push(data);
    if (stackWeb.length >= 5) {
      clearTimeout(timeWeb);
      app.io.emit('newEvent', stackWeb);
      stackWeb = [];
    }

    var timeWeb = setTimeout(function (obj) {
      if(stackWeb.length >= 1) {
        app.io.emit('newEvent', stackWeb);
        isRunning = true;
        stackWeb = [];
      }
      isRunning = false;
    }
    , 1000
    , data
    );
  }*/
};
