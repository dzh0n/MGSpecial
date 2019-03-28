function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}

$(document).ready(function(){
    $('.balance-main-current span').text(window.localStorage.getItem('userBalance'));
    $('#userId').val(window.localStorage.getItem('userId'));
    refreshBalance();
});

$('#balance-form').on('submit', function () {
   // alert();
    var form = $(this);
    $.ajax({
        url: apiUrl+'balance/add',
        method: 'POST',
        data: form.serialize()+'&key='+apiKey,
        cache: false,
        dataType: 'json',
        success: function(data){
            if(data.result=='error'|| data.url == false) {
                navigator.notification.alert(
                    data.errors,  // message
                    function(){},         // callback
                    'При пополнении возникли ошибки',            // title
                    'Ok'                  // buttonName
                );
            }
            if(data.result=='success'){
               // window.open(data.url, '_blank');
                // open InAppBrowser w/out the location bar
                var ref = window.open(data.url, '_blank', 'location=no');

                // attach listener to loadstart
                ref.addEventListener('loadstart', function(event) {
                   // alert(event.url.split('?')[0]);
                    var urlSuccessPage = "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/balance/success";
                    if (event.url.split('?')[0] == urlSuccessPage) {
                        ref.close();
                        refreshBalance();
                    }
                });
            }
        }
    });
    return false;
});

function refreshBalance() {
    $.ajax({
        type: "POST",
        url: apiUrl+'balance/info',
        data: "userId="+window.localStorage.getItem('userId')+'&key='+apiKey,
        dataType: 'json',
        success: function(data){
            $('.balance-main-current span').text(parseFloat(data.balance));
            window.localStorage.setItem('userBalance', parseFloat(data.balance))
            if(data.history!='')
                $('#history tbody').html(data.history);
        }
    });
}