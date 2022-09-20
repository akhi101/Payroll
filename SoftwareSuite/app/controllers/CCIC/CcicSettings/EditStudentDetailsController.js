define(['app'], function (app) {
    app.controller("EditStudentDetailsController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        var tempData1 = $localStorage.TempData1;
        $scope.InstitutionID = authData.InstitutionID;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            $scope.Mode();
            $scope.coursedetails = true;
            //$scope.Modify();
            /*$scope.EditStudentDetails();*/

        }

        var data = {};
        $scope.$emit('showLoading', data);



        $scope.Modify = function () {

            $scope.loading = true;
            $scope.coursedetails = true;
            $scope.SSCDetails = true;
            $scope.radiodisable = true;

            var editstddetails = CcicPreExaminationService.GetStudentDetails(tempData1.ApplicationNumber, tempData1.StudentId);
            editstddetails.then(function (response) {
                try {
                    var editRes = JSON.parse(response);
                }
                catch (err) { }
                $scope.coursedetails = true;
                $scope.SscForm = true;
                $scope.showEducation = true;
                $scope.applicationForm = true;
                $scope.loading = false;
                $scope.EditData = editRes[0];

                /* $scope.ApplicationNumber = tempData4.ApplicationNumber;*/
                $scope.CourseName = $scope.EditData.CourseName;
                $scope.CourseID = $scope.EditData.CourseID;
                //$scope.CourseID = CourseID;
                $scope.Qualification = $scope.EditData.Qualification;
                $scope.Experience = $scope.EditData.Experience;

                $scope.CourseQualificationID = $scope.EditData.CourseQualificationID;
                $scope.CourseExperienceID = $scope.EditData.CourseExperienceID;

                $scope.SSC = $scope.EditData.SSC;
                $scope.SSCValidated = $scope.EditData.SSCValidated;

                $scope.SSCHallticketNumber = $scope.EditData.SSCHallticketNumber;
                $scope.SSCPassedYear = $scope.EditData.SSCPassedYear;
                $scope.SSCPassedType = $scope.EditData.SSCPassedType;

                $scope.StudentName = $scope.EditData.StudentName;
                $scope.FatherName = $scope.EditData.FatherName;
                $scope.MotherName = $scope.EditData.MotherName;
                $scope.FatherName = $scope.EditData.FatherName;
                $scope.DateofBirth = $scope.EditData.DateofBirth;
                $scope.Gender = $scope.EditData.Gender;
                $scope.AadharNumber = $scope.EditData.AadharNumber;
                $scope.HouseNumber = $scope.EditData.HouseNumber;
                $scope.Street = $scope.EditData.Street;
                $scope.Landmark = $scope.EditData.Landmark;
                $scope.Village = $scope.EditData.Village;
                $scope.Pincode = $scope.EditData.Pincode;
                $scope.District = $scope.EditData.District;
                $scope.AddressState = $scope.EditData.AddressState;
                $scope.StudentMobile = $scope.EditData.StudentMobile;
                $scope.StudentEmail = $scope.EditData.StudentEmail;

                $scope.StudentPhoto = $scope.EditData.StudentPhoto;
                $scope.StudentSign = $scope.EditData.StudentSign;

                $scope.SSCCertificate = $scope.EditData.SSCCertificate;
                $scope.QualificationCertificate = $scope.EditData.QualificationCertificate;
                $scope.ExperienceCertificate = $scope.EditData.ExperienceCertificate;

                $state.go('CcicDashboard.Academic.EditStuDetails');
                $scope.$emit('hideLoading', data);
            }, function (error) {

                var err = JSON.parse(error);
            });

        }

        $scope.Mode = function () {

            if ($scope.SSC == 1) {
                $scope.sscHtLbl = 'SSC Hallticket Number';
                $scope.passYrLbl = 'Passedout Year';
                $scope.sscHtPhl = 'Hallticket No';
                //$scope.sscGetLbl = 'Get Details';

            } else {
                $scope.sscHtLbl = 'SSC or Equivalent RollNo';
                $scope.passYrLbl = 'Pass Year';
                $scope.sscHtPhl = 'SSC/Equivalent HallTicket no';
                //    $scope.sscGetLbl = 'Next';
            }

            $scope.cancel = true;
            $scope.SscForm = true;
            $scope.applicationForm = false;

            $scope.sscHallticket = null;
            $scope.passedoutYear = null;
            $scope.sscType = null;

        }



        //$scope.EditStudentDetails = function () {
        //    $scope.loading = true;
        //    $scope.coursedetails = true;
        //    $scope.sscdetails = true;
        //    $scope.radiodisable = true;
        //    //$scope.qualification = true;
        //    //$scope.experience = true;
        //    var editstddetails = CcicPreExaminationService.GetViewStudentDetails(tempData4.ApplicationNumber, tempData4.StudentID);
        //    editstddetails.then(function (response) {
        //        try {
        //            var editRes = JSON.parse(response);

        //        }
        //        catch (err) { }
        //        $scope.coursedetails = true;
        //        $scope.SscForm = true;
        //        $scope.showEducation = true;
        //        $scope.applicationForm = true;
        //        $scope.loading = false;
        //        $scope.EditData = editRes[0];

        //        $scope.ApplicationNumber = tempData4.ApplicationNumber;
        //        $scope.Course = $scope.EditData.Course;
        //        //$scope.CourseID = CourseID;
        //        $scope.Qualification = $scope.EditData.Qualification;
        //        $scope.Experience = $scope.EditData.Experience;

        //        $scope.SSC = $scope.EditData.SSC;

        //        $scope.SSCHallticketNumber = $scope.EditData.SSCHallticketNumber;
        //        $scope.SSCPassedYear = $scope.EditData.SSCPassedYear;
        //        $scope.SSCPassedType = $scope.EditData.SSCPassedType;

        //        $scope.StudentName = $scope.EditData.StudentName;
        //        $scope.FatherName = $scope.EditData.FatherName;
        //        $scope.MotherName = $scope.EditData.MotherName;
        //        $scope.FatherName = $scope.EditData.FatherName;
        //        $scope.DateofBirth = $scope.EditData.DateofBirth;
        //        $scope.Gender = $scope.EditData.Gender;
        //        $scope.AadharNumber = $scope.EditData.AadharNumber;
        //        $scope.HouseNumber = $scope.EditData.HouseNumber;
        //        $scope.Street = $scope.EditData.Street;
        //        $scope.Landmark = $scope.EditData.Landmark;
        //        $scope.Village = $scope.EditData.Village;
        //        $scope.Pincode = $scope.EditData.Pincode;
        //        $scope.District = $scope.EditData.District;
        //        $scope.AddressState = $scope.EditData.AddressState;
        //        $scope.StudentMobile = $scope.EditData.StudentMobile;
        //        $scope.StudentEmail = $scope.EditData.StudentEmail;

        //        $scope.StudentPhoto = $scope.EditData.StudentPhoto;
        //        $scope.StudentSign = $scope.EditData.StudentSign;

        //        $scope.SSCCertificate = $scope.EditData.SSCCertificate;
        //        $scope.QualificationCertificate = $scope.EditData.QualificationCertificate;
        //        $scope.ExperienceCertificate = $scope.EditData.ExperienceCertificate;



        //        $scope.$emit('hideLoading', data);

        //    }, function (error) {
        //        $scope.LoadImg = false;
        //        var err = JSON.parse(error);
        //    });
        //}


        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails($scope.ApplicationNumber, $scope.StudentId);
            submitstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $state.go('CcicDashboard.Academic.EnrollmentReport');
                    $scope.coursedetails = true;
                    $scope.Course = null;
                    $scope.Qualification = null;
                    $scope.Experience = null;
                    $scope.ExperienceDescription = null;
                    $scope.GetCcicCourseExperienceInfo = [];
                    //$scope.hallticket = false;
                    //$scope.year = false;
                    //$scope.Ssc = false;

                    $scope.reset = false;
                    $scope.cancel = false;

                    $scope.continue = false;
                    $scope.SSCDetails = false;
                    $scope.Submitted3 = false;
                    //$scope.Save = false;
                    //$scope.Update = false;

                    $scope.showEducation = false;
                    $scope.SscForm = false;
                    //$scope.coursedetail = false;
                    isSSCValidiated = false;
                    $scope.ShowDetails = false;
                    $scope.radiodisable = false;
                    $scope.coursedetails = true;
                    $scope.LoadImg = false;
                    $scope.ApplicationNumber = '';
                    // $scope.Course = 6;


                    $scope.StudentSscCertificate = false;


                    $scope.mode = null;
                    //$scope.sscHallticket = null;
                    //$scope.passedoutYear = null;
                    //$scope.sscType = null;


                    $scope.CandidateName = null;
                    $scope.FatherName = null;
                    $scope.MotherName = null;
                    $scope.CandidateNameDOB = null;
                    $scope.Gender = null;
                    $scope.Aadhar = null;
                    $scope.houseNo = null;
                    $scope.street = null;
                    $scope.landmark = null;
                    $scope.village = null;
                    $scope.pincode = null;
                    $scope.district = null
                    $scope.state = null;
                    $scope.mobileNO = null;
                    $scope.email = null;

                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }

        $scope.Modify = function () {

            $scope.loading = true;
            $scope.coursedetails = true;
            $scope.sscdetails = true;
            $scope.radiodisable = true;

            var editstddetails = CcicPreExaminationService.GetStudentDetails(tempData1.ApplicationNumber, tempData1.StudentId);
            editstddetails.then(function (response) {
                try {
                    var editRes = JSON.parse(response);
                }
                catch (err) { }
                $scope.coursedetails = true;
                $scope.SscForm = true;
                $scope.showEducation = true;
                $scope.applicationForm = true;
                $scope.loading = false;
                $scope.EditData = editRes[0];

                $scope.ApplicationNumber = tempData1.ApplicationNumber;
                $scope.CourseName = $scope.EditData.CourseName;
                $scope.CourseID = $scope.EditData.CourseID;
                //$scope.CourseID = CourseID;
                $scope.Qualification = $scope.EditData.Qualification;
                $scope.Experience = $scope.EditData.Experience;

                $scope.CourseQualificationID = $scope.EditData.CourseQualificationID;
                $scope.CourseExperienceID = $scope.EditData.CourseExperienceID;

                $scope.SSC = $scope.EditData.SSC;
                $scope.SSCValidated = $scope.EditData.SSCValidated;

                $scope.SSCHallticketNumber = $scope.EditData.SSCHallticketNumber;
                $scope.SSCPassedYear = $scope.EditData.SSCPassedYear;
                $scope.SSCPassedType = $scope.EditData.SSCPassedType;

                $scope.StudentName = $scope.EditData.StudentName;
                $scope.FatherName = $scope.EditData.FatherName;
                $scope.MotherName = $scope.EditData.MotherName;
                $scope.FatherName = $scope.EditData.FatherName;
                $scope.DateofBirth = $scope.EditData.DateofBirth;
                $scope.Gender = $scope.EditData.Gender;
                $scope.AadharNumber = $scope.EditData.AadharNumber;
                $scope.HouseNumber = $scope.EditData.HouseNumber;
                $scope.Street = $scope.EditData.Street;
                $scope.Landmark = $scope.EditData.Landmark;
                $scope.Village = $scope.EditData.Village;
                $scope.Pincode = $scope.EditData.Pincode;
                $scope.District = $scope.EditData.District;
                $scope.AddressState = $scope.EditData.AddressState;
                $scope.StudentMobile = $scope.EditData.StudentMobile;
                $scope.StudentEmail = $scope.EditData.StudentEmail;

                $scope.StudentPhoto = $scope.EditData.StudentPhoto;
                $scope.StudentSign = $scope.EditData.StudentSign;

                $scope.SSCCertificate = $scope.EditData.SSCCertificate;
                $scope.QualificationCertificate = $scope.EditData.QualificationCertificate;
                $scope.ExperienceCertificate = $scope.EditData.ExperienceCertificate;



                $scope.$emit('hideLoading', data);
            }, function (error) {

                var err = JSON.parse(error);
            });

        }



        $scope.Update = function () {

            if ($scope.StudentName == '' || $scope.StudentName == undefined || $scope.StudentName == null) {
                alert('Please Select CandidateName')
                return;
            }

            if ($scope.FatherName == '' || $scope.FatherName == undefined || $scope.FatherName == null) {
                alert('Please Select FatherName')
                return;
            }


            if ($scope.MotherName == '' || $scope.MotherName == undefined || $scope.MotherName == null) {
                alert('Please Select MotherName')
                return;
            }


            if ($scope.DateofBirth == '' || $scope.DateofBirth == undefined || $scope.DateofBirth == null) {
                alert('Please Select CandidateDOB')
                return;
            }

            if ($scope.Gender == '' || $scope.Gender == undefined || $scope.Gender == null) {
                alert('Please Select Gender')
                return;
            }

            if ($scope.HouseNumber == '' || $scope.HouseNumber == undefined || $scope.HouseNumber == null) {
                alert('Please Select houseNo')
                return;
            }

            if ($scope.Street == '' || $scope.Street == undefined || $scope.Street == null) {
                alert('Please Select street')
                return;
            }

            if ($scope.Village == '' || $scope.Village == undefined || $scope.Village == null) {
                alert('Please Select village')
                return;
            }

            if ($scope.StudentMobile == '' || $scope.StudentMobile == undefined || $scope.StudentMobile == null) {
                alert('Please Select Mobile Number')
                return;
            }



            //if ($scope.StudentPhoto == '' || $scope.StudentPhoto == undefined || $scope.StudentPhoto == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.StudentSign == '' || $scope.StudentSign == undefined || $scope.StudentSign == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.SSCCertificate == '' || $scope.SSCCertificate == undefined || $scope.SSCCertificate == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.StudentPhoto == '' || $scope.StudentPhoto == undefined || $scope.StudentPhoto == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.QualificationCertificate == '' || $scope.QualificationCertificate == undefined || $scope.QualificationCertificate == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.ExperienceCertificate == '' || $scope.ExperienceCertificate == undefined || $scope.ExperienceCertificate == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}


            $scope.LoadImg = true;



            //isSSC = $scope.mode == 1 ? 1 : 0;
            let sscHallticket = ($scope.SSCHallticketNumber == null || $scope.SSCHallticketNumber == undefined || $scope.SSCHallticketNumber == '') ? '' : $scope.SSCHallticketNumber;

            let passedoutYear = ($scope.SSCPassedYear == null || $scope.SSCPassedYear == undefined || $scope.SSCPassedYear == '') ? '' : parseInt($scope.SSCPassedYear);
            let sscType = ($scope.SSCPassedType == null || $scope.SSCPassedType == undefined || $scope.SSCPassedType == '') ? '' : $scope.SSCPassedType;

            let CourseExp = ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '') ? null : parseInt($scope.Experience);
            let SscCer = ($scope.SSCCertificate == null || $scope.SSCCertificate == undefined || $scope.SSCCertificate == '') ? '' : $scope.SSCCertificate;
            let StdCerType = ($scope.QualificationCertificate == null || $scope.QualificationCertificate == undefined || $scope.QualificationCertificate == '') ? '' : $scope.QualificationCertificate;
            let StdExpCer = ($scope.ExperienceCertificate == null || $scope.ExperienceCertificate == undefined || $scope.ExperienceCertificate == '') ? '' : $scope.ExperienceCertificate;
            let appNum = ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == '') ? '' : $scope.ApplicationNumber;
            let MName = ($scope.MotherName == null || $scope.MotherName == undefined || $scope.MotherName == '') ? '' : $scope.MotherName;
            var updatestddetails = CcicPreExaminationService.AddStudentDetails(appNum, authData.InstitutionID, parseInt($scope.CourseID), $scope.CourseQualificationID, CourseExp, $scope.SSC, sscHallticket, passedoutYear, sscType, $scope.StudentName, $scope.FatherName, MName, $scope.DateofBirth, '', $scope.Gender, parseInt($scope.AadharNumber), $scope.HouseNumber, $scope.Street, $scope.Landmark, $scope.Village, $scope.Pincode, $scope.District, $scope.AddressState, $scope.StudentMobile, $scope.StudentEmail, $scope.SSCValidated, $scope.UserName, $scope.StudentPhoto, $scope.StudentSign, SscCer, StdCerType, StdExpCer);
            updatestddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {

                    $scope.LoadImg = true;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.StudentId = res[0].StudentID;
                    $state.go('CcicDashboard.Academic.ViewStudentDetails')
                    //$scope.PreviewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                    alert(res[0].ResponseDescription);
                    $scope.ShowDetails = true;
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.LoadImg = false;
                    alert(res[0].ResponseDescription);
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

        $scope.PreviewStudentDetails = function () {
            var previewstddetails = CcicPreExaminationService.GetViewStudentDetails($scope.ApplicationNumber, $scope.StudentId);
            previewstddetails.then(function (response) {
                try {
                    var preRes = JSON.parse(response);

                }
                catch (err) { }
                $scope.LoadImg = false;
                $scope.ShowDetails = true;
                $scope.PreviewData = preRes[0];

            }, function (error) {
                $scope.LoadImg = false;
                var err = JSON.parse(error);
            });
        }
        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("StdPhoto");
            var fileSize = input.files[0].size;
            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#StudentPhoto').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.StudentPhoto = base64Image;
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
                        $('#StudentSign').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.StudentSign = base64Image;
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
                        $('#SSCCertificate').attr('src', e.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.SSCCertificate = base64Image;
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
                        $('#QualificationCertificate').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.QualificationCertificate = base64Image;
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
                        $('#ExperienceCertificate').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/jpg");
                            $scope.ExperienceCertificate = base64Image;
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