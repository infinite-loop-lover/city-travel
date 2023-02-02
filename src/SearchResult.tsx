import React, { useState, useEffect, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import AsyncResult from "./AsyncResult";
import { Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function SearchResult() {
    const location = useLocation();
    const [date, setDate] = useState<Date | null>(new Date());
    const [distanceData, setDistanceData] = useState<any>();
    const [total, setTotal] = useState<number>();
    const [hasError, setHasError] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://localhost:4000/', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(location.state),
            });
            const json = await data.json();
            if (json[0] === 'fail') {
                setHasError(true)
            } else {

                let totalVal = 0
                json.map((i: any, k: number) => {
                    totalVal += Math.trunc(i[2]);
                })
                setTotal(totalVal);
                setDistanceData(json);
            }
            return json;
        }
        fetchData();
    }, [])

    let distanceContets;
    if (distanceData) {
        distanceContets = distanceData.map((data: any, key: number) => (
            <div key={key}>
                <span style={{ margin: '50px' }}>{data[0]}</span>
                ~
                <span style={{ margin: '50px' }}>{data[1]}</span>
                :
                <span style={{ margin: '50px' }}>{Math.trunc(data[2])} Km</span>
            </div>
        ))
    }

    return (
        <div className="app">
            <h2 style={{ marginTop: '50px' }} className="App-header">Search Result </h2>
            <div style={{ marginTop: '30px' }} className="App-header">
                {hasError === true ? (<h2>Fetch Failed...</h2>) : (<>
                    {distanceData ? distanceContets : (<h2>Calculating...</h2>)}
                    {distanceData && <h2 style={{ marginTop: '30px' }}>total: {total} Km</h2>}
                </>
                )}

            </div>

            <div className="container ">
                <div className="search-bar">
                    <h4>City of origin</h4>
                    <AsyncResult multi={false} data={location.state.origin} />
                </div>
                <div className="search-bar">
                    <h4>Intermediate cities</h4>
                    <AsyncResult multi={true} data={location.state.inter} />
                </div>
                <div className="search-bar">
                    <h4>Destination city</h4>
                    <AsyncResult multi={false} data={location.state.dest} />
                </div>
                <div className="inputs">
                    <div>
                        <DatePicker
                            selected={location.state.date}
                            onChange={(d) => setDate(d)}
                        />
                    </div>
                    <div>
                        <Input type="number" defaultValue={location.state.num} style={{ marginLeft: "40px" }} placeholder="Number of passengers"></Input>
                    </div>
                </div>
            </div>
        </div>
    );
}