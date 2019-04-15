<%@ WebHandler Language="C#" CodeBehind="Proxy.ashx.cs" Class="DaolanProxy.Proxy" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;
namespace DaolanProxy
{
    public class Proxy : System.Web.IHttpHandler
    {
        public readonly string baseUrl = "https://api.daolan.com.cn:40405";
            
        //string url = baseUrl + "/1/tour/unit/26275/asset/2?source=jinan&ds=jinan&count=10&page=1";
        public string GetInfo(HttpContext context)
        {
            string id = context.Request.Params["id"];
            string source = context.Request.Params["source"];
            string ds = context.Request.Params["ds"];

			string url = baseUrl + "/1/tour/unit/" + id + "?source=" + source + "&ds=" + ds;
			
			return GetResult(url);
        }
        public string GetRecommend(HttpContext context)
        {
            string id = context.Request.Params["id"];
            string source = context.Request.Params["source"];
            string ds = context.Request.Params["ds"];

        	string url = baseUrl + "/1/tour/unit/" + id + "/recommend?source=" + source + "&ds=" + ds + "&count=10&page=1";
			return GetResult(url);
        }

        public string GetSSGL(HttpContext context)
        {
            string id = context.Request.Params["id"];
            string source = context.Request.Params["source"];
            string ds = context.Request.Params["ds"];
            //https://api.daolan.com.cn:40405/1/pt/34/post?source=jinan&ds=jinan
            string url = baseUrl + "/1/pt/" + id + "/post?source=" + source + "&ds=" + ds + "&count=10&page=1";
            //string url = "https://api.daolan.com.cn:40405/1/pt/34/post?source=jinan&ds=jinan";
            return GetResult(url);
        }

        public string GetComment(HttpContext context)
        {
            string id = context.Request.Params["id"];
        	string url = baseUrl + "/1/unit/" + id + "/comment?count=10&page=1";
			return GetResult(url);
        }

        public string GetAsset(HttpContext context)
        {
            string id = context.Request.Params["id"];
            string source = context.Request.Params["source"];
            string ds = context.Request.Params["ds"];
            string aid = context.Request.Params["aid"];

			string url = baseUrl + "/1/tour/unit/" + id + "/asset/" + aid + "?source=" + source + "&ds=" + ds + "&count=10&page=1";
			return GetResult(url);
        }

        public void ProcessRequest(HttpContext context)
        {
            string method = context.Request.Params["method"];
            string result = "";
            switch (method)
            {
                case "GetInfo":
                    result = GetInfo(context);
                    break;
                case "GetRecommend":
                	result = GetRecommend(context);
                    break;
                case "GetComment":
                	result = GetComment(context);
                    break;
                case "GetAsset":
                	result = GetAsset(context);
                	break;
                case "GetSSGL":
                    result = GetSSGL(context);
                    break;
            }
            context.Response.Write(result);
        }

        public string GetResult(string url)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";
            request.Timeout = 10000;
			request.Headers["X-Request-ID"] = "e10cd3e0209b7a4d46847209d38f24f2";
            var response = request.GetResponse();
            StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("utf-8"));
            return sr.ReadToEnd();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
	}
}