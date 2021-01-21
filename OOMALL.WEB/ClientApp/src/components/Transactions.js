import React, { Component } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';


export class Transactions extends Component {
  static displayName = Transactions.name;

  constructor(props) {
    super(props);
    this.state = { parking: [], loading: true };
  }

  componentDidMount() {
    this.populateParkingData();
  }

  static renderParkingTable(parking) {
    return (
      <table id="TransactionsTbl" className='table table-striped table-bordered' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Entry Date</th>
            <th>Exit Date</th>
            <th>Plate Number</th>
            <th>Total Hours</th>
            <th>Amount</th>
            <th>Penalties</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {parking.map((park, index) =>
            <tr key={index}>
              <td>{new Date(park.entryDate).toDateString()} {new Date(park.entryDate).toTimeString()}</td>
              <td>{new Date(park.exitDate).toDateString()} {new Date(park.exitDate).toTimeString()}</td>
              <td>{park.plateNumber}</td>
              <td>{park.totalHours}</td>
              <td>{park.amount}</td>
              <td>{park.penalties}</td>
              <td>{park.totalAmount}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Transactions.renderParkingTable(this.state.parking);

 
    return (
      <div>
        <h1 id="tabelLabel" >Transactions</h1>
        <p>This will show us the transactions history.</p>
        {contents}
      </div>
    );
  }

  async populateParkingData() {
    const response = await fetch('transacthistory');
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({ parking: data, loading: false });
    $('#TransactionsTbl').DataTable();
  }
}

