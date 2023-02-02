import React, { useState, useEffect, MouseEvent } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import "./App.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import AsyncSearchBar from "./AsyncSearchBar";
import { Button, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const navigate = useNavigate();
  interface Intermediate {
    id: number,
    value: string;
    label: string;
  }
  const [fetchError, setFetchError] = useState<Boolean>(false);
  const [origin, setOrigin] = useState<{ id: number, value: string, label: string }>({ id: -1, value: '', label: '' });
  const [intermediate, setIntermediate] = useState<Intermediate[]>([]);
  const [destination, setDestination] = useState<{ id: number, value: string, label: string }>({ id: -1, value: '', label: '' });
  const [num, setNum] = useState<Number>(0);
  const [date, setDate] = useState<Date | null>(new Date());

  const [originError, setOriginError] = useState<Boolean>(false);
  const [interError, setInterError] = useState<Boolean>(false);
  const [destError, setDestError] = useState<Boolean>(false);
  const [numError, setNumError] = useState<Boolean>(false);
  const [hasError, setHasError] = useState<boolean>(true);

  useEffect(() => {
    if (origin.value === '') {
      setOriginError(true);
    } else {
      setOriginError(false)
    }
    if (intermediate.length === 0) {
      setInterError(true);
    } else {
      setInterError(false)
    }
    if (destination.value === '') {
      setDestError(true);
    } else {
      setDestError(false);
    }
    if (num < 1) {
      setNumError(true);
    } else {
      setNumError(false)
    }


  }, [origin, intermediate, destination, num])

  useEffect(() => {
    if (originError || interError || destError || numError) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [originError, interError, destError, numError])


  const handleNumberChange = (e: any) => {
    const value = Math.max(1, e.target.value)
    setNum(e.target.value);
  }
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/searchResult", {
      state: {
        origin: origin,
        inter: intermediate,
        dest: destination,
        date: date,
        num: num
      }
    })
  }

  return (
    <div className="app">
      <h2 style={{ marginTop: '50px' }} className="App-header">Home</h2>
      {fetchError && (<h2 className="App-header" style={{ color: 'red' }}>Fetch Failed</h2>)}
      <div className="container ">
        <div className="search-bar" id="originCity">
          <h4>City of origin</h4>
          <AsyncSearchBar setFetchError={setFetchError} setValues={setOrigin} multi={false} text="City of origin" />
          {originError && (<span style={{ color: 'red' }}>select origin city</span>)}
        </div>
        <div className="search-bar" id="interCity">
          <h4>Intermediate cities</h4>
          <AsyncSearchBar setFetchError={setFetchError} setValues={setIntermediate} multi={true} text="Intermediate cities" />
          {interError && (<span style={{ color: 'red' }}>select intermediate cities</span>)}
        </div>
        <div className="search-bar" id="destCity">
          <h4>Destination city</h4>
          <AsyncSearchBar setFetchError={setFetchError} setValues={setDestination} multi={false} text="Destination city" />
          {destError && (<span style={{ color: 'red' }}>select destination city</span>)}
        </div>
        <div className="inputs">
          <div>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              minDate={new Date()}
            />
          </div>
          <div>
            <Input type="number" onChange={handleNumberChange} style={{ marginLeft: "40px" }} placeholder="Number of passengers"></Input>
            {numError && (<span style={{ color: 'red', marginLeft: '50px' }}>input correct number</span>)}
          </div>
        </div>
        <div className="inputs">
          <Button onClick={handleSubmit} disabled={hasError} color="danger">Submit</Button>
        </div>
      </div>
    </div>
  );
}