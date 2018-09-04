import React from 'react'
import SimpleLineChart from './SimpleLineChart'
import SimpleTable from './SimpleTable'
import './style.css'


export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <h2>Orders</h2>
                <SimpleLineChart/>
                <h2>Products</h2>
                <SimpleTable/>
            </div>
        );
    }
}