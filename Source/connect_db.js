main();  

function main()  
{  




var fso  = new ActiveXObject("Scripting.FileSystemObject");
var fh = fso.CreateTextFile("edgelist.js", true);
 alert(getCurrentDirectory())

getCurrentDirectory()
  DP = "SQLOLEDB";  
  DS = "edmdbp";  
  DB = "EDM_PROD";  

  adOpenForwardOnly = 0;  
  adLockReadOnly = 1;  
  adCmdText = 1;  
  try   
  {  
    var objRs = new ActiveXObject("ADODB.Recordset");  
  }  
  catch (e)  
  {  
    alert("ADODB namespace not found.");  
    exit(0);  
  }  

  strConn =  "Provider="         +DP+  
            ";Initial Catalog="  +DB+  
            ";Data Source="      +DS+  
            ";Integrated Security=SSPI;"  
  strComm = "select pro.name [processname], comp.name as [componenttype], src_pro_obj.[schema] as [srcschema], src_pro_obj.name as [srctablename], tgt_pro_obj.[schema] as [tgtschema], tgt_pro_obj.name as [tgttablename] from  cadis_sys.CO_PROCESSDBOBJECT src_pro_obj join cadis_sys.CO_PROCESSDBOBJECT tgt_pro_obj on src_pro_obj.GUID=tgt_pro_obj.GUID JOIN CADIS_SYS.CO_COMPONENT comp On comp.ID=src_pro_obj.COMPONENTTYPE JOIN CADIS_SYS.VW_ALL_PROCESSES pro On pro.COMPONENTID=src_pro_obj.COMPONENTTYPE AND src_pro_obj.GUID=pro.GUID where src_pro_obj.DIRECTION=0 and tgt_pro_obj.DIRECTION=1 and src_pro_obj.TYPE in (1,2) and  tgt_pro_obj.TYPE in (1,2)" 
  //strComm = "select distinct  src_pro_obj.[schema] as [schema], src_pro_obj.name as [table name] from cadis_sys.CO_PROCESSDBOBJECT src_pro_obj where src_pro_obj.TYPE in (1,2)"

  

  
  
  
  objRs.open(strComm,   
             strConn,   
             adOpenForwardOnly,  
             adLockReadOnly,  
             adCmdText);  

  objRs.MoveFirst(); 
  nrow = 0;

  output = "{"
  records = []
   objRs.MoveNext();
   output = "var my_links = ["
   output = output + writerecord(fh, objRs, 1)
  while (objRs.EOF != true)   
  {  
	
	
	output = output + writerecord(fh, objRs, 0)
    nrow++
    objRs.MoveNext();  
  }  
  
	fh.WriteLine(output + "]");
	objRs.Close  
	objRs = null; 
	fh.Close();  

}  

function alert(str)  
{  
  WScript.Echo(str);  
}
function writerecord(fh, objRs, first){
	//source
	str1 = (first == 1 ? "" : ",")  +     "{" + "\"source\" : \"" + objRs.Fields.Item("srcschema") + "." + objRs.Fields.Item("srctablename") + "\","; 
	//target 
	str2 = "\"target\" : \"" + objRs.Fields.Item("tgtschema") + "." + objRs.Fields.Item("tgttablename") + "\",";
	//label
	str3 = "\"label\" : \"" + objRs.Fields.Item("processname") + " [" + objRs.Fields.Item("componenttype") + "]\"" + "} \n";
	return str1 + str2 + str3
}
function getCurrentDirectory()
{
    var fso=new ActiveXObject("Scripting.FileSystemObject");
	alert(fso.GetAbsolutePathName("connect_db.js"));

   // path = unescape(document.location); //replace %20 with " ", etc.
   // path = path.substring(8,path.lastIndexOf("/")+1); //chop off "file:///" and file name

   // return path;
}