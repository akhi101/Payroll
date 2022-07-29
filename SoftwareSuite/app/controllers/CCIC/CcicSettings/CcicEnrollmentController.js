define(['app'], function (app) {
    app.controller("CcicEnrollmentController", function ($scope, $localStorage, $state,  CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
       


        const $ctrl = this;
        $ctrl.$onInit = () => {
          
            
            $scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            
            $scope.GetCcicCourseExperienceInfo = [];
         
            $scope.Submitted1 = false;
            $scope.Submitted2 = false;
            $scope.Submitted3 = false;
            //$scope.Save = false;
            //$scope.Update = false;

            $scope.showEducation = false;
            $scope.SscForm = false;
            $scope.coursedetail = false;
            isSSCValidiated = false;
            $scope.ShowDetails = false;
            $scope.radiodisable = false;
            $scope.coursedetails = true;
            $scope.LoadImg = false;
            $scope.ApplicationNumber = '';
           // $scope.Course = 6;
           
                 
            $scope.StudentSscCertificate = false;


            $scope.mode = '';
            $scope.Tenth_HNo = '';
            $scope.Tenth_Year = '';
            $scope.Stream = '';


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
        }

       
       
        $scope.Mode = function () {

            if ($scope.mode == 1) {
                $scope.sscHtLbl = 'SSC Hallticket Number';
                $scope.passYrLbl = 'Passedout Year';
                $scope.sscHtPhl = 'Hallticket No';
                $scope.sscGetLbl = 'Get Details';

            } else {
                $scope.sscHtLbl = ' SSC or Equivalent RollNo';
                $scope.passYrLbl = 'Pass Year';              
                $scope.sscHtPhl = 'SSC/Equivalent HallTicket no';
                $scope.sscGetLbl = 'Next';
            }


            $scope.SscForm = true;            
            $scope.applicationForm = false;

            $scope.Tenth_HNo = '';
            $scope.Tenth_Year = '';
            $scope.Stream = '';
          
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




    
       

        $scope.Cancel1 = function () {
            $scope.Course = null;
            $scope.Qualification = null;
            $scope.Experience = null;
            $scope.ExperienceDescription = '';
            $scope.GetCcicCourseExperienceInfo = [];


           
            $scope.mode = '';
            $scope.Tenth_HNo = '';
            $scope.Tenth_Year = '';
            $scope.Stream = '';


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

            $scope.Submitted1 = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;

       
            
        }

        $scope.Cancel2 = function () {


            $scope.radiodisable = false;

            $scope.mode = '';
            $scope.Tenth_HNo = '';
            $scope.Tenth_Year = '';
            $scope.Stream = '';


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

            $scope.SscForm = true;           
            $scope.applicationForm = false;
            $scope.Submitted1 = true;
            $scope.Submitted2 = false;
            
           




        }

        $scope.Cancel3 = function () {

            $scope.radiodisable = false;
            $scope.mode = '';

            $scope.SscForm = true;
           
            $scope.applicationForm = false;
            


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


            $scope.Submitted3 = false;
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

      if ($scope.GetCcicCourseExperienceInfo.length > 0 && ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience=='' )) {
          alert('Please Select Experience')
          return;
      }
   

     
            $scope.Submitted1 = true;
            $scope.showEducation = true;

        }

       

        $scope.PreviewStudentDetails = function (AppNo, StdId) {
            var previewstddetails = CcicPreExaminationService.GetViewStudentDetails(AppNo, StdId);
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


        //$scope.UpdateStdDetails = function () {
        //    var previewstddetails = CcicPreExaminationService.GetViewStudentDetails($scope.ApplicationNumber, $scope.StudentId);
        //    previewstddetails.then(function (response) {
        //        try {
        //            var updatedRes = JSON.parse(response);

        //        }
        //        catch (err) { }
        //        $scope.LoadImg = true;
         
        //        $scope.showEducation = false;
        //        $scope.applicationForm = false;
        //        $scope.SscForm = false;
        //        $scope.Submitted1 = true;
        //        $scope.coursedetails = false;
            
      
              
        //        $scope.UpdatedData = updatedRes[0];
        //        $scope.LoadImg = false;
        //        $scope.ShowDetails = true;
                

                

            

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
                    $state.go('CcicDashboard.Academic.Enrollment');
                    $scope.ShowDetails = false;
                    $scope.Course = null;
                    $scope.Qualification = null;
                    $scope.Experience = null;
                    $scope.ExperienceDescription = '';
                    $scope.GetCcicCourseExperienceInfo = [];
                    $scope.coursedetails = true;
                  
   
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
            var editstddetails = CcicPreExaminationService.GetStudentDetails($scope.ApplicationNumber, $scope.StudentId);
            editstddetails.then(function (response) {
                try {
                    var editRes = JSON.parse(response);
                }
                catch (err) { }
                $scope.LoadImg = true;
                $scope.ShowDetails = false;
           /*     $scope.Save = false;*/
              
              


                $scope.EditData = editRes[0];
                $scope.LoadImg = false;
                $scope.coursedetails = true;
                $scope.showEducation = true;
                $scope.applicationForm = true;
               /* $scope.Update = true;*/

            }, function (error) {
               
                var err = JSON.parse(error);
            });

            $scope.ShowDetails = false;
            $scope.coursedetails = true;
            $scope.Submitted1 = true;
            $scope.showEducation = true;
            $scope.Submitted2 = true;
            $scope.Submitted3 = true;
            $scope.applicationForm = true;
            $scope.SscForm = true;

         
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
            $scope.Submitted1 = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;
            $scope.ShowDetails = false;
            


            let TenthH_no = ($scope.Tenth_HNo == null || $scope.Tenth_HNo == undefined || $scope.Tenth_HNo == '') ? '' : $scope.Tenth_HNo;

            let TenthYr = ($scope.Tenth_Year == null || $scope.Tenth_Year == undefined || $scope.Tenth_Year == '') ? '' : parseInt($scope.Tenth_Year);
            let TenthStm = ($scope.Stream == null || $scope.Stream == undefined || $scope.Stream == '') ? '' : $scope.Stream;

            let CourseExp = ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '') ? null : parseInt($scope.Experience);
            let SscCer = ($scope.stdSscCertificate == null || $scope.stdSscCertificate == undefined || $scope.stdSscCertificate == '') ? '' : $scope.stdSscCertificate;
            let StdCerType = ($scope.stdCertificateType == null || $scope.stdCertificateType == undefined || $scope.stdCertificateType == '') ? '' : $scope.stdCertificateType;            
            let StdExpCer = ($scope.stdExperienceCertificate == null || $scope.stdExperienceCertificate == undefined || $scope.stdExperienceCertificate == '') ? '' : $scope.stdExperienceCertificate;
            let appNum = ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == '') ? '' : $scope.ApplicationNumber;
            let MName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
            var addstddetails = CcicPreExaminationService.AddStudentDetails(appNum, authData.InstitutionID, parseInt($scope.Course), $scope.CourseQualifications[0].CourseQualificationsID, CourseExp, isSSC, TenthH_no, TenthYr, TenthStm, $scope.CNAME, $scope.FNAME, MName, $scope.DOB_DATE, '', $scope.SEX, parseInt($scope.Aadhar), $scope.houseNo, $scope.street, $scope.landmark, $scope.village, $scope.pincode, $scope.district, $scope.state, $scope.mobileNO, $scope.email, isSSCValidiated, $scope.UserName, $scope.stdPhoto, $scope.stdSign, SscCer, StdCerType, StdExpCer);
            addstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                   
                    $scope.LoadImg = true;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.StudentId = res[0].StudentID;
                    $scope.PreviewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                    alert(res[0].ResponseDescription);
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

              

            },function (error) {

                        var err = JSON.parse(error);
                })
           
            $scope.Submitted1 = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;

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

        $scope.getsscDetails = function (Tenth_HNo, Tenth_Year, Stream) {
            if (Tenth_HNo == '' || Tenth_HNo == null || Tenth_HNo == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (Tenth_Year == '' || Tenth_Year == null || Tenth_Year == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (Stream == '' || Stream == null || Stream == undefined) {
                alert("Stream can't be Empty");
                return;
            }

            $scope.Submitted2 = true;
            $scope.Save = true;
            $scope.radiodisable = true;

            $scope.Tenth_HNo = Tenth_HNo;
            $scope.Tenth_Year = Tenth_Year;
            $scope.Stream = Stream;

          
            var sscdetails = CcicPreExaminationService.getSSCDetails(Tenth_HNo, Tenth_Year, Stream);
            sscdetails.then(function (res) {
                if (res) {

                    let resdata = JSON.parse(res)
                    if (resdata.length>0) {
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

                        $scope.sscForm = false;

                    } else {
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;

                    }

                }else {
                        alert("Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;

                    }
                

            }, function (err) {
                alert("Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.sscForm = false;
                isSSCValidiated = false;
            })


        }
        

    })
})