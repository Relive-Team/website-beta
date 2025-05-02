if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.Cookies=="undefined")
Ms.Wol.Cookies={};
Ms.Wol.Cookies=function()
{
jQuery(document).ready(b);
var a={_bCookiesEnabled:false,_bUniquePageIdAvailable:false,_sUniquePageIdValue:null,_sCookieNs:"Ms.Wol.",_GetCookieEnabledState:function()
{
document.cookie="cookiesEnabled=true;";
return document.cookie.indexOf("cookiesEnabled=true")>-1?true:false
},_BuildCookie:function(b)
{
return a._sCookieNs+a._sUniquePageIdValue+"."+b
}};
function b()
{
a._bCookiesEnabled=a._GetCookieEnabledState();
if(typeof PageData!="undefined")
if(typeof PageData.TopLevelAssetSystemId!="undefined")
{
a._sUniquePageIdValue=PageData.TopLevelAssetSystemId;
a._bUniquePageIdAvailable=true
}
}
return {SetCookie:function(c,b)
{
if(a._bUniquePageIdAvailable&&a._bCookiesEnabled&&c!=null&&b!=null)
document.cookie=a._BuildCookie(c)+"="+escape(b)
},GetCookie:function(e)
{
if(a._bUniquePageIdAvailable&&a._bCookiesEnabled&&e!=null)
for(var f=a._BuildCookie(e),
c=document.cookie.split("; "),
b=0;b<c.length;b++)
{
var d=c[b].split("=");
if(f==d[0])
return unescape(d[1])
}
return null
}}
}();
if(typeof Wol=="undefined")
Wol={};
if(typeof Wol.Logging=="undefined")
Wol.Logging={isEnabled:function()
{
return false
}};
var link_expandAllText=!link_expandAllText?"":link_expandAllText,
link_collapseAllText=!link_collapseAllText?"":link_collapseAllText,
clickHandlerFunctionMap={link_expand:ExpandOrCollapseSingleNode,link_collapse:ExpandOrCollapseSingleNode,link_expandAll:ExpandOrCollapseAllNodes,link_collapseAll:ExpandOrCollapseAllNodes,link_image_expand:ExpandOrCollapseSingleNode_Image,link_image_collapse:ExpandOrCollapseSingleNode_Image};
if(document.attachEvent)
document.attachEvent("onclick",ClickHandlerBase);
else
document.addEventListener&&
document.addEventListener("click",ClickHandlerBase,false);
function ClickHandlerBase(a)
{
var c=a!=null&&a.target==null?a.srcElement:a.target;
if(c.attributes["class"]!=null)
{
var b=c.attributes["class"].value;
if(clickHandlerFunctionMap.hasOwnProperty(b))
{
clickHandlerFunctionMap[b](c,b,true);
if(!ReturnFalse(a))
return false
}
}
}
function NoOp()
{
}
function FindFirstParent(c,d)
{
if(c==null||d==null)
return null;
var a=c,
e=d.toLowerCase();
while(a.parentNode&&a.parentNode!=document.body)
{
var b="";
a=a.parentNode;
if(a.tagName!=null)
b=a.tagName.toLowerCase();
if(b==e)
return a
}
return null
}
function GetElementDistance(c,b)
{
if(c==null||b==null)
return -1;
if(c==b)
return 0;
var d=1,
a=c.parentNode;
while(a!=null&&a!=document)
{
if(a==b)
return d;
d++;
a=a.parentNode
}
return -1
}
function IsElementWithinDistance(c,b,d)
{
var a=GetElementDistance(c,b);
if(a==null||a<0||a>d)
return false;
else
return true
}
function ExpandOrCollapseSingleNode(a,d,f)
{
if(a!=null)
{
var c=FindFirstParent(a,"DIV"),
b=c.childNodes[1],
g=c.parentNode,
h=FindFirstParent(a,"TR"),
e=jQuery(h).find("td div a img")[0];
if(c!=null&&b!=null)
{
if(d=="link_collapse")
{
SetClassName(a,"link_expand");
SetClassName(b,"expand");
SetClassName(e,"link_image_expand");
f==true&&
SaveCollapseState(a)
}
else
if(d=="link_expand")
{
SetClassName(a,"link_collapse");
SetClassName(b,"collapse");
SetClassName(e,"link_image_collapse");
f==true&&
SaveExpandState(a)
}
UpdateExpandCollapseAllLink(g)
}
}
}
function ExpandOrCollapseSingleNode_Image(a,g,d)
{
if(a!=null)
{
var f=FindFirstParent(a,"TR"),
e=f.childNodes[1],
b=jQuery(e).find("a")[0],
c=b.attributes["class"].value;
ExpandOrCollapseSingleNode(b,c,d)
}
}
function ExpandOrCollapseAllNodes(a,c,g)
{
if(a!=null)
{
var h=a.parentNode.childNodes;
if(c=="link_expandAll")
{
SetClassName(a,"link_collapseAll");
SetTextValue(a,link_collapseAllText);
g==true&&
SaveExpandState(a)
}
if(c=="link_collapseAll")
{
SetClassName(a,"link_expandAll");
SetTextValue(a,link_expandAllText);
g==true&&
SaveCollapseState(a)
}
for(i=0;i<h.length;i++)
{
var b=jQuery(h[i]).attr("class");
if(b==undefined||b==null||b=="")
continue;
if(b.indexOf("faqEntry")!=-1||b.indexOf("procedure")!=-1||b.indexOf("section")!=-1)
{
var l=h[i].childNodes;
for(j=0;j<l.length;j++)
{
var k=l[j],
m=k.attributes["class"];
if(m==null)
continue;
var d=m.value;
if(d=="question"||d=="title_procedure ecTitle"||d=="title_section ecTitle")
{
var e=jQuery(k).find("table tbody tr td");
if(e&&e.length==2)
{
var o=jQuery(e[0]).find("div a img")[0],
f=jQuery(e[1]).find("a")[0];
if(c=="link_expandAll")
{
SetClassName(o,"link_image_expand");
SetClassName(f,"link_expand");
g==true&&
SaveCollapseState(f)
}
else
if(c=="link_collapseAll")
{
SetClassName(o,"link_image_collapse");
SetClassName(f,"link_collapse");
g==true&&
SaveExpandState(f)
}
}
}
if(d=="collapse"||d=="expand")
{
var n=k;
if(c=="link_expandAll")
SetClassName(n,"expand");
else
c=="link_collapseAll"&&
SetClassName(n,"collapse")
}
}
}
}
}
}
function SetClassName(b,a)
{
if(b!=null&&a!=null&&a!="")
b.attributes["class"].value=a
}
function SetTextValue(b,a)
{
if(b!=null&&a!=null&&a!="")
b.innerHTML=a
}
function SaveExpandState(a)
{
a!=null&&a.id!=null&&
Ms.Wol.Cookies.SetCookie(a.id,Ms.Wol.ExpandCollapse.GetECExpandValue())
}
function SaveCollapseState(a)
{
a!=null&&a.id!=null&&
Ms.Wol.Cookies.SetCookie(a.id,Ms.Wol.ExpandCollapse.GetECCollapseValue())
}
function ReturnFalse(a)
{
if(a.preventDefault)
a.preventDefault();
else
return false
}
function DropDown_Changed(e)
{
var b=e.target;
if(b!=null)
{
var c=b.parentNode,
a=null;
while(c!=null&&a==null)
{
a=c.getElementsByTagName("a")[0];
c=c.parentNode
}
if(a!=null)
{
var d=b.options[b.selectedIndex].value;
if(d=="")
{
a.removeAttribute("href");
SetClassName(a,"nohref")
}
else
{
a.href=d;
SetClassName(a,"hashref")
}
}
}
}
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.ExpandCollapse=="undefined")
Ms.Wol.ExpandCollapse={};
Ms.Wol.ExpandCollapse=function()
{
jQuery(document).ready(b);
var a={_sExpandCookieValue:"e",_sCollapseCookieValue:"c"};
function b()
{
var c=jQuery("a.link_expandAll");
jQuery.each(c,function()
{
this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sExpandCookieValue&&
ExpandOrCollapseAllNodes(this,"link_expandAll",false)
});
var b=jQuery("a.link_collapseAll");
jQuery.each(b,function()
{
this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sCollapseCookieValue&&
ExpandOrCollapseAllNodes(this,"link_collapseAll",false)
});
var e=jQuery("a.link_expand");
jQuery.each(e,function()
{
this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sExpandCookieValue&&
ExpandOrCollapseSingleNode(this,"link_expand",false)
});
var d=jQuery("a.link_collapse");
jQuery.each(d,function()
{
this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sCollapseCookieValue&&
ExpandOrCollapseSingleNode(this,"link_collapse",false)
})
}
return {GetECExpandValue:function()
{
return a._sExpandCookieValue
},GetECCollapseValue:function()
{
return a._sCollapseCookieValue
}}
}();
if(typeof Sys!="undefined"&&typeof Sys.WebForms!="undefined"&&typeof Sys.WebForms.PageRequestManager!="undefined")
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(ButtonKeypress);
else
jQuery(document).ready(ButtonKeypress);
function ButtonKeypress()
{
jQuery("span.button>a").keypress(function(c)
{
if(c.which==32)
{
var a=jQuery(this).attr("href")!="undefined";
if(this.onClick)
if(this.onClick()==false)
a=false;
if(a)
{
if(this.click)
this.click();
else
{
var b=document.createEvent("MouseEvents");
b.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
this.dispatchEvent(b);
window.location.href=jQuery(this).attr("href")
}
ReturnFalse(c)
}
}
})
}
if(typeof Sys!="undefined"&&typeof Sys.WebForms!="undefined"&&typeof Sys.WebForms.PageRequestManager!="undefined")
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolDropDownPrep);
else
jQuery(document).ready(MsWolDropDownPrep);
function MsWolDropDownPrep()
{
var a=jQuery("select.dropdown_select");
a.change(DropDown_Changed);
jQuery.each(a,function()
{
jQuery(this).trigger("change")
})
}
function UpdateExpandCollapseAllLink(a)
{
if(a!=undefined)
{
var e=jQuery(a).children(".link_expandAll"),
d=jQuery(a).children(".link_collapseAll"),
c=jQuery(a).find("a.link_expand"),
b=jQuery(a).find("a.link_collapse");
c=c.filter(function()
{
return IsElementWithinDistance(jQuery(this)[0],a,7)
});
b=b.filter(function()
{
return IsElementWithinDistance(jQuery(this)[0],a,7)
});
if(jQuery(b).length>0)
{
jQuery(d).attr("class","link_expandAll");
jQuery(d).html(link_expandAllText)
}
else
if(jQuery(c).length>0)
{
jQuery(e).attr("class","link_collapseAll");
jQuery(e).html(link_collapseAllText)
}
}
}
if(typeof Sys!="undefined"&&typeof Sys.WebForms!="undefined"&&typeof Sys.WebForms.PageRequestManager!="undefined")
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolAOBIPatch);
else
jQuery(document).ready(MsWolAOBIPatch);
function MsWolAOBIPatch()
{
var d=navigator.appVersion.split(";")[1]==" MSIE 6.0",
a=navigator.appName=="Safari"||navigator.userAgent.indexOf("Safari")!=-1;
if(d||a)
{
var b=jQuery("div.section_oly-bg-stretch").parent();
b.each(function()
{
var a=jQuery(this),
b=a.children().children("img.embedObject");
b.height()<a.height()&&
b.height(a.height())
})
}
if(a)
{
var c=jQuery("div.wmpObjectDownlevel");
c.each(function()
{
var d=jQuery(this),
i=d.children("a"),
c=i.children("img"),
b=d.parent(),
h=b.parent(),
f=h.parent(),
e=f.parent(),
g=e.parent(),
a=b.children("div.wmpObjectDiv"),
j=a.children("object");
if(g.hasClass("section_oly")&&a.size()>0)
c.height()<a.height()&&
c.height(a.height())
})
}
};
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.Nav=="undefined")
Ms.Wol.Nav={};
Ms.Wol.Nav.Status=0;
jQuery(function()
{
var c="#bodyNavBar",
b="#bodyNavBar a",
a="div.menuGroupWrapper:visible";
if(Ms.Wol.Nav.TryAddTransitions())
{
jQuery(b).keydown(function(b)
{
var a=this.Transitions[Ms.Wol.Nav.GetKeyForTransitionFromEvent(b)];
if(typeof a!="undefined")
{
Ms.Wol.Nav.UpdateStyles(this,a);
Ms.Wol.Nav.FocusOnNext(this,a);
return false
}
return true
}).blur(function()
{
if(typeof this.InMenuBlur=="undefined"||!this.InMenuBlur)
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0
}
else
this.InMenuBlur=false
});
jQuery(Ms.Wol.Nav.FirstLink).keydown(function(a)
{
if(Ms.Wol.Nav.GetKeyForTransitionFromEvent(a)==Ms.Wol.Nav.GetKeyForTransition(9,true))
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0;
return true
}
});
jQuery(Ms.Wol.Nav.LastLink).keydown(function(a)
{
if(Ms.Wol.Nav.GetKeyForTransitionFromEvent(a)==Ms.Wol.Nav.GetKeyForTransition(9,false))
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0;
return true
}
});
jQuery(Ms.Wol.Nav.FirstMenuTitleLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
jQuery(Ms.Wol.Nav.LastMenuTitleLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1&&jQuery(this).siblings(a).length==0)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
var b=this.Transitions[Ms.Wol.Nav.GetKeyForTransition(38,false)];
if(typeof b!="undefined")
{
Ms.Wol.Nav.UpdateStyles(this,b);
Ms.Wol.Nav.FocusOnNext(this,b)
}
else
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
jQuery(Ms.Wol.Nav.LastLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
jQuery(c).mouseover(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=2
}
}).mousemove(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=2
}
}).mouseout(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=0
}
})
}
});
Ms.Wol.Nav.GetKeyForTransitionFromEvent=function(a)
{
var b=null;
if(typeof a.keyCode!="undefined")
b=a.keyCode;
else
if(typeof a.which!="undefined")
b=a.which;
var c=typeof a.shiftKey!="undefined"&&a.shiftKey;
return Ms.Wol.Nav.GetKeyForTransition(b,c)
};
Ms.Wol.Nav.GetKeyForTransition=function(a,b)
{
return String(a)+String(b)
};
Ms.Wol.Nav.AddTransition=function(b,d,c,a)
{
b.Transitions[Ms.Wol.Nav.GetKeyForTransition(d,c)]=a
};
Ms.Wol.Nav.AddBothTransitions=function(b,c,a)
{
Ms.Wol.Nav.AddTransition(b,c,true,a);
Ms.Wol.Nav.AddTransition(b,c,false,a)
};
Ms.Wol.Nav.TryAddTransitions=function()
{
var m="div.navMenu",
l="#bodyNavBar a",
k="menuItemLinkSimHover",
b=jQuery(l).each(function()
{
this.Transitions=Array();
this.originalStyle=this.className;
this.hoverStyle=k
}).get();
if(b.length>0)
{
Ms.Wol.Nav.FirstLink=b[0];
Ms.Wol.Nav.LastLink=b[b.length-1]
}
Ms.Wol.Nav.AddAllTabTransitions(b);
var a=jQuery(m).children().each(function()
{
if(!Ms.Wol.Nav.InitMenuTitle(this))
return false
}).get();
rtl=jQuery(a).css("direction")=="rtl";
for(i=1;i<a.length-1;i++)
{
var g=rtl?a[i+1].menuTitleLink:a[i-1].menuTitleLink,
f=rtl?a[i-1].menuTitleLink:a[i+1].menuTitleLink,
c=jQuery(a[i]).find("a").each(function()
{
this.menuTitle=a[i]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f)
}
if(a.length>0)
{
var j=rtl||a.length<=1,
h=rtl&&a.length>1,
d=a[0].menuTitleLink,
e=a[a.length-1].menuTitleLink;
Ms.Wol.Nav.FirstMenuTitleLink=d;
Ms.Wol.Nav.LastMenuTitleLink=e;
var g=h?a[1].menuTitleLink:e,
f=j?e:a[1].menuTitleLink,
c=jQuery(a[0]).find("a").each(function()
{
this.menuTitle=a[0]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f);
var g=j?d:a[a.length-2].menuTitleLink,
f=h?a[a.length-2].menuTitleLink:d,
c=jQuery(a[a.length-1]).find("a").each(function()
{
this.menuTitle=a[a.length-1]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f)
}
return true
};
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle=function(a,c,b)
{
for(j=1;j<a.length;j++)
{
Ms.Wol.Nav.AddBothTransitions(a[j],37,c);
Ms.Wol.Nav.AddBothTransitions(a[j],39,b);
Ms.Wol.Nav.AddBothTransitions(a[j],38,a[j-1]);
Ms.Wol.Nav.AddBothTransitions(a[j-1],40,a[j])
}
if(a.length>0)
{
Ms.Wol.Nav.AddBothTransitions(a[0],37,c);
Ms.Wol.Nav.AddBothTransitions(a[0],39,b);
Ms.Wol.Nav.AddBothTransitions(a[0],38,a[a.length-1]);
Ms.Wol.Nav.AddBothTransitions(a[a.length-1],40,a[0])
}
};
Ms.Wol.Nav.AddAllTabTransitions=function(a)
{
for(k=1;k<a.length;k++)
{
Ms.Wol.Nav.AddTransition(a[k],9,true,a[k-1]);
Ms.Wol.Nav.AddTransition(a[k-1],9,false,a[k])
}
};
Ms.Wol.Nav.InitMenuTitle=function(a)
{
var i="a.menuTitleLink,a.menuTitleLinkSelected",
h="div.menuGroupWrapper",
g="div.menuTitleUnderline",
e="menuTitleLinkSimHover",
f="menuTitleSimHover";
if(typeof a.menuTitleLink=="undefined")
{
a.originalStyle=a.className;
a.hoverStyle=f;
var c=jQuery(a).children(h),
b=jQuery(a).children(g);
if(c.length==1&&b.length==1)
{
a.menuGroupWrapper=c.get(0);
a.menuGroupWrapper.originalStyle=a.menuGroupWrapper.className;
a.menuGroupWrapper.hoverStyle=a.menuGroupWrapper.className+"SimHover";
a.menuTitleUnderline=b.get(0);
a.menuTitleUnderline.originalStyle=a.menuTitleUnderline.className;
a.menuTitleUnderline.hoverStyle=a.menuTitleUnderline.className+"SimHover"
}
var d=jQuery(a).children(i);
if(d.length==1)
{
a.menuTitleLink=d.get(0);
a.menuTitleLink.originalStyle=a.menuTitleLink.className;
a.menuTitleLink.hoverStyle=e
}
else
return false
}
return true
};
Ms.Wol.Nav.ApplyKeyboardStyles=function()
{
var a="div.navMenu span";
jQuery(a).each(function()
{
this.className=this.hoverStyle
})
};
Ms.Wol.Nav.RemoveKeyboardStyles=function(c)
{
var b="a.menuTitleLinkSimHover,div.menuGroupWrapperSimHover,div.menuTitleUnderlineSimHover,a.menuItemLinkSimHover,span.menuTitleSimHover",
a=jQuery(b);
c&&
a.blur();
a.each(function()
{
this.className=this.originalStyle
})
};
Ms.Wol.Nav.UpdateStyles=function(a,b)
{
if(a.menuTitle==b.menuTitle)
{
a.className=a.originalStyle;
Ms.Wol.Nav.DisplayMenuTitle(a.menuTitle);
b.className=b.hoverStyle
}
else
{
a.className=a.originalStyle;
Ms.Wol.Nav.HideMenuTitle(a.menuTitle);
Ms.Wol.Nav.DisplayMenuTitle(b.menuTitle);
b.className=b.hoverStyle
}
Ms.Wol.Nav.Status=1
};
Ms.Wol.Nav.FocusOnNext=function(a,b)
{
a.InMenuBlur=true;
jQuery(b).focus()
};
Ms.Wol.Nav.DisplayMenuTitle=function(a)
{
a.menuTitleLink.className=a.menuTitleLink.hoverStyle;
if(typeof a.menuGroupWrapper!="undefined")
{
a.menuGroupWrapper.className=a.menuGroupWrapper.hoverStyle;
a.menuTitleUnderline.className=a.menuTitleUnderline.hoverStyle
}
};
Ms.Wol.Nav.HideMenuTitle=function(a)
{
a.menuTitleLink.className=a.menuTitleLink.originalStyle;
if(typeof a.menuGroupWrapper!="undefined")
{
a.menuGroupWrapper.className=a.menuGroupWrapper.originalStyle;
a.menuTitleUnderline.className=a.menuTitleUnderline.originalStyle
}
};
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.Wmp=="undefined")
Ms.Wol.Wmp={};
Ms.Wol.Wmp=function()
{
var b=this;
this.Params={};
function e()
{
b.Params.documentUrl=document.URL;
b.autoPlay=false
}
e();
function a(b)
{
var a=jQuery(b);
a.removeClass("wmpObjectContainerInit");
a.removeClass("wmpObjectContainerReady");
a.addClass("wmpObjectContainerPlay")
}
function d(b)
{
var a=jQuery(b);
a.removeClass("wmpObjectContainerInit");
a.addClass("wmpObjectContainerReady")
}
function c(b)
{
var a=jQuery(b);
a.removeClass("wmpObjectContainerInit");
a.removeClass("wmpObjectContainerReady");
a.removeClass("wmpObjectContainerPlay");
a.addClass("wmpObjectContainerDisabled")
}
this.InitializePlayer=function(f,h,g)
{
if(typeof f=="undefined")
return;
var e=f.get(0);
if(typeof e!="object")
return;
try
{
if(typeof e.controls=="undefined")
{
c(e.parentElement.parentElement);
return
}
if(h=="True")
{
b.autoPlay=true;
a(e.parentElement.parentElement);
return
}
else
{
if(g=="True")
d(e.parentElement.parentElement);
else
a(e.parentElement.parentElement);
jQuery(e.parentElement.parentElement).find("a.wmpObjectImageA").click(function()
{
a(e.parentElement.parentElement);
e.controls.play();
return false
})
}
}
catch(i)
{
c(e.parentElement.parentElement);
return
}
}
};
if(typeof Sys!="undefined"&&typeof Sys.WebForms!="undefined"&&typeof Sys.WebForms.PageRequestManager!="undefined")
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolVideoHandler);
else
jQuery(document).ready(MsWolVideoHandler);
function MsWolVideoHandler()
{
try
{
jQuery("object.wmpObjectClass").each(function()
{
var a=jQuery(this),
j=a.attr("id"),
f=a.children("param[name=AutoStart]"),
h=f.attr("value"),
d=a.parent().parent(),
e=d.children("div.wmpObjectOverlay"),
g=e.children("a").children("img");
if(g.size()>0)
imagePresent="True";
else
imagePresent="False";
var i=new Ms.Wol.Wmp;
i.InitializePlayer(a,h,imagePresent);
if(typeof Ms.Wol.TabControl!="undefined"&&typeof Ms.Wol.TabControl.TabChangeEvent!="undefined")
if(a.parents(".tabBody").length>0)
{
var k=a.parents(".tabBody").get(0).id,
c=jQuery(this).attr("uniqueID"),
b=null;
if(typeof c=="undefined")
{
b=k+"_"+j;
jQuery(this).attr("uniqueID",b)
}
else
b=c;
Ms.Wol.TabControl.TabChangeEvent.Attach(b,function()
{
ReleaseWmpObjectInTab(arguments[0],b)
})
}
})
}
catch(a)
{
}
}
function ReleaseWmpObjectInTab(d,a)
{
if(d!=null&&a!=null&&a!="")
{
var b=jQuery('object.wmpObjectClass[uniqueID="'+a+'"]');
if(typeof b!="undefined")
{
var c=jQuery(b).get(0),
e=jQuery(d).parents(".tabBody").get(0);
if(c!=null&&e!=null)
{
var f=e.id;
if(b.parents("#"+f).length>0)
if(typeof c.playState!="undefined")
{
c.close();
Ms.Wol.TabControl.TabChangeEvent.Detach(a)
}
}
}
}
};
if(typeof Wol=="undefined")
Wol={};
if(typeof Wol.Logging=="undefined")
Wol.Logging={};
jQuery(function()
{
jQuery("object.wmpObjectClass").each(function()
{
var a=this;
if(this.addEventListener)
this.addEventListener("PlayStateChange",function(b)
{
Wol.Logging.LogVideoPlayStateChangeEvent(a,b);
a.lastState=b
},false);
else
this.attachEvent&&
this.attachEvent("PlayStateChange",function(b)
{
Wol.Logging.LogVideoPlayStateChangeEvent(a,b);
a.lastState=b
})
})
});
Wol.Logging.LogVideoPlayStateChangeEvent=function(a,b)
{
if(b==1||b==2||b==8)
a.videoPlayed=false;
else
if(b==3&&!a.videoPlayed)
{
a.videoPlayed=true;
if(a&&a.object&&a.object.currentMedia&&a.object.currentMedia.name)
$BSI.reportEvent("ReadViewed.Content.VideoView",{VideoName:a.object.currentMedia.name});
else
a&&a.object&&a.object.URL&&
$BSI.reportEvent("ReadViewed.Content.VideoView",{VideoName:a.object.URL})
}
}