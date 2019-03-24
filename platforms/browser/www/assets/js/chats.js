function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}

$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/chats/",
        data: "regionId="+window.localStorage.getItem('regionId'),
        dataType: 'json',
        success: function(data){
           /* $('#userId').val(userId);
            $('#name').val(data.name);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            //$('#phone').val(data.phone);*/
           console.log(data);
           if(data.wt) {
               $('#whatsup-chat a').attr('href',data.wt);
               $('#whatsup-chat').show();
           }
            if(data.tl) {
                $('#telegram-chat a').attr('href',data.tl);
                $('#telegram-chat').show();
            }
            if(data.vb) {
                $('#viber-chat a').attr('href',data.vb);
                $('#viber-chat').show();
            }

        }
    });
});