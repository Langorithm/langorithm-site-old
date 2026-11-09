var D=Object.defineProperty;var F=(t,e,s)=>e in t?D(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var A=(t,e,s)=>(F(t,typeof e!="symbol"?e+"":e,s),s);import{M as I,l as Y,r as j}from"./vendor-gscuA0zO.js";import"./mercury-YAQEmqxH.js";var b=function({regl:t,precision:e,label:s="",width:n,height:i}){this.regl=t,this.precision=e,this.label=s,this.positionBuffer=this.regl.buffer([[-2,0],[0,-2],[2,2]]),this.draw=()=>{},this.init(),this.pingPongIndex=0,this.fbos=Array(2).fill().map(()=>this.regl.framebuffer({color:this.regl.texture({mag:"nearest",width:n,height:i,format:"rgba"}),depthStencil:!1}))};b.prototype.resize=function(t,e){this.fbos.forEach(s=>{s.resize(t,e)})};b.prototype.getCurrent=function(){return this.fbos[this.pingPongIndex]};b.prototype.getTexture=function(){var t=this.pingPongIndex?0:1;return this.fbos[t]};b.prototype.init=function(){return this.transformIndex=0,this.fragHeader=`
  precision ${this.precision} float;

  uniform float time;
  varying vec2 uv;
  `,this.fragBody="",this.vert=`
  precision ${this.precision} float;
  attribute vec2 position;
  varying vec2 uv;

  void main () {
    uv = position;
    gl_Position = vec4(2.0 * position - 1.0, 0, 1);
  }`,this.attributes={position:this.positionBuffer},this.uniforms={time:this.regl.prop("time"),resolution:this.regl.prop("resolution")},this.frag=`
       ${this.fragHeader}

      void main () {
        vec4 c = vec4(0, 0, 0, 0);
        vec2 st = uv;
        ${this.fragBody}
        gl_FragColor = c;
      }
  `,this};b.prototype.render=function(t){let e=t[0];var s=this,n=Object.assign(e.uniforms,{prevBuffer:()=>s.fbos[s.pingPongIndex]});s.draw=s.regl({frag:e.frag,vert:s.vert,attributes:s.attributes,uniforms:n,count:3,framebuffer:()=>(s.pingPongIndex=s.pingPongIndex?0:1,s.fbos[s.pingPongIndex])})};b.prototype.tick=function(t){this.draw(t)};function X(t){return navigator.mediaDevices.enumerateDevices().then(e=>e.filter(s=>s.kind==="videoinput")).then(e=>{let s={audio:!1,video:!0};return e[t]&&(s.video={deviceId:{exact:e[t].deviceId}}),window.navigator.mediaDevices.getUserMedia(s)}).then(e=>{const s=document.createElement("video");return s.setAttribute("autoplay",""),s.setAttribute("muted",""),s.setAttribute("playsinline",""),s.srcObject=e,new Promise((n,i)=>{s.addEventListener("loadedmetadata",()=>{s.play().then(()=>n({video:s}))})})}).catch(console.log.bind(console))}function B(t){return new Promise(function(e,s){navigator.mediaDevices.getDisplayMedia(t).then(n=>{const i=document.createElement("video");i.srcObject=n,i.addEventListener("loadedmetadata",()=>{i.play(),e({video:i})})}).catch(n=>s(n))})}class q{constructor({regl:e,width:s,height:n,pb:i,label:r=""}){A(this,"canvases",{});this.label=r,this.regl=e,this.src=null,this.dynamic=!0,this.width=s,this.height=n,this.tex=this.regl.texture({shape:[1,1]}),this.pb=i}init(e,s){"src"in e&&(this.src=e.src,this.tex=this.regl.texture({data:this.src,...s})),"dynamic"in e&&(this.dynamic=e.dynamic)}initCam(e,s){const n=this;X(e).then(i=>{n.src=i.video,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...s})}).catch(i=>console.log("could not get camera",i))}initVideo(e="",s){const n=document.createElement("video");n.crossOrigin="anonymous",n.autoplay=!0,n.loop=!0,n.muted=!0,n.addEventListener("loadeddata",()=>{this.src=n,n.play(),this.tex=this.regl.texture({data:this.src,...s}),this.dynamic=!0}),n.src=e}initImage(e="",s){const n=document.createElement("img");n.crossOrigin="anonymous",n.src=e,n.onload=()=>{this.src=n,this.dynamic=!1,this.tex=this.regl.texture({data:this.src,...s})}}initStream(e,s){let n=this;e&&this.pb&&(this.pb.initSource(e),this.pb.on("got video",function(i,r){i===e&&(n.src=r,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...s}))}))}initScreen(e=0,s){const n=this;B().then(function(i){n.src=i.video,n.tex=n.regl.texture({data:n.src,...s}),n.dynamic=!0}).catch(i=>console.log("could not get screen",i))}initCanvas(e=1e3,s=1e3){if(this.canvases[this.label]==null){const u=document.createElement("canvas").getContext("2d");u!=null&&(this.canvases[this.label]=u)}const n=this.canvases[this.label],i=n.canvas;return i.width!==e&&i.height!==s?(i.width=e,i.height=s):n.clearRect(0,0,e,s),this.init({src:i}),this.dynamic=!0,n}resize(e,s){this.width=e,this.height=s}clear(){this.src&&this.src.srcObject&&this.src.srcObject.getTracks&&this.src.srcObject.getTracks().forEach(e=>e.stop()),this.src=null,this.tex=this.regl.texture({shape:[1,1]})}tick(e){this.src&&this.dynamic===!0&&(this.src.videoWidth&&this.src.videoWidth!==this.tex.width&&(console.log(this.src.videoWidth,this.src.videoHeight,this.tex.width,this.tex.height),this.tex.resize(this.src.videoWidth,this.src.videoHeight)),this.src.width&&this.src.width!==this.tex.width&&this.tex.resize(this.src.width,this.src.height),this.tex.subimage(this.src))}getTexture(){return this.tex}}const x={};function K(t){if(typeof t=="object"){if("buttons"in t)return t.buttons;if("which"in t){var e=t.which;if(e===2)return 4;if(e===3)return 2;if(e>0)return 1<<e-1}else if("button"in t){var e=t.button;if(e===1)return 4;if(e===2)return 2;if(e>=0)return 1<<e}}return 0}x.buttons=K;function P(t){return t.target||t.srcElement||window}x.element=P;function G(t){return typeof t=="object"&&"pageX"in t?t.pageX:0}x.x=G;function H(t){return typeof t=="object"&&"pageY"in t?t.pageY:0}x.y=H;function N(t,e){e||(e=t,t=window);var s=0,n=0,i=0,r={shift:!1,alt:!1,control:!1,meta:!1},u=!1;function o(f){var d=!1;return"altKey"in f&&(d=d||f.altKey!==r.alt,r.alt=!!f.altKey),"shiftKey"in f&&(d=d||f.shiftKey!==r.shift,r.shift=!!f.shiftKey),"ctrlKey"in f&&(d=d||f.ctrlKey!==r.control,r.control=!!f.ctrlKey),"metaKey"in f&&(d=d||f.metaKey!==r.meta,r.meta=!!f.metaKey),d}function l(f,d){var T=x.x(d),O=x.y(d);"buttons"in d&&(f=d.buttons|0),(f!==s||T!==n||O!==i||o(d))&&(s=f|0,n=T||0,i=O||0,e&&e(s,n,i,r))}function c(f){l(0,f)}function m(){(s||n||i||r.shift||r.alt||r.meta||r.control)&&(n=i=0,s=0,r.shift=r.alt=r.control=r.meta=!1,e&&e(0,0,0,r))}function h(f){o(f)&&e&&e(s,n,i,r)}function v(f){x.buttons(f)===0?l(0,f):l(s,f)}function y(f){l(s|x.buttons(f),f)}function p(f){l(s&~x.buttons(f),f)}function g(){u||(u=!0,t.addEventListener("mousemove",v),t.addEventListener("mousedown",y),t.addEventListener("mouseup",p),t.addEventListener("mouseleave",c),t.addEventListener("mouseenter",c),t.addEventListener("mouseout",c),t.addEventListener("mouseover",c),t.addEventListener("blur",m),t.addEventListener("keyup",h),t.addEventListener("keydown",h),t.addEventListener("keypress",h),t!==window&&(window.addEventListener("blur",m),window.addEventListener("keyup",h),window.addEventListener("keydown",h),window.addEventListener("keypress",h)))}function E(){u&&(u=!1,t.removeEventListener("mousemove",v),t.removeEventListener("mousedown",y),t.removeEventListener("mouseup",p),t.removeEventListener("mouseleave",c),t.removeEventListener("mouseenter",c),t.removeEventListener("mouseout",c),t.removeEventListener("mouseover",c),t.removeEventListener("blur",m),t.removeEventListener("keyup",h),t.removeEventListener("keydown",h),t.removeEventListener("keypress",h),t!==window&&(window.removeEventListener("blur",m),window.removeEventListener("keyup",h),window.removeEventListener("keydown",h),window.removeEventListener("keypress",h)))}g();var M={element:t};return Object.defineProperties(M,{enabled:{get:function(){return u},set:function(f){f?g():E()},enumerable:!0},buttons:{get:function(){return s},enumerable:!0},x:{get:function(){return n},enumerable:!0},y:{get:function(){return i},enumerable:!0},mods:{get:function(){return r},enumerable:!0}}),M}class W{constructor({numBins:e=4,cutoff:s=2,smooth:n=.4,max:i=15,scale:r=10,isDrawing:u=!1,parentEl:o=document.body}){this.vol=0,this.scale=r,this.max=i,this.cutoff=s,this.smooth=n,this.setBins(e),this.beat={holdFrames:20,threshold:40,_cutoff:0,decay:.98,_framesSinceBeat:0},this.onBeat=()=>{},this.canvas=document.createElement("canvas"),this.canvas.width=100,this.canvas.height=80,this.canvas.style.width="100px",this.canvas.style.height="80px",this.canvas.style.position="absolute",this.canvas.style.right="0px",this.canvas.style.bottom="0px",o.appendChild(this.canvas),this.isDrawing=u,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="#DFFFFF",this.ctx.strokeStyle="#0ff",this.ctx.lineWidth=.5,window.navigator.mediaDevices&&window.navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then(l=>{this.stream=l,this.context=new AudioContext;let c=this.context.createMediaStreamSource(l);this.meyda=I.createMeydaAnalyzer({audioContext:this.context,source:c,featureExtractors:["loudness"]})}).catch(l=>console.log("ERROR",l))}detectBeat(e){e>this.beat._cutoff&&e>this.beat.threshold?(this.onBeat(),this.beat._cutoff=e*1.2,this.beat._framesSinceBeat=0):this.beat._framesSinceBeat<=this.beat.holdFrames?this.beat._framesSinceBeat++:(this.beat._cutoff*=this.beat.decay,this.beat._cutoff=Math.max(this.beat._cutoff,this.beat.threshold))}tick(){if(this.meyda){var e=this.meyda.get();if(e&&e!==null){this.vol=e.loudness.total,this.detectBeat(this.vol);const s=(i,r)=>i+r;let n=Math.floor(e.loudness.specific.length/this.bins.length);this.prevBins=this.bins.slice(0),this.bins=this.bins.map((i,r)=>e.loudness.specific.slice(r*n,(r+1)*n).reduce(s)).map((i,r)=>i*(1-this.settings[r].smooth)+this.prevBins[r]*this.settings[r].smooth),this.fft=this.bins.map((i,r)=>Math.max(0,(i-this.settings[r].cutoff)/this.settings[r].scale)),this.isDrawing&&this.draw()}}}setCutoff(e){this.cutoff=e,this.settings=this.settings.map(s=>(s.cutoff=e,s))}setSmooth(e){this.smooth=e,this.settings=this.settings.map(s=>(s.smooth=e,s))}setBins(e){this.bins=Array(e).fill(0),this.prevBins=Array(e).fill(0),this.fft=Array(e).fill(0),this.settings=Array(e).fill(0).map(()=>({cutoff:this.cutoff,scale:this.scale,smooth:this.smooth})),this.bins.forEach((s,n)=>{window["a"+n]=(i=1,r=0)=>()=>a.fft[n]*i+r})}setScale(e){this.scale=e,this.settings=this.settings.map(s=>(s.scale=e,s))}setMax(e){this.max=e,console.log("set max is deprecated")}hide(){this.isDrawing=!1,this.canvas.style.display="none"}show(){this.isDrawing=!0,this.canvas.style.display="block"}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);var e=this.canvas.width/this.bins.length,s=this.canvas.height/(this.max*2);this.bins.forEach((n,i)=>{var r=n*s;this.ctx.fillRect(i*e,this.canvas.height-r,e,r);var u=this.canvas.height-s*this.settings[i].cutoff;this.ctx.beginPath(),this.ctx.moveTo(i*e,u),this.ctx.lineTo((i+1)*e,u),this.ctx.stroke();var o=this.canvas.height-s*(this.settings[i].scale+this.settings[i].cutoff);this.ctx.beginPath(),this.ctx.moveTo(i*e,o),this.ctx.lineTo((i+1)*e,o),this.ctx.stroke()})}}class Q{constructor(e){this.mediaSource=new MediaSource,this.stream=e,this.output=document.createElement("video"),this.output.autoplay=!0,this.output.loop=!0;let s=this;this.mediaSource.addEventListener("sourceopen",()=>{console.log("MediaSource opened"),s.sourceBuffer=s.mediaSource.addSourceBuffer('video/webm; codecs="vp8"'),console.log("Source buffer: ",sourceBuffer)})}start(){let e={mimeType:"video/webm;codecs=vp9"};this.recordedBlobs=[];try{this.mediaRecorder=new MediaRecorder(this.stream,e)}catch(s){console.log("Unable to create MediaRecorder with options Object: ",s);try{e={mimeType:"video/webm,codecs=vp9"},this.mediaRecorder=new MediaRecorder(this.stream,e)}catch(n){console.log("Unable to create MediaRecorder with options Object: ",n);try{e="video/vp8",this.mediaRecorder=new MediaRecorder(this.stream,e)}catch(i){alert(`MediaRecorder is not supported by this browser.

Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.`),console.error("Exception while creating MediaRecorder:",i);return}}}console.log("Created MediaRecorder",this.mediaRecorder,"with options",e),this.mediaRecorder.onstop=this._handleStop.bind(this),this.mediaRecorder.ondataavailable=this._handleDataAvailable.bind(this),this.mediaRecorder.start(100),console.log("MediaRecorder started",this.mediaRecorder)}stop(){this.mediaRecorder.stop()}_handleStop(){const e=new Blob(this.recordedBlobs,{type:this.mediaRecorder.mimeType}),s=window.URL.createObjectURL(e);this.output.src=s;const n=document.createElement("a");n.style.display="none",n.href=s;let i=new Date;n.download=`hydra-${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}-${i.getHours()}.${i.getMinutes()}.${i.getSeconds()}.webm`,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),window.URL.revokeObjectURL(s)},300)}_handleDataAvailable(e){e.data&&e.data.size>0&&this.recordedBlobs.push(e.data)}}const S={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},sin:function(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}};var V=(t,e,s,n,i)=>(t-e)*(i-n)/(s-e)+n,C=(t,e)=>(t%e+e)%e;const z={init:()=>{Array.prototype.fast=function(t=1){return this._speed=t,this},Array.prototype.smooth=function(t=1){return this._smooth=t,this},Array.prototype.ease=function(t="linear"){return typeof t=="function"?(this._smooth=1,this._ease=t):S[t]&&(this._smooth=1,this._ease=S[t]),this},Array.prototype.offset=function(t=.5){return this._offset=t%1,this},Array.prototype.fit=function(t=0,e=1){let s=Math.min(...this),n=Math.max(...this);var i=this.map(r=>V(r,s,n,t,e));return i._speed=this._speed,i._smooth=this._smooth,i._ease=this._ease,i}},getValue:(t=[])=>({time:e,bpm:s})=>{let n=t._speed?t._speed:1,i=t._smooth?t._smooth:0,r=e*n*(s/60)+(t._offset||0);if(i!==0){let u=t._ease?t._ease:S.linear,o=r-i/2,l=t[Math.floor(C(o,t.length))],c=t[Math.floor(C(o+1,t.length))],m=Math.min(C(o,1)/i,1);return u(m)*(c-l)+l}else return t[Math.floor(r%t.length)],t[Math.floor(r%t.length)]}},J=t=>{var e="",s=i(e),n=(r,u)=>{e+=`
      var ${r} = ${u}
    `,s=i(e)};return{addToContext:n,eval:r=>s.eval(r)};function i(r){globalThis.eval(r);var u=function(o){globalThis.eval(o)};return{eval:u}}};class Z{constructor(e,s,n=[]){this.makeGlobal=s,this.sandbox=J(),this.parent=e;var i=Object.keys(e);i.forEach(r=>this.add(r)),this.userProps=n}add(e){this.makeGlobal&&(window[e]=this.parent[e])}set(e,s){this.makeGlobal&&(window[e]=s),this.parent[e]=s}tick(){this.makeGlobal&&this.userProps.forEach(e=>{this.parent[e]=window[e]})}eval(e){this.sandbox.eval(e)}}const ee={float:{vec4:{name:"sum",args:[[1,1,1,1]]},vec2:{name:"sum",args:[[1,1]]}}},L=t=>(t=t.toString(),t.indexOf(".")<0&&(t+="."),t);function te(t,e,s){const n=t.transform.inputs,i=t.userArgs,{generators:r}=t.synth,{src:u}=r;return n.map((o,l)=>{const c={value:o.default,type:o.type,isUniform:!1,name:o.name,vecLen:0};if(c.type==="float"&&(c.value=L(o.default)),o.type.startsWith("vec"))try{c.vecLen=Number.parseInt(o.type.substr(3))}catch{console.log(`Error determining length of vector input type ${o.type} (${o.name})`)}if(i.length>l){if(c.value=i[l],c.type==="vec4"&&!(c.value.type==="GlslSource"||c.value.getTexture))throw new Error("Arguments must be a texture or GlslSource");typeof i[l]=="function"?(c.value=(v,y,p)=>{try{const g=i[l](y);return typeof g=="number"?g:(console.warn("function does not return a number",i[l]),o.default)}catch(g){return console.warn("ERROR",g),o.default}},c.isUniform=!0):i[l].constructor===Array&&(c.value=(v,y,p)=>z.getValue(i[l])(y),c.isUniform=!0)}if(!(e<0)){if(c.value&&c.value.transforms){const v=c.value.transforms[c.value.transforms.length-1];if(v.transform.glsl_return_type!==o.type){const y=ee[o.type];if(typeof y<"u"){const p=y[v.transform.glsl_return_type];if(typeof p<"u"){const{name:g,args:E}=p;c.value=c.value[g](...E)}}}c.isUniform=!1}else if(c.type==="float"&&typeof c.value=="number")c.value=L(c.value);else if(c.type.startsWith("vec")&&typeof c.value=="object"&&Array.isArray(c.value))c.isUniform=!1,c.value=`${c.type}(${c.value.map(L).join(", ")})`;else if(o.type==="sampler2D"){var m=c.value;c.value=()=>m.getTexture(),c.isUniform=!0}else if(c.value.getTexture&&o.type==="vec4"){var h=c.value;c.value=u(h),c.isUniform=!1}c.isUniform&&(c.name+=e)}return c})}function se(t){var e={uniforms:[],glslFunctions:[],fragColor:""},s=k(t,e)("c","st");e.fragColor=s;let n={};return e.uniforms.forEach(i=>n[i.name]=i),e.uniforms=Object.values(n),e}function R(t,e){return`${t}_i${e}`}function k(t,e){var s=(n,i)=>"";return t.forEach((n,i)=>{let r=te(n,e.uniforms.length);r.forEach(o=>{o.isUniform&&e.uniforms.push(o)}),ie(n,e.glslFunctions)||e.glslFunctions.push(n);var u=s;n.transform.type==="src"?s=(o,l)=>`${_(r,e)(`${o}${i}`,l)}
         vec4 ${o} = ${w(`${o}${i}`,l,n.name,r)};`:n.transform.type==="color"?s=(o,l)=>`${_(r,e)(`${o}${i}`,l)}
         ${u(o,l)}
         ${o} = ${w(`${o}${i}`,`${o}`,n.name,r)};`:n.transform.type==="coord"?s=(o,l)=>`${_(r,e)(`${o}${i}`,l)}
         ${l} = ${w(`${o}${i}`,`${l}`,n.name,r)};
         ${u(o,l)}`:n.transform.type==="combine"?s=(o,l)=>`${_(r,e)(`${o}${i}`,l)}
         ${u(o,l)}
         ${o} = ${w(`${o}${i}`,`${o}`,n.name,r)};`:n.transform.type==="combineCoord"&&(s=(o,l)=>`${_(r,e)(`${o}${i}`,l)}
         ${l} = ${w(`${o}${i}`,`${l}`,n.name,r)};
         ${u(o,l)}`)}),s}function _(t,e){let s=(i,r)=>"";var n=s;return t.forEach((i,r)=>{i.value.transforms&&(n=s,s=(u,o)=>{let l=R(u,r),c=R(`${o}_${u}`,r);return`vec2 ${c} = ${o};${n(u,o)}
         ${k(i.value.transforms,e)(l,c)}`})}),s}function w(t,e,s,n){const i=n.map((r,u)=>r.isUniform?r.name:r.value&&r.value.transforms?R(t,u):r.value).reduce((r,u)=>`${r}, ${u}`,"");return`${s}(${e}${i})`}function ie(t,e){for(var s=0;s<e.length;s++)if(t.name==e[s].name)return!0;return!1}const ne={_luminance:{type:"util",glsl:`float _luminance(vec3 rgb){
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      return dot(rgb, W);
    }`},_noise:{type:"util",glsl:`
    //	Simplex 3D Noise
    //	by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float _noise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
    `},_rgbToHsv:{type:"util",glsl:`vec3 _rgbToHsv(vec3 c){
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }`},_hsvToRgb:{type:"util",glsl:`vec3 _hsvToRgb(vec3 c){
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }`}};var $=function(t){return this.transforms=[],this.transforms.push(t),this.defaultOutput=t.defaultOutput,this.synth=t.synth,this.type="GlslSource",this.defaultUniforms=t.defaultUniforms,this};$.prototype.addTransform=function(t){this.transforms.push(t)};$.prototype.out=function(t){var e=t||this.defaultOutput;if(e)try{var s=this.glsl(e);this.synth.currentFunctions=[],e.render(s)}catch(n){console.warn("shader could not compile",n)}};$.prototype.glsl=function(){var t=[],e=[];return this.transforms.forEach(s=>{s.transform.type==="renderpass"?console.warn("no support for renderpass"):e.push(s)}),e.length>0&&t.push(this.compile(e)),t};$.prototype.compile=function(t){var e=se(t,this.synth),s={};e.uniforms.forEach(i=>{s[i.name]=i.value});var n=`
  precision ${this.defaultOutput.precision} float;
  ${Object.values(e.uniforms).map(i=>{let r=i.type;switch(i.type){case"texture":r="sampler2D";break}return`
      uniform ${r} ${i.name};`}).join("")}
  uniform float time;
  uniform vec2 resolution;
  varying vec2 uv;
  uniform sampler2D prevBuffer;

  ${Object.values(ne).map(i=>`
            ${i.glsl}
          `).join("")}

  ${e.glslFunctions.map(i=>`
            ${i.transform.glsl}
          `).join("")}

  void main () {
    vec2 st = gl_FragCoord.xy/resolution.xy;

    ${e.fragColor}
    gl_FragColor = c;
  }
  `;return{frag:n,uniforms:Object.assign({},this.defaultUniforms,s)}};const ae=()=>[{name:"noise",type:"src",inputs:[{type:"float",name:"scale",default:10},{type:"float",name:"offset",default:.1}],glsl:"   return vec4(vec3(_noise(vec3(_st*scale, offset*time))), 1.0);"},{name:"voronoi",type:"src",inputs:[{type:"float",name:"scale",default:5},{type:"float",name:"speed",default:.3},{type:"float",name:"blending",default:.3}],glsl:`   vec3 color = vec3(.0);
   // Scale
   _st *= scale;
   // Tile the space
   vec2 i_st = floor(_st);
   vec2 f_st = fract(_st);
   float m_dist = 10.;  // minimun distance
   vec2 m_point;        // minimum point
   for (int j=-1; j<=1; j++ ) {
   for (int i=-1; i<=1; i++ ) {
   vec2 neighbor = vec2(float(i),float(j));
   vec2 p = i_st + neighbor;
   vec2 point = fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
   point = 0.5 + 0.5*sin(time*speed + 6.2831*point);
   vec2 diff = neighbor + point - f_st;
   float dist = length(diff);
   if( dist < m_dist ) {
   m_dist = dist;
   m_point = point;
   }
   }
   }
   // Assign a color using the closest point position
   color += dot(m_point,vec2(.3,.6));
   color *= 1.0 - blending*m_dist;
   return vec4(color, 1.0);`},{name:"osc",type:"src",inputs:[{type:"float",name:"frequency",default:60},{type:"float",name:"sync",default:.1},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st;
   float r = sin((st.x-offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   float g = sin((st.x+time*sync)*frequency)*0.5 + 0.5;
   float b = sin((st.x+offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   return vec4(r, g, b, 1.0);`},{name:"shape",type:"src",inputs:[{type:"float",name:"sides",default:3},{type:"float",name:"radius",default:.3},{type:"float",name:"smoothing",default:.01}],glsl:`   vec2 st = _st * 2. - 1.;
   // Angle and radius from the current pixel
   float a = atan(st.x,st.y)+3.1416;
   float r = (2.*3.1416)/sides;
   float d = cos(floor(.5+a/r)*r-a)*length(st);
   return vec4(vec3(1.0-smoothstep(radius,radius + smoothing + 0.0000001,d)), 1.0);`},{name:"gradient",type:"src",inputs:[{type:"float",name:"speed",default:0}],glsl:"   return vec4(_st, sin(time*speed), 1.0);"},{name:"src",type:"src",inputs:[{type:"sampler2D",name:"tex",default:NaN}],glsl:`   //  vec2 uv = gl_FragCoord.xy/vec2(1280., 720.);
   return texture2D(tex, fract(_st));`},{name:"solid",type:"src",inputs:[{type:"float",name:"r",default:0},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:1}],glsl:"   return vec4(r, g, b, a);"},{name:"rotate",type:"coord",inputs:[{type:"float",name:"angle",default:10},{type:"float",name:"speed",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float ang = angle + speed *time;
   xy = mat2(cos(ang),-sin(ang), sin(ang),cos(ang))*xy;
   xy += 0.5;
   return xy;`},{name:"scale",type:"coord",inputs:[{type:"float",name:"amount",default:1.5},{type:"float",name:"xMult",default:1},{type:"float",name:"yMult",default:1},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 xy = _st - vec2(offsetX, offsetY);
   xy*=(1.0/vec2(amount*xMult, amount*yMult));
   xy+=vec2(offsetX, offsetY);
   return xy;
   `},{name:"pixelate",type:"coord",inputs:[{type:"float",name:"pixelX",default:20},{type:"float",name:"pixelY",default:20}],glsl:`   vec2 xy = vec2(pixelX, pixelY);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"posterize",type:"color",inputs:[{type:"float",name:"bins",default:3},{type:"float",name:"gamma",default:.6}],glsl:`   vec4 c2 = pow(_c0, vec4(gamma));
   c2 *= vec4(bins);
   c2 = floor(c2);
   c2/= vec4(bins);
   c2 = pow(c2, vec4(1.0/gamma));
   return vec4(c2.xyz, _c0.a);`},{name:"shift",type:"color",inputs:[{type:"float",name:"r",default:.5},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:0}],glsl:`   vec4 c2 = vec4(_c0);
   c2.r += fract(r);
   c2.g += fract(g);
   c2.b += fract(b);
   c2.a += fract(a);
   return vec4(c2.rgba);`},{name:"repeat",type:"coord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:0},{type:"float",name:"offsetY",default:0}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) * offsetX;
   st.y += step(1., mod(st.x,2.0)) * offsetY;
   return fract(st);`},{name:"modulateRepeat",type:"combineCoord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offsetX;
   st.y += step(1., mod(st.x,2.0)) + _c0.g * offsetY;
   return fract(st);`},{name:"repeatX",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatX",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"repeatY",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(1.0, reps);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatY",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"kaleid",type:"coord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st;
   st -= 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return r*vec2(cos(a), sin(a));`},{name:"modulateKaleid",type:"combineCoord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st - 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return (_c0.r+r)*vec2(cos(a), sin(a));`},{name:"scroll",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"scrollY",default:.5},{type:"float",name:"speedX",default:0},{type:"float",name:"speedY",default:0}],glsl:`
   _st.x += scrollX + time*speedX;
   _st.y += scrollY + time*speedY;
   return fract(_st);`},{name:"scrollX",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += scrollX + time*speed;
   return fract(_st);`},{name:"modulateScrollX",type:"combineCoord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += _c0.r*scrollX + time*speed;
   return fract(_st);`},{name:"scrollY",type:"coord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += scrollY + time*speed;
   return fract(_st);`},{name:"modulateScrollY",type:"combineCoord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += _c0.r*scrollY + time*speed;
   return fract(_st);`},{name:"add",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0+_c1)*amount + _c0*(1.0-amount);"},{name:"sub",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0-_c1)*amount + _c0*(1.0-amount);"},{name:"layer",type:"combine",inputs:[],glsl:"   return vec4(mix(_c0.rgb, _c1.rgb, _c1.a), clamp(_c0.a + _c1.a, 0.0, 1.0));"},{name:"blend",type:"combine",inputs:[{type:"float",name:"amount",default:.5}],glsl:"   return _c0*(1.0-amount)+_c1*amount;"},{name:"mult",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _c0*(1.0-amount)+(_c0*_c1)*amount;"},{name:"diff",type:"combine",inputs:[],glsl:"   return vec4(abs(_c0.rgb-_c1.rgb), max(_c0.a, _c1.a));"},{name:"modulate",type:"combineCoord",inputs:[{type:"float",name:"amount",default:.1}],glsl:`   //  return fract(st+(_c0.xy-0.5)*amount);
   return _st + _c0.xy*amount;`},{name:"modulateScale",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:1}],glsl:`   vec2 xy = _st - vec2(0.5);
   xy*=(1.0/vec2(offset + multiple*_c0.r, offset + multiple*_c0.g));
   xy+=vec2(0.5);
   return xy;`},{name:"modulatePixelate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:10},{type:"float",name:"offset",default:3}],glsl:`   vec2 xy = vec2(offset + _c0.x*multiple, offset + _c0.y*multiple);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"modulateRotate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float angle = offset + _c0.x * multiple;
   xy = mat2(cos(angle),-sin(angle), sin(angle),cos(angle))*xy;
   xy += 0.5;
   return xy;`},{name:"modulateHue",type:"combineCoord",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _st + (vec2(_c0.g - _c0.r, _c0.b - _c0.g) * amount * 1.0/resolution);"},{name:"invert",type:"color",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return vec4((1.0-_c0.rgb)*amount + _c0.rgb*(1.0-amount), _c0.a);"},{name:"contrast",type:"color",inputs:[{type:"float",name:"amount",default:1.6}],glsl:`   vec4 c = (_c0-vec4(0.5))*vec4(amount) + vec4(0.5);
   return vec4(c.rgb, _c0.a);`},{name:"brightness",type:"color",inputs:[{type:"float",name:"amount",default:.4}],glsl:"   return vec4(_c0.rgb + vec3(amount), _c0.a);"},{name:"mask",type:"combine",inputs:[],glsl:`   float a = _luminance(_c1.rgb);
  return vec4(_c0.rgb*a, a*_c0.a);`},{name:"luma",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.1}],glsl:`   float a = smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb));
   return vec4(_c0.rgb*a, a);`},{name:"thresh",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.04}],glsl:"   return vec4(vec3(smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb))), _c0.a);"},{name:"color",type:"color",inputs:[{type:"float",name:"r",default:1},{type:"float",name:"g",default:1},{type:"float",name:"b",default:1},{type:"float",name:"a",default:1}],glsl:`   vec4 c = vec4(r, g, b, a);
   vec4 pos = step(0.0, c); // detect whether negative
   // if > 0, return r * _c0
   // if < 0 return (1.0-r) * _c0
   return vec4(mix((1.0-_c0)*abs(c), c*_c0, pos));`},{name:"saturate",type:"color",inputs:[{type:"float",name:"amount",default:2}],glsl:`   const vec3 W = vec3(0.2125, 0.7154, 0.0721);
   vec3 intensity = vec3(dot(_c0.rgb, W));
   return vec4(mix(intensity, _c0.rgb, amount), _c0.a);`},{name:"hue",type:"color",inputs:[{type:"float",name:"hue",default:.4}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c.r += hue;
   //  c.r = fract(c.r);
   return vec4(_hsvToRgb(c), _c0.a);`},{name:"colorama",type:"color",inputs:[{type:"float",name:"amount",default:.005}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c += vec3(amount);
   c = _hsvToRgb(c);
   c = fract(c);
   return vec4(c, _c0.a);`},{name:"prev",type:"src",inputs:[],glsl:"   return texture2D(prevBuffer, fract(_st));"},{name:"sum",type:"color",inputs:[{type:"vec4",name:"scale",default:1}],glsl:`   vec4 v = _c0 * s;
   return v.r + v.g + v.b + v.a;
   }
   float sum(vec2 _st, vec4 s) { // vec4 is not a typo, because argument type is not overloaded
   vec2 v = _st.xy * s.xy;
   return v.x + v.y;`},{name:"r",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.r * scale + offset);"},{name:"g",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.g * scale + offset);"},{name:"b",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.b * scale + offset);"},{name:"a",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.a * scale + offset);"}];class re{constructor({defaultUniforms:e,defaultOutput:s,extendTransforms:n=[],changeListener:i=()=>{}}={}){this.defaultOutput=s,this.defaultUniforms=e,this.changeListener=i,this.extendTransforms=n,this.generators={},this.init()}init(){const e=ae();return this.glslTransforms={},this.generators=Object.entries(this.generators).reduce((s,[n,i])=>(this.changeListener({type:"remove",synth:this,method:n}),s),{}),this.sourceClass=class extends ${},Array.isArray(this.extendTransforms)?e.concat(this.extendTransforms):typeof this.extendTransforms=="object"&&this.extendTransforms.type&&e.push(this.extendTransforms),e.map(s=>this.setFunction(s))}_addMethod(e,s){const n=this;if(this.glslTransforms[e]=s,s.type==="src"){const i=(...r)=>new this.sourceClass({name:e,transform:s,userArgs:r,defaultOutput:this.defaultOutput,defaultUniforms:this.defaultUniforms,synth:n});return this.generators[e]=i,this.changeListener({type:"add",synth:this,method:e}),i}else this.sourceClass.prototype[e]=function(...i){return this.transforms.push({name:e,transform:s,userArgs:i,synth:n}),this}}setFunction(e){var s=oe(e);s&&this._addMethod(e.name,s)}}const U={src:{returnType:"vec4",args:[{type:"vec2",name:"_st"}]},coord:{returnType:"vec2",args:[{type:"vec2",name:"_st"}]},color:{returnType:"vec4",args:[{type:"vec4",name:"_c0"}]},combine:{returnType:"vec4",args:[{type:"vec4",name:"_c0"},{type:"vec4",name:"_c1"}]},combineCoord:{returnType:"vec2",args:[{type:"vec2",name:"_st"},{type:"vec4",name:"_c0"}]}};function oe(t){let e=U[t.type];if(e){let s=e.args.concat(t.inputs),n=s.map(r=>`${r.type} ${r.name}`).join(", "),i=`
  ${e.returnType} ${t.name}(${n}) {
      ${t.glsl}
  }
`;return t.inputs=s.slice(1),Object.assign({},t,{glsl:i})}else console.warn(`type ${t.type} not recognized`,t,U)}const ce=N();class he{constructor({pb:e=null,width:s=1280,height:n=720,numSources:i=4,numOutputs:r=4,makeGlobal:u=!0,autoLoop:o=!0,detectAudio:l=!0,enableStreamCapture:c=!0,canvas:m,precision:h,extendTransforms:v={}}={}){if(z.init(),this.pb=e,this.width=s,this.height=n,this.renderAll=!1,this.detectAudio=l,this._initCanvas(m),this.synth={time:0,bpm:30,width:this.width,height:this.height,fps:void 0,stats:{fps:0},speed:1,mouse:ce,render:this._render.bind(this),setResolution:this.setResolution.bind(this),update:p=>{},afterUpdate:p=>{},hush:this.hush.bind(this),tick:this.tick.bind(this)},u&&(window.loadScript=this.loadScript),this.timeSinceLastUpdate=0,this._time=0,h&&["lowp","mediump","highp"].includes(h.toLowerCase()))this.precision=h.toLowerCase();else{let p=(/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;this.precision=p?"highp":"mediump"}if(this.extendTransforms=v,this.saveFrame=!1,this.captureStream=null,this.generator=void 0,this._initRegl(),this._initOutputs(r),this._initSources(i),this._generateGlslTransforms(),this.synth.screencap=()=>{this.saveFrame=!0},c)try{this.captureStream=this.canvas.captureStream(25),this.synth.vidRecorder=new Q(this.captureStream)}catch(p){console.warn(`[hydra-synth warning]
new MediaSource() is not currently supported on iOS.`),console.error(p)}l&&this._initAudio(),o&&Y(this.tick.bind(this)).start(),this.sandbox=new Z(this.synth,u,["speed","update","afterUpdate","bpm","fps"])}eval(e){this.sandbox.eval(e)}getScreenImage(e){this.imageCallback=e,this.saveFrame=!0}hush(){this.s.forEach(e=>{e.clear()}),this.o.forEach(e=>{this.synth.solid(0,0,0,0).out(e)}),this.synth.render(this.o[0]),this.sandbox.set("update",e=>{}),this.sandbox.set("afterUpdate",e=>{})}loadScript(e=""){return new Promise((n,i)=>{var r=document.createElement("script");r.onload=function(){console.log(`loaded script ${e}`),n()},r.onerror=u=>{console.log(`error loading script ${e}`,"log-error"),n()},r.src=e,document.head.appendChild(r)})}setResolution(e,s){this.canvas.width=e,this.canvas.height=s,this.width=e,this.height=s,this.sandbox.set("width",e),this.sandbox.set("height",s),console.log(this.width),this.o.forEach(n=>{n.resize(e,s)}),this.s.forEach(n=>{n.resize(e,s)}),this.regl._refresh(),console.log(this.canvas.width)}canvasToImage(e){const s=document.createElement("a");s.style.display="none";let n=new Date;s.download=`hydra-${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}-${n.getHours()}.${n.getMinutes()}.${n.getSeconds()}.png`,document.body.appendChild(s);var i=this;this.canvas.toBlob(r=>{i.imageCallback?(i.imageCallback(r),delete i.imageCallback):(s.href=URL.createObjectURL(r),console.log(s.href),s.click())},"image/png"),setTimeout(()=>{document.body.removeChild(s),window.URL.revokeObjectURL(s.href)},300)}_initAudio(){this.synth.a=new W({numBins:4,parentEl:this.canvas.parentNode})}_initCanvas(e){e?(this.canvas=e,this.width=e.width,this.height=e.height):(this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.imageRendering="pixelated",document.body.appendChild(this.canvas))}_initRegl(){this.regl=j({canvas:this.canvas,pixelRatio:1}),this.regl.clear({color:[0,0,0,1]}),this.renderAll=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform sampler2D tex0;
      uniform sampler2D tex1;
      uniform sampler2D tex2;
      uniform sampler2D tex3;

      void main () {
        vec2 st = vec2(1.0 - uv.x, uv.y);
        st*= vec2(2);
        vec2 q = floor(st).xy*(vec2(2.0, 1.0));
        int quad = int(q.x) + int(q.y);
        st.x += step(1., mod(st.y,2.0));
        st.y += step(1., mod(st.x,2.0));
        st = fract(st);
        if(quad==0){
          gl_FragColor = texture2D(tex0, st);
        } else if(quad==1){
          gl_FragColor = texture2D(tex1, st);
        } else if (quad==2){
          gl_FragColor = texture2D(tex2, st);
        } else {
          gl_FragColor = texture2D(tex3, st);
        }

      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),tex1:this.regl.prop("tex1"),tex2:this.regl.prop("tex2"),tex3:this.regl.prop("tex3")},count:3,depth:{enable:!1}}),this.renderFbo=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform vec2 resolution;
      uniform sampler2D tex0;

      void main () {
        gl_FragColor = texture2D(tex0, vec2(1.0 - uv.x, uv.y));
      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),resolution:this.regl.prop("resolution")},count:3,depth:{enable:!1}})}_initOutputs(e){const s=this;this.o=Array(e).fill().map((n,i)=>{var r=new b({regl:this.regl,width:this.width,height:this.height,precision:this.precision,label:`o${i}`});return r.id=i,s.synth["o"+i]=r,r}),this.output=this.o[0]}_initSources(e){this.s=[];for(var s=0;s<e;s++)this.createSource(s)}createSource(e){let s=new q({regl:this.regl,pb:this.pb,width:this.width,height:this.height,label:`s${e}`});return this.synth["s"+this.s.length]=s,this.s.push(s),s}_generateGlslTransforms(){var e=this;this.generator=new re({defaultOutput:this.o[0],defaultUniforms:this.o[0].uniforms,extendTransforms:this.extendTransforms,changeListener:({type:s,method:n,synth:i})=>{s==="add"&&(e.synth[n]=i.generators[n],e.sandbox&&e.sandbox.add(n))}}),this.synth.setFunction=this.generator.setFunction.bind(this.generator)}_render(e){e?(this.output=e,this.isRenderingAll=!1):this.isRenderingAll=!0}tick(e,s){try{if(this.sandbox.tick(),this.detectAudio===!0&&this.synth.a.tick(),this.sandbox.set("time",this.synth.time+=e*.001*this.synth.speed),this.timeSinceLastUpdate+=e,!this.synth.fps||this.timeSinceLastUpdate>=1e3/this.synth.fps){if(this.synth.stats.fps=Math.ceil(1e3/this.timeSinceLastUpdate),this.synth.update)try{this.synth.update(this.timeSinceLastUpdate)}catch(i){console.log(i)}for(let i=0;i<this.s.length;i++)this.s[i].tick(this.synth.time);const n=this.synth.time;for(let i=0;i<this.o.length;i++)this.o[i].tick({time:n,mouse:this.synth.mouse,bpm:this.synth.bpm,resolution:[this.canvas.width,this.canvas.height]});if(this.isRenderingAll?this.renderAll({tex0:this.o[0].getCurrent(),tex1:this.o[1].getCurrent(),tex2:this.o[2].getCurrent(),tex3:this.o[3].getCurrent(),resolution:[this.canvas.width,this.canvas.height]}):this.renderFbo({tex0:this.output.getCurrent(),resolution:[this.canvas.width,this.canvas.height]}),this.synth.afterUpdate)try{this.synth.afterUpdate(this.timeSinceLastUpdate)}catch(i){console.log(i)}this.timeSinceLastUpdate=0}this.saveFrame===!0&&(this.canvasToImage(),this.saveFrame=!1)}catch(n){console.warn("Error during tick():",n)}}}export{he as default};
