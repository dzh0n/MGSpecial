/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        window.plugins.OneSignal
            .startInit("545e0ae9-f360-47cb-be70-8c8bab0ac2cc")
            .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

        //navigator.vibrate([1000, 1000, 3000, 1000, 2000]);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*  var parentElement = document.getElementById(id);
          var listeningElement = parentElement.querySelector('.listening');
          var receivedElement = parentElement.querySelector('.received');

          listeningElement.setAttribute('style', 'display:none;');
          receivedElement.setAttribute('style', 'display:block;');

          console.log('Received Event: ' + id);   */
    }
};




document.addEventListener("deviceready", function(){
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#FFDD0A");
    }

    document.addEventListener("offline", onOffline, false);

    document.addEventListener("backbutton", function(e){
        back();
    }, false);

    $('#order-form').on('submit', function () {
        var form = $(this);
        $.ajax({
            url: apiUrl+'orders/addspecial',
            method: 'POST',
            data: form.serialize()+'&key='+apiKey+'&region_id='+window.localStorage.getItem('regionId'),
            cache: false,
            success: function (result) {
                if(result == 'success') {
                    $('#order-form')[0].reset();
                    navigator.notification.alert(
                        'Ваш заказ успешно создан и в ближайшее время станет доступен. Ожидайте поступление звонков от исполнителей.',  // message
                        function () {
                            location.replace('main.html')
                        },         // callback
                        'Заказ создан',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
        return false;
    });



});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}


$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});
    userId = userId = window.localStorage.getItem('userId');
    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/vapi/user/info/",
            data: "id="+userId+'&key='+apiKey,
            dataType: 'json',
            success: function(data){
                $('#userId').val(userId);
                $('#client_name').val(data.name);
                $('#client_phone').val(data.phone);
                //$('#email').val(data.email);
                //$('#phone').val(data.phone);
            }
        });
    }
});







