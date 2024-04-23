using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;
using SoftwareSuite.Models.Database;

using RestSharp;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using System.IO;
using System.Web;
using System.Data;

using System.Collections.Generic;
using SoftwareSuite.Models;
using System.Timers;

namespace SoftwareSuite.Controllers.PayRoll
{
    public class PayRollController : ApiController
    {

        [HttpPost, ActionName("GetorEditDesignationData")]
        public string GetorEditDesignationData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Designations", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateDesignations")]
        public string AddorUpdateDesignations([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@DesignationName", request["DesignationName"]);
                param[3] = new SqlParameter("@DesignationTypeId", request["DesignationTypeId"]);
                param[4] = new SqlParameter("@DesignationOrder", request["DesignationOrder"]);
                param[5] = new SqlParameter("@NoOfPost", request["NoOfPost"]);
                param[6] = new SqlParameter("@GONumber", request["GONumber"]);
                param[7] = new SqlParameter("@NoOfVacants", request["NoOfVacants"]);
                param[8] = new SqlParameter("@Active", request["Active"]);
                param[9] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Designations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


    }
}
