import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import SearchResult from './SearchResult'


export default function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/searchResult" element={<SearchResult />} />
            </Routes>
        </div>
    )
} 
