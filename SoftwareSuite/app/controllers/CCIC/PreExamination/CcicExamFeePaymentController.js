define(['app'], function (app) {
    app.controller("CcicExamFeePaymentController", function ($scope, $state, CcicPreExaminationService, $localStorage) {

        //var authData = $localStorage.Twsh;

        //$scope.userId = authData.UserId;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.RegularTable == false;
            $scope.BacklogTable == false;

        }
        

        var LoadStdType = CcicPreExaminationService.GetStudentType();
        LoadStdType.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentTypeTable = response.Table;
               
            } else {
                $scope.StudentTypeTable = [];
            }
        },
            function (error) {
                alert("error while Data");
                console.log(error);
            });

       

       
   
    //    var GetInstituteReports = TwshStudentRegService.getInstituteReports($scope.userId);
    //    GetInstituteReports.then(function (response) {

    //        $scope.InstituteReports = response;
    //    },
    //        function (error) {
    //            $scope.showStatus = true;
    //            $scope.statusclass = 'alert-danger';
    //            $scope.StatusMessage = "No Data Found";
    //            $timeout(function () {
    //                $scope.showStatus = false;

    //            }, 5000);

    //        });

    //    $scope.openNotPaid = function (gradeId) {
    //        $localStorage.gradeDetails = {
    //            userId: $scope.userId,
    //            gradeId: gradeId,
    //        }
    //        $state.go('TWSH.PaymentProcess')
    //    }

    //    $scope.feePaid = function () {
    //        $scope.showStatus = true;
    //        $scope.statusclass = 'alert-success';
    //        $scope.StatusMessage = "No Pending Fee Payments";
    //        $timeout(function () {
    //            $scope.showStatus = false;

    //        }, 5000);
    //    }
    })
})