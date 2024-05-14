define(['app'], function (app) {
    app.service("PayRollService", function (DataAccessService) {


        this.GetDesignationTypes = function () {
            return DataAccessService.getDataWithPara('api/PayRoll/GetDesignationTypes');
        };

        this.AddDesignations = function (DataTypeId, DesignationId, DesignationName, DesignationTypeId, DesignationOrder, NoOfPost, GONumber, NoOfVacants, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DesignationId": DesignationId,
                "DesignationName": DesignationName,
                "DesignationTypeId": DesignationTypeId,
                "DesignationOrder": DesignationOrder,
                "NoOfPost": NoOfPost,
                "GONumber": GONumber,
                "NoOfVacants": NoOfVacants,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateDesignations', paramObject);
            return promise;
        };


        this.UpdateDesignations = function (DataTypeId, DesignationId, DesignationName, DesignationTypeId, DesignationOrder, NoOfPost, GONumber, NoOfVacants, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DesignationId": DesignationId,
                "DesignationName": DesignationName,
                "DesignationTypeId": DesignationTypeId,
                "DesignationOrder": DesignationOrder,
                "NoOfPost": NoOfPost,
                "GONumber": GONumber,
                "NoOfVacants": NoOfVacants,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateDesignations', paramObject);
            return promise;
        };

        this.GetDesignationData = function (DataTypeID, DesignationId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "DesignationId": DesignationId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDesignationData', paramObj);
            return promise;

        };

        this.PayRollStatus = function (DataTypeID, DesignationId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "DesignationId": DesignationId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDesignationData', paramObj);
            return promise;

        };







        this.AddDepartments = function (DataTypeId, DepartmentId, DepartmentName, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DepartmentId": DepartmentId,
                "DepartmentName": DepartmentName,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateDepartments', paramObject);
            return promise;
        };


        this.UpdateDepartments = function (DataTypeId, DepartmentId, DepartmentName, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DepartmentId": DepartmentId,
                "DepartmentName": DepartmentName,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateDepartments', paramObject);
            return promise;
        };

        this.GetDepartmentData = function (DataTypeID, DepartmentId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "DepartmentId": DepartmentId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDepartmentsData', paramObj);
            return promise;

        };

        this.ChangeDepartmentStatus = function (DataTypeID, DepartmentId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "DepartmentId": DepartmentId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDepartmentsData', paramObj);
            return promise;

        };










        this.AddBankDetails = function (DataTypeId, BankId, BankName, BankBranch, IFSCCode, Address1, Address2, Address3, PinCode, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "BankId": BankId,
                "BankName": BankName,
                "BankBranch": BankBranch,
                "IFSCCode": IFSCCode,
                "Address1": Address1,
                "Address2": Address2,
                "Address3": Address3,
                "PinCode": PinCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateBankDetails', paramObject);
            return promise;
        };


        this.UpdateBankDetails = function (DataTypeId, BankId, BankName, BankBranch, IFSCCode, Address1, Address2, Address3, PinCode, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "BankId": BankId,
                "BankName": BankName,
                "BankBranch": BankBranch,
                "IFSCCode": IFSCCode,
                "Address1": Address1,
                "Address2": Address2,
                "Address3": Address3,
                "PinCode": PinCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateBankDetails', paramObject);
            return promise;
        };

        this.GetBankDetailsData = function (DataTypeID, BankId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "BankId": BankId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditBankDetailsData', paramObj);
            return promise;

        };

        this.BankDetailStatus = function (DataTypeID, BankId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "BankId": BankId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditBankDetailsData', paramObj);
            return promise;

        };





        this.AddEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, PHC, Empstatus, IncrementMonth, ScaleType, PanNO, GPFNo, CPS_NPS, CPSNo, BankId, AccountNumber, CategoryCode, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeID": EmployeeID,
                "EmployeeCode": EmployeeCode,
                "EmployeeName": EmployeeName,
                "DOB": DOB,
                "DOJ": DOJ,
                "DOR": DOR,
                "DesignationId": DesignationId,
                "DepartmentId": DepartmentId,
                "Gender": Gender,
                "PHC": PHC,
                "Empstatus": Empstatus,
                "IncrementMonth": IncrementMonth,
                "ScaleType": ScaleType,
                "PanNO": PanNO,
                "GPFNo": GPFNo,
                "CPS_NPS": CPS_NPS,
                "CPSNo": CPSNo,
                "BankId": BankId,
                "AccountNumber": AccountNumber,
                "CategoryCode": CategoryCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };


        this.UpdateEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, PHC, Empstatus, IncrementMonth, ScaleType, PanNO, GPFNo, CPS_NPS, CPSNo, BankId, AccountNumber, CategoryCode, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeID": EmployeeID,
                "EmployeeCode": EmployeeCode,
                "EmployeeName": EmployeeName,
                "DOB": DOB,
                "DOJ": DOJ,
                "DOR": DOR,
                "DesignationId": DesignationId,
                "DepartmentId": DepartmentId,
                "Gender": Gender,
                "PHC": PHC,
                "Empstatus": Empstatus,
                "IncrementMonth": IncrementMonth,
                "ScaleType": ScaleType,
                "PanNO": PanNO,
                "GPFNo": GPFNo,
                "CPS_NPS": CPS_NPS,
                "CPSNo": CPSNo,
                "BankId": BankId,
                "AccountNumber": AccountNumber,
                "CategoryCode": CategoryCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };

        this.GetEmployeeDetailsData = function (DataTypeID, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditEmployeeDetailsData', paramObj);
            return promise;

        };

        this.EmployeeDetailStatus = function (DataTypeID, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditEmployeeDetailsData', paramObj);
            return promise;

        };

        this.GetBankBranchbyName = function (BankName) {
            var paramObj = {
                "BankName": BankName
            };
            var promise = DataAccessService.postData('api/PayRoll/GetBankBranchbyName', paramObj);
            return promise;

        };

        this.GetBranchIFSC = function (BankName,BankBranch) {
            var paramObj = {
                "BankName": BankName,
                "BankBranch": BankBranch
            };
            var promise = DataAccessService.postData('api/PayRoll/GetBranchIFSC', paramObj);
            return promise;

        };

    });
});