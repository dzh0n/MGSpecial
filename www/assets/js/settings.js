$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    userId = window.localStorage.getItem('userId');
    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/user/info/",
            data: "id="+userId+'&key='+apiKey,
            dataType: 'json',
            success: function(data){
                $('#userId').val(userId);
                $('#name').val(data.name);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                //$('#phone').val(data.phone);
            }
        });
    }
});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}

function saveSettings() {
    $('#settings-form').submit();
}


$('#settings-form').on('submit', function () {
    var form = $(this);
    $.ajax({
        url: apiUrl+'user/savesettings',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey,
        cache: false,
        success: function(msg){
            if(msg=='success') {
                // SpinnerDialog.hide();

                navigator.notification.alert(
                    'Все ваши данные были успешно сохранены.',  // message
                    function(){$('#newPassword').val('');$('#repeatPassword').val('');},         // callback
                    'Настройки сохранены',            // title
                    'Ok'                  // buttonName
                );
            }
            else {
                navigator.notification.alert(
                    msg,  // message
                    function(){},         // callback
                    'При сохранении возникли ошибки',            // title
                    'Ok'                  // buttonName
                );
            }
        }
    });
    return false;
});