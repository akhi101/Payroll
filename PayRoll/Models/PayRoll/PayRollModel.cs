using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models.PayRoll
{
    public class AllowanceData
    {

        public int DataTypeID { get; set; }
        public int AllowanceID { get; set; }
        public int FinancialYearID { get; set; }
        public int MonthID { get; set; }
        public double DA { get; set; }
        public double HRA { get; set; }
        public double IR { get; set; }
        public int DepartmentID { get; set; }

        public bool Active { get; set; }
        public string UserName { get; set; }



    }



}
