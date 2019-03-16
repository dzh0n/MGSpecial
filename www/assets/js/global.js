var apiKey = getApiKey();
var apiUrl = 'https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/';
var db = openDatabase("mgs.db", '1.0', "MGS DateBase", 2 * 1024 * 1024);;

$(document).ready(function(){

    $('.select-region-item').on('click', function(){
        window.localStorage.setItem("regionId", $(this).data('id'));
        window.localStorage.setItem("regionName", $(this).text());
        location.replace('main.html');
        return false;
    });

    $('#order-form').on('submit', function () {
        return false;
    });

    $(document).on('click', '.bottom-item-call a', function () {
        return checkLimit();
    });


});
function checkNetwork() {

}

function onOffline() {
    navigator.notification.alert(
        'Отсутствует подключение к сети интернет.',  // message
        function(){},         // callback
        'Подключение к сети',            // title
        'Ok'                  // buttonName
    );
}
/*Проверка установки региона*/
function checkRegion() {
   // window.localStorage.clear();

    if(window.localStorage.getItem('regionId') == null) {
        location.replace('regions.html');
    }
}

function showRegionName(elId) {
    $(elId).text(window.localStorage.getItem('regionName'));
}






function setParams() {
    if(window.localStorage.getItem('limit_calls') == null) {
        $.ajax({
            url: apiUrl+'config/limit_calls',
            method: 'POST',
            data: 'key='+apiKey,
            cache: false,
            success: function (result) {
                if(parseInt(result)>0) {
                    window.localStorage.setItem('limit_calls', result);
                    alert(result);
                }
            }
        });
    }

    if(window.localStorage.getItem('current_limit_calls') == null) {
        window.localStorage.setItem('current_limit_calls', 0);
    }

    if(window.localStorage.getItem('tariff') == null) {
        $.ajax({
            url: apiUrl+'config/tariff',
            method: 'POST',
            data: 'key='+apiKey,
            cache: false,
            success: function (result) {
                if(parseInt(result)>0) {
                    window.localStorage.setItem('tariff', result);
                    alert(result);
                }
            }
        });
    }



    /*db.transaction(function(tx) {
        tx.executeSql("DROP TABLE Orders", [], function(result){}, function(tx, error){});
    });*/

    db.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(*) FROM Orders", [], function (result) {

        }, function (tx, error) {
            tx.executeSql("CREATE TABLE Orders (\n" +
                "  id INT UNIQUE,\n" +
                "  region_id INT,\n" +
                "  date_create TEXT,\n" +
                "  subject TEXT,\n" +
                "  content TEXT,\n" +
                "  address TEXT,\n" +
                "  client_name TEXT,\n" +
                "  client_phone TEXT,\n" +
                "  user_id INT,\n" +
                "  coords TEXT,\n" +
                "  is_pub INT)" , [], null, null);
        })
    });

    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM Orders", [], function(result){}, function(tx, error){});
    });

    if(window.localStorage.getItem('regionId') != null) {
        //загрузка заказов
        $.ajax({
            url: apiUrl+'orders/special',
            method: 'POST',
            async: false,
            data: 'key='+apiKey+'&regionId='+window.localStorage.getItem('regionId'),
            cache: false,
            dataType: 'json',
            success: function (result) {
                if(result != '') {
                    $.each(result,function(index, value){
                        db.transaction(function (tx) {
                            tx.executeSql("INSERT INTO Orders (id, region_id, date_create, subject, content, address, client_name, client_phone, user_id, coords, is_pub) values(?,?,?,?,?,?,?,?,?,?,?)", [
                                value.id,
                                value.region_id,
                                value.date_create,
                                value.subject,
                                value.content,
                                value.address,
                                value.client_name,
                                value.client_phone,
                                value.user_id,
                                value.coords,
                                value.is_pub
                            ], null, null);
                        });
                    });
                }

            }
        });
    }


}

function loadOrders() {
    $('.advert-list').html('');
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Orders", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {

                $('.advert-list').append('<div class="advert-list-item">\n' +
                    '            <a href="view.html">\n' +
                    '                <h2>'+result.rows.item(i)['subject']+'</h2>\n' +
                    '                <div class="date-item">'+result.rows.item(i)['date_create']+'</div>\n' +
                    '                <div class="text-item">\n'+result.rows.item(i)['content']+'</div>\n' +
                    '            </a>\n' +
                    '            <div class="bottom-item">\n' +
                    '                <div class="bottom-item-user">\n' +
                    '                    <i class="far fa-user-circle"></i> '+result.rows.item(i)['client_name']+'\n' +
                    '                </div>\n' +
                    '                <div class="bottom-item-call">\n' +
                    '                    <a href="tel:'+result.rows.item(i)['client_phone']+'"><i class="fas fa-phone"></i> Позвонить</a>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
            }
        }, null)
    });
}


function checkLimit() {
    current = parseInt(window.localStorage.getItem('current_limit_calls'));
    limit = parseInt(window.localStorage.getItem('limit_calls'));
    if(current > limit) {
        return false;
    }
    else {
        window.localStorage.setItem('current_limit_calls', current + 1);
        alert();
    }
}

function getApiKey() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + mm + yyyy;
    return today;
}