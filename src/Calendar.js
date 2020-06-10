import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class Calendar extends Component {

  constructor(props) {
    super(props)

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeRepeat = this.onChangeRepeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: null,
      date: null,
      visitorId: null,
      repeat: null,
      events: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/events/visitor/' + '1234')
      .then(res => {
        this.setState({
          events: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  onChangeDate(e) {
    this.setState({date: e.target.value});
  }

  onChangeRepeat(e) {
    this.setState({repeat: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const eventObject = {
      title: this.state.title,
      date: this.state.date,
      visitorId: this.state.visitorId,
      repeat: this.state.repeat
    };
    axios.post('http://localhost:4000/events/create-or-update-event', eventObject).then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="App" >
        <div>
          <div className="antialiased sans-serif bg-gray-100 h-screen">
            <div>
              <div className="container mx-auto px-4 py-2 md:py-24">

                <div className="font-bold text-gray-800 text-xl mb-4">
                  Calendar Events
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                  <div className="flex items-center justify-between py-2 px-6">
                    <div>
                      <span className="text-lg font-bold text-gray-800"></span>
                      <span className="ml-1 text-lg text-gray-600 font-normal"></span>
                    </div>
                    <div className="border rounded-lg px-1" style={{paddingTop: '2px'}}>
                      <button
                        type="button"
                        className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center">
                        <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <div className="border-r inline-flex h-6"></div>
                      <button
                        type="button"
                        className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1">
                        <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="-mx-1 -mb-1">
                    <div className="flex flex-wrap" style={{marginBottom: '-40px'}}>
                      <template>
                        <div style={{width: '14.26%'}} className="px-2 py-2">
                          <div
                            className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center"></div>
                        </div>
                      </template>
                    </div>

                    <div className="flex flex-wrap border-t border-l">
                      <template>
                        <div
                          style={{width: '14.28%', height: '120px'}}
                          className="text-center border-r border-b px-4 pt-2"
                        ></div>
                      </template>
                      <template>
                        <div style={{width: '14.28%', height: '120px'}} className="px-4 pt-2 border-r border-b relative">
                          <div
                            className="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                          ></div>
                          <div style={{height: '80px'}}className="overflow-y-auto mt-1">
                            <div
                              className="absolute top-0 right-0 mt-2 mr-2 inline-flex items-center justify-center rounded-full text-sm w-6 h-6 bg-gray-700 text-white leading-none">
                            </div>

                            <template>
                              <div
                                className="px-2 py-1 rounded-lg mt-1 overflow-hidden border"
                              >
                                <p className="text-sm truncate leading-tight"></p>
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'none'}} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                  <div className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer">
                    <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                    </svg>
                  </div>

                  <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">

                    <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Event Details</h2>

                    <div className="mb-4">
                      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event title</label>
                      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text"/>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event date</label>
                      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" readOnly/>
                    </div>

                    <div className="inline-block w-64 mb-4">
                      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Select a theme</label>
                      <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700">


                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-right">
                      <button type="button" className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2">
                        Cancel
                      </button>
                      <button type="button" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm">
                        Save Event
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
