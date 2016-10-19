angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})
.controller('AbrvCtrl', function($scope, $ionicConfig,$rootScope,$state,$http) {
   $rootScope.all_abrv=JSON.parse(window.localStorage.getItem("all_abrv"));


	if (!$rootScope.all_abrv)  {
	 	
       //http://appliso.com/techdicto/api/keywords
         $http.get("http://appliso.com/techdicto/api/keywords/group?string=abbreviation")
        .success(function (response) {
        	$rootScope.abrv_words=[];
            $rootScope.abrv_terms = response;
            // To handle filter properly
            for ( a in $rootScope.all_abrv ) {
              $rootScope.abrv_words.push($rootScope.all_abrv[a].keyword+','+$rootScope.all_abrv[a].meaning);
      		}
          })
        .error(function(data, status) {
              $rootScope.showAlert('Please check your internet connection','Network Error');
           });
      }
      else	{
      	 	$rootScope.abrv_words=[];
            for ( a in $rootScope.all_abrv ) {
             $rootScope.abrv_words.push($rootScope.all_abrv[a].keyword+','+$rootScope.all_abrv[a].meaning);
        }
      }
	$scope.terms_words_def= function(word)  {

      	 for ( a in $rootScope.all_words ) {
       	 if (word==$rootScope.all_words[a].keyword)  {
       	  $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.terms_words_meaning=($rootScope.all_words[a].meaning);
          $rootScope.terms_words_details=($rootScope.all_words[a].details);
          $rootScope.terms_words_title=word;
          $rootScope.word_id=($rootScope.all_words[a].id);

          $state.go("app.terms_words");

          break
       	 }
     	 }

     }
})
// .controller('HomeCtrl', function($scope,$rootScope,$http,$ionicModal,$ionicPopup,$cordovaSocialSharing,$ionicLoading,BookMarkService)
	.controller('HomeCtrl', function($state,$scope,$rootScope,$http,$ionicModal,$ionicPopup,$cordovaSocialSharing,$ionicLoading,BookMarkService)

	{

		$rootScope.formatTitle=function(word)	{
			var formatted= word.split(',');
			return formatted[0];
		}

		$rootScope.formatMeaning=function(word)	{
			var formatted= word.split(',');
			return formatted[1];
		}

		$scope.showTab= true;
		$scope.showEnter= false;

		$scope.hideCard = function() {
			$scope.showTab = false;
			$scope.showEnter = true;
		};

		$rootScope.all_words = JSON.parse(window.localStorage.getItem("all_word"));

		if (!$rootScope.all_words )  {

			//http://appliso.com/techdicto/api/keywords
			$http.get("http://appliso.com/techdicto/api/keywords")
				.success(function (response) {
					$rootScope.all_def_words=[];
					$rootScope.all_words = response;
					console.log($rootScope.all_words);
					// To handle filter properly
					for ( a in $rootScope.all_words ) {
						$rootScope.all_def_words.push($rootScope.all_words[a].keyword);
					}
				})
				.error(function(data, status) {
					$rootScope.showAlert('Please check your internet connection','Network Error');
				});
		}
		else	{
			$rootScope.all_def_words=[];
			for ( a in $rootScope.all_words ) {
				$rootScope.all_def_words.push($rootScope.all_words[a].keyword);}
			console.log($rootScope.all_def_words);
		}

		$rootScope.get_all_def= function(word)  {
			for ( a in $rootScope.all_words ) {
				if (word==$rootScope.all_words[a].keyword)  {
					$rootScope.word_to_bookmark=$rootScope.all_words[a];
					$rootScope.word_all_meaning=($rootScope.all_words[a].meaning);
					$rootScope.word_all_details=($rootScope.all_words[a].details);
					$rootScope.word_id=($rootScope.all_words[a].id);
					$rootScope.word_all_title=word;

					$state.go("app.search_all_def");

					break;
				}
			}

		}

		// For Ad
        $http.get("http://appliso.com/techdicto/api/ads")
	        .success(function(data) {
	            $rootScope.all_ads=data;
	            console.log($rootScope.all_ads);
	        })
	        .error(function(data) {
	            
	        });

	        $rootScope.gotoAd=function(url)	{
            if(url.length>1)	{
	        	window.open(url);
	        }
	        }


        //Get words and catch them
        $rootScope.load_data=function()	{
	        $http.get("http://appliso.com/techdicto/api/keywords/group?string=acronym")
	        .success(function(data) {
	            window.localStorage.setItem("all_acronym", JSON.stringify(data));
	            $rootScope.all_acronym=JSON.parse(window.localStorage.getItem("all_acronym"));
	        })
	        .error(function(data) {
	            
	        });

	        $http.get("http://appliso.com/techdicto/api/keywords/group?string=terminology")
	        .success(function(data) {
	            window.localStorage.setItem("all_terminology", JSON.stringify(data));
	            $rootScope.all_terms=JSON.parse(window.localStorage.getItem("all_terminology"));
	        })
	        .error(function(data) {
	            
	        });

	        $http.get("http://appliso.com/techdicto/api/keywords/group?string=abbreviation")
	        .success(function(data) {
	            window.localStorage.setItem("all_abrv", JSON.stringify(data));
	            $rootScope.all_abrv=JSON.parse(window.localStorage.getItem("all_abrv"));
	        })
	        .error(function(data) {
	            
	        });

	        $http.get("http://appliso.com/techdicto/api/keywords")
	        .success(function(data) {
	            window.localStorage.setItem("all_word", JSON.stringify(data));
	            $rootScope.all_word=JSON.parse(window.localStorage.getItem("all_word"));
	        })
	        .error(function(data) {
	            
	        });

	     	$http.get("http://appliso.com/techdicto/api/category")
	        .success(function(data) {
	            window.localStorage.setItem("all_categories", JSON.stringify(data));
	        })
	        .error(function(data) {
	            
	        });

	     	$http.get("http://appliso.com/techdicto/api/subcategory")
	        .success(function(data) {
	            window.localStorage.setItem("all_sub_categories", JSON.stringify(data));
	            $rootScope.all_sub_cagetories=JSON.parse(window.localStorage.getItem("all_sub_categories"));
	        })
	        .error(function(data) {
	            
	        });
        }
        
        $rootScope.load_data();

     $rootScope.bookmarkWords = function(word){
			$ionicLoading.show({ template: 'Word Saved!', noBackdrop: true, duration: 2000 });
			BookMarkService.bookmarkWord(word);
		};

		$rootScope.suggestWord=function(wordData)	{

		var data = {
			'user_id': 1,
			'type':'new',
			'keyword':wordData.title,
			'meaning':wordData.meaning, 
			'details':wordData.details
		};
			
          
          $http.post('http://appliso.com/techdicto/api/keywords/suggest',data)
          .success(function (data)	{
          	$ionicLoading.show({ template: 'Your word was submitted successfully, we will review your request', noBackdrop: true, duration: 5000 });
            console.log(data);
          })
          .error(function (data) {
                $rootScope.showAlert('An Error Occured','Error');
          });

		}
    
		$rootScope.showModal = function (animation,id,word,meaning,details) {

		if(id==1)	{
			//add new word
			var template = 'views/app/modal/add_words.html';
			$rootScope.word_title = word;
			$rootScope.word_meaning =meaning;
			$rootScope.word_details =details;

		}
		else if (id==2)	{
			$rootScope.word_title = word;
			$rootScope.word_meaning =meaning;
			$rootScope.word_details =details;
			var template = 'views/app/modal/edit_words.html';
			
		}
        
        
        $ionicModal.fromTemplateUrl(template, {
          scope: $scope,
          animation: 'animated ' + animation,
          hideDelay: 920,
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
          $scope.hideModal = function () {
          $scope.modal.remove();
          }
        });
        
      };

	$rootScope.shareAll = function (meaning,details,title,id) {
		var text= title+":"+" "+meaning+details;
		var url='http://appliso.com/techdicto/home/keyword/'+id;
		
         $cordovaSocialSharing.share(text, "", null, url);
      };
	$rootScope.showAlert = function (message, title, callBack) {
	     
	      if (typeof title === 'undefined') {
	         title = 'Alert!!'
	      }

	      var alertPopup = $ionicPopup.alert({
	         title: title,
	         template: message
	      });

	      alertPopup.then(function (res) {
	         if (typeof callBack !== 'undefined') {
	            callBack(res);
	         }
	      });
	};
})

// APP

.controller('ModalCtrl', function($scope, $ionicConfig) {

})
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope,$http,$ionicLoading) {
		
		$scope.user = {};
	$scope.doLogIn = function(user){
		$rootScope.loading=true;
		//$state.go('app.feeds-categories');
		//$state.go('app.search_all');
		
		if(user.email_signin && user.password_signin)	{
			var info={
				'email': 	user.email_signin,
				'password':user.password_signin
			};
		
    $http.post('http://appliso.com/techdicto/api/user/login',info).
		success (function(res)	{

      console.log(res);
      console.log(info);
			if(res.status==1 || res.status==2)	{
				$ionicLoading.show({ template: 'Welcome again. Enjoy Unlimited Words', noBackdrop: true, duration: 5000 });

				$rootScope.login=JSON.parse(window.localStorage.getItem("logged"));
      if(!$rootScope.login)	{
	      window.localStorage.setItem("logged", JSON.stringify(res));
		    $rootScope.login=JSON.parse(window.localStorage.getItem("logged"));
      }
        $rootScope.loading=false;
				$state.go('app.profile');
			}
      else if (res.status==0)	{
      	$ionicLoading.show({ template: 'Invalid Login Details', noBackdrop: true, duration: 5000 });
      	$rootScope.loading=false;
      }
		})
		.error(function (data) {
                //$rootScope.showAlert('An Error Occured','Error');
                alert('error');
          });
		}

		
		else if (user.email_signup && user.password_signup)	{
		var data={
			'username':user.username_signup,
			'email': 	user.email_signup,
			'password':user.password_signup
		};
		
    $http.post('http://appliso.com/techdicto/api/user/register',data).
		success (function(res)	{

			console.log("This is my data",data);
			console.log("This is response from Server",res.status);

      if(res.status==1 || res.status==2)	{
      	console.log(res.status);

      $rootScope.login=JSON.parse(window.localStorage.getItem("logged"));
      if(!$rootScope.login)	{
	      window.localStorage.setItem("logged", JSON.stringify(res));
		    $rootScope.login=JSON.parse(window.localStorage.getItem("logged"));}
		    $rootScope.loading=false;
				$ionicLoading.show({ template: 'You are now a registered User. Enjoy Unlimited Words', noBackdrop: true, duration: 5000 });
	      $state.go('app.profile');	
      
    }
    else if(res.status==5)	{
    	$ionicLoading.show({ template: 'Username Already exit', noBackdrop: true, duration: 5000 });
    	$rootScope.loading=false;
     }

    else if (res.status==4)	{
    	$ionicLoading.show({ template: 'Email Already exit', noBackdrop: true, duration: 5000 });
    	$rootScope.loading=false;
    }
		})
		.error(function (data) {
                //$rootScope.showAlert('An Error Occured','Error');
                alert('error');
          });
		}
	};
console.log($scope.user);



	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};
})

.controller('ProfileCtrl', function($scope, $state,$rootScope) {
	$rootScope.login=JSON.parse(window.localStorage.getItem("logged"));
	if(!$rootScope.login)	{
		$state.go('auth.login');
	}
	
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};
})

.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
})

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})

.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
})

.controller('SearchAllCtrl', function($scope, $http,$rootScope,$state,BookMarkService,$ionicLoading)	{
	 $rootScope.all_words = JSON.parse(window.localStorage.getItem("all_word"));

	 

	 if (!$rootScope.all_words )  {
	 	
       //http://appliso.com/techdicto/api/keywords
         $http.get("http://appliso.com/techdicto/api/keywords")
        .success(function (response) {
        	$rootScope.all_def_words=[];
            $rootScope.all_words = response;
            console.log($rootScope.all_words);
            // To handle filter properly
            for ( a in $rootScope.all_words ) {
              $rootScope.all_def_words.push($rootScope.all_words[a].keyword+','+$rootScope.all_words[a].meaning);
      		}
          })
        .error(function(data, status) {
              $rootScope.showAlert('Please check your internet connection','Network Error');
           });
      }
      else	{
      	 	$rootScope.all_def_words=[];
            for ( a in $rootScope.all_words ) {
            $rootScope.all_def_words.push($rootScope.all_words[a].keyword+','+$rootScope.all_words[a].meaning);
          }
      }

      $scope.get_all_def= function(word)  {
      	 for ( a in $rootScope.all_words ) {
       	 if (word==$rootScope.all_words[a].keyword)  {
       	  $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.word_all_meaning=($rootScope.all_words[a].meaning);
          $rootScope.word_all_details=($rootScope.all_words[a].details);
          $rootScope.word_id=($rootScope.all_words[a].id);
          $rootScope.word_all_title=word;

          $state.go("app.search_all_def");

          break
        }
      }

     }
})
.controller('AlphaCtrl', function($scope,$rootScope,$http,$state) {
  $rootScope.all_words = JSON.parse(window.localStorage.getItem("all_word"));

  $rootScope.alphabets=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'
                        ,'P','Q','R','S','T','U','V','W','X','Y','Z'];
  
  if (!$rootScope.all_words )  {

         $http.get("http://appliso.com/techdicto/api/keywords")
        .success(function (response) {
            $rootScope.alpha_words=[];
            $rootScope.all_words = response;
            for ( a in $rootScope.all_words ) {
              $rootScope.alpha_words.push($rootScope.all_words[a].keyword);
      }
      console.log($rootScope.alpha_words);
          })
        .error(function(data, status) {
              $rootScope.showAlert('Please check your internet connection','Network Error');
           });
   }
   else {
            $rootScope.alpha_words=[];
            for ( a in $rootScope.all_words ) {
            $rootScope.alpha_words.push($rootScope.all_words[a].keyword);}
        }
  
  $rootScope.alpha_def=function(alpha,word) {
    for ( a in $rootScope.all_words ) {
        if (word==$rootScope.all_words[a].keyword)  {

          $rootScope.alpha_meaning=($rootScope.all_words[a].meaning);
          $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.alpha_details=($rootScope.all_words[a].details);
          $rootScope.alpha_word=word;
          $rootScope.word_id=($rootScope.all_words[a].id);
          $rootScope.alpha=alpha;

          $state.go('app.search_alpha_def');

          break
        }
      }

  }

  $rootScope.get_by_alpha = function(actual,expected)  {
    
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;

  
	}
  
})

.controller('CatCtrl', function($scope,$rootScope,$http,$state) {
	$rootScope.all_cagetories=JSON.parse(window.localStorage.getItem("all_categories"));
  if (!$rootScope.all_cagetories )  {
       //http://appliso.com/techdicto/api/keywords
       $http.get("http://appliso.com/techdicto/api/category")
      .success(function (response) {
          $rootScope.all_cagetories = response;
        })
      .error(function(data, status) {
            $rootScope.showAlert('Please check your internet connection','Network Error');
         });
    }


    $scope.SubCategory=function(category) {
      $rootScope.all_sub_cagetories=JSON.parse(window.localStorage.getItem("all_sub_categories"));
      console.log($rootScope.all_sub_cagetories);
      $rootScope.sub_category=[];
      $rootScope.cat_name=category;
      for( a in $rootScope.all_sub_cagetories )	{
      	if(category==$rootScope.all_sub_cagetories[a].category)
      	{
      		$rootScope.sub_category.push($rootScope.all_sub_cagetories[a]);
      		console.log($rootScope.sub_category);
      	}

      }
      //console.log($rootScope.cat_name);
      $state.go("app.search_sub_cat");

    }

    $scope.WordList=function(subcategory) {
      
      $rootScope.sub_cat_name=subcategory;
      $rootScope.all_words = JSON.parse(window.localStorage.getItem("all_word"));
      $rootScope.cat_def_words=[];

      for ( a in $rootScope.all_words ) {
         var sub_cat=($rootScope.all_words[a].subcategories);
         var cat_array = sub_cat.split(',');
         for (b in cat_array)	{
         	if(subcategory==cat_array[b])	{
         		$rootScope.cat_def_words.push($rootScope.all_words[a].keyword+','+$rootScope.all_words[a].meaning);
         	}
         }
         
      	}
      	$state.go("app.search_sub_cat_words");
    }

    $scope.WordMeaning=function(word) {
       $rootScope.all_words = JSON.parse(window.localStorage.getItem("all_word"));
     
      for ( a in  $rootScope.all_words ) {
       	 if (word== $rootScope.all_words[a].keyword)  {
       	  $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.word_meaning=( $rootScope.all_words[a].meaning);
          $rootScope.word_details=( $rootScope.all_words[a].details);
          $rootScope.word_title=word;
          $rootScope.word_id=($rootScope.all_words[a].id);
          $state.go("app.search_sub_cat_def");
          break
        }
      }
     
    }
})


.controller('AcronymCtrl', function($scope,$rootScope,$http,$state) {
	$rootScope.all_acronym=JSON.parse(window.localStorage.getItem("all_acronym"));


	if (!$rootScope.all_acronym)  {
	 	
       //http://appliso.com/techdicto/api/keywords
         $http.get("http://appliso.com/techdicto/api/keywords/group?string=acronym")
        .success(function (response) {
        	$rootScope.acronyms_words=[];
            $rootScope.all_acronym = response;
            // To handle filter properly
            for ( a in $rootScope.all_acronym ) {
              $rootScope.acronyms_words.push($rootScope.all_acronym[a].keyword+','+$rootScope.all_acronym[a].meaning);
      		}
          })
        .error(function(data, status) {
              $rootScope.showAlert('Please check your internet connection','Network Error');
           });
      }
      else	{
      	 	$rootScope.acronyms_words=[];
            for ( a in $rootScope.all_acronym ) {
             $rootScope.acronyms_words.push($rootScope.all_acronym[a].keyword+','+$rootScope.all_acronym[a].meaning);
        }
      }
	$scope.acronym_words= function(word)  {

      	 for ( a in $rootScope.all_words ) {
       	 if (word==$rootScope.all_words[a].keyword)  {
       	  $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.acronym_words_meaning=($rootScope.all_words[a].meaning);
          $rootScope.acronym_words_details=($rootScope.all_words[a].details);
          $rootScope.acronym_words_title=word;
          $rootScope.word_id=($rootScope.all_words[a].id);

          $state.go("app.acronyms_words");

          break
       	 }
     	 }

     }
})

.controller('TermCtrl', function($scope,$rootScope,$http,$state) {
	$rootScope.all_terms=JSON.parse(window.localStorage.getItem("all_terminology"));


	if (!$rootScope.all_terms)  {
	 	
       //http://appliso.com/techdicto/api/keywords
         $http.get("http://appliso.com/techdicto/api/keywords/group?string=terminology")
        .success(function (response) {
        	$rootScope.terms_words=[];
            $rootScope.all_terms = response;
            // To handle filter properly
            for ( a in $rootScope.all_terms ) {
              $rootScope.terms_words.push($rootScope.all_terms[a].keyword+','+$rootScope.all_terms[a].meaning);
      		}
          })
        .error(function(data, status) {
              $rootScope.showAlert('Please check your internet connection','Network Error');
           });
      }
      else	{
      	 	$rootScope.terms_words=[];
            for ( a in $rootScope.all_terms ) {
             $rootScope.terms_words.push($rootScope.all_terms[a].keyword+','+$rootScope.all_terms[a].meaning);
        }
      }
	$scope.terms_words_def= function(word)  {

      	 for ( a in $rootScope.all_words ) {
       	 if (word==$rootScope.all_words[a].keyword)  {
       	  $rootScope.word_to_bookmark=$rootScope.all_words[a];
          $rootScope.terms_words_meaning=($rootScope.all_words[a].meaning);
          $rootScope.terms_words_details=($rootScope.all_words[a].details);
          $rootScope.terms_words_title=word;
          $rootScope.word_id=($rootScope.all_words[a].id);

          $state.go("app.terms_words");

          break
       	 }
     	 }

     }
})


// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http,$rootScope) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});

   

})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
})

// SETTINGS
.controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('auth.walkthrough');
			}
		});

	};
})

// TINDER CARDS
.controller('TinderCardsCtrl', function($scope, $http) {

	$scope.cards = [];


	$scope.addCard = function(img, name) {
		var newCard = {image: img, name: name};
		newCard.id = Math.random();
		$scope.cards.unshift(angular.extend({}, newCard));
	};

	$scope.addCards = function(count) {
		$http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
			angular.forEach(value.data.results, function (v) {
				$scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
			});
		});
	};

	$scope.addFirstCards = function() {
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png","Nope");
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
	};

	$scope.addFirstCards();
	$scope.addCards(5);

	$scope.cardDestroyed = function(index) {
		$scope.cards.splice(index, 1);
		$scope.addCards(1);
	};

	$scope.transitionOut = function(card) {
		console.log('card transition out');
	};

	$scope.transitionRight = function(card) {
		console.log('card removed to the right');
		console.log(card);
	};

	$scope.transitionLeft = function(card) {
		console.log('card removed to the left');
		console.log(card);
	};
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();


	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
	$scope.bookmarkMeaning= function(title,meaning,details)	{
		$rootScope.word_bookmark_title=title;
		$rootScope.word_bookmark_meaning=meaning;
		$rootScope.word_bookmark_details=details;
		console.log($rootScope.word_bookmark_title,$rootScope.word_bookmark_meaning,$rootScope.word_bookmark_details);
		$state.go('app.bookmarks_words');

	}
})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){
			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		console.log(post);
		BookMarkService.bookmarkWordpressPost(post);
	};
	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {

	$scope.post = post_data.post;
	$ionicLoading.hide();

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
})

;
