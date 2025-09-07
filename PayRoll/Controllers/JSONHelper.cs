using System.Collections.Generic;
using System.Data;
using System.Text.Json.Nodes;
using Newtonsoft.Json;

namespace PayRoll.Helpers
{
    public static class JSONHelper
    {
        public static T GetValueOrDefault<T>(this JsonObject obj, string key, T defaultValue = default)
        {
            if (obj != null && obj.ContainsKey(key) && obj[key] != null)
            {
                try
                {
                    return obj[key].GetValue<T>();
                }
                catch
                {
                    return defaultValue;
                }
            }
            return defaultValue;
        }


        public static string DataSetToJson(DataSet ds)
        {
            if (ds == null || ds.Tables.Count == 0)
                return JsonConvert.SerializeObject(new { Message = "No data found" });

            return JsonConvert.SerializeObject(
                ds.Tables[0],                          // serialize the first table
                Formatting.None,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }
            );
        }
    }
}
