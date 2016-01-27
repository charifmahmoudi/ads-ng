'use strict';

angular.module('adsNgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.html',
        controller: 'CampaignsCtrl'
      });
  });
