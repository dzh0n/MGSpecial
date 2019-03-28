$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});
});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}


$('#login-form').on('submit', function () {
    var form = $(this);
    $.ajax({
        url: apiUrl+'user/login',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey,
        cache: false,
        success: function (msg) {
            if(IsJsonString(msg)) {
                data = JSON.parse(msg);
                var storage = window.localStorage;
                storage.setItem('userId', data.uid);
                storage.setItem('userName', data.name);
                storage.setItem('userBalance', data.balance);
                setParams();
                window.location = 'main.html';
            }
            else {
                navigator.notification.alert(
                    msg,  // message
                    function(){},         // callback
                    'При авторизации возникли ошибки',            // title
                    'Ok'                  // buttonName
                );
            }
        }
    });
    return false;
});


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}