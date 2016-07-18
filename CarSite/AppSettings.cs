using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace CarSite
{
    public static class AppSettings
    {
        public static string SendEmailHost
        {
            get { return ConfigurationManager.AppSettings["SendEmailHost"].ToString(); }
        }

        public static short SendEmailPort
        {
            get { return short.Parse(ConfigurationManager.AppSettings["SendEmailPort"].ToString()); }
        }


        public static string SendEmailFrom
        {
            get { return ConfigurationManager.AppSettings["SendEmailFrom"].ToString(); }
        }

        public static string SendEmailPass
        {
            get { return ConfigurationManager.AppSettings["SendEmailPass"].ToString(); }
        }
    }
}