audio_debug=false;class AudioPlayer{constructor(){this.audioCtx=new(window.AudioContext||window.webkitAudioContext)();this.queue=[];this.isPlaying=false;this.currentSource=null;}
base64ToArrayBuffer(base64){const binaryString=window.atob(base64);const len=binaryString.length;const bytes=new Uint8Array(len);for(let i=0;i<len;i++){bytes[i]=binaryString.charCodeAt(i);}
return bytes.buffer;}
checkQueue(){if(!this.isPlaying&&this.queue.length>0){this.isPlaying=true;const nextAudio=this.queue.shift();this.play_wave(nextAudio);}}
enqueueAudio(audio_buf_wave){if(allow_auto_read_tts_flag){this.queue.push(audio_buf_wave);this.checkQueue();}}
async play_wave(encodedAudio){const audioData=encodedAudio;try{const buffer=await this.audioCtx.decodeAudioData(audioData);const source=this.audioCtx.createBufferSource();source.buffer=buffer;source.connect(this.audioCtx.destination);source.onended=()=>{if(allow_auto_read_tts_flag){this.isPlaying=false;this.currentSource=null;this.checkQueue();}};this.currentSource=source;source.start();}catch(e){console.log("Audio error!",e);this.isPlaying=false;this.currentSource=null;this.checkQueue();}}
stop(){if(this.currentSource){this.queue=[];this.currentSource.stop();this.currentSource=null;this.isPlaying=false;}}}
const audioPlayer=new AudioPlayer();class FIFOLock{constructor(){this.queue=[];this.currentTaskExecuting=false;}
lock(){let resolveLock;const lock=new Promise(resolve=>{resolveLock=resolve;});this.queue.push(resolveLock);if(!this.currentTaskExecuting){this._dequeueNext();}
return lock;}
_dequeueNext(){if(this.queue.length===0){this.currentTaskExecuting=false;return;}
this.currentTaskExecuting=true;const resolveLock=this.queue.shift();resolveLock();}
unlock(){this.currentTaskExecuting=false;this._dequeueNext();}}
function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
function trigger(T,fire){let timeoutID=null;let lastArgs=null;return function(...args){lastArgs=args;if(timeoutID!==null){clearTimeout(timeoutID);}
timeoutID=setTimeout(()=>{fire(...lastArgs);},T);};}
prev_text="";prev_text_already_pushed="";prev_chatbot_index=-1;const delay_live_text_update=trigger(3000,on_live_stream_terminate);function on_live_stream_terminate(latest_text){if(audio_debug)console.log("on_live_stream_terminate",latest_text);remaining_text=latest_text.slice(prev_text_already_pushed.length);if((!isEmptyOrWhitespaceOnly(remaining_text))&&remaining_text.length!=0){prev_text_already_pushed=latest_text;push_text_to_audio(remaining_text);}}
function is_continue_from_prev(text,prev_text){abl=5
if(text.length<prev_text.length-abl){return false;}
if(prev_text.length>10){return text.startsWith(prev_text.slice(0,Math.min(prev_text.length-abl,100)));}else{return text.startsWith(prev_text);}}
function isEmptyOrWhitespaceOnly(remaining_text){let textWithoutSpecifiedCharacters=remaining_text.replace(/[\n。]/g,'');return textWithoutSpecifiedCharacters.trim().length===0;}
function process_increased_text(remaining_text){while(remaining_text.startsWith('\n')||remaining_text.startsWith('。')){prev_text_already_pushed=prev_text_already_pushed+remaining_text[0];remaining_text=remaining_text.slice(1);}
if(remaining_text.includes('\n')||remaining_text.includes('。')){index_of_last_sep=Math.max(remaining_text.lastIndexOf('\n'),remaining_text.lastIndexOf('。'));tobe_pushed=remaining_text.slice(0,index_of_last_sep+1);prev_text_already_pushed=prev_text_already_pushed+tobe_pushed;if(!isEmptyOrWhitespaceOnly(tobe_pushed)){push_text_to_audio(tobe_pushed);}}}
function process_latest_text_output(text,chatbot_index){if(text.length==0){prev_text=text;prev_text_mask=text;return;}
if(text==prev_text){return;}
var is_continue=is_continue_from_prev(text,prev_text_already_pushed);if(chatbot_index==prev_chatbot_index&&is_continue){remaining_text=text.slice(prev_text_already_pushed.length);process_increased_text(remaining_text);delay_live_text_update(text);}
else if(chatbot_index==prev_chatbot_index&&!is_continue){if(audio_debug)console.log('---------------------');if(audio_debug)console.log('text twisting!');if(audio_debug)console.log('[new message begin]','text',text,'prev_text_already_pushed',prev_text_already_pushed);if(audio_debug)console.log('---------------------');prev_text_already_pushed="";delay_live_text_update(text);}
else{if(audio_debug)console.log('---------------------');if(audio_debug)console.log('new message begin!');if(audio_debug)console.log('[new message begin]','text',text,'prev_text_already_pushed',prev_text_already_pushed);if(audio_debug)console.log('---------------------');prev_text_already_pushed="";process_increased_text(text);delay_live_text_update(text);}
prev_text=text;prev_chatbot_index=chatbot_index;}
const audio_push_lock=new FIFOLock();async function push_text_to_audio(text){if(!allow_auto_read_tts_flag){return;}
await audio_push_lock.lock();var lines=text.split(/[\n。]/);for(const audio_buf_text of lines){if(audio_buf_text){const url=`${window.location.href}vits`;const payload={text:audio_buf_text,text_language:"zh"};post_text(url,payload,send_index);send_index=send_index+1;if(audio_debug)console.log(send_index,audio_buf_text);if(allow_auto_read_tts_flag){await delay(3000);}}}
audio_push_lock.unlock();}
send_index=0;recv_index=0;to_be_processed=[];async function UpdatePlayQueue(cnt,audio_buf_wave){if(cnt!=recv_index){to_be_processed.push([cnt,audio_buf_wave]);if(audio_debug)console.log('cache',cnt);}
else{if(audio_debug)console.log('processing',cnt);recv_index=recv_index+1;if(audio_buf_wave){audioPlayer.enqueueAudio(audio_buf_wave);}
while(true){find_any=false;for(i=to_be_processed.length-1;i>=0;i--){if(to_be_processed[i][0]==recv_index){if(audio_debug)console.log('processing cached',recv_index);if(to_be_processed[i][1]){audioPlayer.enqueueAudio(to_be_processed[i][1]);}
to_be_processed.pop(i);find_any=true;recv_index=recv_index+1;}}
if(!find_any){break;}}}}
function post_text(url,payload,cnt){if(allow_auto_read_tts_flag){postData(url,payload,cnt).then(data=>{UpdatePlayQueue(cnt,data);return;});}else{UpdatePlayQueue(cnt,null);return;}}
notify_user_error=false
async function postData(url='',data={}){try{const response=await fetch(url,{method:'POST',body:JSON.stringify(data),});if(!response.ok){console.info('There was a problem during audio generation requests:',response.status);return null;}
return await response.arrayBuffer();}catch(error){console.info('There was a problem during audio generation requests:',error);return null;}}