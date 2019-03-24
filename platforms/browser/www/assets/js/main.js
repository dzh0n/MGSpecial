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

    loadOrders();

    if(window.localStorage.getItem('getPush') != null && window.localStorage.getItem('getPush') == 1) {
        $('.header-fixed-right a').append('<i class="fas fa-check-circle"></i>');
    }
    else {
        notifications();
    }

    if(window.localStorage.getItem("regionName")!=null) {
        $('#regionName').text(window.localStorage.getItem("regionName"));
    }

    if(window.localStorage.getItem("userId")!=null) {
        $('.no-login').hide();
        $('.yes-login').show();
        $('#userName').text(window.localStorage.getItem("userName"));
        $('#userBalance').text(window.localStorage.getItem("userBalance"));
    }

    document.addEventListener("offline", onOffline, false);

    document.addEventListener("backbutton", function(e){

        navigator.notification.confirm(
            'Вы действительно хотите выйти и закрыть приложение?', // message
            function(buttonIndex){
                if(buttonIndex==2)
                    navigator.app.exitApp();
            },            // callback to invoke with index of button pressed
            'Выход из приложения',           // title
            ['Продолжить','Выйти']     // buttonLabels
        );
       /* if($.mobile.activePage.is('#homepage')){
            e.preventDefault();
            navigator.app.exitApp();
        }
        else {
            navigator.app.backHistory();
        }*/
    }, false);

});





