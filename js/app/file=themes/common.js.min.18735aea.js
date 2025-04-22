enable_tts=false;function push_data_to_gradio_component(DAT,ELEM_ID,TYPE){if(TYPE=="str"){}
else if(TYPE=="obj"){}
else if(TYPE=="no_conversion"){}
else if(TYPE=="float"){DAT=parseFloat(DAT);}
const myEvent=new CustomEvent('gpt_academic_update_gradio_component',{detail:{data:DAT,elem_id:ELEM_ID,}});window.dispatchEvent(myEvent);}
async function get_gradio_component(ELEM_ID){function waitFor(ELEM_ID){return new Promise((resolve)=>{const myEvent=new CustomEvent('gpt_academic_get_gradio_component_value',{detail:{elem_id:ELEM_ID,resolve,}});window.dispatchEvent(myEvent);});}
result=await waitFor(ELEM_ID);return result;}
async function get_data_from_gradio_component(ELEM_ID){let comp=await get_gradio_component(ELEM_ID);return comp.props.value;}
function update_array(arr,item,mode){const index=arr.indexOf(item);if(mode==="remove"){if(index!==-1){arr.splice(index,1);}}else if(mode==="add"){if(index===-1){arr.push(item);}}
return arr;}
function gradioApp(){const elems=document.getElementsByTagName('gradio-app');const elem=elems.length==0?document:elems[0];if(elem!==document){elem.getElementById=function(id){return document.getElementById(id);};}
return elem.shadowRoot?elem.shadowRoot:elem;}
function setCookie(name,value,days){var expires="";if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toUTCString();}
document.cookie=name+"="+value+expires+"; path=/";}
function getCookie(name){var decodedCookie=decodeURIComponent(document.cookie);var cookies=decodedCookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=cookies[i].trim();if(cookie.indexOf(name+"=")===0){return cookie.substring(name.length+1,cookie.length);}}
return null;}
let toastCount=0;function toast_push(msg,duration){duration=isNaN(duration)?3000:duration;const existingToasts=document.querySelectorAll('.toast');existingToasts.forEach(toast=>{toast.style.top=`${parseInt(toast.style.top, 10) - 70}px`;});const m=document.createElement('div');m.innerHTML=msg;m.classList.add('toast');m.style.cssText=`font-size: var(--text-md) !important; color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0.6); padding: 10px 15px; border-radius: 4px; position: fixed; top: ${50 + toastCount * 70}%; left: 50%; transform: translateX(-50%); width: auto; text-align: center; transition: top 0.3s;`;document.body.appendChild(m);setTimeout(function(){m.style.opacity='0';setTimeout(function(){document.body.removeChild(m);toastCount--;},500);},duration);toastCount++;}
function toast_up(msg){var m=document.getElementById('toast_up');if(m){document.body.removeChild(m);}
m=document.createElement('div');m.id='toast_up';m.innerHTML=msg;m.style.cssText="font-size: var(--text-md) !important; color: rgb(255, 255, 255); background-color: rgba(0, 0, 100, 0.6); padding: 10px 15px; margin: 0 0 0 -60px; border-radius: 4px; position: fixed; top: 50%; left: 50%; width: auto; text-align: center;";document.body.appendChild(m);}
function toast_down(){var m=document.getElementById('toast_up');if(m){document.body.removeChild(m);}}
function begin_loading_status(){var loader=document.createElement('div');loader.id='Js_File_Loading';var C1=document.createElement('div');var C2=document.createElement('div');C1.style.position="fixed";C1.style.top="50%";C1.style.left="50%";C1.style.width="80px";C1.style.height="80px";C1.style.borderLeft="12px solid #00f3f300";C1.style.borderRight="12px solid #00f3f300";C1.style.borderTop="12px solid #82aaff";C1.style.borderBottom="12px solid #82aaff";C1.style.borderRadius="50%";C1.style.margin="-40px 0 0 -40px";C1.style.animation="spinAndPulse 2s linear infinite";C2.style.position="fixed";C2.style.top="50%";C2.style.left="50%";C2.style.width="40px";C2.style.height="40px";C2.style.borderLeft="12px solid #00f3f300";C2.style.borderRight="12px solid #00f3f300";C2.style.borderTop="12px solid #33c9db";C2.style.borderBottom="12px solid #33c9db";C2.style.borderRadius="50%";C2.style.margin="-20px 0 0 -20px";C2.style.animation="spinAndPulse2 2s linear infinite";loader.appendChild(C1);loader.appendChild(C2);document.body.appendChild(loader);var styleSheet=document.createElement('style');styleSheet.id='Js_File_Loading_Style';styleSheet.textContent=`
    @keyframes spinAndPulse {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(90deg) scale(1.1); }
        50% { transform: rotate(180deg) scale(1); }
        75% { transform: rotate(270deg) scale(0.9); }
        100% { transform: rotate(360deg) scale(1); }
    }

    @keyframes spinAndPulse2 {
        0% { transform: rotate(-90deg);}
        25% { transform: rotate(-180deg);}
        50% { transform: rotate(-270deg);}
        75% { transform: rotate(-360deg);}
        100% { transform: rotate(-450deg);}
    }
    `;document.head.appendChild(styleSheet);}
function cancel_loading_status(){var loadingElement=document.getElementById('Js_File_Loading');if(loadingElement){document.body.removeChild(loadingElement);}
var loadingStyle=document.getElementById('Js_File_Loading_Style');if(loadingStyle){document.head.removeChild(loadingStyle);}
let clearButton=document.querySelectorAll('div[id*="elem_upload"] button[aria-label="Clear"]');for(let button of clearButton){button.addEventListener('click',function(){setTimeout(function(){register_upload_event();},50);});}}
function decompressString(compressedString){const binaryString=atob(compressedString);const bytes=new Uint8Array(binaryString.length);for(let i=0;i<binaryString.length;i++){bytes[i]=binaryString.charCodeAt(i);}
const ds=new DecompressionStream('gzip');const decompressedStream=new Response(new Blob([bytes])).body.pipeThrough(ds);return new Response(decompressedStream).text();}
var allow_auto_read_continously=true;var allow_auto_read_tts_flag=false;function addCopyButton(botElement,index,is_last_in_arr){const copiedIcon='<span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg></span>';const copyIcon='<span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span>';const audioIcon='<span><svg t="1713628577799" fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4587" width=".9em" height=".9em"><path d="M113.7664 540.4672c0-219.9552 178.2784-398.2336 398.2336-398.2336S910.2336 320.512 910.2336 540.4672v284.4672c0 31.4368-25.4976 56.9344-56.9344 56.9344h-56.9344c-31.4368 0-56.9344-25.4976-56.9344-56.9344V597.2992c0-31.4368 25.4976-56.9344 56.9344-56.9344h56.9344c0-188.5184-152.7808-341.2992-341.2992-341.2992S170.7008 351.9488 170.7008 540.4672h56.9344c31.4368 0 56.9344 25.4976 56.9344 56.9344v227.5328c0 31.4368-25.4976 56.9344-56.9344 56.9344h-56.9344c-31.4368 0-56.9344-25.4976-56.9344-56.9344V540.4672z" p-id="4588"></path></svg></span>';if(allow_auto_read_continously&&is_last_in_arr&&allow_auto_read_tts_flag){process_latest_text_output(botElement.innerText,index);}
const messageBtnColumnElement=botElement.querySelector('.message-btn-row');if(messageBtnColumnElement){return;}
var copyButtonOrig=document.createElement('button');copyButtonOrig.classList.add('copy-bot-btn');copyButtonOrig.setAttribute('aria-label','Copy');copyButtonOrig.innerHTML=copyIcon;copyButtonOrig.addEventListener('click',async()=>{try{const base64gzipcode=botElement.getElementsByClassName('raw_text')[0].innerText;const textToCopy=await decompressString(base64gzipcode);if("clipboard"in navigator){await navigator.clipboard.writeText(textToCopy);copyButtonOrig.innerHTML=copiedIcon;setTimeout(()=>{copyButtonOrig.innerHTML=copyIcon;},1500);}else{const textArea=document.createElement("textarea");textArea.value=textToCopy;document.body.appendChild(textArea);textArea.select();try{document.execCommand('copy');copyButtonOrig.innerHTML=copiedIcon;setTimeout(()=>{copyButtonOrig.innerHTML=copyIcon;},1500);}catch(error){console.error("Copy failed: ",error);}
document.body.removeChild(textArea);}}catch(error){console.error("Copy failed: ",error);}});if(enable_tts){var audioButton=document.createElement('button');audioButton.classList.add('audio-toggle-btn');audioButton.innerHTML=audioIcon;audioButton.addEventListener('click',async()=>{if(audioPlayer.isPlaying){allow_auto_read_tts_flag=false;toast_push('自动朗读已禁用。',3000);audioPlayer.stop();setCookie("js_auto_read_cookie","False",365);}else{allow_auto_read_tts_flag=true;toast_push('正在合成语音 & 自动朗读已开启 (再次点击此按钮可禁用自动朗读)。',3000);const readText=botElement.innerText;prev_chatbot_index=index;prev_text=readText;prev_text_already_pushed=readText;push_text_to_audio(readText);setCookie("js_auto_read_cookie","True",365);}});}
var messageBtnColumn=document.createElement('div');messageBtnColumn.classList.add('message-btn-row');messageBtnColumn.appendChild(copyButtonOrig);if(enable_tts){messageBtnColumn.appendChild(audioButton);}
botElement.appendChild(messageBtnColumn);}
let timeoutID=null;let lastInvocationTime=0;let lastArgs=null;function do_something_but_not_too_frequently(min_interval,func){return function(...args){lastArgs=args;const now=Date.now();if(!lastInvocationTime||(now-lastInvocationTime)>=min_interval){lastInvocationTime=now;setTimeout(()=>{func.apply(this,lastArgs);},0);}else if(!timeoutID){timeoutID=setTimeout(()=>{timeoutID=null;lastInvocationTime=Date.now();func.apply(this,lastArgs);},min_interval-(now-lastInvocationTime));}else{}}}
function chatbotContentChanged(attempt=1,force=false){for(var i=0;i<attempt;i++){setTimeout(()=>{const messages=gradioApp().querySelectorAll('#gpt-chatbot .message-wrap .message.bot');messages.forEach((message,index,arr)=>{const is_last_in_arr=index===arr.length-1;addCopyButton(message,index,is_last_in_arr);addStopButton(message,index,is_last_in_arr);save_conversation_history_slow_down();});},i===0?0:200);}}
function addStopButton(botElement,index,is_last_in_arr){function is_generating(){var statePanelElement=document.getElementById("state-panel");var generatingElement=statePanelElement.querySelector(".generating");if(generatingElement){return true;}else{return false;}}
function on_stop_btn_click(){let stopButton=document.getElementById("elem_stop");stopButton.click();}
function remove_stop_generate_btn(messageTailElement){while(messageTailElement.firstChild){messageTailElement.removeChild(messageTailElement.firstChild);}
messageTailElement.style.display='none';messageTailElement.classList.add('removed');}
function add_stop_generate_btn(){console.log("get_gradio_component")
const bottomElement=document.createElement('button');bottomElement.className='ant-btn ant-btn-primary';bottomElement.innerHTML=`
            <span class="ant-btn-icon">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="anticon anticon-sync anticon-spin">
                <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path>
                </svg>
            </span>
            <span>终止</span>
        `;bottomElement.classList.add('message_tail_stop');bottomElement.addEventListener('click',on_stop_btn_click);messageTailElement.appendChild(bottomElement);}
const messageTailElement=botElement.querySelector('.message_tail');if(!messageTailElement){return;}
if(messageTailElement.classList.contains('removed')){return;}
if(!is_last_in_arr){remove_stop_generate_btn(messageTailElement);return;}
messageTailElement.style.display='flex';const messageTailStopElem=messageTailElement.querySelector('.message_tail_stop');if(!is_generating()){setTimeout(()=>{if(!is_generating()){remove_stop_generate_btn(messageTailElement);return;}else{if(!messageTailStopElem){add_stop_generate_btn()}}},500);}else{if(!messageTailStopElem){add_stop_generate_btn()}}}
function chatbotAutoHeight(){function update_height(){var{height_target,chatbot_height,chatbot}=get_elements(true);if(height_target!=chatbot_height){var pixelString=height_target.toString()+'px';chatbot.style.maxHeight=pixelString;chatbot.style.height=pixelString;}}
function update_height_slow(){var{height_target,chatbot_height,chatbot}=get_elements();if(height_target!=chatbot_height){new_panel_height=(height_target-chatbot_height)*0.5+chatbot_height;if(Math.abs(new_panel_height-height_target)<10){new_panel_height=height_target;}
var pixelString=new_panel_height.toString()+'px';chatbot.style.maxHeight=pixelString;chatbot.style.height=pixelString;}}
monitoring_input_box()
update_height();window.addEventListener('resize',function(){update_height();});window.addEventListener('scroll',function(){update_height_slow();});setInterval(function(){update_height_slow()},50);}
swapped=false;function swap_input_area(){var element1=document.querySelector("#input-panel");var element2=document.querySelector("#basic-panel");var parent=element1.parentNode;var nextSibling=element2.nextSibling;parent.insertBefore(element2,element1);parent.insertBefore(element1,nextSibling);if(swapped){swapped=false;}
else{swapped=true;}}
function get_elements(consider_state_panel=false){var chatbot=document.querySelector('#gpt-chatbot > div.wrap.svelte-18telvq');if(!chatbot){chatbot=document.querySelector('#gpt-chatbot');}
const panel1=document.querySelector('#input-panel').getBoundingClientRect();const panel2=document.querySelector('#basic-panel').getBoundingClientRect()
const panel3=document.querySelector('#plugin-panel').getBoundingClientRect();const panel_active=document.querySelector('#state-panel').getBoundingClientRect();if(consider_state_panel||panel_active.height<25){document.state_panel_height=panel_active.height;}
var height_target=panel1.height+panel2.height+panel3.height+0+0-25+16*2;height_target=height_target+(document.state_panel_height-panel_active.height)
var height_target=parseInt(height_target);var chatbot_height=chatbot.style.height;if(!swapped){if(panel1.top!=0&&(0.9*panel1.bottom+0.1*panel1.top)<0){swap_input_area();}}
else if(swapped){if(panel2.top!=0&&panel2.top>0){swap_input_area();}}
const err_tor=5;if(Math.abs(panel1.left-chatbot.getBoundingClientRect().left)<err_tor){height_target=window.innerHeight*0.6;}else{const chatbot_height_exceed=15;const chatbot_height_exceed_m=10;b_panel=Math.max(panel1.bottom,panel2.bottom,panel3.bottom)
if(b_panel>=window.innerHeight-chatbot_height_exceed){height_target=window.innerHeight-chatbot.getBoundingClientRect().top-chatbot_height_exceed_m;}
else if(b_panel<window.innerHeight*0.75){height_target=window.innerHeight*0.8;}}
var chatbot_height=parseInt(chatbot_height);return{height_target,chatbot_height,chatbot};}
var elem_upload=null;var elem_upload_float=null;var elem_input_main=null;var elem_input_float=null;var elem_chatbot=null;var elem_upload_component_float=null;var elem_upload_component=null;var exist_file_msg='⚠️请先删除上传区（左上方）中的历史文件，再尝试上传。'
function locate_upload_elems(){elem_upload=document.getElementById('elem_upload')
elem_upload_float=document.getElementById('elem_upload_float')
elem_input_main=document.getElementById('user_input_main')
elem_input_float=document.getElementById('user_input_float')
elem_chatbot=document.getElementById('gpt-chatbot')
elem_upload_component_float=elem_upload_float.querySelector("input[type=file]");elem_upload_component=elem_upload.querySelector("input[type=file]");}
async function upload_files(files){let totalSizeMb=0
elem_upload_component_float=elem_upload_float.querySelector("input[type=file]");if(files&&files.length>0){if(elem_upload_component_float){for(let i=0;i<files.length;i++){totalSizeMb+=files[i].size/1024/1024;}
if(totalSizeMb>20){toast_push('⚠️文件夹大于 20MB 🚀上传文件中',3000);}
let event=new Event("change");Object.defineProperty(event,"target",{value:elem_upload_component_float,enumerable:true});Object.defineProperty(event,"currentTarget",{value:elem_upload_component_float,enumerable:true});Object.defineProperty(elem_upload_component_float,"files",{value:files,enumerable:true});elem_upload_component_float.dispatchEvent(event);}else{toast_push(exist_file_msg,3000);}}}
function register_func_paste(input){let paste_files=[];if(input){input.addEventListener("paste",async function(e){const clipboardData=e.clipboardData||window.clipboardData;const items=clipboardData.items;if(items){for(i=0;i<items.length;i++){if(items[i].kind==="file"){const file=items[i].getAsFile();paste_files.push(file);e.preventDefault();}}
if(paste_files.length>0){await upload_files(paste_files);paste_files=[]}}});}}
function register_func_drag(elem){if(elem){const dragEvents=["dragover"];const leaveEvents=["dragleave","dragend","drop"];const onDrag=function(e){e.preventDefault();e.stopPropagation();if(elem_upload_float.querySelector("input[type=file]")){toast_up('⚠️释放以上传文件')}else{toast_up(exist_file_msg)}};const onLeave=function(e){toast_down();e.preventDefault();e.stopPropagation();};dragEvents.forEach(event=>{elem.addEventListener(event,onDrag);});leaveEvents.forEach(event=>{elem.addEventListener(event,onLeave);});elem.addEventListener("drop",async function(e){const files=e.dataTransfer.files;await upload_files(files);});}}
function elem_upload_component_pop_message(elem){if(elem){const dragEvents=["dragover"];const leaveEvents=["dragleave","dragend","drop"];dragEvents.forEach(event=>{elem.addEventListener(event,function(e){e.preventDefault();e.stopPropagation();if(elem_upload_float.querySelector("input[type=file]")){toast_up('⚠️释放以上传文件')}else{toast_up(exist_file_msg)}});});leaveEvents.forEach(event=>{elem.addEventListener(event,function(e){toast_down();e.preventDefault();e.stopPropagation();});});elem.addEventListener("drop",async function(e){toast_push('正在上传中，请稍等。',2000);begin_loading_status();});}}
function register_upload_event(){locate_upload_elems();if(elem_upload_float){_upload=document.querySelector("#elem_upload_float div.center.boundedheight.flex")
elem_upload_component_pop_message(_upload);}
if(elem_upload_component_float){elem_upload_component_float.addEventListener('change',function(event){toast_push('正在上传中，请稍等。',2000);begin_loading_status();});}
if(elem_upload_component){elem_upload_component.addEventListener('change',function(event){toast_push('正在上传中，请稍等。',2000);begin_loading_status();});}else{toast_push("oppps",3000);}}
function monitoring_input_box(){register_upload_event();if(elem_input_main){if(elem_input_main.querySelector("textarea")){register_func_paste(elem_input_main.querySelector("textarea"));}}
if(elem_input_float){if(elem_input_float.querySelector("textarea")){register_func_paste(elem_input_float.querySelector("textarea"));}}
if(elem_chatbot){register_func_drag(elem_chatbot);}}
window.addEventListener("DOMContentLoaded",function(){gradioApp().addEventListener("render",monitoring_input_box);});function audio_fn_init(){let audio_component=document.getElementById('elem_audio');if(audio_component){let buttonElement=audio_component.querySelector('button');let specificElement=audio_component.querySelector('.hide.sr-only');specificElement.remove();buttonElement.childNodes[1].nodeValue='启动麦克风';buttonElement.addEventListener('click',function(event){event.stopPropagation();toast_push('您启动了麦克风!下一步请点击“实时语音对话”启动语音对话。');});let buttons=document.querySelectorAll('button');let audio_button=null;for(let button of buttons){if(button.textContent.includes('语音')){audio_button=button;break;}}
if(audio_button){audio_button.addEventListener('click',function(){toast_push('您点击了“实时语音对话”启动语音对话。');});let parent_element=audio_component.parentElement;audio_button.appendChild(audio_component);buttonElement.style.cssText='border-color: #00ffe0;border-width: 2px; height: 25px;'
parent_element.remove();audio_component.style.cssText='width: 250px;right: 0px;display: inline-flex;flex-flow: row-reverse wrap;place-content: stretch space-between;align-items: center;background-color: #ffffff00;';}}}
function minor_ui_adjustment(){let cbsc_area=document.getElementById('cbsc');cbsc_area.style.paddingTop='15px';var bar_btn_width=[];function auto_hide_toolbar(){const elem_chatbot=document.getElementById('gpt-chatbot');const chatbot_top=elem_chatbot.getBoundingClientRect().top;var tooltip=document.getElementById('tooltip');var tab_nav=tooltip.getElementsByClassName('tab-nav')[0];if(chatbot_top<20){if(tab_nav.classList.contains('visible')){tab_nav.classList.remove('visible');}
if(!tab_nav.classList.contains('hidden')){tab_nav.classList.add('hidden');}
return;}
if(tab_nav.classList.contains('hidden')){tab_nav.classList.remove('hidden');}
if(!tab_nav.classList.contains('visible')){tab_nav.classList.add('visible');}
if(tab_nav.length==0){return;}
var btn_list=tab_nav.getElementsByTagName('button')
if(btn_list.length==0){return;}
var page_width=document.documentElement.clientWidth;const always_preserve=2;var cur_right=btn_list[always_preserve-1].getBoundingClientRect().right;if(bar_btn_width.length==0){for(var i=0;i<btn_list.length;i++){bar_btn_width.push(btn_list[i].getBoundingClientRect().width);}}
for(var i=always_preserve;i<btn_list.length;i++){var element=btn_list[i];var element_right=element.getBoundingClientRect().right;if(element_right!=0){cur_right=element_right;}
if(element.style.display==='none'){if((cur_right+bar_btn_width[i])<(page_width*0.37)){element.style.display='block';return;}else{return;}}else{if(cur_right>(page_width*0.38)){for(var j=i;j<btn_list.length;j++){if(btn_list[j].style.display!=='none'){btn_list[j].style.display='none';}}
return;}}}}
setInterval(function(){auto_hide_toolbar();},200);}
function ButtonWithDropdown_init(){let submitButton=document.querySelector('button#elem_submit_visible');let submitDropdown=document.querySelector('#gpt-submit-dropdown');function updateDropdownWidth(){if(submitButton){let setWidth=submitButton.clientWidth+submitDropdown.clientWidth;let setLeft=-1*submitButton.clientWidth;document.getElementById('submit-dropdown-style')?.remove();const styleElement=document.createElement('style');styleElement.id='submit-dropdown-style';styleElement.innerHTML=`#gpt-submit-dropdown ul.options { width: ${setWidth}px; left: ${setLeft}px; }`;document.head.appendChild(styleElement);}}
window.addEventListener('resize',updateDropdownWidth);updateDropdownWidth();}
let prevented_offset=0;function limit_scroll_position(){let scrollableDiv=document.querySelector('#gpt-chatbot > div.wrap');scrollableDiv.addEventListener('wheel',function(e){let preventScroll=false;if(e.deltaX!=0){prevented_offset=0;return;}
if(this.scrollHeight==this.clientHeight){prevented_offset=0;return;}
if(e.deltaY<0){prevented_offset=0;return;}
if(e.deltaY>0&&this.scrollHeight-this.clientHeight-this.scrollTop<=1){preventScroll=true;}
if(preventScroll){prevented_offset+=e.deltaY;if(Math.abs(prevented_offset)>499){if(prevented_offset>500){prevented_offset=500;}
if(prevented_offset<-500){prevented_offset=-500;}
preventScroll=false;}}else{prevented_offset=0;}
if(preventScroll){e.preventDefault();return;}},{passive:false});}
function loadLive2D(){if(document.querySelector(".waifu")){$('.waifu').show();}else{try{$("<link>").attr({href:"file=themes/waifu_plugin/waifu.css",rel:"stylesheet",type:"text/css"}).appendTo('head');$('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');$.ajax({url:"file=themes/waifu_plugin/waifu-tips.js",dataType:"script",cache:true,success:function(){$.ajax({url:"file=themes/waifu_plugin/live2d.js",dataType:"script",cache:true,success:function(){live2d_settings['hitokotoAPI']="hitokoto.cn";live2d_settings['modelId']=3;live2d_settings['modelTexturesId']=44;live2d_settings['modelStorage']=false;live2d_settings['waifuSize']='210x187';live2d_settings['waifuTipsSize']='187x52';live2d_settings['canSwitchModel']=true;live2d_settings['canSwitchTextures']=true;live2d_settings['canSwitchHitokoto']=false;live2d_settings['canTakeScreenshot']=false;live2d_settings['canTurnToHomePage']=false;live2d_settings['canTurnToAboutPage']=false;live2d_settings['showHitokoto']=false;live2d_settings['showF12Status']=false;live2d_settings['showF12Message']=false;live2d_settings['showF12OpenMsg']=false;live2d_settings['showCopyMessage']=false;live2d_settings['showWelcomeMessage']=true;initModel("file=themes/waifu_plugin/waifu-tips.json");}});}});}catch(err){console.log("[Error] JQuery is not defined.")}}}
function get_checkbox_selected_items(elem_id){display_panel_arr=[];document.getElementById(elem_id).querySelector('[data-testid="checkbox-group"]').querySelectorAll('label').forEach(label=>{const spanText=label.querySelector('span').textContent;const checked=label.querySelector('input').checked;if(checked){display_panel_arr.push(spanText)}});return display_panel_arr;}
function gpt_academic_gradio_saveload(save_or_load,elem_id,cookie_key,save_value="",load_type="str",load_default=false,load_default_value=""){if(save_or_load==="load"){let value=getCookie(cookie_key);if(value){push_data_to_gradio_component(value,elem_id,load_type);}
else{if(load_default){push_data_to_gradio_component(load_default_value,elem_id,load_type);}}}
if(save_or_load==="save"){setCookie(cookie_key,save_value,365);}}
function generateUUID(){function randomHexDigit(){return Math.floor((1+Math.random())*0x10000).toString(16).slice(1);}
return(randomHexDigit()+randomHexDigit()+'-'+
randomHexDigit()+'-'+'4'+randomHexDigit().slice(0,3)+'-'+
((Math.floor(Math.random()*4)+8).toString(16))+randomHexDigit().slice(0,3)+'-'+
randomHexDigit()+randomHexDigit()+randomHexDigit());}
function update_conversation_metadata(){try{const conversationId=generateUUID();console.log('Create conversation ID:',conversationId);const timestamp=new Date().toISOString();const conversationMetaData={id:conversationId,timestamp:timestamp};localStorage.setItem("conversation_metadata",JSON.stringify(conversationMetaData));}catch(e){console.error('Error in updating conversation metadata:',e);}}
function generatePreview(conversation,timestamp,maxLength=100){if(!conversation||conversation.length===0)return"";let preview=conversation.join("\n");const readableDate=new Date(timestamp).toLocaleString();preview=readableDate+"\n"+preview;if(preview.length<=maxLength)return preview;return preview.substring(0,maxLength)+"...";}
async function save_conversation_history(){let chatbot=await get_data_from_gradio_component('gpt-chatbot');let history=await get_data_from_gradio_component('history-ng');let conversation={};let conversation_metadata=localStorage.getItem("conversation_metadata");try{conversation_metadata=JSON.parse(conversation_metadata);conversation={timestamp:conversation_metadata.timestamp,id:conversation_metadata.id,metadata:conversation_metadata,conversation:chatbot,history:history,preview:generatePreview(JSON.parse(history),conversation_metadata.timestamp)};}catch(e){update_conversation_metadata();return;}
let conversation_history=[];try{const stored=localStorage.getItem('conversation_history');if(stored){conversation_history=JSON.parse(stored);}}catch(e){}
const existingIndex=conversation_history.findIndex(c=>c.id===conversation.id);if(existingIndex>=0){conversation_history[existingIndex]=conversation;}else{conversation_history.push(conversation);}
conversation_history.sort((a,b)=>{const timeA=new Date(a.timestamp).getTime();const timeB=new Date(b.timestamp).getTime();return timeB-timeA;});const max_chat_preserve=10;if(conversation_history.length>=max_chat_preserve+1){toast_push('对话时间线记录已满，正在移除最早的对话记录。您也可以点击左侧的记录点进行手动清理。',3000);conversation_history=conversation_history.slice(0,max_chat_preserve);}
try{localStorage.setItem('conversation_history',JSON.stringify(conversation_history));const LOCAL_STORAGE_UPDATED="gptac_conversation_history_updated";window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_UPDATED,{detail:conversation_history}));}catch(e){console.error('Error saving conversation history to localStorage:',e);}}
save_conversation_history_slow_down=do_something_but_not_too_frequently(300,save_conversation_history);function restore_chat_from_local_storage(event){let conversation=event.detail;push_data_to_gradio_component(conversation.conversation,"gpt-chatbot","obj");push_data_to_gradio_component(conversation.history,"history-ng","obj");const conversationId=conversation.id;const timestamp=conversation.timestamp;const conversationData={id:conversationId,timestamp:timestamp};localStorage.setItem("conversation_metadata",JSON.stringify(conversationData));}
async function clear_conversation(a,b,c){await save_conversation_history();update_conversation_metadata();let stopButton=document.getElementById("elem_stop");stopButton.click();return reset_conversation(a,b);}
function reset_conversation(a,b){return[[],[],"已重置"];}
async function on_plugin_exe_complete(fn_name){if(fn_name==="保存当前的对话"){let chatbot=await get_data_from_gradio_component('gpt-chatbot');let may_have_chat_profile_info=chatbot[chatbot.length-1][1];function get_href(htmlString){const parser=new DOMParser();const doc=parser.parseFromString(htmlString,'text/html');const anchor=doc.querySelector('a');if(anchor){return anchor.getAttribute('href');}else{return null;}}
let href=get_href(may_have_chat_profile_info);if(href){const cleanedHref=href.replace('file=','');}}}
async function generate_menu(guiBase64String,btnName){push_data_to_gradio_component(guiBase64String,"invisible_current_pop_up_plugin_arg","string");push_data_to_gradio_component(btnName,"invisible_callback_btn_for_plugin_exe","string");const stringData=atob(guiBase64String);let guiJsonData=JSON.parse(stringData);let menu=document.getElementById("plugin_arg_menu");gui_args={}
for(const key in guiJsonData){if(guiJsonData.hasOwnProperty(key)){const innerJSONString=guiJsonData[key];const decodedObject=JSON.parse(innerJSONString);gui_args[key]=decodedObject;}}
push_data_to_gradio_component({visible:true,__type__:'update'},"plugin_arg_menu","obj");hide_all_elem();let text_cnt=0;let dropdown_cnt=0;for(const key in gui_args){if(gui_args.hasOwnProperty(key)){if(gui_args[key].type=='string'){const component_name="plugin_arg_txt_"+text_cnt;push_data_to_gradio_component({visible:true,label:gui_args[key].title+"("+gui_args[key].description+")",placeholder:gui_args[key].description,__type__:'update'},component_name,"obj");if(key==="main_input"){let current_main_input=await get_data_from_gradio_component('user_input_main');let current_main_input_2=await get_data_from_gradio_component('user_input_float');push_data_to_gradio_component(current_main_input+current_main_input_2,component_name,"obj");}
else if(key==="advanced_arg"){let advance_arg_input_legacy=await get_data_from_gradio_component('advance_arg_input_legacy');push_data_to_gradio_component(advance_arg_input_legacy,component_name,"obj");}
else{push_data_to_gradio_component(gui_args[key].default_value,component_name,"obj");}
document.getElementById(component_name).parentNode.parentNode.style.display='';text_cnt+=1;}
if(gui_args[key].type=='dropdown'){const component_name="plugin_arg_drop_"+dropdown_cnt;push_data_to_gradio_component({visible:true,choices:gui_args[key].options,label:gui_args[key].title+"("+gui_args[key].description+")",placeholder:gui_args[key].description,__type__:'update'},component_name,"obj");push_data_to_gradio_component(gui_args[key].default_value,component_name,"obj");document.getElementById(component_name).parentNode.style.display='';dropdown_cnt+=1;}}}}
async function execute_current_pop_up_plugin(){let guiBase64String=await get_data_from_gradio_component('invisible_current_pop_up_plugin_arg');const stringData=atob(guiBase64String);let guiJsonData=JSON.parse(stringData);gui_args={}
for(const key in guiJsonData){if(guiJsonData.hasOwnProperty(key)){const innerJSONString=guiJsonData[key];const decodedObject=JSON.parse(innerJSONString);gui_args[key]=decodedObject;}}
let text_cnt=0;for(const key in gui_args){if(gui_args.hasOwnProperty(key)){if(gui_args[key].type=='string'){corrisponding_elem_id="plugin_arg_txt_"+text_cnt
gui_args[key].user_confirmed_value=await get_data_from_gradio_component(corrisponding_elem_id);text_cnt+=1;}}}
let dropdown_cnt=0;for(const key in gui_args){if(gui_args.hasOwnProperty(key)){if(gui_args[key].type=='dropdown'){corrisponding_elem_id="plugin_arg_drop_"+dropdown_cnt
gui_args[key].user_confirmed_value=await get_data_from_gradio_component(corrisponding_elem_id);dropdown_cnt+=1;}}}
push_data_to_gradio_component({visible:false,__type__:'update'},"plugin_arg_menu","obj");hide_all_elem();push_data_to_gradio_component(JSON.stringify(gui_args),"invisible_current_pop_up_plugin_arg_final","string");document.getElementById("invisible_callback_btn_for_plugin_exe").click();}
function hide_all_elem(){for(text_cnt=0;text_cnt<8;text_cnt++){push_data_to_gradio_component({visible:false,label:"",__type__:'update'},"plugin_arg_txt_"+text_cnt,"obj");document.getElementById("plugin_arg_txt_"+text_cnt).parentNode.parentNode.style.display='none';}
for(dropdown_cnt=0;dropdown_cnt<8;dropdown_cnt++){push_data_to_gradio_component({visible:false,choices:[],label:"",__type__:'update'},"plugin_arg_drop_"+dropdown_cnt,"obj");document.getElementById("plugin_arg_drop_"+dropdown_cnt).parentNode.style.display='none';}}
function close_current_pop_up_plugin(){push_data_to_gradio_component({visible:false,__type__:'update'},"plugin_arg_menu","obj");hide_all_elem();}
plugin_init_info_lib={}
function register_plugin_init(key,base64String){const stringData=atob(base64String);let guiJsonData=JSON.parse(stringData);if(key in plugin_init_info_lib){}
else{plugin_init_info_lib[key]={};}
plugin_init_info_lib[key].info=guiJsonData.Info;plugin_init_info_lib[key].color=guiJsonData.Color;plugin_init_info_lib[key].elem_id=guiJsonData.ButtonElemId;plugin_init_info_lib[key].label=guiJsonData.Label
plugin_init_info_lib[key].enable_advanced_arg=guiJsonData.AdvancedArgs;plugin_init_info_lib[key].arg_reminder=guiJsonData.ArgsReminder;}
function register_advanced_plugin_init_code(key,code){if(key in plugin_init_info_lib){}
else{plugin_init_info_lib[key]={};}
plugin_init_info_lib[key].secondary_menu_code=code;}
function run_advanced_plugin_launch_code(key){generate_menu(plugin_init_info_lib[key].secondary_menu_code,key);}
function on_flex_button_click(key){if(plugin_init_info_lib.hasOwnProperty(key)&&plugin_init_info_lib[key].hasOwnProperty('secondary_menu_code')){run_advanced_plugin_launch_code(key);}else{document.getElementById("old_callback_btn_for_plugin_exe").click();}}
async function run_dropdown_shift(dropdown){let key=dropdown;push_data_to_gradio_component({value:key,variant:plugin_init_info_lib[key].color,info_str:plugin_init_info_lib[key].info,__type__:'update'},"elem_switchy_bt","obj");if(plugin_init_info_lib[key].enable_advanced_arg){push_data_to_gradio_component({visible:true,label:plugin_init_info_lib[key].label,__type__:'update'},"advance_arg_input_legacy","obj");}else{push_data_to_gradio_component({visible:false,label:plugin_init_info_lib[key].label,__type__:'update'},"advance_arg_input_legacy","obj");}}
async function duplicate_in_new_window(){var url=window.location.href;window.open(url,'_blank');}
async function run_classic_plugin_via_id(plugin_elem_id){for(key in plugin_init_info_lib){if(plugin_init_info_lib[key].elem_id==plugin_elem_id){let current_btn_name=await get_data_from_gradio_component(plugin_elem_id);call_plugin_via_name(current_btn_name);return;}}
return;}
async function call_plugin_via_name(current_btn_name){gui_args={}
push_data_to_gradio_component({visible:false,__type__:'update'},"plugin_arg_menu","obj");hide_all_elem();let advance_arg_input_legacy=await get_data_from_gradio_component('advance_arg_input_legacy');if(advance_arg_input_legacy.length!=0){gui_args["advanced_arg"]={};gui_args["advanced_arg"].user_confirmed_value=advance_arg_input_legacy;}
push_data_to_gradio_component(JSON.stringify(gui_args),"invisible_current_pop_up_plugin_arg_final","string");push_data_to_gradio_component(current_btn_name,"invisible_callback_btn_for_plugin_exe","string");document.getElementById("invisible_callback_btn_for_plugin_exe").click();}
async function click_real_submit_btn(){document.getElementById("elem_submit").click();}
async function multiplex_function_begin(multiplex_sel){if(multiplex_sel==="常规对话"){click_real_submit_btn();return;}
if(multiplex_sel==="查互联网后回答"){let _align_name_in_crazy_function_py="查互联网后回答";call_plugin_via_name(_align_name_in_crazy_function_py);return;}
if(multiplex_sel==="多模型对话"){let _align_name_in_crazy_function_py="询问多个GPT模型";call_plugin_via_name(_align_name_in_crazy_function_py);return;}
if(multiplex_sel==="智能召回 RAG"){let _align_name_in_crazy_function_py="Rag智能召回";call_plugin_via_name(_align_name_in_crazy_function_py);return;}
if(multiplex_sel==="多媒体查询"){let _align_name_in_crazy_function_py="多媒体智能体";call_plugin_via_name(_align_name_in_crazy_function_py);return;}}
async function run_multiplex_shift(multiplex_sel){let key=multiplex_sel;if(multiplex_sel==="常规对话"){key="提交";}else{key="提交 ("+multiplex_sel+")";}
push_data_to_gradio_component({value:key,__type__:'update'},"elem_submit_visible","obj");}
async function persistent_cookie_init(web_cookie_cache,cookie){return[localStorage.getItem('web_cookie_cache'),cookie];}