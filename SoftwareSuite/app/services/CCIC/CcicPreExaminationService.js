define(['app'], function (app) {
    app.service("CcicPreExaminationService", function (DataAccessService) {

        this.GetCcicAcademicYears = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYears');
        };

        this.GetCcicAcademicYearBatch = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicAcademicYearBatch', paramObj);
            return promise;
        };


        //this.getSSCDetails = function (object) {
        //    //var promise = DataAccessService.postData('api/CcicPreExamination/GetSSCDetails', object);
        //    var promise = DataAccessService.postDataCustomUrl('https://www.sbtet.telangana.gov.in/API/api/TwshStudentReg/GetSSCDetails', object);
        //    return promise;
        //};

        this.getSSCDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAM) {
            var paramObj = {
                "TENTH_HT_NO": TENTH_HT_NO, "TENTH_YEAR": TENTH_YEAR, "STREAM": STREAM
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetSSCDetails', paramObj);
            return promise;
        };

        this.GetEnrollmentDates = function (AcademicYearID) {
            var paramObj = {
                "AcademicYearID": AcademicYearID
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetEnrollmentDates', paramObj);
            return promise;
        };

        this.VerifyEnrollmentDate = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/VerifyEnrollmentDate');
        };

      

        this.GetCcicCurrentAcademicYear = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCurrentAcademicYear');
        };

        this.GetCcicCourseDurations = function () {
            return DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurations');
        };



        this.GetCcicCourseDurationBatches = function (CourseDuration) {
            var paramObj = {
                "CourseDuration": CourseDuration
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/GetCcicCourseDurationBatches', paramObj);
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

        this.AddStudentDetails = function (ApplicationNumber, InstitutionID, CourseID, CourseQualificationID, CourseExperienceID, SSC, SSCHallticketNumber, SSCPassedYear, SSCPassedType, StudentName, FatherName, MotherName, DateofBirth, SSCDateofBirth, Gender, AadharNumber, HouseNumber, Street, Landmark, Village, Pincode, District, AddressState, StudentMobile, StudentEmail,SSCValidated,UserName,StudentPhoto,StudentSign,SSCCertificate,QualificationCertificate, ExperienceCertificate) {
            var paramObj = {
                "ApplicationNumber": ApplicationNumber, "InstitutionID": InstitutionID, "CourseID": CourseID, "CourseQualificationID": CourseQualificationID, "CourseExperienceID": CourseExperienceID, "SSC": SSC, "SSCHallticketNumber": SSCHallticketNumber, "SSCPassedYear": SSCPassedYear, "SSCPassedType": SSCPassedType, "StudentName": StudentName, "FatherName": FatherName, "MotherName": MotherName, "DateofBirth": DateofBirth, "SSCDateofBirth": SSCDateofBirth, "Gender": Gender, "AadharNumber": AadharNumber, "HouseNumber": HouseNumber, "Street": Street, "Landmark": Landmark, "Village": Village, "Pincode": Pincode, "District": District, "AddressState": AddressState, "StudentMobile": StudentMobile, "StudentEmail": StudentEmail, "SSCValidated": SSCValidated, "UserName": UserName, "StudentPhoto": StudentPhoto, "StudentSign": StudentSign, "SSCCertificate": SSCCertificate, "QualificationCertificate": QualificationCertificate, "ExperienceCertificate": ExperienceCertificate
            };
            var promise = DataAccessService.postData('api/CcicPreExamination/AddStudentDetails', paramObj);
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


        this.AddAcademicYearBatch = function (AcademicYearID, CourseDuration, Batch, AYBatchStartDate, AYBatchEndDate, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddAcademicYearBatch', paramObj);
            return promise;
        }

        this.AddEnrollmentDates = function (AcademicYearID, CourseDuration, Batch, EnrollementStartDate, EnrollementEndDate, UserName) {
            var paramObj = {
                "AcademicYearID": AcademicYearID, "CourseDuration": CourseDuration, "Batch": Batch, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/AddEnrollmentDates', paramObj);
            return promise;
        }

        this.SetAcademicYearBatchStatus = function (UpdateType, UserName, AcademicYearBatchID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetAcademicYearBatchStatus', paramObj);
            return promise;
        }

        this.SetEnrollmentDatesStatus = function (UpdateType, UserName, EnrollementDatesID, Active) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/SetEnrollmentDatesStatus', paramObj);
            return promise;
        }

        this.UpdateAcademicYearBatch = function (UpdateType, UserName, AcademicYearBatchID, Active, AYBatchStartDate, AYBatchEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "AcademicYearBatchID": AcademicYearBatchID, "Active": Active, "AYBatchStartDate": AYBatchStartDate, "AYBatchEndDate": AYBatchEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateAcademicYearBatch', paramObj);
            return promise;
        }

        this.UpdateEnrollmentDates = function (UpdateType, UserName, EnrollementDatesID, Active, EnrollementStartDate, EnrollementEndDate) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "EnrollementDatesID": EnrollementDatesID, "Active": Active, "EnrollementStartDate": EnrollementStartDate, "EnrollementEndDate": EnrollementEndDate
            };
            var promise = DataAccessService.getDataWithPara('api/CcicPreExamination/UpdateEnrollmentDates', paramObj);
            return promise;
        }

    });
});