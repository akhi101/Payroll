using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SoftwareSuite.Models.CCIC
{
    public class CcicSystemUser
    {
 
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int UserTypeID { get; set; }
            
            public int UserID { get; set; }





    }

    public class CcicUserAuth
    {
        public string ResponceCode { get; set; }
        public string RespoceDescription { get; set; }
    }

    public class CcicReCaptcha
    {
        public bool Success { get; set; }
        public float score { get; set; }

    }

   


}

