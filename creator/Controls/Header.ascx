<%@ Control Language="C#" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="MENU" src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USERANDLOGIN" Src="~/Admin/Skins/UserAndLogin.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="META" Src="~/Admin/Skins/Meta.ascx" %>

<dnn:META runat="server" Name="viewport" Content="width=device-width, initial-scale=1, maximum-scale=1" />

<dnn:DnnJsInclude runat="server" PathNameAlias="SkinPath" ForceProvider="DnnFormBottomProvider" priority="100" FilePath="js/main.min.js" />

<dnn:DnnCssInclude runat="server" PathNameAlias="SkinPath" priority="100" FilePath="style.css" />


<header>

	<dnn:LOGO runat="server" />

	<dnn:MENU MenuStyle="DDRMenu/Simple" runat="server"  />

	<dnn:SEARCH runat="server" id="search" />

</header>