import React, { Component } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import ParkModal from '../customModals/ParkModal'
import UnparkModal from '../customModals/UnparkModal';

export class ParkingLot extends Component {
  static displayName = ParkingLot.name;

  constructor(props) {
    super(props);
    this.state = { parking: [], loading: true };
  }

  componentDidMount() {
    this.populateParkingData();
  }

  static renderParkingTable(parking) {
    return (
      <table id="parkingLotTbl" className='table table-striped table-bordered' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
              {parking[0].entryPoints.map(item =>
                <th key={item.entryPointName}>{item.entryPointName}</th>
              )}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {parking.map((park, index) =>
            <tr key={index}>
              <td>{park.parkingSpaceCode}</td>
                {park.entryPoints.map(item =>
                  <td key={item.entryPointName}>{item.distanceInMeters}</td>
                )}
              <td>
                {park.isOccupied
                ? <b className='text-danger'>Occupied</b>
                : <b className='text-info'>Available</b>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ParkingLot.renderParkingTable(this.state.parking);

 
    return (
      <div>
        <div className='text-right'>
          <ParkModal buttonLabel="Park a Car"></ParkModal>
          <UnparkModal buttonLabel="Unpark a Car"></UnparkModal>
        </div>
        
        <h1 id="tabelLabel" >Parking Lot</h1>
        <p>This will show us the overview of the parking spaces.</p>
        {contents}
      </div>
    );
  }

  async populateParkingData() {
    const response = await fetch('parking');
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({ parking: data, loading: false });
    $('#parkingLotTbl').DataTable();
  }
}

