/*  [Status] Unfinished
*   Last Updated: 2018-01-18 13:51:01
*/

import React, { Component } from 'react';

function daysInMonth(date) {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1;
    return new Date(year, month, 0).getDate();
}

const SimpleCalendarGenerator = (themeName) => {

    class SimpleCalendar extends Component {
        constructor(props) {
            super(props);
            this.state = {
                'currentTime': new Date(),
                'markTime': new Date(),
                'currentMonth': {
                    'offset': new Date(new Date().setDate(0)).getDay(),
                    'numberOfDays': daysInMonth(new Date()),
                    'monthNo': new Date().getMonth() + 1
                }
            }
            this.onDateChange = this.onDateChange.bind(this);
            this.onMarkChange = this.onMarkChange.bind(this);
        }

        onDateChange(date) {
            const newDate = new Date(date);
            this.setState({
                'currentTime': newDate,
                'currentMonth': {
                    'offset': new Date(new Date(newDate).setDate(0)).getDay(),
                    'numberOfDays': daysInMonth(newDate),
                    'monthNo': newDate.getMonth() + 1
                }
            })
        }

        onMarkChange(date) {
            const newDate = new Date(date);
            this.setState({
                'markTime': newDate
            })
        }

        render() {
            const { currentTime, currentMonth } = this.state;
            const { offset, numberOfDays, monthNo } = currentMonth;

            return (
                <div className={`${themeName}`}>
                    This is a simple calendar
                    <div>
                    {
                        `${monthNo} ${currentTime.getFullYear()}`
                    }
                    </div>
                    <button
                        onClick={() => {
                            this.onDateChange(new Date(new Date(currentTime).setFullYear(currentTime.getFullYear() - 1)))
                        }}
                    >Prev Year</button>
                    <button
                        onClick={() => {
                            this.onDateChange(new Date(new Date(currentTime).setMonth(currentTime.getMonth() - 1)))
                        }}
                    >Prev Month</button>
                    <button
                        onClick={() => {
                            this.onDateChange(new Date(new Date(currentTime).setMonth(currentTime.getMonth() + 1)))
                        }}
                    >Next Month</button>
                    <button
                        onClick={() => {
                            this.onDateChange(new Date(new Date(currentTime).setFullYear(currentTime.getFullYear() + 1)))
                        }}
                    >Next Year</button>
                    {
                        Array.from(Array(Math.ceil((offset + numberOfDays) / 7)).keys())
                        .map((a, ind) => {
                            return (
                                <div key={ind} style={{
                                    display: 'flex'
                                }}>
                                    {
                                        Array.from(Array(7).keys())
                                        .map((b, index) => {
                                            return (
                                                <div key={`innner-${index}`} style={{
                                                    flex: '1'
                                                }}>
                                                    {
                                                        (ind * 7 + index >= offset && ind * 7 + index < numberOfDays + offset) ? (ind * 7 + index + 1 - offset) : 'out'
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }

    return SimpleCalendar;
}

export default SimpleCalendarGenerator;