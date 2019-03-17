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

    showRegionName('.current-region span');



    document.addEventListener("offline", onOffline, false);

    document.addEventListener("backbutton", function(e){
        back();
    }, false);

});

function back() {
    location.replace('main.html');
    //navigator.app.backHistory();
}







