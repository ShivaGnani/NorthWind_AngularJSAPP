/// <reference path="angular.js" />
var app = angular.module("myApp", [])

    .factory("apiCallFactory", function ($http, $q) {
        var deferred = $q.defer();
        function getCategories() {
            $http.get('http://localhost/NorthWind_WebAPI/api/Order/Categories')
            .then(function (response) {
                deferred.resolve(response.data);
            })
            return deferred.promise;

        }
        function getProductsByID(categoryID) {
            var deferred = $q.defer();
            $http({
                url: 'http://localhost/NorthWind_WebAPI/api/Order/Productsbyid',
                method: 'GET',
                params: { id: categoryID }
            }).then(function (response) {
                deferred.resolve(response.data);
            })
            return deferred.promise;
        }
        return {
            getCategories: getCategories,
            getProductsByID: getProductsByID
        }
    })

    .controller("orderCtrl", function ($scope, apiCallFactory) {
        apiCallFactory.getCategories()
                .then(function (res) {
                    $scope.categories = res;
                })
        $scope.getProductsByID = function (categoryID) {
            apiCallFactory.getProductsByID(categoryID)
            .then(function (res) {
                $scope.products = res;
            })
            $scope.calPrice = function () {
                $scope.unitPrice = $scope.selectedProduct.UnitPrice;
                $scope.totPrice = $scope.unitPrice * $scope.quantity;
            }
            //$scope.calTotPrice = function () {
            //    $scope.totPrice = $scope.unitPrice * $scope.quantity;
            //}
        }
});