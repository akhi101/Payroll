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
            return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedure(StrQuery));
        }
        catch (Exception ex)
        {
            dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
            return Request.CreateResponse(HttpStatusCode.Gone, ex);
        }

    }

      


        [HttpGet, ActionName("getCcicUserTypes")]
        public HttpResponseMessage getCcicUserTypes()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_UserTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedure(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("SetCcicModuleInactive")]
        public HttpResponseMessage SetCcicModuleInactive(int UserTypeID, int ModuleID, int Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@Active", Active);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ModuleInctive ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Set_ModuleInctive ", 0, ex.Message);
                throw ex;
            }

        }





        [HttpGet, ActionName("GetModulesbyRole")]
        public HttpResponseMessage GetCcicModulesbyRole(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Modules", param);
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
                dbHandler.SaveErorr("SP_Get_SubModules ", 0, ex.Message);
                throw ex;
            }

        }

        [HttpGet, ActionName("GetAllModulesbyRole")]
        public HttpResponseMessage GetAllModulesbyRole(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllModules", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AllModules ", 0, ex.Message);
                throw ex;
            }

        }








        public class RecentNews
    {
        public string RecentNewsID { get; set; }
        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime ToDate { get; set; }

    }








    public class RecentNewsData

    {
        public string RecentNewsID { get; set; }

        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }



        [HttpGet, ActionName("CcicRecentNewsInactive")]
        public HttpResponseMessage CcicRecentNewsInactive(int RecentNewsID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RecentNewsID ", RecentNewsID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_RecentNewsInactive ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Set_RecentNewsInactive ", 0, ex.Message);
                throw ex;
            }

        }


        [HttpGet, ActionName("PostCcicRecentNews")]
        public HttpResponseMessage PostCcicRecentNews(string RecentNewsText, DateTime FromDate, DateTime ToDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@RecentNewsText ", RecentNewsText);
                param[1] = new SqlParameter("@FromDate ", FromDate);    
                param[2] = new SqlParameter("@ToDate ", ToDate);
                param[3] = new SqlParameter("@UserName ", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_RecentNews ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Add_RecentNews ", 0, ex.Message);
                throw ex;
            }

        }

        [HttpGet, ActionName("SetSubModuleInactive")]
        public HttpResponseMessage SetSubModuleInactive(int usertypeid, int moduleId, int SubModuleId, int IsActive)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@usertypeid", usertypeid);
                param[1] = new SqlParameter("@moduleId", moduleId);
                param[2] = new SqlParameter("@SubModuleId", SubModuleId);
                param[3] = new SqlParameter("@IsActive", IsActive);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_Login_SET_SubmodueInctive ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Login_SET_SubmodueInctive ", 0, ex.Message);
                throw ex;
            }

        }
    } 
}
