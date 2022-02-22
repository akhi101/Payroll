using Newtonsoft.Json;
using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPreExaminationController
    {
        [HttpGet, ActionName("GetCcicModuleColours")]
        public string GetCcicModuleColours()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GetColours";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GetColours", 0, ex.Message);
                throw ex;
            }
        }
    }
}
