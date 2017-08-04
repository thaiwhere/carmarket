namespace Car.Framework
{
    using log4net;
    using log4net.Config;
    using System;
    using System.Data.SqlClient;
    using System.Web;

    public static class LogService
    {
        private static readonly ILog Log = LogManager.GetLogger("LogService");

        static LogService()
        {
            BasicConfigurator.Configure();
            XmlConfigurator.Configure();
        }

        public static void Info(string info)
        {
            Log.Info(info);
        }

        public static void Error(string message, Exception exception)
        {
            var sqlException = exception as SqlException;
            if (sqlException != null)
            {
                message += "\r\nProcedure: " + sqlException.Procedure;
                message += "\r\nLine Number: " + sqlException.LineNumber;
                message += "\r\nServer: " + sqlException.Server;
            }

            Log.Error(message, exception);
        }

        public static void Error(string message)
        {
            Log.Error(message);
        }

        public static void Error(Exception exception)
        {
            string[] strUserInitials = HttpContext.Current.Request.ServerVariables["LOGON_USER"].Split(System.Convert.ToChar(@"\"));

            var sqlException = exception as SqlException;
            var message = string.Empty;
            if (sqlException != null)
            {
                message += "\r\nProcedure: " + sqlException.Procedure;
                message += "\r\nLine Number: " + sqlException.LineNumber;
                message += "\r\nServer: " + sqlException.Server;
            }

            Log.Error(message + "; IP = " + GetIPAddress(), exception);
        }

        public static void Warning(string message)
        {
            Log.Warn(message);
        }

        public static void Warning(string message, Exception exception)
        {
            var sqlException = exception as SqlException;
            if (sqlException != null)
            {
                message += "\r\nProcedure: " + sqlException.Procedure;
                message += "\r\nLine Number: " + sqlException.LineNumber;
                message += "\r\nServer: " + sqlException.Server;
            }

            Log.Warn(message, exception);
        }

        public static string GetIPAddress()
        {
            var ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ip))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            else
            {
                if (!string.IsNullOrEmpty(ip))
                {
                    ip = ip.Split(',')[0];
                }
            }

            return ip;
        }
    }
}
