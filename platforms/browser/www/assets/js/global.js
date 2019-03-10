function checkNetwork() {

}

function onOffline() {
    navigator.notification.alert(
        'Отсутствует подключение к сети интернет.',  // message
        function(){},         // callback
        'Подключение к сети',            // title
        'Ok'                  // buttonName
    );
}