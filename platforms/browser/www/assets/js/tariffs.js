$(document).ready(function(){
    //$('.limit-tariff span').text(window.localStorage.getItem('tariff'));
    //$('.tariff-list').get(apiUrl+'config/loadtariff');
    $.ajax(
        {
            type: 'GET',
            url: apiUrl+'config/loadtariff',
            success: function (res) {
                $('.tariff-list.alt').html(res);
            }
        }
    );

});

document.addEventListener("deviceready", function() {

    document.addEventListener("backbutton", function (e) {
        back();
    }, false);

})

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}