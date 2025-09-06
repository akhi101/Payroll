using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PayRoll.Models.IVC;

namespace PayRoll.Models.Security
{
    public class IVCSystemUserAuth
    {
        public List<IVCSystemUser> IVCSystemUser { get; internal set; }

        public List<IVCUserAuth> IVCUserAuth { get; internal set; }

    }
}
