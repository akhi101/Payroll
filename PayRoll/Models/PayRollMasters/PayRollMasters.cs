using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models.PayRollMasters
{

    public class DepartmentData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int DepartmentId { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }
    }


    public class DesignationData
    {
        public int DataTypeId { get; set; }
        public int DataTypeID { get; set; }
        public int DesignationTypeId { get; set; }
        public int DesignationId { get; set; }
        public int DesignationOrder { get; set; }
        public int NoOfPost { get; set; }
        public int GONumber { get; set; }
        public int NoOfVacants { get; set; }
        public string DesignationName { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }
    }


    public class EmpDetails
    {
        public int DataTypeId { get; set; }
        public int DataTypeID { get; set; }
        public int EmployeeID { get; set; }
        public int DepartmentID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public int DesignationId { get; set; }
        public int DepartmentId { get; set; }
        public string DOB { get; set; }
        public string DOJ { get; set; }
        public string DOR { get; set; }
        public string DesignationName { get; set; }
        public string DepartmentName { get; set; }
        public string Gender { get; set; }

        public string Empstatus { get; set; }
        public string IncrementMonth { get; set; }
        public string TSGLINumber { get; set; }
        public string ScaleType { get; set; }
        public string PanNO { get; set; }

        public string CPS_NPS { get; set; }
        public string PranNo { get; set; }
        public string GPFNo { get; set; }


        public string AccountNumber { get; set; }
        public string IFSCCode { get; set; }

        public int GOPostID { get; set; }

        public int SortOrder { get; set; }

        public bool Active { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }

    }


    public class FinancialDetails
    {
        public int DataTypeId { get; set; }
        public int DataTypeID { get; set; }

        public bool Active { get; set; }
        public int FinancialYearId { get; set; }
        public string FinancialStartYear { get; set; }

        public string FinancialYear { get; set; }
        public string UserName { get; set; }
    }


    public class SalaryDetails
    {
        public int DataTypeId { get; set; }
        public int EmployeeSalaryDetailsId { get; set; }
        public int DataTypeID { get; set; }
        public int DepartmentId { get; set; }

        public bool Active { get; set; }
        public int EmployeeId { get; set; }
        public string CurrentBasicAmount { get; set; }
        public string InterimRelief { get; set; }
        public float CCA { get; set; }
        public float PP { get; set; }
        public float FPI { get; set; }
        public float TG_Increment { get; set; }
        public float ConveyanceAllowance { get; set; }
        public float Medical { get; set; }
        public float SpecialPay { get; set; }
        public string NCI { get; set; }
        public float NCIAmount { get; set; }
        public string UserName { get; set; }
    }

    public class SalaryDeductionDetails
    {
        public int DataTypeId { get; set; }
        public int SalaryDeductionId { get; set; }
        public int DepartmentId { get; set; }
        public int DataTypeID { get; set; }
        public int EmployeeId { get; set; }

        public bool Active { get; set; }


        public float PT { get; set; }
        public float IT { get; set; }
        public float GPFAmount { get; set; }
        public float TSGLIAmount { get; set; }
        public float GISAmount { get; set; }
        public float FlagFund { get; set; }
        public float Harithanidhi { get; set; }

        public string UserName { get; set; }
    }

    public class IncrementsData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int FinancialYearID { get; set; }
        public int FinancialYearId { get; set; }
        public int MonthID { get; set; }
        public int IncrementId { get; set; }
        public int EmployeeID { get; set; }
        public int IncrementAmount { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }
    }

    public class EmployeeData
    {
        public int FinancialYearID { get; set; }
        public int MonthId { get; set; }

    }

    public class NPSData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int FinancialYearId { get; set; }
        public int FinancialYearID { get; set; }
        public int PensionAmount { get; set; }
        public int MonthID { get; set; }
        public int NPSId { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }

    }

    public class HBAData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int FinancialYearId { get; set; }
        public int MonthID { get; set; }
        public int HBAId { get; set; }
        public int HBATypeID { get; set; }
        public int Amount { get; set; }
        public int HBAEmiAmount { get; set; }
        public int NoofMonths { get; set; }
        public int EmiStartMonth { get; set; }
        public int NoofMonthsBalance { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }

    }

    public class DeductionsData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int FinancialYearID { get; set; }
        public int FinancialYearId { get; set; }
        public int MonthID { get; set; }
        public int DeductionsId { get; set; }
        public int OtherDeductions { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }
    }

    public class LeavesData
    {
        public int DataTypeId { get; set; }
        public int LeaveId { get; set; }
        public int FinancialYearId { get; set; }
        public int MonthID { get; set; }
        public int EmployeeID { get; set; }
        public int MedicalLeaves { get; set; }
        public int MedicalLeavesUtilized { get; set; }
        public int CasualLeaves { get; set; }
        public int CasualLeavesUtilized { get; set; }
        public int EarnLeaves { get; set; }
        public int EarnLeavesUtilized { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }

    }

    public class BankDetails
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int BankId { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public string IFSCCode { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }
    }

    public class OtherPayData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int FinancialYearID { get; set; }
        public int FinancialYearId { get; set; }
        public int OtherPayId { get; set; }
        public int OtherPayAmount { get; set; }
        public int DesignationID { get; set; }
        public int MonthID { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }
    }

    public class LICData
    {
        public int DataTypeID { get; set; }
        public int LICID { get; set; }
        public int EmployeeID { get; set; }
        public int PolicyID { get; set; }
        public int PolicyNumber { get; set; }
        public int PremiumAmount { get; set; }
        public string LICAmountJson { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }
    }

    public class MonthlyDaysData
    {
        public int DataType { get; set; }
        public int FinancialYearID { get; set; }
        public int EmployeeID { get; set; }
        public int MonthlyDaysID { get; set; }
        public int PresentDays { get; set; }
        public int NoOfDays { get; set; }
        public int HalfDaysPresent { get; set; }
        public int MonthID { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }


    }
}
