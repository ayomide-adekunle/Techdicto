// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'your_app_name.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'youtube-embed'
])

.run(function($ionicPlatform, PushNotificationsService,$http, $rootScope, $ionicConfig, $timeout) {

 
  
     

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      
  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {

  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};

  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html",
    controller: 'HomeCtrl'

  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignupCtrl'
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html",
    controller: 'ForgotPasswordCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  //MISCELLANEOUS
  .state('app.miscellaneous', {
    url: "/miscellaneous",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/miscellaneous.html"
      }
    }
  })

  .state('app.maps', {
    url: "/miscellaneous/maps",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/maps.html",
        controller: 'MapsCtrl'
      }
    }
  })

  .state('app.image-picker', {
    url: "/miscellaneous/image-picker",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/image-picker.html",
        controller: 'ImagePickerCtrl'
      }
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    }
  })

  .state('app.tinder-cards', {
    url: "/layouts/tinder-cards",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/tinder-cards.html",
        controller: 'TinderCardsCtrl'
      }
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    }
  })

  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    }
  })

  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress.html",
        controller: 'WordpressCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    },
    resolve: {
      post_data: function(PostService, $ionicLoading, $stateParams) {
        $ionicLoading.show({
      		template: 'Loading post ...'
      	});

        var postId = $stateParams.postId;
        return PostService.getPost(postId);
      }
    }
  })

  //OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "views/app/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "views/app/forms.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html",
        controller:"ProfileCtrl"
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "views/app/bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

  .state('app.search_all', {
    url: "/search_all",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_all.html",
        controller: 'SearchAllCtrl'
      }
    }
  })
  .state('app.search_all_def', {
    url: "/search_all_def",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_all_def.html",
        controller: 'SearchAllCtrl'
      }
    }
  })

  .state('app.search_alpha', {
    url: "/search_alpha",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_alpha.html",
        controller: 'AlphaCtrl'
      }
    }
  })

   .state('app.search_alpha_def', {
    url: "/search_alpha_def",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_alpha_def.html",
        controller: 'AlphaCtrl'
      }
    }
  })

  .state('app.search_cat', {
    url: "/search_cat",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_cat.html",
        controller: 'CatCtrl'
      }
    }
  })

  .state('app.search_sub_cat', {
    url: "/search_sub_cat",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_sub_cat.html",
        controller: 'CatCtrl'
      }
    }
  })

  .state('app.search_sub_cat_words', {
    url: "/search_sub_cat_words",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_sub_cat_words.html",
        controller: 'CatCtrl'
      }
    }
  })

  .state('app.search_sub_cat_def', {
    url: "/search_sub_cat_def",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/search_sub_cat_def.html",
        controller: 'CatCtrl'
      }
    }
  })

  .state('app.bookmarks_words', {
    url: "/bookmarks_words",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/bookmarks_words.html",
        controller: 'SearchAllCtrl'
      }
    }
  })

  .state('app.acronyms', {
    url: "/acronyms",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/acronyms.html",
        controller: 'AcronymCtrl'
      }
    }
  })

  .state('app.acronyms_words', {
    url: "/acronyms_words",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/acronyms_words.html",
        controller: 'AcronymCtrl'
      }
    }
  })

  .state('app.terms', {
    url: "/terms",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/terms.html",
        controller: 'TermCtrl'
      }
    }
  })

  .state('app.terms_words', {
    url: "/terms_words",
    views: {
      'menuContent': {
        templateUrl: "views/app/search/terms_words.html",
        controller: 'TermCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/walkthrough');
});
