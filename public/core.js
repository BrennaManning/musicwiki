// Good practise to put all angular code under a javascripts folder that has all your fronent js scripts

var myWiki = angular.module('myWiki', ['ngMaterial']);
// var myWiki = angular.module('myWiki', ['ngMaterial', 'ngRoute']);

// A way to make your code more modular in more complex application is to create this route handler that allows you
// to use different controllers on different routes according to your needs. To do so you need to require "ngRoute" in your 
// modulus, as shown in line 4, above. Once you've done this, you can initialize a routeProvider that handles the different
// cases, as shown below:

// app.config(function ($routeProvider, $locationProvider) {
//   $routeProvider.when("/", {
//       templateUrl : "../wiki.html",
//       controller: "mainController"
//     });
// });

myWiki.controller('mainController', function($scope, $http) {
    //$scope.formData = {};
    $scope.newPage = {};
    
    $scope.currentPage = {};
    $scope.currentPage.showing = false;

    $scope.editedPage = {};
    $scope.editedPage._id = $scope.currentPage._id;
    $scope.editedPage.showing = true;



    // when landing on the page, get all todos and show them
    $http.get('/api/pages')
        .success(function(data) {
            $scope.pages = data;
            // $scope.editData = new Array($scope.pages.length);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createPage = function() {
        console.log($scope.newPage)
        $http.post('/api/pages', $scope.newPage)
            .success(function(data) {
                $scope.newPage = {}; // clear the form so our user is ready to enter another
                $scope.pages = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //will toggle, won't switch pages properly... if current page id = input page id...
    $scope.showPage = function(page){
        if (page == $scope.currentPage){
            $scope.currentPage.showing = !$scope.currentPage.showing;
            console.log($scope.currentPage.showing)
        }
        else{
            $scope.currentPage = page;
            $scope.currentPage.showing = true;
        }

        // $scope.editedPage.text = $page.text;

        $scope.currentPage.name = page.name;
        $scope.currentPage.imageurl = page.imageurl;
        $scope.currentPage.text = page.text;
        $scope.currentPage.author = page.author;
        $scope.currentPage._id = page._id;
        $scope.currentPage.lasteditedby = page.lasteditedby;

    }

    $scope.editPage = function() {
        $scope.editedPage._id = $scope.currentPage._id;
        $scope.editedPage.author = $scope.currentPage.author;
        $scope.editedPage.name = $scope.currentPage.name;
        //$scope.editedPage.lasteditedby = $scope.currentPage.lasteditedby;
        console.log('Current page: ' + $scope.currentPage.name)
        console.log('Edited page: ' + $scope.editedPage.name)
        console.log($scope.editedPage.text)



        if(typeof $scope.editedPage.name === "undefined") {
            $scope.editedPage.name = $scope.currentPage.name
          
        }
        if(typeof $scope.editedPage.text === "undefined") {
            $scope.editedPage.text = $scope.currentPage.text
      
        }

        if(typeof $scope.editedPage.imageurl === "undefined") {
            $scope.editedPage.imageurl = $scope.currentPage.imageurl
      
        }


    
    

        $http.post('/api/pages/edit', $scope.editedPage)
            .success(function(data) {
                $scope.currentPage = $scope.editedPage;  // change the form to reflect changes
                $scope.editedPage = {}; //clear the form
                $scope.pages = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data)
            })
    }

    // $scope.completeTodo = function(id, index) {
    //     $http.post('/api/todos/' + id)
    //         .success(function(data) {
    //             // $scope.editData[index] = '';
    //             $scope.todos = data;
    //             console.log(data)
    //         })
    //         .error(function(data) {
    //             // $scope.editData[index] = '';
    //             console.log('Error: ' + data)
    //         })
    // }


    // // delete a todo after checking it
    // $scope.deleteTodo = function(id) {
    //     $http.delete('/api/todos/' + id)
    //         .success(function(data) {
    //             $scope.todos = data;
    //             console.log(data);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

});