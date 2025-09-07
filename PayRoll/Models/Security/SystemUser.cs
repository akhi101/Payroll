using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models.Security
{
    public class SystemUser
    {
        public string UserName { get; set; }
        public string BranchCode { get; set; }
        public string CollegeCode { get; set; }
        public string CollegeName { get; set; }
        public int CollegeId { get; set; }
        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public int BranchId { get; set; }
        public int AcademicId { get; set; }
        public string collegeType { get;  set; }
    }


    public class SystemUser1 
    {
        public int UserTypeID { get; set; }
        public int EmployeeID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
    }
    public class ReCaptcha
    { 
        public bool Success { get; set; }
        public float score { get; set; }

    }
    public class LogSystemUser
    {
        public string UserName { get; set; }
    }
    public class UserAuth
    {
        public string ResponceCode { get; set; }
        public string RespoceDescription { get; set; }
    }
    public class SystemUserAuth
    {
        public List<SystemUser> SystemUser { get; set; }
        public List<UserAuth> UserAuth { get; set; }
    }
}
