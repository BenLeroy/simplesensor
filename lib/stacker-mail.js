var stackMail = [];
var isMailing = false;


module.exports = function counter (data, app) {

  if (!isMailing && data !== null) {
    stackMail.push(data);
    if (stackMail.length >= 100) {
      clearTimeout(timeMail);
      stackMail = [];
    }

    var timeMail = setTimeout(function (obj) {
        getSensors(stackMail, app);
        isMailing = true;
    }
    , 60000
    , data
    );
  }
};

function getSensors(stack, app) {

  var events = app.models.Event;

  var eStack = stack.map(function (tab){
    return tab.id;
  });

  events.find({
    include: 'sensor'
    , where: {
      id: {inq: eStack}
    }
  }
  , function (err, text){


    var forMail = text.map(function (part){
      return part.toJSON().sensor.name + ' is ' + part.status + ' since ' + part.loggedAt;
    }).join('\n');

    if (forMail !== '') {
      goToMail(forMail, app);
      stackMail = [];
    }
    else {
      isMailing = false;
    }
  });
}

function goToMail(content, app) {
    require('../plugins/send-mail')(content, app);
    isMailing = false;
}
