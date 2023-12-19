define(['app'], function (app) {
    app.controller("TicketsStatusWiseReportController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, AdminService) {


        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.UserTypeID;

        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.imgLabel = true;
            //$scope.usertypes()
            //   var usertypeid = 1
        }

        $scope.getStatusWiseTickets = function () {
            if ($scope.StatusValue == '' || $scope.StatusValue == null || $scope.StatusValue == undefined) {
                alert('Please select Status');
                return;
            }

            $scope.LoadImg = true;
            $scope.isShowResults = true;
           
            AdminService.GetStatusWiseTickets($scope.StatusValue)
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href = response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });

        }


    })
})