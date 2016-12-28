var chattiez=angular.module('chattiez',['ngRoute','ngCookies']);
    chattiez.config(function($routeProvider)
    		{
    	$routeProvider.when('/register',
    			{
    		templateUrl:"partials/register.html",
    		controller:"registerController"
    			})
    			
    			.when("/blog",
			{
		templateUrl:"partials/blog.html",
		controller:"blogController"
		
	})
	
	.when("/forum",
			{
		templateUrl:"partials/forum.html",
		controller:"forumController"
			})
	
	.when("/adminBlogs",
			{
		templateUrl:"partials/adminBlogs.html",
		controller:"adminBlogController"
			})
			
	.when("/viewAllBlogs",
	{
		templateUrl:"partials/allblogs.html",
		controller:'viewBlogsController'
	})
	
	
	.when("/jobs",
			{
		templateUrl:"partials/jobs.html",
		controller:"jobController"
		
	})
    	
    .when("/login",
    		{
    		templateUrl:"partials/login.html",
    		controller:"loginController"
    		})
    		
    .when("/adminHome",
    {
    		templateUrl:"partials/adminHome.html",
    			controller:"adminHomeController"
    	}	)	
    	
    	.when("/userHome",
    			{
    		templateUrl:"partials/userHome.html",
    		controller:"userHomeController"
    			}
    			)
    			
    			.when("/adminjobs",
    			{
    		templateUrl:"partials/adminjobs.html",
    		controller:"adminjobsController"
    			}
    			)
    			
    			.when("/chat",
	{
		templateUrl:"partials/chat.html",
	controller:'chatController'
	})
	
	
    	.when("/logout",
    			{
    		templateUrl:"partials/logout.html",
    		controller:"logoutController"
    			})
    		     });
    
    
    chattiez.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

    chattiez.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
        this.uploadFileToUrl = function(file, uploadUrl,email,password,username,mobile){
           var fd = new FormData();
           fd.append('file', file);
           fd.append('email',email);
           fd.append('password',password);
           fd.append('username',username);
           fd.append('mobile',mobile);
        console.log("fd:"+fd)
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
        
           .success(function(){
        	   $scope.message="registered! you can login now!!";
        	    $scope.email="";
        	    $scope.password="";
        	   
           })
        
           .error(function(){
           });
        }
     }]);
    
   
    
    
    chattiez.controller('registerController',['$scope','fileUpload',function($scope,fileUpload){
    	$scope.register=function(){
    		var file=$scope.myFile;
    		var email=$scope.email;
    		var password=$scope.password;
    		var username=$scope.username;
    		var mobile=$scope.mobile;
    		console.log("email"+email);
    		console.log('file is');
    		console.dir(file);
    		var uploadUrl="http://localhost:8888/chattiez/fileUpload";
    		fileUpload.uploadFileToUrl(file,uploadUrl,email,password,username,mobile);
    		$scope.message="You have successfully registered...!!"
    	};
    }]);
    
    
    chattiez.controller('viewBlogsController',function($scope,$rootScope,$http)		
    		{   
    	        $rootScope.logout=true;
    	        console.log("in view blog")
    	        
 $scope.makeComment=function(blog)
    	        {
                    $scope.commentblog=blog;
    	        }
    	        
 $scope.newComment={}; 
 
 $scope.addComment=function(newComment)
				{
					var comments = {
			    			blog_Id:$scope.commentblog.blog_Id,
			    			comment:$scope.comment,
			    			email:$rootScope.ename		 				
			 		               }
					        console.log("title:"+comments);
var res = $http.post("http://localhost:8888/chattiez/makeComment",comments);
				}
    	        
    	        $http.get("http://localhost:8888/chattiez/viewAllBlogs")
	            .then(function (response) {$scope.blogs = response.data;});
    	        console.log("root scope likes:"+$rootScope.likes);
    	        console.log("this is viewblogs controller");
    			$scope.message="you are in view blogs";
    			
   $scope.commentsList=function(blog)
    			{ 
    				console.log("xyzzz")
    				$scope.viewcomments=blog
    				$scope.viewcomments.blog_Id;
   $http.get("http://localhost:8888/chattiez/viewComments/"+$scope.viewcomments.blog_Id)
    				.then(function (response) 
    						{
    									    	
    			$scope.commentlist = response.data;
    									    	
    				console.log("data:"+response.data);
    						}
    						);
    				}
    			
    			
    			$scope.hitLike=function(blog)
				 { 
					 $scope.blogslike=blog;
					 console.log("category:"+$scope.blogslike.likes);
					likes= $scope.blogslike.likes;
			       likes=likes+1
			       console.log("likes:",likes);
			       $scope.likes=likes;
			       console.log("scope likes:"+$scope.likes);   	
			       var like=
						{
					blog_Id:$scope.blogslike.blog_Id,
					blog_Name:$scope.blogslike.blog_Name,
					blog_Description:$scope.blogslike.blog_Description,
					posted_By:$scope.blogslike.posted_By,
					status:$scope.blogslike.status,
					likes:$scope.likes
						}
					console.log("data in like:"+like);
					console.log("postedby:"+$rootScope.ename);
					 $http.put('http://localhost:8888/chattiez/updateBlogs',like);
				 }
    			
    			});
    			
    		
    
    
    
    
    
    chattiez.controller("jobController",function($scope,$http)
    		{
    			console.log("in job controller");
    			
    			$http.get("http://localhost:8888/chattiez/getJobs").then(function (response) 
    				    {
    							    	
    					$scope.jobs = response.data;
    							    	
    					console.log("data:"+response.data);
    				    }
    				);
    				}
    			
    		);
    
    
   chattiez.controller("loginController",['$scope','$http','$location','$rootScope','$cookieStore', function($scope,$http,$location,$rootScope,$cookieStore)		
		   {
	         console.log("in login controller");
	  $scope.login=function()
	       {
    var login={
				   email:$scope.email,
				   password:$scope.password,
				   online:false
		       };
		     
	$http.post('http://localhost:8888/chattiez/authenticate',login).then(function (response) {
				 console.log("result   data:"+response.data);
				 var r=response.data.toString();
				 console.log("response:"+r);
			     
					if(r==1)
						{
						$rootScope.adminblogs=false;
						$rootScope.adminjobs=false;
						$rootScope.viewAllBlogs=true;
						$rootScope.blog=true;
						$rootScope.chat=true;
						$rootScope.forum=true;	
						$rootScope.jobs=true;
						$rootScope.login=false;
						$rootScope.logout=true;
						$rootScope.register=false;
						
						
						console.log('logout:'+$rootScope.logout);
						console.log("wat is this ya:"+response.data);
						console.log("ename from root scope:"+$rootScope.ename);
						$rootScope.ename=$scope.email;
						$http.defaults.headers.common['Authorization'] = 'Basic '+ $rootScope.ename;
					    $cookieStore.put('ename',$rootScope.ename)
						$location.path('/userHome');
						}
					if(r==0)
						{
						$rootScope.adminblogs=false;
						$rootScope.adminjobs=false;
						$rootScope.viewAllBlogs=false;
						$rootScope.blog=false;
						$rootScope.chat=false;
						$rootScope.forum=false;	
						$rootScope.jobs=false;
						$rootScope.login=true;
						$rootScope.logout=false;
						$rootScope.register=true;
						
						$scope.email="";
						$scope.password="";
						$scope.message="email/password incorrect";
						$location.path('/login');
						}
					if(r==2)
					{
						$rootScope.adminblogs=true;
						$rootScope.adminjobs=true;
						$rootScope.viewAllBlogs=false;
						$rootScope.blog=false;
						$rootScope.chat=false;
						$rootScope.forum=true;	
						$rootScope.jobs=false;
						$rootScope.login=false;
						$rootScope.logout=true;
						$rootScope.register=false;
						
						
						console.log('logout:'+$rootScope.logout);
						console.log("logged out:"+response.data);
						$rootScope.ename=$scope.email;
						$rootScope.id=$scope.id;
						console.log("ename:"+$rootScope.ename);
					    $location.path('/adminHome');
					}
					
		   });
	   }
		   }]);
		   
   
   chattiez.controller("adminController",function($scope,$rootScope)
			{
			  $scope="this is admin home";
			})
		  
			
		  chattiez.controller("userHomeController",function($scope,$http,$rootScope)
			{
			 
			  console.log("in user home")
			  $scope.findfriends=function()
				{
				console.log(" in findfriends function");
				console.log("name in  findfriends:"+$rootScope.ename);
	$http.get("http://localhost:8888/chattiez/findFriends/"+$rootScope.ename).then(function (response) 
			    {
						    	
				$scope.friends = response.data;
						    	
				console.log("data:"+response.data);
			    }
			);
			}
			
	$scope.addFriend=function(user)
			{
				console.log("in addfriend");
				$scope.friend=user;
				
				console.log("friendname:"+$scope.friend.email);
				console.log("username:"+$rootScope.ename);
				var frd=
					{
						email:$rootScope.ename,
						friendName:$scope.friend.email
					}
	$http.post("http://localhost:8888/chattiez/addFriend/",frd);
			}
    $scope.yourfriends=function()
			{
			console.log(" in yourfriends function");
			console.log("name in  yourfriends:"+$rootScope.ename);
	$http.get("http://localhost:8888/chattiez/viewFriends/"+$rootScope.ename)
	.then(function (response) {
					    	
					    	$scope.yourfriends = response.data;
					    	
					    	console.log("data:"+response.data);
					    
					           });}
				});
			
					
   chattiez.controller("blogController",function($scope,$http,$rootScope)	
			{	
	             $rootScope.logout=true;
	$http.get("http://localhost:8888/chattiez/viewBlogs/"+$rootScope.ename).then(function (response) {$scope.blogs = response.data;});
				
				console.log("In Controller");
				$scope.addBlog=function()
				{
					var dataObj = {
			    			blog_Name:$scope.blog_Name,
			    			blog_Description:$scope.blog_Description,
			 				posted_By:$rootScope.ename
			 		}
					        console.log("title:"+dataObj);
			var res = $http.post("http://localhost:8888/chattiez/createBlog",dataObj);
			$http.get("http://localhost:8888/chattiez/viewBlogs/"+$rootScope.ename).then(function (response) {$scope.blogs = response.data;});
		    res.success(function(data, status, headers, config) {
			$scope.message = data;
		    console.log("status:"+status);
				 		});
				}
			
				$scope.editBlog=function(blog)
				{
					console.log("inside updateblog");
					console.log("blog:"+blog);
					$scope.blogDataToEdit=blog;
				}
				$scope.saveEdit=function()
				{
					var dataObj = {
			    			blog_Name:$scope.blogDataToEdit.blog_Name,
			    			blog_Description:$scope.blogDataToEdit.blog_Description,
			 				blog_Id:$scope.blogDataToEdit.blog_Id,
			 				posted_By:$rootScope.ename
			 		};
					$http.put('http://localhost:8888/chattiez/updateBlogs', dataObj);
					$http.get("http://localhost:8888/chattiez/viewBlogs/"+$rootScope.ename)
			 	    .then(function (response) {$scope.blog = response.data;});
				}
				    $scope.deleteBlog=function(blogDataToEdit)
				{
					console.log("delete blog called");
					var del=
						{
					blog_Id:$scope.blogDataToEdit.blog_Id
						}
					console.log("blog_Id:"+blogDataToEdit.blog_Id);
					$http.post('http://localhost:8888/chattiez/deleteBlog/',del);
					$http.get("http://localhost:8888/chattiez/viewBlogs/"+$rootScope.ename)
				 	.then(function (response) {$scope.blog = response.data;});
				 }
				});

   chattiez.controller("adminBlogController",function($scope,$http,$rootScope)
		   {
	   
	   console.log("in adminblog");
	   $http.get("http://localhost:8888/chattiez/viewAllBlogs")
	    .then(function (response) {$scope.blogs = response.data;
    	
    	console.log("data:"+response.data);
    	
	    });
	   
	   $scope.appdisapp=function(adminblog)
		{
			console.log("inside appdisappblog");
			console.log("adminblog:"+adminblog);
			$scope.blogstatus=adminblog;
			
		}
		$scope.approveBlog=function()
		{
			console.log("postedby:"+$scope.blogstatus.posted_By);
			console.log("in approveblog");
			var edit=
				{
					blog_Id:$scope.blogstatus.blog_Id,
					blog_Name:$scope.blogstatus.blog_Name,
					blog_Description:$scope.blogstatus.blog_Description,
					posted_By:$scope.blogstatus.posted_By,
					status:true
				}
			
			$http.put("http://localhost:8888/chattiez/updateBlogs",edit);
			 $http.get("http://localhost:8888/chattiez/viewAllBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
		}
		$scope.disapproveBlog=function()
		{
			console.log("postedby:"+$scope.blogstatus.posted_By);
			console.log("in disapproveblog");
			var edit=
				{
					blog_Id:$scope.blogstatus.blog_Id,					
					blog_Name:$scope.blogstatus.blog_Name,
					blog_Description:$scope.blogstatus.blog_Description,
					posted_By:$scope.blogstatus.posted_By,
					status:false
				}
			$http.put("http://localhost:8888/chattiez/updateBlogs",edit);
			 $http.get("http://localhost:8888/chattiez/viewAllBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
	   
		   }
		   });
   
   
   chattiez.controller("adminjobsController",function($scope,$http,$rootScope)
		   {
	   console.log("In Controller");
	   $http.get("http://localhost:8888/chattiez/getJobs").then(function (response) {$scope.jobs = response.data;});
	   
	   
	   $scope.addJob=function()
		{
			var dataObj={
					job_Role:$scope.job_Role,
					job_Description:$scope.job_Description,
					eligibility:$scope.eligibility
			};
			var res=$http.post("http://localhost:8888/chattiez/addJobs",dataObj);
			$http.get("http://localhost:8888/chattiez/getJobs").then(function (response) {$scope.jobs = response.data;});
			res.success(function(data, status, headers, config) 
			{
				$scope.message = data;
				console.log("status:"+status);
			});
}
	   $scope.updateJobs=function(resource)
		{
			console.log("inside updatejob");
			console.log("job:"+job);
			$scope.jobDataToEdit=resource;
		}
		$scope.saveEdit=function()
		{
			var dataObj = {
	    			job_Role:$scope.jobDataToEdit.job_Role,
	    			job_Description:$scope.jobDataToEdit.job_Description,
	 				job_Id:$scope.jobDataToEdit.job_Id,
	 				eligibility:$scope.jobDataToEdit.eligibility
	 		};
			$http.put('http://localhost:8888/chattiez/updateJobs', dataObj);
			$http.get("http://localhost:8888/chattiez/getJobs")
	 	    .then(function (response) {$scope.job = response.data;});
		}
		$scope.deleteJob=function(jobDataToEdit)
		{
			console.log("delete job called");
			var del={
			job_Id:$scope.jobDataToEdit.job_Id
			
			}
			console.log("job_Id:"+del);
			$http.post('http://localhost:8888/chattiez/deleteJob',del);
			$http.get("http://localhost:8888/chattiez/getJobs")
		 	.then(function (response) {$scope.job = response.data;});
		}
		
		   });
   
   
   chattiez.controller("forumController",function($scope,$http,$rootScope)	
			{	
	   $rootScope.logout=true;
				 $http.get("http://localhost:8888/chattiez/viewForums").then(function (response) {$scope.forums = response.data;});
				
				console.log("In Controller");
				$scope.addForum=function()
				{
					var dataObj = {
			    			question:$scope.question,
			    			answer:$scope.answer,
			 				posted_By:$rootScope.ename
			 		}
					console.log("title:"+dataObj);
					 var res = $http.post("http://localhost:8888/chattiez/saveForum",dataObj);
					 $http.get("http://localhost:8888/chattiez/viewForums").then(function (response) {$scope.forums = response.data;});
				 		res.success(function(data, status, headers, config) {
				 			$scope.message = data;
				 			console.log("status:"+status);
				 		});
				}
			
				$scope.editForum=function(forum)
				{
					console.log("inside updateforum");
					console.log("forum:"+forum);
					$scope.forumDataToEdit=forum;
				}
				$scope.saveEdit=function()
				{
					var dataObj = {
			    			question:$scope.forumDataToEdit.question,
			    			answer:$scope.forumDataToEdit.answer,
			 				forum_Id:$scope.forumDataToEdit.forum_Id,
			 				posted_By:$rootScope.ename
			 		};
					$http.put('http://localhost:8888/chattiez/updateForums', dataObj);
					$http.get("http://localhost:8888/chattiez/viewForums/"+$rootScope.ename)
			 	    .then(function (response) {$scope.blog = response.data;});
				}
				$scope.deleteForum=function(forumDataToEdit)
				{
					console.log("delete forum called");
					var del=
						{
					forum_Id:$scope.forumDataToEdit.forum_Id
						}
					console.log("forum_Id:"+forumDataToEdit.blog_Id);
					$http.post('http://localhost:8888/chattiez/removeForum/',del);
					 $http.get("http://localhost:8888/chattiez/viewForums/"+$rootScope.ename)
				 	    .then(function (response) {$scope.forum = response.data;});
				}
				
			});


   chattiez.service("ChatService", function($q, $timeout) {
       
       var service = {}, listener = $q.defer(), socket = {
         client: null,
         stomp: null
       }, messageIds = [];
       
       service.RECONNECT_TIMEOUT = 30000;
       service.SOCKET_URL = "/chattiez/chat";
       service.CHAT_TOPIC = "/topic/message";
       service.CHAT_BROKER = "/app/chat";
       
       service.receive = function() {
         return listener.promise;
       };
       
       service.send = function(message) {
       	console.log("in send function");
         var id = Math.floor(Math.random() * 1000000);
         socket.stomp.send(service.CHAT_BROKER, {
           priority: 9
         }, JSON.stringify({
           message: message,
           id: id
         }));
         messageIds.push(id);
       };
       
       var reconnect = function() {
         $timeout(function() {
           initialize();
         }, this.RECONNECT_TIMEOUT);
       };
       
       var getMessage = function(data) {
         var message = JSON.parse(data), out = {};
         out.message = message.message;
         out.username = message.username;
         out.time = new Date(message.time);
         if (_.contains(messageIds, message.id)) {
           out.self = true;
           messageIds = _.remove(messageIds, message.id);
         }
         return out;
       };
       
       var startListener = function() {
         socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
           listener.notify(getMessage(data.body));
         });
       };
       
       var initialize = function() {
         socket.client = new SockJS(service.SOCKET_URL);
         socket.stomp = Stomp.over(socket.client);
         socket.stomp.connect({}, startListener);
         socket.stomp.onclose = reconnect;
       };
       
       initialize();
       return service;
     });
   chattiez.controller("chatController",function($scope,$http,ChatService)
   		{
   	console.log("in chat  controller");
   	$scope.messages = [];
   	  $scope.message = "";
   	  $scope.max = 140;
   	  
   	  $scope.addMessage = function() {
   		  console.log("in addmessage fn");
   	    ChatService.send($scope.message);
   	    $scope.message = "";
   	  };

   	  ChatService.receive().then(null, null, function(message) {
   		  console.log("inside recieve:"+message);
   		  console.log("inside recieve:"+$scope.message);
   	    $scope.messages.push(message);
   	  });
   	}
   		);
	   	 
   
 chattiez.run( function ($rootScope, $location, $http,$cookieStore) {

             $rootScope.$on('$locationChangeStart', function (event, next, current) {
			 console.log("$locationChangeStart")
     var restrictedPage = $.inArray($location.path(), ['/','/search_job','/view_blog','/login', '/register','/list_blog']) === -1;
		        
		        console.log("restrictedPage:" +restrictedPage)
		        var loggedIn = $rootScope.ename;
		        
		        console.log("loggedIn:" +loggedIn)
		        
		        if(!loggedIn)
		        	{
		        	
		        	      if (restrictedPage) {
			        	  console.log("Navigating to login page:")
			               $location.path('/login');
			                                   }
		        	}
		        });
          // keep user logged in after page refresh
             $rootScope.ename = $cookieStore.get('ename') || {};
              if ($rootScope.ename) {
                  $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.ename; 
              }
		 	 });

   
   
   
   chattiez.controller('logoutController',function($scope,$rootScope,$cookieStore)		
			{
	            $rootScope.ename=null;
				console.log("logout controller called");
				$rootScope.adminblogs=false;
				$rootScope.adminjobs=false;
				$rootScope.viewAllBlogs=false;
				$rootScope.blog=false;
				$rootScope.chat=false;
				$rootScope.forum=false;	
				$rootScope.jobs=false;
				$rootScope.login=true;
				$rootScope.logout=false;
				$rootScope.register=true;
				
				$http.post("http://localhost:8888/chattiez/logout/"+$rootScope.ename);
			}
			);
   
   