define(['app'], function (app) {
    app.controller("CcicSetExamCentersController", function ($scope, CcicPreExaminationService, CcicAdminService) {


        const $ctrl = this;
        $ctrl.$onInit = () => {

        }
        var GetCcicUserTypes = CcicAdminService.GetCcicUserTypes();
        GetCcicUserTypes.then(function (response) {
            if (response.Table.length > 0) {
                $scope.UserTypes = response.Table;

            } else {
                $scope.StudentType = [];
                alert("No Data Found");
            }
        },
            function (error) {
                alert("error while loading Data");
                console.log(error);
            });

        var expanded = false;
        $scope.showCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }


        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.UserTypes, function (itm) { itm.selected = toggleStatus; });
            $scope.arr = [];
            angular.forEach($scope.UserTypes, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "UserTypeID": value.UserTypeID })
                }

            });
            //console.log($scope.arr)
            //console.log($scope.userTypes)
        }

        $scope.optionToggled = function (mid1list) {
            $scope.isAllSelected = $scope.UserTypes.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.forEach($scope.UserTypes, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "UserTypeID": value.UserTypeID })
                }
            });
            console.log($scope.arr)
            console.log($scope.UserTypes)

        }

        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });




        $scope.getAYBatchExamMonthYear = function (AcademicYearID, BaTch) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            if (BaTch == null || BaTch == undefined || BaTch == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;



            var getAYbatchexammonthyear = CcicPreExaminationService.GetAYBatchExamMonthYear(AcademicYearID, BaTch)
            getAYbatchexammonthyear.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetAYBatchExamMonthYearData = res.Table;
                }
                else {
                    $scope.GetAYBatchExamMonthYearData = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }


    })
})


