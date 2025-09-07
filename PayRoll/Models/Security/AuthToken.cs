using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models.Security
{
    public class AuthToken
    {
        //internal object collegeType;

        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public string CollegeCode { get; set; }
        public string collegeType { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public class AuthToken1
    {
        public int UserTypeID { get; set; }
        public int EmployeeID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
