'use strict';

angular.module('adsNgApp.auth', [
  'adsNgApp.constants',
  'adsNgApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
