/**
 * Created by parkjaesung on 2016. 12. 4..
 */

$(document).ready(function(){
    workspaceInit();
});

var workspace;
function workspaceInit() {
    workspace = Blockly.inject('blocklyDiv',
        {
            media: '../../media/',
            toolbox: document.getElementById('toolbox')
        });
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
        workspace);
}
loadCode();

function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    alert(code);

}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
}

function saveCode(){
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);

    var xmlRequest;
    var params = 'xml=' + xml_text;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlRequest=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlRequest=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlRequest.onreadystatechange=function()
    {
        if (xmlRequest.readyState==4 && xmlRequest.status==200)
        {
            msg = xmlRequest.responseText;
            //alert(msg);
            document.getElementById('statlabel').innerHTML = "저장됨";
        }
    }
    xmlRequest.open("POST",'/project/workspace/<%= projectname%>',true);
    xmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
    xmlRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
    xmlRequest.setRequestHeader("Pragma","no-cache");
    xmlRequest.send(params);
}

function loadCode(){
    console.log('loadCode function ');
    console.log('<%= projectxml%>')
    var xml = Blockly.Xml.textToDom(htmlDecode('<%= projectxml%>'));
    Blockly.Xml.domToWorkspace(xml, workspace);
}

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}

/**
 sample of loading workspace
 var xml = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_if" id="[W2ba[1axfs/Z,gzSg`[" x="183" y="188"></block></xml>');
 Blockly.Xml.domToWorkspace(xml, workspace);
 alert('Load Source Code!');
 */

/**
 sample of saving workspace
 var xml = Blockly.Xml.workspaceToDom(workspace);
 xml_text = Blockly.Xml.domToText(xml);
 console.log(xml_text);
 */

function onFirstComment(event) {
    document.getElementById('statlabel').innerHTML = "저장하기";
    //TODO 자동저장, autosave
    //saveCode();
}
workspace.addChangeListener(onFirstComment);