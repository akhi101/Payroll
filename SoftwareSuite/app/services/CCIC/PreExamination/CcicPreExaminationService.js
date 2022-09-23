define(['app'], function (app) {
    app.service("CcicPreExaminationService", function (DataAccessService) {

        this.GetBatches = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetBatches');
        };

        this.GetStudentType = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetStudentType');
        };

        this.GetCcicAcademicYears = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYears');
        };

        this.GetAffiliatedCourses = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAffiliatedCourses');
        };

        this.GetExaminationCenters = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetExaminationCenters');
        };


        this.GetAffiliatedInstitutions = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAffiliatedInstitutions');
        };

        this.GetStudentFeeDates = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetStudentFeeDates');
        };

        this.GetCcicAcademicYearCurrentBatch = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYearCurrentBatch', paramObj);
            return promise;
        };


        this.GetCcicAcademicYearBatches = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYearBatches', paramObj);
            return promise;
        };
        this.GetCurrentBatch = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCurrentBatch', paramObj);
            return promise;
        };

        this.AddExamMonthYear = function (AcademicYearID,Batch, ExamMonthYearName,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "Batch": Batch, "ExamMonthYearName": ExamMonthYearName, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddExamMonthYear', paramObj);
            return promise;
        };


        this.GetAYBatchExamMonthYear = function (AcademicYearID, Batch) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAYBatchExamMonthYear', paramObj);
            return promise;
        };


        this.GetHolidaysForTimeTable = function (StartDate, NofDates) {
            var paramObj = {
                "StartDate": StartDate, "NofDates": NofDates
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetHolidaysForTimeTable', paramObj);
            return promise;
        };

        this.GetInsEnrollmentReportCoursesCount = function (InstitutionID) {
            var paramObj = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInsEnrollmentReportCoursesCount', paramObj);
            return promise;
        };

        this.GetInsRegisterReportCoursesCount = function (InstitutionID,AcademicYearID,Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInsRegisterReportCoursesCount', paramObj);
            return promise;
        };

        this.GetInstitutionVerificationReportCount = function (InstitutionID) {
            var paramObj = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetInstitutionVerificationReportCount', paramObj);
            return promise;
        };

        this.GetAdminExamCentersList = function (AcademicYearID, CourseIds, ExamMonthYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseIds": CourseIds, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetAdminExamCentersList', paramObj);
            return promise;
        };

        this.SetAdminExamCentersList = function (Json,ExamMonthYearID) {
            var paramObj = {
                "Json": Json, "ExamMonthYearID": ExamMonthYearID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SetAdminExamCentersList', paramObj);
            return promise;
        };

        this.GetAdminEnrollmentReportInsCount = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminEnrollmentReportInsCount');
        };

        this.GetAdminVerificationReportCount = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminVerificationReportCount');
        };

        this.GetAdminRegisterReportCount = function (AcademicYearID, Batch) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterReportCount', paramObj);
            return promise;
        };



        this.GetAdminRegisterCoursesCount = function (InstitutionID,AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID,"AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterCoursesCount', paramObj);
            return promise;
        };

        this.GetRegisterCoursesCount = function (InstitutionID, AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetRegisterCoursesCount', paramObj);
            return promise;
        };

        this.GetAdminRegisterReportData = function (InstitutionID, CourseID, ReportTypeID,AcademicYearID, Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID, "AcademicYearID": AcademicYearID, Batch: Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetAdminRegisterReportData', paramObj);
            return promise;
        };

        this.GetExamMonthYears = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetExamMonthYears', paramObj);
            return promise;
        };



        this.GetInstitutionEnrollmentReportData = function (InstitutionID, CourseID, ReportTypeID) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionEnrollmentReportData', paramObj);
            return promise;
        };

        this.GetInstitutionRegisterReportData = function (InstitutionID, CourseID, ReportTypeID, AcademicYearID,Batch) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID, "AcademicYearID": AcademicYearID, "Batch": Batch
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionRegisterReportData', paramObj);
            return promise;
        };

        this.GetInstitutionVerificationReportData = function (InstitutionID, CourseID, ReportTypeID) {
            var paramObj = {
                "InstitutionID": InstitutionID, "CourseID": CourseID, "ReportTypeID": ReportTypeID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetInstitutionVerificationReportData', paramObj);
            return promise;
        };

        //this.getSSCDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAM) {
        //    var paramObj = {
        //        "TENTH_HT_NO": TENTH_HT_NO, "TENTH_YEAR": TENTH_YEAR, "STREAM": STREAM
        //    };
        //    var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetSSCDetails', paramObj);
        //    return promise;
        //};

        //this.GetSSCDetails = function (RollNo, Year, Stream) {
        //    var param = { "RollNo": RollNo, "Year": Year, "Stream": Stream }
        //    return DataAccessService.postData('api/TwshStudentReg/GetSSCDetails', param);
        //};

        this.getSSCDetails = function (object) {
            var promise = DataAccessService.postData('api/CcicPreExamination/GetSSCDetails', object);
            return promise;
        };

        this.GetEnrollementDates = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetEnrollementDates', paramObj);
            return promise;
        };


        this.VerifyEnrollmentDate = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/VerifyEnrollmentDate');
        };

      
      
      

        this.GetCcicCurrentAcademicYear = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCurrentAcademicYear');
        };

       


        this.GetCcicCourseDurationBatches = function (CourseDuration) {
            var paramObj = {
                "CourseDuration": CourseDuration
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurationBatches', paramObj);
            return promise;
        };

        this.GetCcicCourseDurations = function (Batch) {
            var paramObj = {
                "Batch": Batch
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurations', paramObj);
            return promise;
        };

        this.GetCcicCoursesByInstitution = function (InstitutionID) {
            var paramObject = {
                "InstitutionID": InstitutionID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCoursesByInstitution', paramObject);
            return promise;
        };

        this.GetCcicCourseQualifications = function (CourseID) {
            var paramObject = {
                "CourseID": CourseID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseQualifications', paramObject);
            return promise;
        };

        this.GetCcicCourseExperience = function (CourseQualificationsID) {
            var paramObject = {
                "CourseQualificationsID": CourseQualificationsID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseExperience', paramObject);
            return promise;
        };

        //this.AddStudentDetails = function (ApplicationNumber, InstitutionID, CourseID, CourseQualificationID, CourseExperienceID, SSC, SSCHallticketNumber, SSCPassedYear, SSCPassedType, StudentName, FatherName, MotherName, DateofBirth, SSCDateofBirth, Gender, AadharNumber, HouseNumber, Street, Landmark, Village, Pincode, District, AddressState, StudentMobile, StudentEmail,SSCValidated,UserName,StudentPhoto,StudentSign,SSCCertificate,QualificationCertificate, ExperienceCertificate) {
        //    var paramObj = {
        //        "ApplicationNumber": ApplicationNumber, "InstitutionID": InstitutionID, "CourseID": CourseID, "CourseQualificationID": CourseQualificationID, "CourseExperienceID": CourseExperienceID, "SSC": SSC, "SSCHallticketNumber": SSCHallticketNumber, "SSCPassedYear": SSCPassedYear, "SSCPassedType": SSCPassedType, "StudentName": StudentName, "FatherName": FatherName, "MotherName": MotherName, "DateofBirth": DateofBirth, "SSCDateofBirth": SSCDateofBirth, "Gender": Gender, "AadharNumber": AadharNumber, "HouseNumber": HouseNumber, "Street": Street, "Landmark": Landmark, "Village": Village, "Pincode": Pincode, "District": District, "AddressState": AddressState, "StudentMobile": StudentMobile, "StudentEmail": StudentEmail, "SSCValidated": SSCValidated, "UserName": UserName, "StudentPhoto": StudentPhoto, "StudentSign": StudentSign, "SSCCertificate": SSCCertificate, "QualificationCertificate": QualificationCertificate, "ExperienceCertificate": ExperienceCertificate
        //    };
        //    var promise = DataAccessService.postData('api/CcicPreExamination/AddStudentDetails', paramObj);
        //    return promise;
        //}

        this.AddStudentDetails = function (paramObject) {
            console.log(paramObject)
            return DataAccessService.postData('api/CcicPreExamination/AddStudentDetails', paramObject);
        };

        this.UpdateStudentDetails = function (paramObject) {
            console.log(paramObject)
            return DataAccessService.postData('api/CcicPreExamination/UpdateStudentDetails', paramObject);
        };

        this.GetViewStudentDetails = function (ApplicationNumber, StudentID ) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "StudentID": StudentID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetViewStudentDetails', paramObj);
            return promise;
        }

        this.GetStudentDetails = function (ApplicationNumber, StudentID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "StudentID": StudentID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/GetStudentDetails', paramObj);
            return promise;
        }

        this.SubmitStdDetails = function (ApplicationNumber, StudentID) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "StudentID": StudentID
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/SubmitStdDetails', paramObj);
            return promise;
        }

        this.AddAcademicYear = function (AcademicStartYear, AcademicYear, AcademicYearStartDate, AcademicYearEndDate,CurrentAcademicYear,UserName) {
            var paramObj = {
                "AcademicStartYear": AcademicStartYear, "AcademicYear": AcademicYear, "AcademicYearStartDate": AcademicYearStartDate, "AcademicYearEndDate": AcademicYearEndDate, "CurrentAcademicYear": CurrentAcademicYear,"UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAcademicYear', paramObj);
            return promise;
        }


        this.UpdateAcademicYear = function (AcademicYearID, AcademicYearStartDate, AcademicYearEndDate, CurrentAcademicYear, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "AcademicYearStartDate": AcademicYearStartDate, "AcademicYearEndDate": AcademicYearEndDate, "CurrentAcademicYear": CurrentAcademicYear, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAcademicYear', paramObj);
            return promise;
        }


        this.AddAcademicYearCurrentBatch = function (AcademicYearID,Batch,CurrentBatch ,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "Batch": Batch, "CurrentBatch": CurrentBatch  ,"UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAcademicYearCurrentBatch', paramObj);
            return promise;
        }

        this.AddAYCourseDurationBatches = function (AcademicYearID, CourseDuration, Batch, AYBatchStartDate, AYBatchEndDate ,UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAYCourseDurationBatches', paramObj);
            return promise;
        }
        this.AddEnrollementDates = function (AcademicYearID, CourseDuration, Batch, EnrollementStartDate, EnrollementEndDate, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddEnrollementDates', paramObj);
            return promise;
        }

        this.SetAYCourseDurationBatchStatus = function (UpdateType, UserName, AcademicYearBatchID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetAYCourseDurationBatchStatus', paramObj);
            return promise;
        }

        this.SetEnrollementDatesStatus = function (UpdateType, UserName, EnrollementDatesID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetEnrollementDatesStatus', paramObj);
            return promise;
        }



        this.SetExamMonthYearStatus = function (UpdateType, UserName, ExamMonthYearID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "ExamMonthYearID": ExamMonthYearID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetExamMonthYearStatus', paramObj);
            return promise;
        }

        this.UpdateAcademicYearCurrentBatch = function (AcademicYearCurrentBatchID, CurrentBatch,UserName) {
            var paramObj = {
                "AcademicYearCurrentBatchID": AcademicYearCurrentBatchID, "CurrentBatch": CurrentBatch, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAcademicYearCurrentBatch', paramObj);
            return promise;
        }

        this.UpdateEnrollementDates = function (UpdateType, UserName, EnrollementDatesID, Active, EnrollementStartDate, EnrollementEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateEnrollementDates', paramObj);
            return promise;
        }

        this.UpdateAYCourseDurationBatchDates = function (UpdateType, UserName, AcademicYearBatchID, Active, AYBatchStartDate, AYBatchEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAYCourseDurationBatchDates', paramObj);
            return promise;
        }



        this.UpdateExamMonthYear = function (UserName, ExamMonthYearID, ExamMonthYearName, ExamMonthYearSequence) {
            var paramObj = {
                "UserName": UserName, "ExamMonthYearID": ExamMonthYearID, "ExamMonthYearName": ExamMonthYearName, "ExamMonthYearSequence": ExamMonthYearSequence
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateExamMonthYear', paramObj);
            return promise;
        }

        this.PostFeePaymentDates = function (AcademicYearId, ExamMonthYearId, CourseId ,StudentType, StartDate, EndDate, LateFeeDate, TatkalDate, PremiumTatkalDate, Fee, LateFee, TatkalFee, PremiumTatkalFee, CertificateFee) {

            var paramObject = {
                "AcademicYearId": AcademicYearId, "ExamMonthYearId": ExamMonthYearId, "CourseId": CourseId,
                "StudentType": StudentType, "StartDate": StartDate, "EndDate": EndDate, "LateFeeDate": LateFeeDate, "TatkalDate": TatkalDate, "PremiumTatkalDate": PremiumTatkalDate, "Fee": Fee, "LateFee": LateFee,"TatkalFee": TatkalFee, "PremiumTatkalFee": PremiumTatkalFee, "CertificateFee": CertificateFee
          
            };

            var promise = DataAccessService.postData('api/CcicPreExamination/SetStudentFeePayments', paramObject);
            return promise;
        };
    });
});