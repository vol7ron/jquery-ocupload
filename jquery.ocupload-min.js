/*
  One Click Upload - jQuery Plugin
 --------------------------------

 Copyright (c) 2008 Michael Mitchell - http://www.michaelmitchell.co.nz
 Copyright (c) 2011 Andrey Fedoseev <andrey.fedoseev@gmail.com> - http://andreyfedoseev.name
 Copyright (c) 2012 vol7ron <supervolting@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */
(function($){$.fn.upload=function(options){options=$.extend({name:'file',enctype:'multipart/form-data',action:'',autoSubmit:true,onSubmit:function(){},onComplete:function(){},onSelect:function(){},params:{}},options);return new $.ocupload(this,options)};$.ocupload=function(element,options){var self=this;var id=new Date().getTime().toString();var iframe=$("<iframe></iframe>",{id:"iframe"+id,name:"iframe"+id}).css({display:"none"});var form=$("<form></form>",{method:"post",enctype:options.enctype,action:options.action,target:"iframe"+id}).css({margin:0,padding:0});var element_cursor=element.css('cursor');var input=$("<input>",{name:options.name+'[]',multiple:'multiple',type:'file'}).css({position:'absolute',display:'none',cursor:element_cursor,opacity:0});element.wrap("<div></div>");form.append(input);element.after(form);element.after(iframe);element.click(function(){input.click()});var container=element.parent().css({position:'relative',display:element.css('display'),overflow:'hidden',cursor:element_cursor,margin:0,padding:0});input.change(function(){self.onSelect(self.filename());if(self.autoSubmit){self.submit()}});$.extend(this,{autoSubmit:options.autoSubmit,onSubmit:options.onSubmit,onComplete:options.onComplete,onSelect:options.onSelect,filename:function(){return input.val()},params:function(params){params=params?params:false;if(params){options.params=$.extend(options.params,params)}else{return options.params}},name:function(name){name=name?name:false;if(name){input.attr('name',value)}else{return input.attr('name')}},action:function(action){action=action?action:false;if(action){form.attr('action',action)}else{return form.attr('action')}},enctype:function(enctype){enctype=enctype?enctype:false;if(enctype){form.attr('enctype',enctype)}else{return form.attr('enctype')}},set:function(obj,value){value=value?value:false;function option(action,value){switch(action){case'name':self.name(value);break;case'action':self.action(value);break;case'enctype':self.enctype(value);break;case'params':self.params(value);break;case'autoSubmit':self.autoSubmit=value;break;case'onSubmit':self.onSubmit=value;break;case'onComplete':self.onComplete=value;break;case'onSelect':self.onSelect=value;break;default:throw new Error("[jQuery.ocupload.set] '"+action+"' is an invalid option.");}}if(value){option(obj,value)}else{$.each(obj,function(key,value){option(key,value)})}},submit:function(){var exit=this.onSubmit();if(exit)return;$(".ocupload-"+id,form).remove();$.each(options.params,function(key,value){form.append($("<input>",{type:"hidden",name:key,value:value,'class':"ocupload-"+id}))});form.submit();iframe.unbind().load(function(){var myFrame=document.getElementById(iframe.attr('name'));var response=$(myFrame.contentWindow.document.body).text();self.onComplete(response)})}})}})(jQuery);
