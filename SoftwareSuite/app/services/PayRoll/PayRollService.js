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

        this.GetFinancialYears = function () {
            return DataAccessService.getDataAll('api/PayRoll/GetFinancialYears');
        };


        this.GetPaySlip = function (PinJson) {
            var param = { "PINjson": PinJson }
            return DataAccessService.postData('api/StudentCertificate/GetPaySlip', param);
        };


        this.GetorEditIncrements = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, IncrementId, Active) {

            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "IncrementId": IncrementId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditIncrements', paramObj);
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




        this.GetorEditHBA = function (DataTypeID, EmployeeID, FinancialYearID, MonthID,HBAId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "HBAId": HBAId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditHBA', paramObj);
            return promise;

        };

        this.AddorUpdateHBA = function (DataTypeId, HBAId, FinancialYearId, MonthID, EmployeeID, Amount, NoofMonths, EmiStartMonth, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "HBAId": HBAId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "Amount": Amount,
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

        this.PayRollAction = function (DataTypeID, EmployeeId, FinancialYearID, MonthID, AdvancesId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "AdvancesId": AdvancesId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditAdvance', paramObj);
            return promise;

        };

        this.PayRollIncrement = function (DataTypeID, EmployeeID, FinancialYearID, MonthID, IncrementId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
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





        this.AddEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, PHC, Empstatus, IncrementMonth, ScaleType, PanNO, GPFNo, CPS_NPS, CPSNo, BankDetails, AccountNumber, CategoryCode, Active, UserName) {
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
                "BankDetails": BankDetails,
                "AccountNumber": AccountNumber,
                "CategoryCode": CategoryCode,
               
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };


        this.UpdateEmployeeDetails = function (DataTypeId, EmployeeID, EmployeeCode, EmployeeName, DOB, DOJ, DOR, DesignationId, DepartmentId, Gender, PHC, Empstatus, IncrementMonth, ScaleType, PanNO, GPFNo, CPS_NPS, CPSNo, BankDetails, AccountNumber, CategoryCode, Active, UserName) {
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
                "BankDetails": BankDetails,
                "AccountNumber": AccountNumber,
                "CategoryCode": CategoryCode,
                
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateEmployeeDetails', paramObject);
            return promise;
        };

        this.GetEmployeeDetailsData = function (DataTypeID, EmployeeID, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
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

        this.EmployeeDetailStatus = function (DataTypeID, EmployeeID, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeID": EmployeeID,
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








        this.AddSalary = function (DataTypeId, EmployeeId, CurrentBasicAmount, InterimRelief, CCA, PP, FPI, TG_Increment, ConveyanceElevence, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeId": EmployeeId,
                "CurrentBasicAmount": CurrentBasicAmount,
                "InterimRelief": InterimRelief,
                "CCA": CCA,
                "PP": PP,
                "FPI": FPI,
                "TG_Increment": TG_Increment,
                "ConveyanceElevence": ConveyanceElevence,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalary', paramObject);
            return promise;
        };


        this.UpdateSalary = function (DataTypeId, EmployeeId, CurrentBasicAmount, InterimRelief, CCA, PP, FPI, TG_Increment, ConveyanceElevence, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "EmployeeId": EmployeeId,
                "CurrentBasicAmount": CurrentBasicAmount,
                "InterimRelief": InterimRelief,
                "CCA": CCA,
                "PP": PP,
                "FPI": FPI,
                "TG_Increment": TG_Increment,
                "ConveyanceElevence": ConveyanceElevence,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateSalary', paramObject);
            return promise;
        };

        this.GetSalaryData = function (DataTypeID, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditSalaryData', paramObj);
            return promise;

        };

        this.ChangeSalaryStatus = function (DataTypeID, EmployeeId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
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


        this.AddorUpdateDeductions = function (DataTypeId, DeductionsId, FinancialYearId, MonthID, EmployeeID, IT, FlagFund, Harithanidhi, DeductionAmount, Active, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "DeductionsId": DeductionsId,
                "FinancialYearId": FinancialYearId,
                "MonthID": MonthID,
                "EmployeeID": EmployeeID,
                "IT": IT,
                "FlagFund": FlagFund,
                "Harithanidhi": Harithanidhi,
                "DeductionAmount": DeductionAmount,
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



        this.GetorEditAdvance = function (DataTypeID, EmployeeId, FinancialYearID, MonthID, AdvancesId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "EmployeeId": EmployeeId,
                "FinancialYearID": FinancialYearID,
                "MonthID": MonthID,
                "AdvancesId": AdvancesId,
                "Active": Active

            };
            var promise = DataAccessService.postData('api/PayRoll/GetorEditAdvance', paramObj);
            return promise;

        };




        this.AddorUpdateAdvance = function (DataTypeId, AdvancesId, EmployeeID, FinancialYearID, MonthId, AdvanceTypeId, AdvanceAmount, AdvanceNoOfMonths, AdvanceEmiStartMonth, UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "AdvancesId": AdvancesId,
                "EmployeeID": EmployeeID,
                "FinancialYearID": FinancialYearID,
                "MonthId": MonthId,
                "AdvanceTypeId": AdvanceTypeId,
                "AdvanceAmount": AdvanceAmount,
                "AdvanceNoOfMonths": AdvanceNoOfMonths,
                "AdvanceEmiStartMonth": AdvanceEmiStartMonth,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateAdvance', paramObject);
            return promise;
        };
      

        this.PayRollElevence = function (DataTypeID, ElevenceId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,              
                "ElevenceId": ElevenceId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditElevence', paramObj);
            return promise;

        };

        this.GetEditElevence = function (DataTypeID, ElevenceId, Active) {
            var paramObj = {
                "DataTypeID": DataTypeID,
                "ElevenceId": ElevenceId,
                "Active": Active
            };
            var promise = DataAccessService.postData('api/PayRoll/GetEditElevence', paramObj);
            return promise;

        };

        this.AddorUpdateElevence = function (DataTypeId, ElevenceId, IR, DA, HRA, Medical,  UserName) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "ElevenceId": ElevenceId,
                "IR": IR,
                "DA": DA,
                "HRA": HRA,            
                "Medical": Medical,
                "UserName": UserName
            };
            var promise = DataAccessService.postData('api/PayRoll/AddorUpdateElevence', paramObject);
            return promise;
        };

        

    });
});
