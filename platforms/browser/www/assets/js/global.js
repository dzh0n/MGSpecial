var currentDate = new Date();
var apiKey = getApiKey();
var apiUrl = 'https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/';
var db;

$(document).ready(function(){

    $('.select-region-item').on('click', function(){
        window.localStorage.setItem("regionId", $(this).data('id'));
        window.localStorage.setItem("regionName", $(this).text());
        location.replace('main.html');
        return false;
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

    var regionId = window.localStorage.getItem('regionId');

    if(regionId) {

    }
    else {
        location.replace('regions.html');
    }
}

function showRegionName(elId) {
    $(elId).text(window.localStorage.getItem('regionName'));
}

$('#order-form').on('submit', function () {
    return false;
});




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
                }
            }
        });
    }

    if(window.localStorage.getItem('current_limit_calls') == null) {
        window.localStorage.setItem('current_limit_calls', 0);
    }

    db = openDatabase("mgs.db", '1.0', "MGS DateBase", 2 * 1024 * 1024);

    /*db.transaction(function(tx) {
        tx.executeSql("DROP TABLE Orders", [], function(result){}, function(tx, error){});
    });*/

    db.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(*) FROM Orders", [], function (result) {

        }, function (tx, error) {
            tx.executeSql("CREATE TABLE Orders (\n" +
                "  id INT UNIQUE,\n" +
                "  region_id INT,\n" +
                "  date_create TIMESTAMP,\n" +
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

    if(window.localStorage.getItem('regionId') != null) {
        //загрузка заказов
        $.ajax({
            url: apiUrl+'orders/special',
            method: 'POST',
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