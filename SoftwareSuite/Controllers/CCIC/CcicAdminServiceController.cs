using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using Newtonsoft.Json;
using RestSharp;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicAdminServiceController : ApiController
{

    [HttpGet, ActionName("getCcicRecentNews")]
    public HttpResponseMessage getCcicRecentNews()
    {
        try
        {
            var dbHandler = new ccicdbHandler();
            string StrQuery = "";
            StrQuery = "exec SP_Get_RecentNews";
            return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        }
        catch (Exception ex)
        {
            dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
            return Request.CreateResponse(HttpStatusCode.Gone, ex);
        }

    }






        [HttpGet, ActionName("GetCcicModulesbyRole")]
        public HttpResponseMessage GetCcicModulesbyRole(int UserTypeID)
        {
            try
            {
                var ccicdbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                var dt = ccicdbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Modules", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Modules", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicSubModulesbyRole")]
        public HttpResponseMessage GetCcicSubModulesbyRole(int UserTypeID, int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_SubModules ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Login_GET_SubModules ", 0, ex.Message);
                throw ex;
            }

        }








        public class RecentNews
    {
        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime ToDate { get; set; }

    }




    [HttpGet, ActionName("GetCcicRecentNewsByUser")]
    public HttpResponseMessage GetCcicRecentNewsByUser(int UserTypeID)
    {
        try
        {
            var dbHandler = new ccicdbHandler();
            var param = new SqlParameter[1];
            param[0] = new SqlParameter("@UserTypeID", UserTypeID);
            var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_RecentNews", param);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
            return response;
        }
        catch (Exception ex)
        {
            dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
            throw ex;
        }
    }



    public class RecentNewsData
    {
        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }



    [HttpPost, ActionName("PostRecentNews")]
    public string PostRecentNews([FromBody] JsonObject RecentNewsData)
    {
        try
        {
            var dbHandler = new ccicdbHandler();
            var param = new SqlParameter[1];
            param[0] = new SqlParameter("@Json", RecentNewsData["Json"]);
            var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_RecentNews", param);
            return JsonConvert.SerializeObject(res);
        }
        catch (Exception ex)
        {

            dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
            return ex.Message;
        }
    }

} 
}
