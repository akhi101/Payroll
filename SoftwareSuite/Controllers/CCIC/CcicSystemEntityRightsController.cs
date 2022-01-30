using SoftwareSuite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.BLL;
using Newtonsoft.Json;
using SoftwareSuite.Models.CCIC;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicSystemEntityRightsController : BaseController
    {
        public string GetCcicModulesbyRole(Int32 UserTypeID)
        {
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            IEnumerable<CcicSystemModules> SystemGroups = CcicSystemUserBLL.GetCcicModulesbyRole(UserTypeID);

            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetCcicSubModulesbyRole(Int32 UserTypeID, Int32 ModuleID)
        {
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            IEnumerable<CcicSystemSubModules> SystemGroups = CcicSystemUserBLL.GetCcicSubModulesbyRole(UserTypeID, ModuleID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

    }
}
