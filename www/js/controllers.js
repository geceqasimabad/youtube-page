angular.module("youtube_page.controllers", [])



// TODO: indexCtrl --|-- 
.controller("indexCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;

	// TODO: indexCtrl --|-- $rootScope.exitApp
	$rootScope.exitApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm Exit",
			template: "Are you sure you want to exit?"
		});
		confirmPopup.then(function (close){
			if(close){
				ionic.Platform.exitApp();
			}
			$rootScope.closeMenuPopover();
		});
	};
	
	// TODO: indexCtrl --|-- $rootScope.changeLanguage
	$rootScope.changeLanguage = function(langKey){
		if(typeof langKey !== null){
			$translate.use(langKey);
			tmhDynamicLocale.set(langKey);
			try {
				$rootScope.language_option = langKey;
				localforage.setItem("language_option",langKey);
			}catch(e){
				localforage.setItem("language_option","en-us");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showLanguageDialog
	var modal_language = "";
	modal_language += "<ion-modal-view>";
	modal_language += "<ion-header-bar class=\"bar bar-header bar-dark\">";
	modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
	modal_language += "</ion-header-bar>";
	modal_language += "<ion-content class=\"padding\">";
	modal_language += "<div class=\"list\">";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
	modal_language += "<button class=\"button button-full button-dark\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
	modal_language += "</div>";
	modal_language += "</ion-content>";
	modal_language += "</ion-modal-view>";
	
	$rootScope.languageDialog = $ionicModal.fromTemplate(modal_language,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showLanguageDialog = function(){
		$rootScope.languageDialog.show();
		localforage.getItem("language_option", function(err, value){
			$rootScope.language_option = value;
		}).then(function(value){
			$rootScope.language_option = value;
		}).catch(function (err){
			$rootScope.language_option = "en-us";
		})
	};
	
	$rootScope.closeLanguageDialog = function(){
		$rootScope.languageDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	$rootScope.tryChangeLanguage = function(langKey){
		$rootScope.changeLanguage(langKey);
	};
	
	localforage.getItem("language_option", function(err, value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).catch(function (err){
		localforage.setItem("language_option","en-us");
	})
	// TODO: indexCtrl --|-- $rootScope.changeFontSize
	$rootScope.changeFontSize = function(fontSize){
		if(typeof fontSize !== null){
			try {
				$rootScope.fontsize_option = $rootScope.fontsize = fontSize;
				localforage.setItem("fontsize_option",fontSize);
			}catch(e){
				localforage.setItem("fontsize_option","normal");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
	var modal_fontsize = "";
	modal_fontsize += "<ion-modal-view>";
	modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-dark\">";
	modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
	modal_fontsize += "</ion-header-bar>";
	modal_fontsize += "<ion-content class=\"padding\">";
	modal_fontsize += "<div class=\"list\">";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
	modal_fontsize += "<button class=\"button button-full button-dark\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
	modal_fontsize += "</div>";
	modal_fontsize += "</ion-content>";
	modal_fontsize += "</ion-modal-view>";
	
	$rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showFontSizeDialog = function(){
		$rootScope.fontSizeDialog.show();
		localforage.getItem("fontsize_option", function(err, value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).then(function(value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).catch(function (err){
			$rootScope.fontsize_option = $rootScope.fontsize = "normal";
		})
	};
	
	$rootScope.closeFontSizeDialog = function(){
		$rootScope.fontSizeDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	localforage.getItem("fontsize_option", function(err, value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).catch(function (err){
		console.log(err);
		localforage.setItem("fontsize_option","normal");
	})
	
	
	$rootScope.tryChangeFontSize = function(val){
		$rootScope.changeFontSize(val);
	};
	
	// TODO: indexCtrl --|-- $rootScope.clearCacheApp
	$rootScope.clearCacheApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm",
			template: "Are you sure you want to clear cache?"
		});
		confirmPopup.then(function (close){
			if(close){
				localforage.keys().then(function(keys) {
					for(var e = 0; e < keys.length ; e++) {
						localforage.setItem(keys[e],[]);
					}
					$state.go("youtube_page.dashboard");
				}).catch(function(err) {
					$state.go("youtube_page.dashboard");
				});
			}
			$rootScope.closeMenuPopover();
		});
	};
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: indexCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: indexCtrl --|-- $scope.openURL
	// open external browser 
	$rootScope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: indexCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$rootScope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done,hardwareback=Done,toolbarposition=top,location=yes");
	
		appBrowser.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appBrowser.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appBrowser.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appBrowser.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.openWebView
	// open WebView
	$rootScope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no,toolbar=no");
	
		appWebview.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appWebview.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appWebview.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appWebview.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: indexCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: indexCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `index` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: side_menusCtrl --|-- 
.controller("side_menusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: side_menusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: side_menusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: side_menusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 
	
	var popover_template = "";
	popover_template += "<ion-popover-view class=\"fit\">";
	popover_template += "	<ion-content>";
	popover_template += "		<ion-list>";
	popover_template += "			<a  class=\"item dark-ink\" ng-href=\"#/youtube_page/about_us\" ng-click=\"popover.hide()\">";
	popover_template += "			{{ 'About Us' | translate }}";
	popover_template += "			</a>";
	popover_template += "		</ion-list>";
	popover_template += "	</ion-content>";
	popover_template += "</ion-popover-view>";
	
	
	$scope.popover = $ionicPopover.fromTemplate(popover_template,{
		scope: $scope
	});
	
	$scope.closePopover = function(){
		$scope.popover.hide();
	};
	
	$rootScope.closeMenuPopover = function(){
		$scope.popover.hide();
	};
	
	$scope.$on("$destroy", function(){
		$scope.popover.remove();
	});

	// TODO: side_menusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `side_menus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- 
.controller("_four_eight_laws_of_power_video_booktwo_Ctrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url 48 Laws of Power Video Book
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data__four_eight_laws_of_power_video_booktwo_s = [];
	
	localforage.getItem("data__four_eight_laws_of_power_video_booktwo_s_" + $scope.hashURL, function(err, get__four_eight_laws_of_power_video_booktwo_s){
		if(get__four_eight_laws_of_power_video_booktwo_s === null){
			data__four_eight_laws_of_power_video_booktwo_s =[];
		}else{
			data__four_eight_laws_of_power_video_booktwo_s = JSON.parse(get__four_eight_laws_of_power_video_booktwo_s);
			$scope.data__four_eight_laws_of_power_video_booktwo_s =JSON.parse( get__four_eight_laws_of_power_video_booktwo_s);
			$scope._four_eight_laws_of_power_video_booktwo_s = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data__four_eight_laws_of_power_video_booktwo_s === null ){
		data__four_eight_laws_of_power_video_booktwo_s =[];
	}
	if(data__four_eight_laws_of_power_video_booktwo_s.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data__four_eight_laws_of_power_video_booktwo_s = response.data.items;
				$scope.data__four_eight_laws_of_power_video_booktwo_s = response.data.items;
				// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|---------- set:localforage
				localforage.setItem("data__four_eight_laws_of_power_video_booktwo_s_" + $scope.hashURL, JSON.stringify(data__four_eight_laws_of_power_video_booktwo_s));
				$scope._four_eight_laws_of_power_video_booktwo_s = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
						$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data__four_eight_laws_of_power_video_booktwo_s = data.items;
						$scope.data__four_eight_laws_of_power_video_booktwo_s = data.items;
						$ionicLoading.hide();
						// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|---------- set:localforage
						localforage.setItem("data__four_eight_laws_of_power_video_booktwo_s_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_s));
						controller_by_user();
						$scope._four_eight_laws_of_power_video_booktwo_s = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
								$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data__four_eight_laws_of_power_video_booktwo_s.data)){
					if($scope.data__four_eight_laws_of_power_video_booktwo_s.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data__four_eight_laws_of_power_video_booktwo_s = response.data.items;
			$scope.data__four_eight_laws_of_power_video_booktwo_s = response.data.items;
			// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_s_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_s));
			$scope._four_eight_laws_of_power_video_booktwo_s = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data__four_eight_laws_of_power_video_booktwo_s = data.items;
					$scope.data__four_eight_laws_of_power_video_booktwo_s = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|---------- set:localforage
					localforage.setItem("data__four_eight_laws_of_power_video_booktwo_s_"+ $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_s));
					$scope._four_eight_laws_of_power_video_booktwo_s = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
							$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data__four_eight_laws_of_power_video_booktwo_s === null){
		data__four_eight_laws_of_power_video_booktwo_s = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_s[lastPush])){
				$scope._four_eight_laws_of_power_video_booktwo_s.push(data__four_eight_laws_of_power_video_booktwo_s[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: _four_eight_laws_of_power_video_booktwo_Ctrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `_four_eight_laws_of_power_video_booktwo_` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- 
.controller("_four_eight_laws_of_power_video_booktwo_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url 48 Laws of Power
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data__four_eight_laws_of_power_video_booktwo_singless = [];
	
	localforage.getItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL, function(err, get__four_eight_laws_of_power_video_booktwo_singless){
		if(get__four_eight_laws_of_power_video_booktwo_singless === null){
			data__four_eight_laws_of_power_video_booktwo_singless =[];
		}else{
			data__four_eight_laws_of_power_video_booktwo_singless = JSON.parse(get__four_eight_laws_of_power_video_booktwo_singless);
			$scope.data__four_eight_laws_of_power_video_booktwo_singless =JSON.parse( get__four_eight_laws_of_power_video_booktwo_singless);
			$scope._four_eight_laws_of_power_video_booktwo_singless = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data__four_eight_laws_of_power_video_booktwo_singless === null ){
		data__four_eight_laws_of_power_video_booktwo_singless =[];
	}
	if(data__four_eight_laws_of_power_video_booktwo_singless.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
				$scope.data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
				// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
				localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL, JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
				$scope._four_eight_laws_of_power_video_booktwo_singless = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
						$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data__four_eight_laws_of_power_video_booktwo_singless = data.items;
						$scope.data__four_eight_laws_of_power_video_booktwo_singless = data.items;
						$ionicLoading.hide();
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
						localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
						controller_by_user();
						$scope._four_eight_laws_of_power_video_booktwo_singless = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
								$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data__four_eight_laws_of_power_video_booktwo_singless.data)){
					if($scope.data__four_eight_laws_of_power_video_booktwo_singless.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
			$scope.data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
			// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
			$scope._four_eight_laws_of_power_video_booktwo_singless = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data__four_eight_laws_of_power_video_booktwo_singless = data.items;
					$scope.data__four_eight_laws_of_power_video_booktwo_singless = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
					localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_"+ $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
					$scope._four_eight_laws_of_power_video_booktwo_singless = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
							$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data__four_eight_laws_of_power_video_booktwo_singless === null){
		data__four_eight_laws_of_power_video_booktwo_singless = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
				$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `_four_eight_laws_of_power_video_booktwo_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- 
.controller("_four_eight_laws_of_power_video_booktwo_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url 48 Laws of Power
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data__four_eight_laws_of_power_video_booktwo_singless = [];
	
	localforage.getItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL, function(err, get__four_eight_laws_of_power_video_booktwo_singless){
		if(get__four_eight_laws_of_power_video_booktwo_singless === null){
			data__four_eight_laws_of_power_video_booktwo_singless =[];
		}else{
			data__four_eight_laws_of_power_video_booktwo_singless = JSON.parse(get__four_eight_laws_of_power_video_booktwo_singless);
			$scope.data__four_eight_laws_of_power_video_booktwo_singless =JSON.parse( get__four_eight_laws_of_power_video_booktwo_singless);
			$scope._four_eight_laws_of_power_video_booktwo_singless = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data__four_eight_laws_of_power_video_booktwo_singless === null ){
		data__four_eight_laws_of_power_video_booktwo_singless =[];
	}
	if(data__four_eight_laws_of_power_video_booktwo_singless.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
				$scope.data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
				// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
				localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL, JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
				$scope._four_eight_laws_of_power_video_booktwo_singless = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
						$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data__four_eight_laws_of_power_video_booktwo_singless = data.items;
						$scope.data__four_eight_laws_of_power_video_booktwo_singless = data.items;
						$ionicLoading.hide();
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
						localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
						controller_by_user();
						$scope._four_eight_laws_of_power_video_booktwo_singless = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
								$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data__four_eight_laws_of_power_video_booktwo_singless.data)){
					if($scope.data__four_eight_laws_of_power_video_booktwo_singless.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
			$scope.data__four_eight_laws_of_power_video_booktwo_singless = response.data.items;
			// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
			$scope._four_eight_laws_of_power_video_booktwo_singless = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
					$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data__four_eight_laws_of_power_video_booktwo_singless = data.items;
					$scope.data__four_eight_laws_of_power_video_booktwo_singless = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|---------- set:localforage
					localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_"+ $scope.hashURL,JSON.stringify(data__four_eight_laws_of_power_video_booktwo_singless));
					$scope._four_eight_laws_of_power_video_booktwo_singless = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
							$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data__four_eight_laws_of_power_video_booktwo_singless === null){
		data__four_eight_laws_of_power_video_booktwo_singless = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data__four_eight_laws_of_power_video_booktwo_singless[lastPush])){
				$scope._four_eight_laws_of_power_video_booktwo_singless.push(data__four_eight_laws_of_power_video_booktwo_singless[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: _four_eight_laws_of_power_video_booktwo_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `_four_eight_laws_of_power_video_booktwo_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- 
.controller("_four_eight_laws_of_power_video_booktwo_singles_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page-builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.snippetresourceIdvideoId;
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data__four_eight_laws_of_power_video_booktwo_singless_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope._four_eight_laws_of_power_video_booktwo_singles = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope._four_eight_laws_of_power_video_booktwo_singles = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data.items;
			// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response.items;
			// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|---------- set:localforage
			localforage.setItem("data__four_eight_laws_of_power_video_booktwo_singless_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].snippetresourceIdvideoId ===  parseInt(itemID)) || (datas[i].snippetresourceIdvideoId === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope._four_eight_laws_of_power_video_booktwo_singles = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope._four_eight_laws_of_power_video_booktwo_singles = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: _four_eight_laws_of_power_video_booktwo_singles_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

    
$ionicConfig.backButton.text("");
$scope.pauseVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' +   '","args":""}', '*');
}


$scope.playVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
   iframe.postMessage('{"event":"command","func":"' + 'playVideo' +   '","args":""}', '*');
}

$scope.$on("$ionicView.beforeLeave", function(){
	$scope.pauseVideo();
});

$scope.$on("$ionicView.enter", function(){
	$scope.playVideo();
});
			
		} catch(e){
			console.log("%cerror: %cPage: `_four_eight_laws_of_power_video_booktwo_singles_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_usCtrl --|-- 
.controller("about_usCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_usCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_usCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_usCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_usCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `about_us` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: dashboardCtrl --|-- 
.controller("dashboardCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboardCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboardCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboardCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: dashboardCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: faqsCtrl --|-- 
.controller("faqsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: faqsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: faqsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: faqsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: faqsCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url Youtube
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: faqsCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: faqsCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: faqsCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: faqsCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_faqss = [];
	
	localforage.getItem("data_faqss_" + $scope.hashURL, function(err, get_faqss){
		if(get_faqss === null){
			data_faqss =[];
		}else{
			data_faqss = JSON.parse(get_faqss);
			$scope.data_faqss =JSON.parse( get_faqss);
			$scope.faqss = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_faqss[lastPush])){
					$scope.faqss.push(data_faqss[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_faqss === null ){
		data_faqss =[];
	}
	if(data_faqss.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: faqsCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_faqss = response.data.items;
				$scope.data_faqss = response.data.items;
				// TODO: faqsCtrl --|---------- set:localforage
				localforage.setItem("data_faqss_" + $scope.hashURL, JSON.stringify(data_faqss));
				$scope.faqss = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_faqss[lastPush])){
						$scope.faqss.push(data_faqss[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: faqsCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_faqss = data.items;
						$scope.data_faqss = data.items;
						$ionicLoading.hide();
						// TODO: faqsCtrl --|---------- set:localforage
						localforage.setItem("data_faqss_" + $scope.hashURL,JSON.stringify(data_faqss));
						controller_by_user();
						$scope.faqss = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_faqss[lastPush])){
								$scope.faqss.push(data_faqss[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: faqsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: faqsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_faqss.data)){
					if($scope.data_faqss.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: faqsCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: faqsCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_faqss = response.data.items;
			$scope.data_faqss = response.data.items;
			// TODO: faqsCtrl --|---------- set:localforage
			localforage.setItem("data_faqss_" + $scope.hashURL,JSON.stringify(data_faqss));
			$scope.faqss = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_faqss[lastPush])){
					$scope.faqss.push(data_faqss[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: faqsCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_faqss = data.items;
					$scope.data_faqss = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: faqsCtrl --|---------- set:localforage
					localforage.setItem("data_faqss_"+ $scope.hashURL,JSON.stringify(data_faqss));
					$scope.faqss = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_faqss[lastPush])){
							$scope.faqss.push(data_faqss[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: faqsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: faqsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_faqss === null){
		data_faqss = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_faqss[lastPush])){
				$scope.faqss.push(data_faqss[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: faqsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `faqs` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: faqs_singlesCtrl --|-- 
.controller("faqs_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page-builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: faqs_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: faqs_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: faqs_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: faqs_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.snippetresourceIdvideoId;
	// TODO: faqs_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk";
	// TODO: faqs_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLV4jr97jm5hm0erKSdWeDnqbnlx3V9u_S&key=AIzaSyBLAq15lx5CRoCE32tXA49JI4MxE33BEOk&callback=JSON_CALLBACK";
	// TODO: faqs_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_faqss_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.faqs = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: faqs_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: faqs_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_faqss_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.faqs = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: faqs_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: faqs_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data.items;
			// TODO: faqs_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_faqss_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: faqs_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response.items;
			// TODO: faqs_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_faqss_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].snippetresourceIdvideoId ===  parseInt(itemID)) || (datas[i].snippetresourceIdvideoId === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.faqs = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.faqs = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: faqs_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

    
$ionicConfig.backButton.text("");
$scope.pauseVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' +   '","args":""}', '*');
}


$scope.playVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
   iframe.postMessage('{"event":"command","func":"' + 'playVideo' +   '","args":""}', '*');
}

$scope.$on("$ionicView.beforeLeave", function(){
	$scope.pauseVideo();
});

$scope.$on("$ionicView.enter", function(){
	$scope.playVideo();
});
			
		} catch(e){
			console.log("%cerror: %cPage: `faqs_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: slide_tab_menuCtrl --|-- 
.controller("slide_tab_menuCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: slide_tab_menuCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: slide_tab_menuCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `slide_tab_menu` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: youtubeCtrl --|-- 
.controller("youtubeCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: youtubeCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: youtubeCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: youtubeCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: youtubeCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url Youtube
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: youtubeCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: youtubeCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLSC2odpss-AjKvqTagCQl77ieIJcas1ud&key=AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs";
	// TODO: youtubeCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLSC2odpss-AjKvqTagCQl77ieIJcas1ud&key=AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs&callback=JSON_CALLBACK";
	// TODO: youtubeCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_youtubes = [];
	
	localforage.getItem("data_youtubes_" + $scope.hashURL, function(err, get_youtubes){
		if(get_youtubes === null){
			data_youtubes =[];
		}else{
			data_youtubes = JSON.parse(get_youtubes);
			$scope.data_youtubes =JSON.parse( get_youtubes);
			$scope.youtubes = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_youtubes[lastPush])){
					$scope.youtubes.push(data_youtubes[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_youtubes === null ){
		data_youtubes =[];
	}
	if(data_youtubes.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: youtubeCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_youtubes = response.data.items;
				$scope.data_youtubes = response.data.items;
				// TODO: youtubeCtrl --|---------- set:localforage
				localforage.setItem("data_youtubes_" + $scope.hashURL, JSON.stringify(data_youtubes));
				$scope.youtubes = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_youtubes[lastPush])){
						$scope.youtubes.push(data_youtubes[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: youtubeCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_youtubes = data.items;
						$scope.data_youtubes = data.items;
						$ionicLoading.hide();
						// TODO: youtubeCtrl --|---------- set:localforage
						localforage.setItem("data_youtubes_" + $scope.hashURL,JSON.stringify(data_youtubes));
						controller_by_user();
						$scope.youtubes = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_youtubes[lastPush])){
								$scope.youtubes.push(data_youtubes[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: youtubeCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: youtubeCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_youtubes.data)){
					if($scope.data_youtubes.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: youtubeCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: youtubeCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_youtubes = response.data.items;
			$scope.data_youtubes = response.data.items;
			// TODO: youtubeCtrl --|---------- set:localforage
			localforage.setItem("data_youtubes_" + $scope.hashURL,JSON.stringify(data_youtubes));
			$scope.youtubes = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_youtubes[lastPush])){
					$scope.youtubes.push(data_youtubes[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: youtubeCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_youtubes = data.items;
					$scope.data_youtubes = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: youtubeCtrl --|---------- set:localforage
					localforage.setItem("data_youtubes_"+ $scope.hashURL,JSON.stringify(data_youtubes));
					$scope.youtubes = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_youtubes[lastPush])){
							$scope.youtubes.push(data_youtubes[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: youtubeCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: youtubeCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_youtubes === null){
		data_youtubes = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_youtubes[lastPush])){
				$scope.youtubes.push(data_youtubes[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: youtubeCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `youtube` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: youtube_singlesCtrl --|-- 
.controller("youtube_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page-builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: youtube_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: youtube_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: youtube_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: youtube_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("youtube_page.dashboard");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.snippetresourceIdvideoId;
	// TODO: youtube_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLSC2odpss-AjKvqTagCQl77ieIJcas1ud&key=AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs";
	// TODO: youtube_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PLSC2odpss-AjKvqTagCQl77ieIJcas1ud&key=AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs&callback=JSON_CALLBACK";
	// TODO: youtube_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_youtubes_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.youtube = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: youtube_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: youtube_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_youtubes_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.youtube = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: youtube_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: youtube_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data.items;
			// TODO: youtube_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_youtubes_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: youtube_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response.items;
			// TODO: youtube_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_youtubes_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].snippetresourceIdvideoId ===  parseInt(itemID)) || (datas[i].snippetresourceIdvideoId === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.youtube = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.youtube = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: youtube_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `youtube_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})
