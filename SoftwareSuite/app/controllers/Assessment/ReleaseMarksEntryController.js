define(['app'], function (app) {
    app.controller("ReleaseMarksEntryController", function ($scope, $http, $localStorage, $state, $uibModal, $stateParams, AppSettings, StudentRegService, $uibModal, $timeout, PreExaminationService) {

        var GetCollegeList = StudentRegService.GetColleges();
        GetCollegeList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetCollegeList = data.Table;

            } else {
                alert("Colleges not found.");
                $scope.GetCollegeList = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetCollegeList = [];
        });



        //var GetBranchList = StudentRegService.getActiveBranches();
        //GetBranchList.then(function (data) {
        //    if (data.Table.length > 0) {
        //        $scope.branchdata = data.Table

        //    } else {
        //        alert("Branches details not found.");
        //        $scope.branchdata = [];
        //    }

        //}, function (error) {
        //    console.log(error);
        //    $scope.branchdata = [];
        //});


        var GetSemesters = PreExaminationService.GetSemesters();
        GetSemesters.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.GetSemesters = data.Table;
            } else {
                alert("Branches details not found.");
                $scope.GetSemesters = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetSemesters = [];
        });
        

        var getSchemes = PreExaminationService.getSchemes();
        getSchemes.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.getSchemes = data.Table;
            } else {
                alert("Schemes not found.");
                $scope.getSchemes = [];
            }

        }, function (error) {
            console.log(error);
            $scope.getSchemes = [];
        });
  

        $scope.ChangeCollege = function () {
            var Branch = PreExaminationService.getBranchsByCollegeCode($scope.College);
            Branch.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.branchdata = response.Table;
                } else {
                    $scope.branchdata = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Branchs");
                    console.log(error);
                });
        }

        
        
        $scope.Release = function () { 
            $scope.loading = true;
            var getActiveList = PreExaminationService.ReleaseMarksEntry($scope.College, $scope.SelBranch, $scope.SelSemester, $scope.SchemeId, $scope.ExamType);
            getActiveList.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(response.Table[0].ResponseDescription)

                } else {
                   alert('Something Went Wrong')
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
            function (error) {
                alert("error while Entering Marks");
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