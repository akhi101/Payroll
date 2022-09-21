define(['app'], function (app) {
    app.service("AdmissionService", function (DataAccessService) {

        this.GetDataForAdmissionDashboard = function (UserId, CollegeId, AcademicYearId) {
            var paramObject = { "UserId": UserId, "CollegeId": CollegeId, "AcademicYearId":AcademicYearId };
            var promise = DataAccessService.getDataWithPara('Admission/GetDataForAdmissionDashboard', paramObject);
            return promise;
        }

       
       
        this.GetAcademicYearsActive = function (CollegeId) {
            var paramObject = { "CollegeId": CollegeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetAcademicYearsActive', paramObject);
            return promise;
        }
        

        this.GetAdminAdmissionReports = function (dataType) {
            var paramObject = { "dataType": dataType };
            var promise = DataAccessService.getDataWithPara('Admission/GetAdminAdmissionReports', paramObject);
            return promise;
        }

        this.GetAdmissionSubReports = function (dataType,Id) {
            var paramObject = { "dataType": dataType,"Id":Id };
            var promise = DataAccessService.getDataWithPara('Admission/GetAdminAdmissionSubReports', paramObject);
            return promise;
        }
        
      
         
        this.GetExamMonthYear = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetExamMonthYear');
            return promise;
        }

        this.GetAdmissionReports = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetAdmissionReports');
            return promise;
        }

        this.getSchemes = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSchemes');
            return promise;
        }

       
        this.getStudentCategory = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentCategory', paramObject);
            return promise;
        }

        this.getStudentCategory = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentCategory', paramObject);
            return promise;
        }
        
        this.getWantingReport = function (gentype, ExamMonthYearId, scheme) {
            var paramObject = { "gentype": gentype, "ExamMonthYearId": ExamMonthYearId, "scheme": scheme };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getWantingReport', paramObject);
            return promise;
        }
            
        this.getStudentCategoryPinList = function (DataFormatTypeId,CollegeCode,semid,branchid,schemeid,gender) {
          
            var paramObject = { "DataFormatTypeId": DataFormatTypeId, "CollegeCode": CollegeCode, "semid": semid, "branchid": branchid, "schemeid": schemeid ,'gender': gender};
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentCategoryPinList', paramObject);
            return promise;
        }
        this.getReleaseAadharByPin = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetReleaseAadharBypin', paramObject);
            return promise;
        }

        this.GetReleaseAttendeeIdBypin = function (pin) {
            var paramObject = { "pin": pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetReleaseAttendeeIdBypin', paramObject);
            return promise;
        }

        this.AdminSetDates = function (paramObject) {
            var promise = DataAccessService.postData('Admission/AdminSetDates', paramObject);
            return promise;
        }
        this.GetSchemes = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSchemes');
            return promise;
        }
        this.GetAcademicYears = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getAcademicYears');
            return promise;
        }

        this.GetAdmissionSetDates = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getAdmissionSetDates');
            return promise;
        }

        this.getAdminStudentCategory = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetAdminStudentCategory');
            return promise;
        }
        this.export = function () {
            var promise = DataAccessService.export('Admission/export');
            return promise;
        }
        this.StudentReadmissiondata = function (pinNumber) {          
            var paramObject = { "pinNumber": pinNumber };
            return DataAccessService.getDataWithPara('Admission/StudentReadmissiondata', paramObject);
        }

        this.GetAttendance = function (attandance, Admin) {
            var paramObject = { "attandance": attandance.toString(), "isAdmin": Admin };
            return DataAccessService.getDataWithPara('Academic/GetAttendance', paramObject);
        }
        

        this.GetReadmissionSetSate = function () {
            var promise = DataAccessService.getDataWithPara('Admission/GetReadmissionSetSate');
            return promise;
        }


        this.SaveReadmisssiondata = function (AcademicYearId, SemesterId, Formdate, Todate, FineAmount) {
            var paramObject = { "AcademicYearId": AcademicYearId, "SemesterId": SemesterId, "Formdate": Formdate, "Todate": Todate, "FineAmount": FineAmount };
            var promise = DataAccessService.postData('Admission/SaveReadmisssiondata', paramObject);
            return promise;
        }
    });
});