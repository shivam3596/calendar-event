(this["webpackJsonpcalendar-event"]=this["webpackJsonpcalendar-event"]||[]).push([[0],{27:function(e,t,a){e.exports=a(55)},32:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(19),o=a.n(r),s=a(23),i=(a(32),a(20)),c=a(21),d=a(26),m=a(24),u=a(25),g=a(5),v=a.n(g),h=new u.a,p=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={selectedEventId:null,submitDone:!1,openModal:!1,openEventModal:!1,weekDates:null,title:"",date:null,time:null,visitorId:null,repeat:!1,events:[]},n}return Object(c.a)(a,[{key:"getWeek",value:function(e){for(var t=new Date(e.setDate(e.getDate()-e.getDay())),a=[new Date(t).toDateString()];t.setDate(t.getDate()+1)&&0!==t.getDay();)a.push(new Date(t).toDateString());return a}},{key:"componentDidMount",value:function(){var e=this,t=h.get("visitorId");if(null==t||""===t){var a=(new Date).getTime();h.set("visitorId",a,{path:"/"})}v.a.get("/events/visitor/"+t).then((function(t){e.setState({events:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"onChangeTitle",value:function(e){this.setState({title:e.target.value})}},{key:"setDate",value:function(e){this.setState({date:e})}},{key:"setTime",value:function(e){this.setState({time:e})}},{key:"onChangeRepeat",value:function(e){this.setState({repeat:e.target.checked})}},{key:"openEventModal",value:function(e,t,a){var n=t+a;""===document.getElementById(n).innerHTML&&this.setState({openModal:!0}),this.setState({submitDone:!1}),this.setDate(t),this.setTime(a)}},{key:"openEventItemModal",value:function(e,t,a,n){this.setState({selectedEventId:e.target.id}),this.setState({openEventModal:!0}),this.setState({title:e.target.getAttribute("data-title")}),this.setState({repeat:e.target.getAttribute("data-checked")}),this.setState({submitDone:!1}),this.setDate(t),this.setTime(a)}},{key:"closeEventModal",value:function(e){this.setState({openModal:!1}),this.setState({openEventModal:!1}),this.setState({title:""}),this.setState({repeat:!1})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var a={title:this.state.title,date:this.state.date,time:this.state.time,visitorId:h.get("visitorId"),repeat:this.state.repeat},n=this.state.date+this.state.time,l=document.getElementById(n);v.a.post("/events/create-event",a).then((function(e){return t.closeEventModal()}),l.innerHTML=l.innerHTML+'<div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border"><p class="text-sm truncate leading-tight bg-green-200">'+this.state.title+"</p></div>",t.setState({submitDone:!0}))}},{key:"onDelete",value:function(e){e.preventDefault(),v.a.delete("/events/delete-event/"+this.state.selectedEventId).then((function(e){window.location.reload()})).catch((function(e){console.log(e)}))}},{key:"allowDrop",value:function(e){e.preventDefault()}},{key:"drag",value:function(e,t,a){e.dataTransfer.setData("text",e.target.id),e.dataTransfer.setData("movingId",document.getElementById(t+a).firstChild.getElementsByTagName("p")[0].id)}},{key:"drop",value:function(e,t,a){if(e.preventDefault(),""===document.getElementById(t+a).innerHTML){var n=e.dataTransfer.getData("text"),l=e.dataTransfer.getData("movingId"),r=document.getElementById(e.target.id);null!==r&&(r.innerHTML=document.getElementById(n).innerHTML,document.getElementById(n).innerHTML="",v.a.put("/events/update-event/"+l,{date:t,time:a}).then((function(e){alert("Event Updated")})).catch((function(e){console.log(e)})))}else alert("Drop not allowed on scheduled event.")}},{key:"render",value:function(){var e=this,t=new Date,a=t.getDate(),n=t.getMonth()+1,r=t.getFullYear();a<10&&(a="0"+a),n<10&&(n="0"+n),t=n+"/"+a+"/"+r;for(var o=this.getWeek(new Date(t)),s=[],i=0;o.length>i;i++){var c=o[i];s.push(c.toString())}var d=["1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM","12 AM"];return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"bg-indigo-900 text-center py-4 lg:px-4"},l.a.createElement("div",{className:"p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex",role:"alert"},l.a.createElement("span",{className:"font-semibold mr-2 text-left flex-auto"},"Welcome ! Click on box to add event "))),l.a.createElement("div",null,l.a.createElement("div",{className:"antialiased sans-serif bg-gray-100"},l.a.createElement("div",null,l.a.createElement("div",{className:"container mx-auto px-4 py-2 md:py-24"},l.a.createElement("div",{className:"font-bold text-gray-800 text-xl mb-4"},"Week Calendar"),l.a.createElement("div",{className:"bg-white rounded-lg shadow overflow-hidden"},l.a.createElement("div",{className:"flex items-center justify-between py-2 px-6"},l.a.createElement("div",null,l.a.createElement("span",{className:"text-lg font-bold text-gray-800"},this.state.currentMonth),l.a.createElement("span",{className:"ml-1 text-lg text-gray-600 font-normal"},this.state.currentYear))),l.a.createElement("div",{className:"-mx-1 -mb-1"},l.a.createElement("div",{className:"flex flex-wrap"},s.map((function(t,a){var n=t.split(" ");return l.a.createElement("div",{key:a,style:{width:"14.26%"},className:"px-2 py-2"},l.a.createElement("div",{className:"text-gray-600 text-sm uppercase tracking-wide font-bold text-center"},n[0]),l.a.createElement("div",{className:"text-gray-800 text-md uppercase tracking-wide font-bold text-center mb-4"},n[1]+" "+n[2]),l.a.createElement("div",null,d.map((function(a,n){return l.a.createElement("div",{key:n,className:"pt-2 border-r border-b relative rounded-lg shadow mb-2 hover:bg-blue-200 cursor-pointer",onClick:function(n){e.openEventModal(n,t,a),n.preventDefault()}},l.a.createElement("div",{className:"inline-flex items-center justify-center text-gray-600"},a),l.a.createElement("div",{style:{height:"80px"},"data-time":a,"data-date":t,className:"overflow-y-auto mt-1",id:t+a,onDrop:function(n){e.drop(n,t,a)},onDragOver:function(t){e.allowDrop(t)},onDragStart:function(n){e.drag(n,t,a)},draggable:"true"},e.state.events.map((function(n,r){return new Date(n.date).toString().split(" ")[2]===t.split(" ")[2]&&n.time===a?l.a.createElement("div",{key:r,className:"px-2 py-1 rounded-lg mt-1 overflow-hidden border list>"},l.a.createElement("p",{id:n._id,"data-checked":n.repeat,"data-title":n.title,className:"text-sm truncate leading-tight",onClick:function(l){e.openEventItemModal(l,t,a,n.title),l.preventDefault()}},n.title)):null}))))}))))})))))),!0===this.state.openModal||!0===this.state.openEventModal?l.a.createElement("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.8)"},className:"fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full"},l.a.createElement("div",{className:"p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24"},l.a.createElement("div",{onClick:function(t){e.closeEventModal(t),t.preventDefault()},className:"shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"},l.a.createElement("svg",{className:"fill-current w-6 h-6",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},l.a.createElement("path",{d:"M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"}))),l.a.createElement("div",{className:"shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8"},l.a.createElement("h2",{className:"font-bold text-2xl mb-6 text-gray-800 border-b pb-2"},!0===this.state.openEventModal?"Event Detail":"Add Event Detail"),l.a.createElement("div",{className:"mb-4"},l.a.createElement("label",{className:"text-gray-800 block mb-1 font-bold text-sm tracking-wide"},"Event title"),l.a.createElement("input",{value:this.state.title,disabled:!!this.state.openEventModal,onChange:function(t){e.onChangeTitle(t)},className:"bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500",type:"text"})),l.a.createElement("div",{className:"mb-4"},l.a.createElement("label",{className:"text-gray-800 block mb-1 font-bold text-sm tracking-wide"},"Event date"),l.a.createElement("input",{value:this.state.date,className:"bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500",type:"text",readOnly:!0})),l.a.createElement("div",{className:"mb-4"},l.a.createElement("label",{className:"text-gray-800 block mb-1 font-bold text-sm tracking-wide"},"Event time"),l.a.createElement("input",{value:this.state.time,className:"bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500",type:"text",readOnly:!0})),this.state.openEventModal?l.a.createElement("label",{className:"flex justify-start items-start"},l.a.createElement("div",{className:"true"===this.state.repeat?"select-none text-green-800":"select-none text-red-800"},"true"===this.state.repeat?"Repeats every day":"Do not repeat every day")):l.a.createElement("label",{className:"flex justify-start items-start"},l.a.createElement("div",{className:"bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"},l.a.createElement("input",{onChange:function(t){e.onChangeRepeat(t)},type:"checkbox",className:"opacity-0 absolute"}),l.a.createElement("svg",{className:"fill-current hidden w-4 h-4 text-green-500 pointer-events-none",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M0 11l2-2 5 5L18 3l2 2L7 18z"}))),l.a.createElement("div",{className:"select-none"},"Repeats every day")),l.a.createElement("div",{className:"mt-8 text-right"},l.a.createElement("button",{onClick:function(t){e.closeEventModal(t),t.preventDefault()},type:"button",className:"bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2"},"Cancel"),this.state.openEventModal?l.a.createElement("button",{onClick:function(t){e.onDelete(t)},type:"button",className:"bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-700 rounded-lg shadow-sm"},"Delete Event"):l.a.createElement("button",{onClick:function(t){e.onSubmit(t)},type:"button",className:"bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-700 rounded-lg shadow-sm"},"Save Event"))))):null,this.state.submitDone?l.a.createElement("div",{className:"alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm"},l.a.createElement("input",{type:"checkbox",className:"hidden",id:"footertoast"}),l.a.createElement("label",{className:"close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white",title:"close",htmlFor:"footertoast"},"Event added successfully!",l.a.createElement("svg",{className:"fill-current text-white",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},l.a.createElement("path",{d:"M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"})))):null))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(s.a,null,l.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.3943fbd1.chunk.js.map