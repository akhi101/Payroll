define(['app'], function (app) {
    app.controller("CcicEnrollmentController", function ($scope, $localStorage, $state,  CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
       


        const $ctrl = this;
        $ctrl.$onInit = () => {
            
            $scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            
            $scope.GetCcicCourseExperienceInfo = [];
         
            $scope.Submitted = false;
            $scope.showEducation = false;
            $scope.SscForm = false;
            $scope.coursedetail = false;
            var isSSCValidiated = false;
                 
            $scope.StudentSscCertificate = false;
        }


       
        $scope.submitmode = function () {

            if ($scope.mode == 1) {
                $scope.SscForm = true;
                $scope.applicationForm = false;
                $scope.Submitted = false;
                
                
            }
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
            console.log(CourseQualificationID);
           

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
            $scope.ExpDescription = '';
           

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
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            
        }


  $scope.Submit = function () {
           
            if ($scope.Course == '' || $scope.Course == undefined || $scope.Course == null) {
                alert('Please Select Course')
                return;
            }

            if ($scope.Qualification == '' || $scope.Qualification == undefined || $scope.Qualification == null ) {
                alert('Please Select Qualification')
                 return;
      }
   

     
            $scope.Submitted = true;
            $scope.showEducation = true;

        }      

        $scope.SaveNext = function () {

            if ($scope.CNAME == '' || $scope.CNAME == undefined || $scope.CNAME == null) {
                alert('Please Select CandidateName')
                return;
            }

            if ($scope.FNAME == '' || $scope.FNAME == undefined || $scope.FNAME == null) {
                alert('Please Select FatherName')
                return;
            }

            //if ($scope.MNAME == '' || $scope.MNAME == undefined || $scope.MNAME == null) {
            //    alert('Please Select MotherName')
            //    return;
            //}

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

            //if ($scope.stdSignature == '' || $scope.stdSignature == undefined || $scope.stdSignature == null) {
            //    alert('Please Select StudentSignature')
            //    return;
            //}

            console.log($scope.stdPhoto);
            var isSSC = $scope.mode == 1 ? 1 : 0

            var addstddetails = CcicPreExaminationService.AddStudentDetails('', authData.InstitutionID, parseInt($scope.Course), $scope.CourseQualifications[0].CourseQualificationsID, $scope.CourseExperience[0].CourseExperienceID, isSSC, $scope.TENTH_HT_NO, parseInt($scope.TENTH_YEAR), $scope.STREAM, $scope.CNAME, $scope.FNAME, '', $scope.DOB_DATE, '', $scope.SEX, parseInt($scope.Aadhar), $scope.houseNo, $scope.street, $scope.landmark, $scope.village, $scope.pincode, $scope.district, $scope.state, $scope.mobileNO, $scope.email, isSSCValidiated, $scope.UserName, $scope.stdPhoto, $scope.stdSignature, $scope.stdSscCertificate, $scope.stdCertificateType, $scope.stdExperienceCertificate);
            addstddetails.then(function (response) {


                    if (res.ResponseCode == '200') {
                        alert('Details Added Succesfully')

                    } else if (res.ResponseCode == '200') {
                        alert('Details not correct')
                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })
            }

           



        $scope.ShowApplication = function () {

            if ($scope.mode==2) {
                $scope.SscForm = false;
                $scope.applicationForm = true;

          
            }
        }

        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("StdPhoto");
            var fileSize = input.files[0].size;
            console.log(fileSize);
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
                            var base64Image = canvas.toDataURL("image/jpg");
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

        $scope.uploadStudentSignature = function () {
            var input = document.getElementById("StdSignature");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 30000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#StdSignature').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/jpg");
                            $scope.stdSignature = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 30kb. ");
                return;
            }
        }

        $scope.uploadStudentSscCertificate = function () {
            var input = document.getElementById("StdSscCertificate");
            var fileSize = input.files[0].size;
            console.log(fileSize);
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
                            var base64Image = canvas.toDataURL("image/jpg");
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
            console.log(fileSize);
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
                            var base64Image = canvas.toDataURL("image/jpg");
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
            console.log(fileSize);
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

        $scope.getsscDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAM) {
            if (TENTH_HT_NO == '' || TENTH_HT_NO == null) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (TENTH_YEAR == '' || TENTH_YEAR == null) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            $scope.Submitted = true;

         
            var sscdetails = CcicPreExaminationService.getSSCDetails(TENTH_HT_NO, TENTH_YEAR, STREAM);
            sscdetails.then(function (res) {
                if (res) {

                    let resdata = JSON.parse(res)
                    if (resdata.length>0) {
                        $scope.applicationForm = true;
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
                        
                        $scope.sscForm = false;

                    } else {
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;
                       
                    }
                } else {
                    alert("Details not found, Continue to fillApplication");
                    $scope.applicationForm = true;
                    $scope.sscForm = false;
                    isSSCValidiated = false;
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