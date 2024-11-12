define(['app'], function (app) {
    app.service("PayRollService", function (DataAccessService) {


        this.GetDesignationTypes = function () {
            return DataAccessService.getDataWithPara('api/PayRoll/GetDesignationTypes');
        };

        this.GetMonths = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetMonths');
        };

        this.GetAdvanceType = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetAdvanceType');
        };

        this.GetHBAType = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetHBAType');
        };

        this.GetFinancialYears = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetFinancialYears');
        };


        this.GetPaySlip = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetPaySlip', param);
        };


        this.GetorEditIncrements = function (DataTypeID, FinancialYearID, MonthID, IncrementId, Active) {

            var paramObj = {
                "DataTypeID": DataTypeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "IncrementId": IncrementId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditIncrements', paramObj);
            return promise;

        };

        this.GetEmployeebyMonthYear = function (FinancialYearID, MonthId) {

            var paramObj = {
                "FinancialYearID": FinancialYearID,
                "MonthId": MonthId,
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEmployeebyMonthYear', paramObj);
            return promise;

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


        this.AddorUpdateIncrements = function (DataTypeId, IncrementId, FinancialYearId, MonthID, EmployeeID, IncrementAmount, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "IncrementId": IncrementId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "IncrementAmount": IncrementAmount,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateIncrements', paramObject);
            return promise;
        };



        this.AddorUpdateNPS = function (DataTypeId, NPSId, FinancialYearId, MonthID, EmployeeID, PensionAmount, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "NPSId": NPSId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "PensionAmount": PensionAmount,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateNPS', paramObject);
            return promise;
        };




        this.GetorEditHBA = function (DataTypeID, EmployeeID, HBAId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "HBAId": HBAId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditHBA', paramObj);
            return promise;

        };

        this.AddorUpdateHBA = function (DataTypeId, HBAId, FinancialYearId, MonthID, EmployeeID, HBATypeID, Amount, HBAEmiAmount, NoofMonths, EmiStartMonth, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "HBAId": HBAId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "HBATypeID": HBATypeID,
                "Amount": Amount,
                "HBAEmiAmount": HBAEmiAmount,
                "NoofMonths": NoofMonths,
                "EmiStartMonth": EmiStartMonth,
                "Active": Active,
                "UserName": UserName
            };

            console.log(paramObject)
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateHBA', paramObject);
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

        this.getGOPostData = function (DepartmentID) {
            var paramObj = { 
                "DepartmentID": DepartmentID
              
            };
            var promise = DataAccessService.postData('api/PayRoll/GetGOPostData', paramObj);
            return promise;

        };

        this.PayRollNPS = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, NPSId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "NPSId": NPSId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditNPS', paramObj);
            return promise;

        };

        this.AdvancesActiveStatus = function (DataTypeID, EmployeeId,AdvancesId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "AdvancesId": AdvancesId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditAdvance', paramObj);
            return promise;

        };

        this.PayRollIncrement = function (DataTypeID,  FinancialYearID, MonthID, IncrementId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "IncrementId": IncrementId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditIncrements', paramObj);
            return promise;

        };
        this.PayRollDeduction = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, DeductionsId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "DeductionsId": DeductionsId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDeductions', paramObj);
            return promise;

        };
        this.PayRollLeaves = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, LeaveId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "LeaveId": LeaveId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditLeaves', paramObj);
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










        this.AddBankDetails = function (DataTypeId, BankId, BankName, BankBranch, IFSCCode,  Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "BankId": BankId,
                "BankName": BankName,
                "BankBranch": BankBranch,
                "IFSCCode": IFSCCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateBankDetails', paramObject);
            return promise;
        };


        this.UpdateBankDetails = function (DataTypeId, BankId, BankName, BankBranch, IFSCCode,  Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "BankId": BankId,
                "BankName": BankName,
                "BankBranch": BankBranch,
                "IFSCCode": IFSCCode,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateBankDetails', paramObject);
            return promise;
        };

        //this.GetBankDetailsData = function (DataTypeID, BankId, Active) {
        //    var paramObj = {
        //        "DataTypeID": DataTypeID,
        //        "BankId": BankId,
        //        "Active": Active
        //    };
        //    var promise = DataAccessService.postData('api/PayRoll/GetorEditBankDetailsData', paramObj);
        //    return promise;

        //};

        this.BankDetailStatus = function (DataTypeID, BankId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "BankId": BankId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditBankDetailsData', paramObj);
            return promise;

        };





        this.AddEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, Empstatus, IncrementMonth, TSGLINumber, ScaleType, PanNO, CPS_NPS, PranNo, GPFNo, AccountNumber, IFSCCode, GOPostID, SortOrder, Active, UserName) {
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
                "Empstatus": Empstatus,
                "IncrementMonth": IncrementMonth,
                "TSGLINumber": TSGLINumber,
                "ScaleType": ScaleType,
                "PanNO": PanNO,
                "CPS_NPS": CPS_NPS,
                "PranNo": PranNo,
                "GPFNo": GPFNo,
                "AccountNumber": AccountNumber,
                "IFSCCode": IFSCCode,
                "GOPostID": GOPostID,
                "SortOrder": SortOrder,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };


        this.UpdateEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, Empstatus, IncrementMonth, TSGLINumber, ScaleType, PanNO, CPS_NPS, PranNo, GPFNo, AccountNumber, IFSCCode, GOPostID, SortOrder, Active, UserName) {
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
                "Empstatus": Empstatus,
                "IncrementMonth": IncrementMonth,
                "TSGLINumber": TSGLINumber,
                "ScaleType": ScaleType,
                "PanNO": PanNO,
                "CPS_NPS": CPS_NPS,
                "PranNo": PranNo,
                "GPFNo": GPFNo,
                "AccountNumber": AccountNumber,
                "IFSCCode": IFSCCode,
                "GOPostID": GOPostID,
                "SortOrder": SortOrder,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };

        this.GetEmployeeDetailsData = function (DataTypeID, EmployeeID, DepartmentID, CPS_NPS, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "DepartmentID": DepartmentID,
                "CPS_NPS": CPS_NPS,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditEmployeeDetailsData', paramObj);
            return promise;

        };


        this.GetEditNPS = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, NPSId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "NPSId": NPSId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditNPS', paramObj);
            return promise;

        };

        this.EmployeeDetailStatus = function (DataTypeID, EmployeeID, DepartmentID, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "DepartmentID": DepartmentID,
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

        this.GetBranchIFSC = function (BankName, BankBranch) {
            var paramObj = {
                "BankName": BankName,
                "BankBranch": BankBranch
            };
            var promise = DataAccessService.postData('api/PayRoll/GetBranchIFSC', paramObj);
            return promise;

        };








        this.AddSalary = function (DataTypeId, EmployeeSalaryDetailsId, DepartmentId, EmployeeId, CurrentBasicAmount, InterimRelief, CCA, PP, FPI, TG_Increment, ConveyanceAllowance, Medical, SpecialPay,NCI,NCIAmount, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeSalaryDetailsId": EmployeeSalaryDetailsId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "CurrentBasicAmount": CurrentBasicAmount,
                "InterimRelief": InterimRelief,
                "CCA": CCA,
                "PP": PP,
                "FPI": FPI,
                "TG_Increment": TG_Increment,
                "ConveyanceAllowance": ConveyanceAllowance,
                "Medical": Medical,
                "SpecialPay": SpecialPay,
                "NCI": NCI,
                "NCIAmount": NCIAmount,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalary', paramObject);
            return promise;
        };


        this.UpdateSalary = function (DataTypeId, EmployeeSalaryDetailsId, DepartmentId, EmployeeId, CurrentBasicAmount, InterimRelief, CCA, PP, FPI, TG_Increment, ConveyanceAllowance, Medical, SpecialPay,NCI, NCIAmount,UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeSalaryDetailsId": EmployeeSalaryDetailsId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "CurrentBasicAmount": CurrentBasicAmount,
                "InterimRelief": InterimRelief,
                "CCA": CCA,
                "PP": PP,
                "FPI": FPI,
                "TG_Increment": TG_Increment,
                "ConveyanceAllowance": ConveyanceAllowance,
                "Medical": Medical,
                "SpecialPay": SpecialPay,
                "NCI": NCI,
                "NCIAmount": NCIAmount,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalary', paramObject);
            return promise;
        };

        this.GetSalaryData = function (DataTypeID, EmployeeSalaryDetailsId, DepartmentId, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeSalaryDetailsId": EmployeeSalaryDetailsId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditSalaryData', paramObj);
            return promise;

        };

        this.ChangeSalaryStatus = function (DataTypeID, EmployeeSalaryDetailsId, DepartmentId, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeSalaryDetailsId": EmployeeSalaryDetailsId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditSalaryData', paramObj);
            return promise;

        };






        this.AddFinancialYear = function (DataTypeId, FinancialYearId, FinancialStartYear, FinancialYear, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "FinancialYearId": FinancialYearId,
                "FinancialStartYear": FinancialStartYear,
                "FinancialYear": FinancialYear,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateFinancialYear', paramObject);
            return promise;
        };


        this.UpdateFinancialYear = function (DataTypeId, FinancialYearId, FinancialStartYear, FinancialYear, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "FinancialYearId": FinancialYearId,
                "FinancialStartYear": FinancialStartYear,
                "FinancialYear": FinancialYear,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateFinancialYear', paramObject);
            return promise;
        };

        this.GetFinancialYearData = function (DataTypeID, FinancialYearId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "FinancialYearId": FinancialYearId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditFinancialYear', paramObj);
            return promise;

        };

        this.ChangeFinancialStatus = function (DataTypeID, FinancialYearId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "FinancialYearId": FinancialYearId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditFinancialYear', paramObj);
            return promise;

        };



        this.GetorEditDeductions = function (DataTypeID, EmployeeID, FinancialYearID, MonthID,DeductionsId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "DeductionsId": DeductionsId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditDeductions', paramObj);
            return promise;

        };


        this.AddorUpdateDeductions = function (DataTypeId, DeductionsId, FinancialYearId, MonthID, EmployeeID, OtherDeductions, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DeductionsId": DeductionsId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "OtherDeductions": OtherDeductions,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateDeductions', paramObject);
            return promise;
        };


        this.GetorEditLeaves = function (DataTypeID, FinancialYearID, MonthID, EmployeeID, LeaveId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "LeaveId": LeaveId,
                "Active": Active

            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditLeaves', paramObj);
            return promise;

        };

        this.GetEmployeeLeaveBalance = function (FinancialYearID, EmployeeID) {
            var paramObj = {
                "FinancialYearID": FinancialYearID,
                "EmployeeID": EmployeeID,

            };
            var promise = DataAccessService.postData('api/PayRoll/GetEmployeeLeaveBalance', paramObj);
            return promise;

        };

        this.AddLeaves = function (DataTypeId, LeaveId, FinancialYearId, MonthID, EmployeeID, MedicalLeaves, MedicalLeavesUtilized, CasualLeaves, CasualLeavesUtilized, EarnLeaves, EarnLeavesUtilized , Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "LeaveId": LeaveId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "MedicalLeaves": MedicalLeaves,
                "MedicalLeavesUtilized": MedicalLeavesUtilized,
                "CasualLeaves": CasualLeaves,
                "CasualLeavesUtilized": CasualLeavesUtilized,
                "EarnLeaves": EarnLeaves,
                "EarnLeavesUtilized": EarnLeavesUtilized,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateLeaves', paramObject);
            return promise;
        };

        this.UpdateLeaves = function (DataTypeId, LeaveId, FinancialYearId, MonthID, EmployeeID, MedicalLeaves, MedicalLeavesUtilized, CasualLeaves, CasualLeavesUtilized, EarnLeaves, EarnLeavesUtilized, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "LeaveId": LeaveId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "MedicalLeaves": MedicalLeaves,
                "MedicalLeavesUtilized": MedicalLeavesUtilized,
                "CasualLeaves": CasualLeaves,
                "CasualLeavesUtilized": CasualLeavesUtilized,
                "EarnLeaves": EarnLeaves,
                "EarnLeavesUtilized": EarnLeavesUtilized,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateLeaves', paramObject);
            return promise;
        };



        this.GetorEditAdvance = function (DataTypeID, EmployeeId,AdvancesId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "AdvancesId": AdvancesId,
                "Active": Active

            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditAdvance', paramObj);
            return promise;

        };




        this.AddorUpdateAdvance = function (DataTypeId, AdvancesId, EmployeeID, FinancialYearID, MonthId, AdvanceTypeId, AdvanceAmount, AdvanceEmiAmount, AdvanceNoOfMonths, AdvanceEmiStartMonth, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "AdvancesId": AdvancesId,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthId": MonthId,
                "AdvanceTypeId": AdvanceTypeId,
                "AdvanceAmount": AdvanceAmount,
                "AdvanceEmiAmount": AdvanceEmiAmount,
                "AdvanceNoOfMonths": AdvanceNoOfMonths,
                "AdvanceEmiStartMonth": AdvanceEmiStartMonth,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateAdvance', paramObject);
            return promise;
        };
     

        this.PayRollAllowance = function (DataTypeID, AllowanceID, DepartmentID,Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,              
                "AllowanceID": AllowanceID,
                "DepartmentID": DepartmentID,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditAllowance', paramObj);
            return promise;

        };

        this.GetEditAllowance = function (DataTypeID, AllowanceID, DepartmentID, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "AllowanceID": AllowanceID,
                "DepartmentID": DepartmentID,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditAllowance', paramObj);
            return promise;

        };

        this.AddorUpdateAllowance = function (DataTypeID, AllowanceID, DepartmentID, DA, HRA, IR ,UserName) {
            var paramObject = {
                "DataTypeID": DataTypeID,
                "AllowanceID": AllowanceID,
                "DepartmentID": DepartmentID,
                "DA": DA,
                "HRA": HRA,
                "IR": IR,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateAllowance', paramObject);
            return promise;
        };

        this.AddorUpdateOtherPay = function (DataTypeId, OtherPayId, FinancialYearId, MonthID, EmployeeID, DesignationID, OtherPayAmount, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "OtherPayId": OtherPayId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "DesignationID": DesignationID,
                "OtherPayAmount": OtherPayAmount,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateOtherPay', paramObject);
            return promise;
        };



        this.GetorEditOtherPay = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, DesignationID, OtherPayId, Active) {

            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "DesignationID": DesignationID,
                "OtherPayId": OtherPayId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditOtherPay', paramObj);
            return promise;

        };

        this.PayRollOtherPay = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, OtherPayId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "OtherPayId": OtherPayId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditOtherPay', paramObj);
            return promise;

        };



        this.GetorEditLIC = function (DataTypeID, EmployeeID,PolicyID,LICID, Active) {

            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "PolicyID": PolicyID,
                "LICID": LICID,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditLIC', paramObj);
            return promise;

        };



        this.AddorUpdateLIC = function (DataTypeID, LICID, EmployeeID, PolicyID, PolicyNumber, PremiumAmount,  LICAmountJson, Active, UserName) {
            var paramObject = {
                "DataTypeID": DataTypeID,
                "LICID": LICID,
                "EmployeeID": EmployeeID,
                "PolicyID": PolicyID,
                "PolicyNumber": PolicyNumber,
                "PremiumAmount": PremiumAmount,
                /*"TotalAmount": TotalAmount,*/
                "LICAmountJson": LICAmountJson,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateLIC', paramObject);
            return promise;
        };




        this.AddSalaryDeduction = function (DataTypeId, SalaryDeductionId, DepartmentId, EmployeeId, PT, IT, GPFAmount, TSGLIAmount, GISAmount, FlagFund, Harithanidhi,  UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "SalaryDeductionId": SalaryDeductionId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "PT": PT,
                "IT": IT,
                "GPFAmount": GPFAmount,
                "TSGLIAmount": TSGLIAmount,
                "GISAmount": GISAmount,
                "FlagFund": FlagFund,
                "Harithanidhi": Harithanidhi,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalaryDeduction', paramObject);
            return promise;
        };


        this.UpdateSalaryDeduction = function (DataTypeId, SalaryDeductionId, DepartmentId, EmployeeId, PT, IT, GPFAmount, TSGLIAmount, GISAmount, FlagFund, Harithanidhi, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "SalaryDeductionId": SalaryDeductionId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "PT": PT,
                "IT": IT,
                "GPFAmount": GPFAmount,
                "TSGLIAmount": TSGLIAmount,
                "GISAmount": GISAmount,
                "FlagFund": FlagFund,
                "Harithanidhi": Harithanidhi,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalaryDeduction', paramObject);
            return promise;
        };

        this.GetSalaryDeductionData = function (DataTypeID, SalaryDeductionId, DepartmentId, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "SalaryDeductionId": SalaryDeductionId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditSalaryDeductionData', paramObj);
            return promise;

        };

        this.ChangeSalaryDeductionStatus = function (DataTypeID, SalaryDeductionId, DepartmentId, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "SalaryDeductionId": SalaryDeductionId,
                "DepartmentId": DepartmentId,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditSalaryDeductionData', paramObj);
            return promise;

        };

        this.GenerateMonthlySalary = function (FinancialYearID, MonthID,DataType) {
            var paramObj = {
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "DataType": DataType
                
            };
            var promise = DataAccessService.postData('api/PayRoll/GenerateMonthlySalary', paramObj);
            return promise;

        };

        this.GetGenerateExcel = function (DataType,FinancialYearID, MonthID) {
            var paramObj = {
                "DataType": DataType,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID

            };
            var promise = DataAccessService.getDataWithPara('api/PayRoll/GetGenerateExcel', paramObj);
            return promise;

        };


        this.GenerateMonthlySalaryData = function (DataType, FinancialYearID, MonthID) {
            var paramObj = {
                "DataType": DataType,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID

            };
            var promise = DataAccessService.postData('api/PayRoll/GenerateMonthlySalaryData', paramObj);
            return promise;

        };



        this.GetMonthsforGeneration = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetMonthsforGeneration');
        };



        this.PublishMonthlySalaryData = function (DataType, FinancialYearID, MonthID) {
            var paramObj = {
                "DataType": DataType,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID

            };
            var promise = DataAccessService.postData('api/PayRoll/PublishMonthlySalaryData', paramObj);
            return promise;

        };

        this.PublishMonthlySalary = function (FinancialYearID, MonthID) {
            var paramObj = {
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                

            };
            var promise = DataAccessService.postData('api/PayRoll/PublishMonthlySalary', paramObj);
            return promise;

        };

        this.GetPublishedExcel = function (DataType, FinancialYearID, MonthID) {
            var paramObj = {
                "DataType": DataType,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID

            };
            var promise = DataAccessService.getDataWithPara('api/PayRoll/GetPublishedExcel', paramObj);
            return promise;

        };






        this.GetorEditMonthlyDays = function (DataType, FinancialYearID, MonthID) {

            var paramObj = {
                "DataType": DataType,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID
               
               
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditMonthlyDays', paramObj);
            return promise;

        };


       


        this.UpdateMonthlyDays = function (EmployeeID,MonthlyDaysID, PresentDays, NoOfDays,  UserName) {
            var paramObject = {
                "EmployeeID": EmployeeID,
                "MonthlyDaysID": MonthlyDaysID,
                "PresentDays": PresentDays,
                "NoOfDays": NoOfDays,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/UpdateMonthlyDays', paramObject);
            return promise;
        };



    });
});
