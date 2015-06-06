angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.playlists = [
    { id: 1, group: 'Queen',         title:"Bohemian rhapsody", type:"Rock",    url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ"},
    { id: 2, group: 'Skrillex',      title:"Bangarang",         type:"Dubstep", url: "https://www.youtube.com/watch?v=YJVmu6yttiw"},
    { id: 3, group: 'Slash',         title:"Anastasia",         type:"Rock",    url: "https://www.youtube.com/watch?v=kZNMvztBUwM"},
    { id: 4, group: 'Nyancat',       title:"Miaou",             type:"WTF",     url: "https://www.youtube.com/watch?v=QH2-TGUlwu4"},
    { id: 5, group: 'Fox Stevenson', title:"All this time",     type:"Electro", url: "https://www.youtube.com/watch?v=o_qDQRLGw6Y&feature=youtu.be"}
  ];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
})

.controller('CommunityCtrl', function($scope) {
  $scope.communities = [
    { title: 'Monstercat', id: 1, population: 587 },
    { title: 'NightCore', id: 2, population: 428 },
    { title: 'Electro', id: 3, population: 333 },
    { title: 'Dubstep', id: 4, population: 258 },
    { title: 'Rock', id: 5, population: 118 },
    { title: 'Classique', id: 6, population: 62 }
  ];
})

.controller('RoomCtrl', function($scope, $stateParams, $http, $cookies) {
  console.log("coucou1");
  $scope.roomId = $stateParams.roomId;
  $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
  // $cookies.session = '07e16060-7d9a-4a6e-b9c0-c12ef3f5ef29|2592000|4b184cbb0916913829e85fcce3e1fe81841d45897973ff155c764b1a63e03b5a';
  // $http.get('http://172.16.42.79:8005/_/rooms?q=&page=1&limit=50', {withCredentials: true}).then(function(resp) {
  //   console.log('Success', resp);
  //   console.log($cookies);
  //   $scope.status = resp.status;
  //   // For JSON responses, resp.data contains the result
  // }, function(err) {
  //   console.error('ERR', err);
  //   // err.status will contain the status code
  // })
})

.controller('NewMusicCtrl', function($scope, $location, $ionicPopup) {
  $scope.addMusic = function(song) {
    song.id = $scope.playlists.length + 1;
    $scope.playlists.push(song);
    $scope.song = "";
    var alertPopup = $ionicPopup.alert({
      title: "Musique ajoutée",
      template: 'La musique a été ajoutée avec succès'
    });
    alertPopup.then(function(res) {
      $location.path("/playlists");
    });
  };

  $scope.cancelMusic = function(song) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Annulation',
      template: "Etes vous sur de vouloir annuler l'ajout de cette musique"
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.song = "";
        $location.path("/playlists");
      }
    });

  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, $timeout) {
  $scope.$on('youtube.player.ready', function ($event, player) {
    $scope.player = player;
  });

  $scope.currentMusic = null;
  var x;
  for (x in $scope.playlists) {
    if ($scope.playlists[x]['id'] == $stateParams['playlistId']) {
      $scope.currentMusic = $scope.playlists[x];
    }
  }
  if ($scope.currentMusic == null) {
    alert("Piti probleme");
  }

  $scope.data = { 'volume' : '50' };  
  var timeoutId = null;
  $scope.$watch('data.volume', function() {
      if(timeoutId !== null) {
          $scope.player.setVolume($scope.data.volume);
          return;
      }
      timeoutId = $timeout( function() {
          $timeout.cancel(timeoutId);
          timeoutId = null;
      }, 1000);  
  });

  $scope.setVolume = function(volume) {
    $scope.data.volume = volume;
    $scope.player.setVolume($scope.data.volume);
  };
});
