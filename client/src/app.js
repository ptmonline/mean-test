'use strict';
import angular from 'angular';
import 'angular-ui-router';
angular.module('olympics',['ui.router'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/sports')

    $stateProvider
      .state('sports', {
        url: '/sports',
        templateUrl: 'sports/sports-nav.html',
        resolve: {
          SportsService: function($http){
            return $http.get('/sports')
          }

        },
        controller: function(SportsService, $location){
            this.sports = SportsService.data;
            this.isActive = (sport) => {
              let pathRegexp = /sports\/(\w+)/;
              let match = pathRegexp.exec($location.path());

              if(match === null || match.length === 0) return false;
              let selectedSportName = match[1];
              console.log('below', selectedSportName, sport)

              return sport === selectedSportName;

            };
        },
        controllerAs: 'sportsCtrl'
      })
      .state('sports.medals', {
        url: '/:sportName',
        templateUrl: "sports/sports-medals.html",
        resolve:{
          sportService: function($http, $stateParams){
            return $http.get(`/sports/${$stateParams.sportName}`)
          }
        },
        controller: function(sportService){
          this.sport = sportService.data
        },
        controllerAs: 'sportCtrl'
      })
      .state('sports.new', {
        url: '/:sportName/medal/new',
        templateUrl: 'sports/new-medal.html',
        controller: function($stateParams, $state, $http){
          this.sportName = $stateParams.sportName;
          this.saveMedal = function(medal){
            console.log('medal ', medal)
            $http({method: 'POST', url: `/sports/${$stateParams.sportName}/medals`, data: {medal}}).then(function(){
                $state.go('sports.medals', {sportName: $stateParams.sportName});
            })
          }
        },
        controllerAs: 'newMedalCtrl'
      })
  })
