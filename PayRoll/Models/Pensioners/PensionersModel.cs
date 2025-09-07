using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models.PensionersModel
{


    public class FamilyPensionerData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int FamilyPensionerID { get; set; }
        public int EmployeeID { get; set; }
        public string NomineeName { get; set; }
        public string EmployeeName { get; set; }
        public string Gender { get; set; }
        public string PanNo { get; set; }
        public string AccountNumber { get; set; }
        public string IFSCCode { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }

    }

    public class ServicePensionerData
    {
        public int DataTypeID { get; set; }
        public int EmployeeID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string Gender { get; set; }
        public string PanNo { get; set; }
        public string AccountNumber { get; set; }
        public string IFSCCode { get; set; }
        public string SortOrder { get; set; }
        public bool LifeStatus { get; set; }
        public bool Active { get; set; }
        public string DOB { get; set; }
        public string DOJ { get; set; }
        public string DOR { get; set; }
        public int DesignationId { get; set; }
        public int ServicePensionerID { get; set; }
        public string UserName { get; set; }

    }


    public class PensionerAllowanceData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int FinancialYearID { get; set; }
        public int IR { get; set; }
        public int DR { get; set; }
        public int MonthID { get; set; }
        public int PensionerAllowanceID { get; set; }
        public int PensionerTypeID { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }
    }


    public class PensionerDetailsData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int PensionerID { get; set; }
        public int PensionAmount { get; set; }
        public int CommutationAmount { get; set; }
        public int IR { get; set; }
        public int DR { get; set; }
        public int MA { get; set; }
        public int PensionerDetailsID { get; set; }
        public int PensionerTypeID { get; set; }
        public bool Active { get; set; }
        public string UserName { get; set; }
    }



    public class PensionerDeductionsData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int CMRFAmount { get; set; }
        public int Recovery_TDS { get; set; }
        public int PensionerDeductionID { get; set; }
        public int FinancialYearID { get; set; }
        public int MonthID { get; set; }
        public int PensionerTypeID { get; set; }
        public int PensionerID { get; set; }

        public int Active { get; set; }
        public string UserName { get; set; }
    }



    public class PQAData
    {
        public int DataTypeID { get; set; }
        public int DataTypeId { get; set; }
        public int EmployeeID { get; set; }
        public int AdditionalQuantum { get; set; }
        public int OtherAmount { get; set; }
        public int PAQID { get; set; }
        public int FinancialYearID { get; set; }
        public int MonthID { get; set; }
        public int PensionerTypeID { get; set; }
        public int PensionerID { get; set; }

        public int Active { get; set; }
        public string UserName { get; set; }
    }





}
