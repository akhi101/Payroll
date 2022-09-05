define(['app'], function (app) {
    app.controller("CcicSetExamCentersController", function ($scope, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamMonthYearData();

        }

        var getExamCenters = CcicPreExaminationService.GetExaminationCenters();
        getExamCenters.then(function (response) {
            var ExamCentertable = [];
            $scope.ExamCenters = response;
            //$scope.loading = false;
            //$scope.result = true;
            ExamCentertable = response;

        },
            function (error) {
                var err = JSON.parse(error);
            });

        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });

        var getaffcourses = CcicPreExaminationService.GetAffiliatedCourses();
        getaffcourses.then(function (res) {
            //var res = JSON.parse(res);
            $scope.CoursesData = res;
            //$scope.isAllSelectedcourses = false;
            //var toggleStatus = $scope.isAllSelectedcourses;
            //angular.forEach($scope.CoursesData, function (itm) { itm.selected = toggleStatus; });
            //$scope.coursearr = [];
            //angular.forEach($scope.CoursesData, function (value, key) {
            //    if (value.selected === true) {
            //        $scope.coursearr.push({ "CourseID": value.CourseID })
            //    }
            //});
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        //----------------------Course Multi Select Start--------------------------------//
        //var courseexpand = false;
        //$scope.showcourseCheckboxes = function () {
        //    var checkboxes = document.getElementById("checkboxescourse");
        //    if (!courseexpand) {
        //        checkboxes.style.display = "block";
        //        checkboxes.style.position = "absolute";
        //        checkboxes.style.width = "92%";
        //        checkboxes.style.backgroundColor = "white";
        //        checkboxes.style['z-index'] = 99;
        //        courseexpand = true;
        //    } else {
        //        checkboxes.style.display = "none";
        //        courseexpand = false;
        //    }
        //}

        //$scope.closecourseCheckbox = function () {
        //    var checkboxes = document.getElementById("checkboxescourse");
        //    if (!courseexpand) {
        //        checkboxes.style.display = "block";
        //        checkboxes.style.position = "absolute";
        //        checkboxes.style.width = "92%";
        //        checkboxes.style.backgroundColor = "white";
        //        courseexpand = true;
        //    } else {
        //        checkboxes.style.display = "none";
        //        courseexpand = false;
        //    }
        //}

        //$scope.toggleAllcourse = function () {
        //    var toggleStatus = $scope.isAllSelectedcourses;
        //    angular.forEach($scope.CoursesData, function (itm) { itm.selected = toggleStatus; });
        //    $scope.coursearr = [];
        //    angular.forEach($scope.CoursesData, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.coursearr.push({ "CourseID": value.CourseID })
        //        }
        //    });
        //}

        //$scope.optionToggledcourse = function () {
        //    $scope.isAllSelectedcourses = $scope.CoursesData.every(function (itm) { return itm.selected; })
        //    $scope.coursearr = [];
        //    angular.forEach($scope.CoursesData, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.coursearr.push({ "CourseID": value.CourseID })
        //        }
        //    });
        //}

        //----------------------Course Multi Select End--------------------------------//




        $scope.changeExamCentre = function () {
            $scope.result = false;
            $scope.GetInstitutionCenters = [];
            $scope.edit = true;
            $scope.update = false;
            examCenters = [];
        }

        $scope.pushData = function (InstitutionID, ExaminationCenterID,CourseID) {
            return {
              
                InstitutionID: InstitutionID,
                ExaminationCenterID: ExaminationCenterID,
                CourseID: CourseID
            };
        }

        $scope.changeCenter = function (data) {
            // console.log(data) 
            if (examCenters.length == '0') {
                //  console.log(data.internal)
                var marksdata = $scope.pushData(data.InstitutionID, data.ExaminationCenterID, data.CourseID);
                examCenters.push(marksdata);


            } else if (examCenters.length > 0) {
                tempId = [];
                examCenters.map((obj) => {
                    if (obj.InstitutionID == data.InstitutionID) {
                       
                        obj.InstitutionID = data.InstitutionID;
                        obj.ExaminationCenterID = data.ExaminationCenterID;
                        obj.CourseID = data.CourseID;
                        tempId.push(data.InstitutionID);
                    }
                    else if (obj.InstitutionID != data.InstitutionID && !tempId.includes(data.InstitutionID)) {
                        //  console.log(data.internal)
                        var marksdata = $scope.pushData(data.InstitutionID, data.ExaminationCenterID, data.CourseID);

                        tempId.push(data.InstitutionID);
                        examCenters.push(marksdata);

                    }
                });

            }
            console.log(examCenters);

        }



        
        $scope.editDetails = function () {
            $scope.edit = false;
            $scope.update = true;
            ExamCenters = [];
        }

        //$scope.changeExamCentre = function () {
        //    $scope.result = false;
        //    $scope.GetInstitutionCenters = [];
        //    $scope.edit = true;
        //    $scope.update = false;
        //    examCenters = [];
        //}

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.Submit = function () {



            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }


            $scope.loading = true;
            $scope.result = false;
            var getadmexmcenters = CcicPreExaminationService.GetAdminExamCentersList(parseInt($scope.AcademicYear), $scope.coursearr, parseInt($scope.monthyear))
            getadmexmcenters.then(function (response) {
                if (response.length > 0) {
                    $scope.GetInstitutionCenters = response;

                    var coursearr = [];
                    coursearr = response;
                    // if($scope.StudentType == 2){
                    //     $scope.ExaminationType = 10;  
                    //   }
                    // var getExamCenters = PreExaminationService.getExaminationCentersList($scope.Student.id, $scope.current_schemeid, $scope.currentAcademicYear, $scope.currentYearMonth);
                    

                    $scope.loading = false;
                    $scope.Noresult = false;
                    $scope.result = true;

                } else {
                    alert("No Data Found");
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    var err = JSON.parse(error);             
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                });
            

        }


        //$scope.SaveData = function () {
        //    var setExaminationCenters = CcicPreExaminationService.SetAdminExamCentersList(JSON.stringify(examCenters), parseInt($scope.monthyear));
        //    setExaminationCenters.then(function (response) {
        //        alert("Data Saved Successfully");
        //        $scope.edit = true;
        //        $scope.update = false;
        //        var getadmexmcenters = CcicPreExaminationService.GetAdminExamCentersList(parseInt($scope.AcademicYear), JSON.stringify($scope.coursearr), parseInt($scope.monthyear))
        //        getadmexmcenters.then(function (response) {
        //            $scope.GetInstitutionCenters = response;
        //            var coursearr = [];
        //            coursearr = response;
        //            var getExamCenters = CcicPreExaminationService.GetExaminationCenters();
        //            getExamCenters.then(function (response) {
        //                var ExamCentertable = [];
        //                $scope.ExamCenters = response;
        //                $scope.result = true;
        //                ExamCentertable = response
        //                if (response.length > 0) {
        //                    coursearr = coursearr.map((obj) => {
        //                        ExamCentertable.forEach(function (val) {
        //                            if (val.ExaminationCenterID === obj.ExaminationCenterID) {
        //                                obj.ExaminationCenterName = val.ExaminationCenterName;
        //                            }

        //                        })
        //                        return obj;
        //                    })
        //                }
        //                $scope.coursearr = coursearr;
        //            },
        //                function (error) {
        //                    var err = JSON.parse(error);
        //                });

        //            $scope.loading = false;
        //            $scope.Noresult = false;
        //            $scope.result = true;
        //        },
        //            function (error) {

        //                var err = JSON.parse(error);
        //                $scope.loading = false;
        //                $scope.Noresult = true;
        //                $scope.result = false;
        //            });

        //    },
        //        function (error) {
        //            alert("error while Saving Data");
        //            var err = JSON.parse(error);
        //            $scope.loading = false;
        //            $scope.Noresult = true;
        //            $scope.result = false;
        //        });
        //}

        $scope.UpdateData = function () {
            var setexmcenters = CcicPreExaminationService.SetAdminExamCentersList(JSON.stringify(examCenters), parseInt($scope.monthyear));
            setexmcenters.then(function (response) {
                if (response[0].ResponseCode == '500') {
                    alert(response[0].ResponseDescription)
                    $scope.Submit();
                   
                } else {
                    $scope.edit = true;
                    $scope.update = false;
                    alert('Data updated Successfully')
                    $scope.Submit();
                    

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

        }

    })
})