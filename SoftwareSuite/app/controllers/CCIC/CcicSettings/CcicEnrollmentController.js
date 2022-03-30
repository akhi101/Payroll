define(['app'], function (app) {
    app.controller("CcicEnrollmentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicSettingsService, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            $scope.GetCcicCourseExperienceInfo = [];
            $scope.Submitted = false;
            $scope.showEducation = false;
            $scope.SscForm = false;

        }

        $scope.submitmode = function () {
         
            if ($scope.mode == 1) {
                $scope.SscForm = true;
                $scope.applicationForm = false;
            }

            else{
              

                $scope.applicationForm = true;
                $scope.SscForm = false;
          

            }
            
        }


   

        $scope.disabletable = function () {
            var ele = document.getElementsByClassName("tableinpt");
          


        }

      
        $scope.GetCcicCoursesByInstitution = function (InstitutionID) {

            var GetCcicCoursesByInstitution = CcicPreExaminationService.GetCcicCoursesByInstitution(InstitutionID);
            GetCcicCoursesByInstitution.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCoursesByInstitution = res;
                }
                else {
                    $scope.GetCcicCoursesByInstitution = [];
                }

                $scope.AffiliatedInsttitutionCourses = res;


            },
                function (error) {
                    alert("error while loading Courses");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetCcicCourseQualifications = function (CourseID) {

            var GetCcicCourseQualifications = CcicPreExaminationService.GetCcicCourseQualifications(CourseID);
            GetCcicCourseQualifications.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCourseQualifications = res;
                }
                else {
                    $scope.GetCcicCourseQualifications = [];
                }

                $scope.CourseQualifications = res;


            },
                function (error) {
                    alert("error while loading Qualifications");
                    var err = JSON.parse(error);

                });
        }


        $scope.GetCcicCourseExperience = function (CourseQualificationsID) {

            var getCcicCourseExperience = CcicPreExaminationService.GetCcicCourseExperience(CourseQualificationsID);
            getCcicCourseExperience.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCourseExperienceInfo = res;
                }
                else {
                    $scope.GetCcicCourseExperienceInfo = [];
                }

                $scope.CourseExperience = res;


            },
                function (error) {
                    alert("error while loading Experience");
                    var err = JSON.parse(error);

                });
        }

        $scope.Cancel = function () {
            $scope.Course = '';
            $scope.Qualification = '';
            $scope.Experience = '';


            $scope.mode = '';
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = '';


            $scope.CandidateName = '';
            $scope.FatherName = '';
            $scope.MotherName = '';
            $scope.CandidateNameDOB = '';
            $scope.Gender = '';
            $scope.Aadhar = '';
            $scope.houseNo = '';
            $scope.street = '';
            $scope.landmark = '';
            $scope.village = '';
            $scope.pincode = '';
            $scope.district = '';
            $scope.state = '';
            $scope.mobileNO = '';
            $scope.email = '';

            $scope.Submitted = false;
        }


        $scope.Submit = function () {
           
            if ($scope.Course == '' || $scope.Course == undefined || $scope.Course == null) {
                alert('Please Select Course')
                return;
            }

            if ($scope.Qualification == '' || $scope.Qualification == undefined || $scope.Qualification == null) {
                alert('Please Select Qualification')
                 return;
            }

            //if ($scope.Experience == '' || $scope.Experience == undefined || $scope.Experience == null) {
            //    alert('Please Select Experience')
            //    return;
            //}
            $scope.Submitted = true;
            $scope.showEducation = true;

        }

       

        $scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null) {
                alert("SSC passedout year can't be Empty");
                return;
            }


            var reqData = {
                RollNo: sscHallticket,
                Year: passedoutYear,
                Stream: sscType
            };
            var sscdetails = CcicPreExaminationService.getSSCDetails(reqData);
            sscdetails.then(function (res) {
                if (res) {

                    let resdata = JSON.parse(res)
                    if (resdata.Status == 200) {
                        $scope.applicationForm = true;
                        $scope.SscForm = true;
                        $scope.CandidateName = resdata.Name;
                        $scope.CandidateNamefound = $scope.CandidateName != "" ? true : false;
                        $scope.FatherName = resdata.FatherName;
                        $scope.FatherNamefound = $scope.FatherName != "" ? true : false;
                        $scope.MotherName = resdata.MotherName;
                        $scope.MotherNamefound = $scope.MotherName != "" ? true : false;
                        $scope.SscRollNo = resdata.RollNo;
                        $scope.SscRollNofound = $scope.SscRollNo != "" ? true : false;
                        $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                        $scope.Genderfound = $scope.Gender != "" ? true : false;
                        let date1 = resdata.DateOfBirth;
                        let ch = date1.split('');
                        var datelength = ch.length;
                       

                       

                    } else {
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.SscForm = false;
                        $scope.isqualified1 = true;
                    }
                } else {
                    alert("Details not found, Continue to fillApplication");
                    $scope.applicationForm = true;
                    $scope.SscForm = false;
                    $scope.isqualified1 = true;
                }

            }, function (err) {
                alert("Details not found, Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.SscForm = false;
                $scope.isqualified1 = true;
            })
        }

    })
})