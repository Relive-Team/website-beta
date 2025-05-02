jQuery('.table_fb_table td p:last').addClass('fb_hidden_p');if(typeof Ms=='undefined')Ms={};if(typeof Ms.Wol=='undefined')Ms.Wol={};if(typeof Ms.Wol.CP=='undefined')Ms.Wol.CP={};Ms.Wol.CP.FB={CreateLike:function(){var testNumber=new RegExp('^([0-9]*|\d*\.\d{1}?\d*)$');var testBoolean=new RegExp('^(true|false)$');var testCulture=new RegExp('^([a-z][a-z]_[A-Z][A-Z])$');var testUrl=new RegExp('^http://windows.microsoft.com/|'+'http://office.microsoft.com/|'+'http://explore.live.com/|'+'http://fb.windows.com/|'+'http://www.facebook.com/|'+'http://www.microsoft.com/');var prefixes=new RegExp('^http://prev.|http://test.$');jQuery('.table_fb_table').each(function(index){var width=260;var height=58;var culture='';var showFaces='false';var paramsAreValid='true';try{var strParams=jQuery(this).contents().find('td p:last a').attr('href');var targetUrl=(strParams.indexOf('?')>-1)?strParams.substring(0,strParams.indexOf('?')).replace(prefixes,'http://'):strParams.replace(prefixes,'http://');strParams=strParams.substr(strParams.indexOf('?')+1);paramsAreValid=testUrl.test(targetUrl);var arrParams=new Array();arrParams=strParams.split('&');for(var x=0,y=arrParams.length;x<y;x++){var strName=arrParams[x].split("=")[0];var strValue=arrParams[x].split("=")[1];switch(strName){case 'usethispage':(strValue.toLowerCase()==='true')?targetUrl=document.location.href.replace(prefixes,'http://'):null;break;case 'width':(testNumber.test(strValue))?width=strValue:paramsAreValid=false;break;case 'height':(testNumber.test(strValue))?height=strValue:paramsAreValid=false;break;case 'culture':(testCulture.test(strValue))?culture=strValue:paramsAreValid=false;break;case 'showfaces':(testBoolean.test(strValue.toLowerCase()))?showFaces=strValue.toLowerCase():paramsAreValid=false;break;}}if(paramsAreValid){var iFrame='<iframe class=\'fb_iframe\' src=\'http://www.facebook.com/plugins/like.php?';if(culture!='')iFrame+='locale='+culture+'&amp;';iFrame+='href='+escape(targetUrl)+'&amp;layout=standard&amp;width='+width+'&amp;show_faces='+showFaces+'&amp;action=like&amp;colorscheme=light&amp;font=segoe+ui&amp;height='+height+'\' scrolling=\'no\' frameborder=\'0\' style=\'width:'+width+'px; height:'+height+'px;\' allowTransparency></iframe>';jQuery(this).contents().find('td p:last').empty().append(iFrame);}jQuery(this).contents().find('td p:last').removeClass('fb_hidden_p');}catch(e){}});}};jQuery(document).ready(function(){Ms.Wol.CP.FB.CreateLike();});﻿

}

/*
﻿playback timings (ms):
﻿  ﻿captures_list﻿: ﻿0.567﻿
﻿  ﻿exclusion.robots﻿: ﻿0.021﻿
﻿  ﻿exclusion.robots.policy﻿: ﻿0.012﻿
﻿  ﻿esindex﻿: ﻿0.009﻿
﻿  ﻿cdx.remote﻿: ﻿5.248﻿
﻿  ﻿LoadShardBlock﻿: ﻿272.262﻿ (﻿6﻿)
﻿  ﻿PetaboxLoader3.datanode﻿: ﻿255.651﻿ (﻿8﻿)
﻿  ﻿load_resource﻿: ﻿171.503﻿ (﻿2﻿)
﻿  ﻿PetaboxLoader3.resolve﻿: ﻿97.255﻿ (﻿2﻿)
﻿*/