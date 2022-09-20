define(['app'], function (app) {
    app.controller("CcicEnrollmentController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;



        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            $scope.SscForm = false;

          
        }

        $scope.coursedetails = true;


        $scope.Mode = function () {

            if ($scope.mode == 1) {
                $scope.sscHtLbl = 'SSC Hallticket Number';
                $scope.passYrLbl = 'Passedout Year';
                $scope.sscHtPhl = 'Hallticket No';

            } else {
                $scope.sscHtLbl = ' SSC or Equivalent RollNo';
                $scope.passYrLbl = 'Pass Year';
                $scope.sscHtPhl = 'SSC/Equivalent HallTicket no';
            }

            $scope.cancel = true;
            $scope.SscForm = true;
            $scope.applicationForm = false;

            $scope.sscHallticket = null;
            $scope.passedoutYear = null;
            $scope.sscType = null;

        }

        $scope.Next = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Stream can't be Empty");
                return;
            }
            alert("Continue to fillApplication");
            $scope.cancel = false;
            $scope.radiodisable = true;
            $scope.Add = true;
            $scope.applicationForm = true;
            $scope.SSCDetails = true;
            $scope.sscForm = true;
            isSSCValidiated = false;

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


            var getCcicCourseQualifications = CcicPreExaminationService.GetCcicCourseQualifications(CourseID);
            getCcicCourseQualifications.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCourseQualificationInfo = res;
                }
                else {
                    $scope.GetCcicCourseQualificationInfo = [];
                }

                $scope.CourseQualifications = res;

            },
                function (error) {
                    alert("error while loading Qualifications");
                    var err = JSON.parse(error);

                });

        }


        $scope.GetCcicCourseExperience = function (CourseQualificationDetails) {
            try {
                var CourseQualificationDetails = JSON.parse(CourseQualificationDetails);
            }
            catch (err) { }


            $scope.StudentCertificateType = CourseQualificationDetails.Qualification;
            $scope.isExperienced = CourseQualificationDetails.Experience;
            if ($scope.StudentCertificateType == 'SSC/10th Class or Its Equivalent') {
                $scope.StudentSscCertificate = false;

            }
            else {
                $scope.StudentSscCertificate = true;
            }
            var CourseQualificationID = CourseQualificationDetails.CourseQualificationsID;

            var getCcicCourseExperience = CcicPreExaminationService.GetCcicCourseExperience(CourseQualificationID);
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



            },
                function (error) {
                    alert("error while loading Experience");
                    var err = JSON.parse(error);

                });
        }







        $scope.Reset = function () {

            $scope.reset = false;
            $scope.Course = null;
            $scope.Qualification = null;
            $scope.Experience = null;
            $scope.ExperienceDescription = '';
            $scope.GetCcicCourseExperienceInfo = [];
            $scope.radiodisable = false;
            $scope.SSCDetails = false;


            $scope.mode = null;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = '';


            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';
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

            $scope.StudentPhoto = '';
            $scope.StudentSign = '';
            $scope.StudentSscCertificate = '';
            $scope.StudentCertificateType = '';
            $scope.isExperienced = '';

            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;



        }

        $scope.Cancel = function () {
            $scope.radiodisable = false;
            $scope.SSCDetails = false;


            $scope.mode = null;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = '';


            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';
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

            $scope.SscForm = true;
            $scope.applicationForm = false;
            $scope.continue = true;
            $scope.SSCDetails = false;






        }

        $scope.Cancel3 = function () {

            $scope.radiodisable = false;
            $scope.mode = null;

            $scope.SscForm = true;

            $scope.applicationForm = false;



            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';
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


            $scope.Submitted3 = false;
        }

        $scope.Continue = function () {

            if ($scope.Course == '' || $scope.Course == undefined || $scope.Course == null) {
                alert('Please Select Course')
                return;
            }

            if ($scope.Qualification == '' || $scope.Qualification == undefined || $scope.Qualification == null) {
                alert('Please Select Qualification')
                return;
            }

            if ($scope.GetCcicCourseExperienceInfo.length > 0 && ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '')) {
                alert('Please Select Experience')
                return;
            }
            $scope.continue = true;
            alert('Please Scroll down to fill Details')
            $scope.showEducation = true;

        }


        $scope.Modify = function (ApplicationNumber, StudentId) {

            $localStorage.TempData1 = {
                ApplicationNumber: ApplicationNumber,
                StudentId: StudentId
                


            };

            $state.go('CcicDashboard.Academic.EditStuDetails');


        }


        $scope.SaveNext = function () {
            $scope.Change = false;
            $scope.Add = true;

            if ($scope.CNAME == '' || $scope.CNAME == undefined || $scope.CNAME == null) {
                alert('Please Select CandidateName')
                return;
            }

            if ($scope.FNAME == '' || $scope.FNAME == undefined || $scope.FNAME == null) {
                alert('Please Select FatherName')
                return;
            }


            if ($scope.MNAME == '' || $scope.MNAME == undefined || $scope.MNAME == null) {
                alert('Please Select MotherName')
                return;
            }


            if ($scope.DOB_DATE == '' || $scope.DOB_DATE == undefined || $scope.DOB_DATE == null) {
                alert('Please Select CandidateDOB')
                return;
            }

            if ($scope.SEX == '' || $scope.SEX == undefined || $scope.SEX == null) {
                alert('Please Select Gender')
                return;
            }

            if ($scope.houseNo == '' || $scope.houseNo == undefined || $scope.houseNo == null) {
                alert('Please Select houseNo')
                return;
            }

            if ($scope.street == '' || $scope.street == undefined || $scope.street == null) {
                alert('Please Select street')
                return;
            }

            if ($scope.village == '' || $scope.village == undefined || $scope.village == null) {
                alert('Please Select village')
                return;
            }

            if ($scope.mobileNO == '' || $scope.mobileNO == undefined || $scope.mobileNO == null) {
                alert('Please Select Mobile Number')
                return;
            }



            if ($scope.stdPhoto == '' || $scope.stdPhoto == undefined || $scope.stdPhoto == null) {
                alert('Please Select StudentPhoto')
                return;
            }


            console.log($scope.stdPhoto);
            isSSC = $scope.mode == 1 ? 1 : 0;
            $scope.LoadImg = true;
            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;
            $scope.ShowDetails = false;



            let sscHallticket = ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == '') ? '' : $scope.sscHallticket;

            let passedoutYear = ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == '') ? '' : parseInt($scope.passedoutYear);
            let sscType = ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == '') ? '' : $scope.sscType;

            let CourseExp = ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '') ? null : parseInt($scope.Experience);
            let SscCer = ($scope.stdSscCertificate == null || $scope.stdSscCertificate == undefined || $scope.stdSscCertificate == '') ? '' : $scope.stdSscCertificate;
            let StdCerType = ($scope.stdCertificateType == null || $scope.stdCertificateType == undefined || $scope.stdCertificateType == '') ? '' : $scope.stdCertificateType;
            let StdExpCer = ($scope.stdExperienceCertificate == null || $scope.stdExperienceCertificate == undefined || $scope.stdExperienceCertificate == '') ? '' : $scope.stdExperienceCertificate;
            let appNum = ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == '') ? '' : $scope.ApplicationNumber;
            let MName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
            var addstddetails = CcicPreExaminationService.AddStudentDetails(appNum, authData.InstitutionID, parseInt($scope.Course), $scope.CourseQualifications[0].CourseQualificationsID, CourseExp, isSSC, sscHallticket, passedoutYear, sscType, $scope.CNAME, $scope.FNAME, MName, $scope.DOB_DATE, '', $scope.SEX, parseInt($scope.Aadhar), $scope.houseNo, $scope.street, $scope.landmark, $scope.village, $scope.pincode, $scope.district, $scope.state, $scope.mobileNO, $scope.email, isSSCValidiated, $scope.UserName, $scope.stdPhoto, $scope.stdSign, SscCer, StdCerType, StdExpCer);
            addstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {

                    $scope.LoadImg = true;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.StudentId = res[0].StudentID;
                    $scope.ViewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                   /* $state.go('CcicDashboard.Academic.ViewStudentDetails')*/
                    //$scope.PreviewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                    alert(res[0].ResponseDescription);
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.LoadImg = false;
                    $state.go('CcicDashboard.Academic.Enrollment');
                }

                else {
                    alert('Something Went Wrong')
                    $scope.LoadImg = false;
                }



            }, function (error) {

                var err = JSON.parse(error);
            })

            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;

        }



        $scope.ViewStudentDetails = function (ApplicationNumber, StudentId) {
            $localStorage.TempData1 =  {
                ApplicationNumber: ApplicationNumber,
                StudentId: StudentId

            }
            $state.go('CcicDashboard.Academic.ViewStudentDetails');

        }

        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("StdPhoto");
            var fileSize = input.files[0].size;
            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhoto').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.stdPhoto = base64Image;
                        });
                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };
                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }


        $scope.uploadStudentSign = function () {
            var input = document.getElementById("StdSign");
            var fileSize = input.files[0].size;
            if (fileSize <= 30000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSign').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.stdSign = base64Image;
                        });
                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };
                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }



        $scope.uploadStudentSscCertificate = function () {
            var input = document.getElementById("StdSscCertificate");
            var fileSize = input.files[0].size;

            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSscCertificate').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.stdSscCertificate = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }

        $scope.uploadStudentCertificateType = function () {
            var input = document.getElementById("StdCertificateType");
            var fileSize = input.files[0].size;
            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdCertificateType').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.stdCertificateType = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }

        $scope.uploadStudentExperienceCertificate = function () {
            var input = document.getElementById("StdExperienceCertificate");
            var fileSize = input.files[0].size;
            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdExperienceCertificate').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/jpg");
                            $scope.stdExperienceCertificate = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }

        $scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Stream can't be Empty");
                return;
            }



            $scope.hallticket = true;
            $scope.year = true;
            $scope.Ssc = true;
            $scope.Add = true;
            $scope.SSCDetails = true;
            $scope.Save = true;
            $scope.radiodisable = true;
            $scope.cancel = false;


            //$scope.Tenth_HNo = Tenth_HNo;
            //$scope.Tenth_Year = Tenth_Year;
            //$scope.Stream = Stream;
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

                        $scope.LoadImg = false;
                        isSSCValidiated = true;


                        $scope.CNAME = resdata[0].CNAME;
                        $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                        $scope.FNAME = resdata[0].FNAME;
                        $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                        $scope.MNAME = resdata[0].MNAME;
                        $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                        $scope.SEX = resdata[0].SEX == "B" || resdata[0].SEX == "M" ? "M" : resdata[0].SEX == "G" || resdata[0].SEX == "F" ? "F" : "";
                        $scope.Genderfound = $scope.SEX != "" ? true : false;
                        let date1 = resdata.DateOfBirth;
                        let ch = date1.split('');
                        var datelength = ch.length;
                        $scope.sscForm = false;
                        $scope.cancel = false;

                    } else {
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;
                        $scope.cancel = false;


                    }

                } else {
                    alert("Details not found, Continue to fillApplication");
                    $scope.applicationForm = true;
                    $scope.sscForm = false;
                    isSSCValidiated = false;
                    $scope.cancel = false;


                }


            }, function (err) {
                alert("Details not found, Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.sscForm = false;
                isSSCValidiated = false;
            })


        }


    })
})

