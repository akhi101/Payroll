using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.CCIC
{
    public class CcicAuthToken
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int UserTypeID { get; set; }

        public int UserID { get; set; }

        public DateTime ExpiryDate { get; internal set; }
    }
}
