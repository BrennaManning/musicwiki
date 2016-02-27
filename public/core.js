var myWiki = angular.module('myWiki', []);

myWiki.controller('mainController', function($scope, $http) {
    //$scope.formData = {};
    $scope.newPage = {};
    
    $scope.currentPage = {};
    $scope.currentPage.showing = false;



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
        $scope.currentPage.showing = !$scope.currentPage.showing;
        console.log($scope.currentPage.showing)
        $scope.currentPage.name = page.name;
        $scope.currentPage.text = page.text;
        $scope.currentPage._id = page._id;

    }

    // $scope.editTodo = function(id, index) {
    //     console.log($scope.editData[index])
    //     $http.put('/api/todos/' + id, {text: $scope.editData[index]})
    //         .success(function(data) {
    //             $scope.editData[index] = '';
    //             $scope.todos = data;
    //             console.log(data)
    //         })
    //         .error(function(data) {
    //             $scope.editData[index] = '';
    //             console.log('Error: ' + data)
    //         })
    // }

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
