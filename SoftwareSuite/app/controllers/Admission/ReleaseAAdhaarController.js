define(['app'], function (app) {
    app.controller("ReleaseAadhaarController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService) {
        $scope.loading = false;

        $scope.ReleaseAadhar = function () {

            if (confirm("Are you sure you want to Release Aadhar?") == true) {
                $scope.getDetails()
            } else {
                userPreference = "Save Canceled!";
               
            }


        }

        $scope.ReleaseAttendeeId = function () {

            if (confirm("Are you sure you want to Release AttendeeId?") == true) {
                $scope.ReleaseAttendee()
            } else {
                userPreference = "Save Canceled!";

            }
        }

        $scope.ReleaseAttendee = function () {
            $scope.loading = true;
            var getActiveList = AdmissionService.GetReleaseAttendeeIdBypin($scope.studentPin);
            getActiveList.then(function (response) {
                if (response != "") {
                    if (response[0].ResponceCode == '200') {
                        $scope.response = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                    } else {
                        $scope.failResponse = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.result = false;
                    }

                } else {
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    alert("error while loading Reports");
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.StatisticalReports = [];
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.getDetails = function () {
            $scope.loading = true;       
            var getActiveList = AdmissionService.getReleaseAadharByPin($scope.studentPin);
            getActiveList.then(function (response) {
                if (response != "") {
                    if (response[0].ResponceCode == '200') {
                        $scope.response = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                    } else {
                        $scope.failResponse = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.result = false;
                    }
                   
                } else {
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
            function (error) {
                alert("error while loading Reports");
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
                $scope.failResponse = response[0].ResponceDescription;
                $scope.StatisticalReports = [];
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }

    })
})