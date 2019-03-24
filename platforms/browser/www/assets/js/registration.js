$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    $('#sms_code').val(randomInteger(1000,9999));

    $('.ajax_sms').on('click',function(){
        sendSms();
        return false
    });

});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}

function registration() {
    $('#submit').click();
}

$('#reg-form').on('submit', function () {

    if($('#sms_code_in').val()!=$('#sms_code').val()) {
        navigator.notification.alert(
            "Введен неверный код проверки",  // message
            function(){},         // callback
            'При регистрации возникли ошибки',            // title
            'Ok'                  // buttonName
        );
        return false;
    }
    var form = $(this);
    $.ajax({
        url: apiUrl+'user/registration',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey+'&regionId='+window.localStorage.getItem('regionId'),
        cache: false,
        success: function(msg){
            if(msg=='success') {
                navigator.notification.alert(
                    'Благодарим вас за регистрацию, теперь вы можете войти в свой аккаунт.',  // message
                    function(){window.location = 'login.html'},         // callback
                    'Регистрация завершена',            // title
                    'Войти'                  // buttonName
                );
            }
            else {
                navigator.notification.alert(
                    msg,  // message
                    function(){},         // callback
                    'При регистрации возникли ошибки',            // title
                    'Ok'                  // buttonName
                );
            }
        }
    });
    return false;
});

function sendSms() {
    if($('#phone').val() != '') {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/user/sms",
            data: "phone="+$('#phone').val()+'&code='+$('#sms_code').val(),
            success: function(msg){
                navigator.notification.alert(
                    'Код подтверждения отправлен на ваш номер телефона',  // message
                    function(){},         // callback
                    '',//'Код подтверждения',            // title
                    'Ok'                  // buttonName
                );
            }
        });
    }
    else {
        navigator.notification.alert(
            'Укажите сначала свой номер телефона',  // message
            function(){},         // callback
            'Код подтверждения из SMS',            // title
            'Ok'                  // buttonName
        );
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}