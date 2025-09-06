using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PayRoll.Models.Security;

namespace PayRoll.BLL
{
    public class SystemUserAuth
    {
    

            public List<SystemUser> SystemUser { get; internal set; }
            public List<UserAuth> UserAuth { get; internal set; }
        }
    }


