import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEventId: null,
      submitDone: false,
      openModal: false,
      openEventModal: false,
      weekDates: null,
      title: "",
      date: null,
      time: null,
      visitorId: null,
      repeat: false,
      events: []
    }
  }

  getWeek(fromDate) {
    let sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()));
    let result = [new Date(sunday).toDateString()];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday).toDateString());
    }
    return result;
  }


  componentDidMount() {
    let visitorId = cookies.get('visitorId');
    if(visitorId == null || visitorId === ""){
      let date = new Date();
      let newDateTime = date.getTime();
      cookies.set('visitorId', newDateTime, { path: '/' });
    }
    axios.get('/events/visitor/' + visitorId).then(res => {
      this.setState({
        events: res.data
      });
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  setDate(selectedDate) {
    this.setState({date: selectedDate});
  }

  setTime(selectedTime) {
    this.setState({time: selectedTime});
  }

  onChangeRepeat(e) {
    this.setState({repeat: e.target.checked});
  }

  openEventModal(e, date, time) {
    let dateTimeElement = date + time;
    let parentDiv = document.getElementById(dateTimeElement);
    if(parentDiv.innerHTML === ""){
      this.setState({openModal: true});
    }
    this.setState({submitDone: false})
    this.setDate(date);
    this.setTime(time);
  }

  openEventItemModal(e, date, time, title) {
    this.setState({selectedEventId: e.target.id});
    this.setState({openEventModal: true});
    this.setState({title: e.target.getAttribute('data-title')});
    this.setState({repeat: e.target.getAttribute('data-checked')});
    this.setState({submitDone: false});
    this.setDate(date);
    this.setTime(time);
  }

  closeEventModal(e) {
    this.setState({openModal: false});
    this.setState({openEventModal: false});
    this.setState({title: ''});
    this.setState({repeat: false});
  }

  onSubmit(e) {
    let that = this;
    e.preventDefault();

    const eventObject = {
      title: this.state.title,
      date: this.state.date,
      time: this.state.time,
      visitorId: cookies.get('visitorId'),
      repeat: this.state.repeat
    };
    let dateTimeElement = this.state.date + this.state.time;
    let parentDiv = document.getElementById(dateTimeElement);
    axios.post('/events/create-event', eventObject).then(res =>
      that.closeEventModal(),
      parentDiv.innerHTML = parentDiv.innerHTML + '<div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border"><p class="text-sm truncate leading-tight bg-green-200">'+ this.state.title +'</p></div>',
      that.setState({submitDone: true})
    );
  }

  onDelete(e) {
    e.preventDefault();
    axios.delete('/events/delete-event/' + this.state.selectedEventId)
    .then((res) => {
        window.location.reload()
    }).catch((error) => {
        console.log(error)
    });
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e, givenDay, givenHour) {
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.setData("movingId", document.getElementById(givenDay + givenHour).firstChild.getElementsByTagName('p')[0].id);
  }

  drop(e, givenDay, givenHour) {
    e.preventDefault();
    let parentDiv = document.getElementById(givenDay + givenHour);
    if(parentDiv.innerHTML === ""){
      let data = e.dataTransfer.getData("text");
      let movingId = e.dataTransfer.getData("movingId");
      let targetElement = document.getElementById(e.target.id);
      if(targetElement !== null){
        targetElement.innerHTML = document.getElementById(data).innerHTML;
        document.getElementById(data).innerHTML = '';
        axios.put('/events/update-event/' + movingId, {date: givenDay, time: givenHour})
        .then((res) => {
          alert('Event Updated')
        }).catch((error) => {
          console.log(error)
        });
      }
    }else{
      alert('Drop not allowed on scheduled event.');
    }
  }

  render() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;

    let week = this.getWeek(new Date(today));
    let weekLayout = [];
    for (let i = 0; week.length > i; i++) {
      let data = week[i];
      weekLayout.push(data.toString());
    }

    let hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM',
    '8 PM', '9 PM', '10 PM', '11 PM' , '12 AM'];

    return (
      <div className="App" >
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="font-semibold mr-2 text-left flex-auto">Welcome ! Click on box to add event </span>
          </div>
        </div>
        <div>
          <div className="antialiased sans-serif bg-gray-100">
            <div>
              <div className="container mx-auto px-4 py-2 md:py-24">

                <div className="font-bold text-gray-800 text-xl mb-4">
                  Week Calendar
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                  <div className="flex items-center justify-between py-2 px-6">
                    <div>
                      <span className="text-lg font-bold text-gray-800">{this.state.currentMonth}</span>
                      <span className="ml-1 text-lg text-gray-600 font-normal">{this.state.currentYear}</span>
                    </div>
                  </div>

                  <div className="-mx-1 -mb-1">
                    <div className="flex flex-wrap">
                      {
                        weekLayout.map((day, index) => {
                          let splitDate = day.split(' ');
                          return (
                            <div key={index} style={{width: '14.26%'}} className="px-2 py-2">
                              <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{splitDate[0]}</div>
                              <div className="text-gray-800 text-md uppercase tracking-wide font-bold text-center mb-4">{splitDate[1]  + " " + splitDate[2]}</div>
                              <div>
                                {
                                  hours.map((hour, index) => {
                                    return (
                                      <div key={index} className="px-4 pt-2 border-r border-b relative rounded-lg shadow mb-2 hover:bg-blue-200 cursor-pointer" onClick={e => { this.openEventModal(e, day, hour); e.preventDefault(); }}>
                                       <div className="inline-flex w-12 h-6 items-center justify-center rounded-full cursor-pointer text-center leading-none bg-blue-500 text-white">{hour}</div>
                                        <div style={{height: '80px'}} data-time={hour} data-date={day} className="overflow-y-auto mt-1" id={day+hour} onDrop={e => { this.drop(e, day, hour); }} onDragOver={ e=> { this.allowDrop(e);}} onDragStart={e=> { this.drag(e, day, hour)}} draggable="true" >
                                          {
                                            this.state.events.map((event, index) => {
                                              var date = new Date(event.date);
                                              if(date.toString().split(' ')[2] === day.split(' ')[2] && event.time === hour){
                                                return(
                                                  <div key={index} className="px-2 py-1 rounded-lg mt-1 overflow-hidden border list>">
                                                    <p id={event._id} data-checked={event.repeat} data-title={event.title} className="text-sm truncate leading-tight" onClick={e => { this.openEventItemModal(e, day, hour, event.title); e.preventDefault(); }}>{event.title}</p>
                                                  </div>
                                                );
                                              } else {
                                                return null;
                                              }
                                            })
                                          }

                                        </div>
                                      </div>
                                    );
                                  })
                                }
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>

              {this.state.openModal === true ||  this.state.openEventModal === true?
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                  <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                    <div onClick={e => { this.closeEventModal(e); e.preventDefault(); }} className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer">
                      <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                      </svg>
                    </div>

                    <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">

                      <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">{this.state.openEventModal === true ? "Event Detail" : "Add Event Detail"}</h2>

                      <div className="mb-4">
                        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event title</label>
                        <input value={this.state.title} disabled={this.state.openEventModal ? true : false} onChange={e => { this.onChangeTitle(e); }} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text"/>
                      </div>

                      <div className="mb-4">
                        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event date</label>
                        <input value={this.state.date} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" readOnly/>
                      </div>

                      <div className="mb-4">
                        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event time</label>
                        <input value={this.state.time} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" readOnly/>
                      </div>

                      {this.state.openEventModal ?
                        <label className="flex justify-start items-start">
                          <div className={this.state.repeat === "true" ? 'select-none text-green-800' : 'select-none text-red-800'}>{this.state.repeat === "true" ? 'Repeats every day' : 'Do not repeat every day'}</div>
                        </label>
                      :
                      <label className="flex justify-start items-start">
                        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                          <input onChange={e => { this.onChangeRepeat(e); }} type="checkbox" className="opacity-0 absolute"/>
                          <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                        <div className="select-none">Repeats every day</div>
                      </label>
                      }
                      <div className="mt-8 text-right">
                        <button onClick={e => { this.closeEventModal(e); e.preventDefault(); }} type="button" className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2">
                          Cancel
                        </button>
                        {this.state.openEventModal ?
                          <button onClick={e => { this.onDelete(e);}} type="button" className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-700 rounded-lg shadow-sm">
                            Delete Event
                          </button>
                          :
                          <button onClick={e => { this.onSubmit(e);}} type="button" className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-700 rounded-lg shadow-sm">
                            Save Event
                          </button>
                        }
                      </div>

                    </div>

                  </div>
                </div>
                :null
              }

              {
                this.state.submitDone ?
                  <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
                    <input type="checkbox" className="hidden" id="footertoast"/>

                    <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white" title="close" htmlFor="footertoast">
                      Event added successfully!

                      <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                      </svg>
                    </label>
                  </div>
                :null
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
