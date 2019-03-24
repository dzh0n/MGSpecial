function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}

$(document).ready(function(){
    $('.balance-main-current span').text(window.localStorage.getItem('userBalance'));
    $('#userId').val(window.localStorage.getItem('userId'));
});

$('#balance-form').on('submit', function () {
    var form = $(this);
    $.ajax({
        url: apiUrl+'balance/add',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey,
        cache: false,
        dataType: 'json',
        success: function(data){
            if(data.result=='error') {
                navigator.notification.alert(
                    data.errors,  // message
                    function(){},         // callback
                    'При сохранении возникли ошибки',            // title
                    'Ok'                  // buttonName
                );
            }
            if(data.result=='success'){
               // window.open(data.url, '_blank');
                // open InAppBrowser w/out the location bar
                var ref = window.open(data.url, '_blank', 'location=no');

                // attach listener to loadstart
                ref.addEventListener('loadstart', function(event) {
                    var urlSuccessPage = "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/pay/success";
                    if (event.url == urlSuccessPage) {
                        ref.close();
                    }
                });
            }
        }
    });
    return false;
});