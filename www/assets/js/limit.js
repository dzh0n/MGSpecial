$(document).ready(function(){
    //$('.limit-tariff span').text(window.localStorage.getItem('tariff'));
    //$('.tariff-list').get(apiUrl+'config/loadtariff');
    $.ajax(
        {
            type: 'GET',
            url: apiUrl+'config/loadtariff',
            success: function (res) {
                $('.tariff-list').html(res);
            }
        }
    );

});

function setTariff(price) {
    //проверка зологинен ли пользователь
    if(window.localStorage.getItem('userId')) {
        //если хватае денег
        if(parseInt(window.localStorage.getItem('userBalance')) >= parseInt(price)) {
            navigator.notification.confirm(
                "Списать с вашего баланса оплату за продление работы?",  // message
                function (buttonIndex) {
                    if(buttonIndex == 2) {
                        sendPay(parseInt(price));
                    }
                },         // callback
                'Продление работы',            // title
                ['Нет','Да']                // buttonName
            );
        }
        else {
            navigator.notification.alert(
                "На вашем балансе не достаточно средств, пополните его",  // message
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
}

$('#limit-pay').on('click', function () {

});


function sendPay(price) {
    userId = window.localStorage.getItem('userId');
    $.ajax({
        type: "POST",
        url: apiUrl+"balance/paywork",
        data: "userId="+userId+'&key='+apiKey+'&price='+price,
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