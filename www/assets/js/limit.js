$(document).ready(function(){
    $('.limit-tariff span').text(window.localStorage.getItem('tariff'));
});

$('#limit-pay').on('click', function () {
    //проверка зологинен ли пользователь
    if(window.localStorage.getItem('userId')) {
        //если хватае денег
        if(parseInt(window.localStorage.getItem('userBalance')) >= parseInt(window.localStorage.getItem('tariff'))) {
            navigator.notification.confirm(
                "Списать с вашего баланса оплату за продление работы?",  // message
                function (buttonIndex) {
                    if(buttonIndex == 1) {
                        sendPay();
                    }
                },         // callback
                'Продление работы',            // title
                ['Нет','Да']                // buttonName
            );
        }
        else {
            navigator.notification.alert(
                "На вашем балансе не достаточно денег, пополните его",  // message
                function(){
                    location.replace('balance.html');
                },         // callback
                'Продление работы',            // title
                'Ok'                  // buttonName
            );
        }
    }
    else {
        navigator.notification.confirm(
            "Для того, чтобы продлить работу сначала нужно войти или зарегистрироваться",  // message
            function (buttonIndex) {
                if(buttonIndex == 2) {
                    location.replace('registration.html');
                }
                else {
                    location.replace('login.html');
                }
            },         // callback
            'Продление работы',            // title
            ['Войти','Зарегистрироваться']                // buttonName
        );
    }
    return false;
});


function sendPay() {
    userId = window.localStorage.getItem('userId');
    $.ajax({
        type: "POST",
        url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/balance/paywork",
        data: "userId="+userId+'&key='+apiKey,
        success: function(data){
            if(data=='success'){
                $.ajax({
                    url: apiUrl + 'user/limit',
                    method: 'POST',
                    data: 'userId=' + window.localStorage.getItem("userId") + '&key=' + apiKey,
                    cache: false,
                    success: function (result) {
                        if (parseInt(result) > 0) {
                            window.localStorage.setItem('current_limit_calls', result);
                        }
                    }
                });
                navigator.notification.alert(
                    "Продление успешно завершено",  // message
                    function(){
                        location.replace('balance.html');
                    },         // callback
                    'Продление работы',            // title
                    'Ok'                  // buttonName
                );
            }
        }
    });
}

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}