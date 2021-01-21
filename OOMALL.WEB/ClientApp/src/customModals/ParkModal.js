/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import $ from 'jquery';

var parkingRequest = {parkingSpaceId:null};

const ParkModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modalconfirm, setModalConfirm] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleConfirm = () => setModalConfirm(!modalconfirm);

  const requestCarParkingSpace = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "carCategoryId": $("#carCategories option:selected").val(),
        "entryPointId": $("#entryPoints option:selected").val()
       })
    };
    const response = await fetch('parking/request', requestOptions);
    const data = await response.json();
    parkingRequest = data;
    console.log(data);
    toggleConfirm();
  };

  const initParkingACar = async () => {
    console.log(parkingRequest);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "parkingSpaceId": parkingRequest.parkingSpaceId,
        "carCategoryId": $("#carCategories option:selected").val(),
        "plateNumber": $("#plateNumber").val()
       })
    };
    const response = await fetch('car/park', requestOptions);
    const data = await response.json();
    console.log(data);
    toggle();
    toggleConfirm();
    window.location.replace(window.location);
  };

  return (
    <div className="d-inline mx-1">
      <Button color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Park a Car</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="col-form-label" htmlFor="plateNumber">Plate Number</label>
            <input type="text" className="form-control" placeholder="Plate Number" id="plateNumber" name="plateNumber"/>
          </div>  
          <FormGroup>
            <Label htmlFor="entryPoints">Entry Points</Label>
            <Input type="select" name="entryPoints" id="entryPoints">
              <option value="D002A7FF-E2B3-4741-A633-44EE74FA55A0">Entrance A</option>
              <option value="2FC022A2-BDA5-4B8A-ACDF-2BC129323A4D">Entrance B</option>
              <option value="78B2F7AB-89A0-4C4A-B0CA-9A220904A08F">Entrance C</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="carCategories">Car Categories</Label>
            <Input type="select" name="carCategories" id="carCategories">
              <option value="ED0AEF85-0A90-4F6B-8615-2B22B3C1165E">Small</option>
              <option value="28A61D71-D0EE-40E9-BAB8-9767652E35AF">Medium</option>
              <option value="A29F34FD-7CE7-4BB6-BEC1-88E272CB32E8">Large</option>
            </Input>
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={requestCarParkingSpace}>Request</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalconfirm} toggle={toggleConfirm} className={className}>
        <ModalHeader toggle={toggleConfirm}>Park a Car</ModalHeader>
        <ModalBody>
          <h3>Do you want to proceed?</h3>
          <table className='table table-striped table-bordered' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Parking Space</th>
                <th>Description</th>
                <th>Hourly Rate</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{parkingRequest.parkingSpaceCode}</td>
                  <td>{parkingRequest.parkingCategoryDescription}</td>
                  <td>{parkingRequest.hourlyRate}</td>
                </tr>
            </tbody>
          </table>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={initParkingACar}>Proceed</Button>{' '}
          <Button color="secondary" onClick={toggleConfirm}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ParkModal;