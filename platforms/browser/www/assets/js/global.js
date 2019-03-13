$(document).ready(function(){

    $('.select-region-item').on('click', function(){
        window.localStorage.setItem("regionId", $(this).data('id'));
        window.localStorage.setItem("regionName", $(this).text());
        location.replace('main.html');
        return false;
    });


});
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
/*Проверка установки региона*/
function checkRegion() {
   // window.localStorage.clear();

    var regionId = window.localStorage.getItem('regionId');

    if(regionId) {

    }
    else {
        location.replace('regions.html');
    }
}

function showRegionName(elId) {
    $(elId).text(window.localStorage.getItem('regionName'));
}

$('#order-form').on('submit', function () {
    return false;
});