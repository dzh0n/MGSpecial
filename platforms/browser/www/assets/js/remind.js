$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});
});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}


$('#remind-form').on('submit', function () {
    var form = $(this);
    $.ajax({
        url: apiUrl+'user/remind',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey,
        cache: false,
        success: function (result) {
            if(result == 'success') {
                $('#remind-form')[0].reset();
                navigator.notification.alert(
                    'Ваш пароль успешно изменен и отправлен вам. Войдите на сайт используя новый пароль из смс.',  // message
                    function () {
                        location.replace('login.html')
                    },         // callback
                    'Восстановление пароля',            // title
                    'Войти'                  // buttonName
                );
            }
            else {
                navigator.notification.alert(
                    result,  // message
                    function(){},         // callback
                    '',            // title
                    'Ok'                  // buttonName
                );
            }
        }
    });
    return false;
});