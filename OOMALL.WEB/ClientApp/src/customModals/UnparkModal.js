/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

var unparkingRequest = {};

const UnparkModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modalconfirm, setModalConfirm] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleConfirm = () => setModalConfirm(!modalconfirm);

  var curr = new Date();
  curr.setDate(curr.getDate() + 1);
  var date = curr.toISOString().substr(0,10);
  var time = curr.getHours().toString().padStart(2, '0') + ":" + curr.getMinutes();

  const unparkACar = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "plateNumber": $("#plateNumber").val(),
        "exitDate": new Date($("#exitDate").val() + " " + $("#exitTime").val())
       })
    };
    const response = await fetch('Car/Update', requestOptions);
    const data = await response.json();
    console.log(data);
    unparkingRequest = data;
    $('#parkingLotTbl').DataTable();
    toggleConfirm();
  };

  const closeUnpark = () => {
    toggleConfirm();
    window.location.replace(window.location);
  }

  return (
    <div className="d-inline mx-1">
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Unpark a Car</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="col-form-label" htmlFor="plateNumber">Plate Number</label>
            <input type="text" className="form-control" placeholder="Plate Number" id="plateNumber" name="plateNumber"/>
          </div>  
          <FormGroup>
            <Label htmlFor="exitDate">Date</Label>
            <Input
              type="date"
              name="date"
              id="exitDate"
              placeholder="date placeholder"
              defaultValue={date} 
            />
          </FormGroup>
          <FormGroup>
          <Label htmlFor="exitTime">Time</Label>
            <Input
              type="time"
              name="time"
              id="exitTime"
              placeholder="time placeholder"
              defaultValue={time} 
            />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={unparkACar}>Proceed</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalconfirm} toggle={toggleConfirm} className="modal-xl">
        <ModalHeader toggle={toggleConfirm}>Park a Car</ModalHeader>
        <ModalBody>
          <h3>Success!</h3>
          <table id="test" className='table table-striped table-bordered' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Plate Number</th>
                <th>Total Hours</th>
                <th>Amount</th>
                <th>Penalties</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{unparkingRequest.plateNumber}</td>
                  <td>{unparkingRequest.totalHours}</td>
                  <td>{unparkingRequest.amount}</td>
                  <td>{unparkingRequest.penalties}</td>
                  <td>{unparkingRequest.totalAmount}</td>
                </tr>
            </tbody>
          </table>
          
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeUnpark}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UnparkModal;