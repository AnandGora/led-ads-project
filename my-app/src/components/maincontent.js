import React, { useState, useEffect } from 'react';
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');

function generateUniqueKey() {
    return uuidv4();
}

const MainContent = () => {

/* LED Data */
    const [ledData, setLEDData] = useState([]);
    const [newLEDData, setNewLEDData] = useState({
        ledName: '',
        authKey: generateUniqueKey(),
        location: '',
        model: '',
        specification: {
        resolution: '',
        size: '',
        },
        status: '',
    });
    const [updateLEDData, setUpdateLEDData] = useState({ 
        ledId: '', 
        ledName: '',
        authKey: generateUniqueKey(),
        location: '',
        model: '',
        specification: {
        resolution: '',
        size: '',
        },
        status: '',
    }); 
    const [showUpdateLEDModal, setShowUpdateLEDModal] = useState(false);
    const createLED = async () => {
        try {
            const response = await axios.post('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/led/insert', {
                ...newLEDData,
                authKey: generateUniqueKey(),
            });
          setLEDData([...ledData, response.data]);
          showSuccessMessage('LED created successfully!');
          setShowCreateModal(false);
          const modalBackdrops = document.getElementsByClassName('modal-backdrop');
          for (let i = 0; i < modalBackdrops.length; i++) {
              modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
          }
        } catch (error) {
          console.error('Error creating LED:', error);
          showErrorMessage('Failed to create LED. Please try again.');
        } finally {
            setShowCreateModal(false);
        }
    };   
    const handleDeleteLED = async (ledId) => {
        try {
            await axios.post(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/led/delete/${ledId}`);
            setLEDData(ledData.filter(led => led._id !== ledId));
            showSuccessMessage('LED deleted successfully!');
        } catch (error) {
            console.error('Error deleting LED:', error);
            showErrorMessage('Failed to delete LED. Please try again.');
        } finally {
            setShowCreateModal(false);
        }
    };      
    const handleShowUpdateLEDModal = (ledId) => {
        const ledToUpdate = ledData.find((led) => led._id === ledId);

        console.log('LED to Update:', ledToUpdate);
    
        // Check if the LED ID is available
        if (ledToUpdate) {
            setUpdateLEDData({ ...ledToUpdate });
            setShowUpdateLEDModal(true);
        } else {
            console.error('LED not found for ID:', ledId);
            // Handle the case where the LED ID is not found, e.g., show an error message
        }
    };
    const updateLED = async () => {
        try {
            const response = await axios.put(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/led/update/${updateLEDData._id}`, {
                ...updateLEDData,
                authKey: generateUniqueKey(),
            });
            setLEDData((prevLEDData) =>
                prevLEDData.map((led) => (led._id === updateLEDData._id ? response.data : led))
            );
            showSuccessMessage('LED updated successfully!');
            setShowUpdateLEDModal(false);
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            for (let i = 0; i < modalBackdrops.length; i++) {
                modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
            }
        } catch (error) {
            console.error('Error updating LED:', error);
            showErrorMessage('Failed to update LED. Please try again.');
        } finally {
            setShowCreateModal(false);
        }
    };
/* LED Data */

    const [showCreateModal, setShowCreateModal] = useState(false);

/* Ad Data */
    const [adData, setAdData] = useState([]);
    const [newAdData, setNewAdData] = useState({
      adName: '',
      contentUrl: '',
      format: '',
      duration: 0,
      status: '',
    }); 
    const [updateAdData, setUpdateAdData] = useState({
        adId: '',
        adName: '',
        contentUrl: '',
        format: '',
        duration: 0,
        status: '',
    });
    const [showUpdateAdModal, setShowUpdateAdModal] = useState(false);    
    const createAdvertisement = async () => {
        try {
          const response = await axios.post('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/ad/insert', newAdData);
          setAdData([...adData, response.data]);
          showSuccessMessage('Ad created successfully!');
          setShowCreateModal(false);
          const modalBackdrops = document.getElementsByClassName('modal-backdrop');
          for (let i = 0; i < modalBackdrops.length; i++) {
              modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
          }
        } catch (error) {
          console.error('Error creating advertisement:', error);
          showErrorMessage('Failed to create Ad. Please try again.');
        } finally {
            setShowCreateModal(false);
        }
    };
    const handleDeleteAd = async (adId) => {
        try {
            await axios.post(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/ad/delete/${adId}`);
            setAdData(adData.filter(ad => ad._id !== adId));
            showSuccessMessage('Ad deleted successfully!');
        } catch (error) {
            console.error('Error deleting Ad:', error);
            showErrorMessage('Failed to delete Ad. Please try again.');
        } finally {
            setShowCreateModal(false); // Close the modal after success or failure
        }
    };  
    const handleShowUpdateAdModal = (adId) => {
        const adToUpdate = adData.find((ad) => ad._id === adId);
        console.log(adToUpdate);
        // Check if the Ad ID is available
        if (adToUpdate) {
            setUpdateAdData({ ...adToUpdate });
            setShowUpdateAdModal(true);

            
            console.log("Hi", setUpdateAdData);
        } else {
            console.error('Ad not found for ID:', adId);
            // Handle the case where the Ad ID is not found, e.g., show an error message
        }
    };
    const updateAdvertisement = async () => {
        try {
            const response = await axios.put(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/ad/update/${updateAdData._id}`, updateAdData);
            setAdData((prevAdData) =>
                prevAdData.map((ad) => (ad._id === updateAdData.adId ? response.data : ad))
            );
            showSuccessMessage('Ad updated successfully!');
            setShowUpdateAdModal(false);
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            for (let i = 0; i < modalBackdrops.length; i++) {
                modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
            }
        } catch (error) {
            console.error('Error updating Ad:', error);
            showErrorMessage('Failed to update Ad. Please try again.');
        }  finally {
            setShowCreateModal(false);
        }
    };
/* Ad Data */

/* Schedule Data */
    const [scheduleData, setScheduleData] = useState([]);
    const [newScheduleData, setNewScheduleData] = useState({ 
        ledId: '',
        adId: '',
        startTime: new Date(),
        endTime: new Date(),
        status: '',
    });
    const [updateScheduleData, setUpdateScheduleData] = useState({
        scheduleId: '',
        ledId: '',
        adId: '',
        startTime: new Date(),
        endTime: new Date(),
        status: '',
    });
    const [showUpdateScheduleModal, setShowUpdateScheduleModal] = useState(false);
    const createSchedule = async () => {
        try {
            // Convert datetime-local values to Unix timestamps
            const startTimeTimestamp = new Date(newScheduleData.startTime).getTime() / 1000;
            const endTimeTimestamp = new Date(newScheduleData.endTime).getTime() / 1000;
    
            const scheduleDataWithTimestamps = {
                ...newScheduleData,
                startTime: startTimeTimestamp,
                endTime: endTimeTimestamp,
            };
    
            const response = await axios.post('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/schedule/insert', scheduleDataWithTimestamps);
    
            setScheduleData([...scheduleData, response.data]);
            showSuccessMessage('Schedule created successfully!');            
            setShowCreateModal(false);
            document.body.classList.remove('modal-open');
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            for (let i = 0; i < modalBackdrops.length; i++) {
                modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
            }
        } catch (error) {
            console.error('Error creating schedule:', error);
            showErrorMessage('Failed to create schedule. Please try again.');
        }
    };
    const handleDeleteSchedule = async (scheduleId) => {
        try {
            await axios.post(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/schedule/delete/${scheduleId}`);
            setScheduleData(scheduleData.filter(schedule => schedule._id !== scheduleId));
            showSuccessMessage('Schedule deleted successfully!');
        } catch (error) {
            console.error('Error deleting Schedule:', error);
            showErrorMessage('Failed to delete Schedule. Please try again.');
        } finally {
            setShowCreateModal(false);
        }
    };
    const handleShowUpdateScheduleModal = (scheduleId) => {
        const scheduleToUpdate = scheduleData.find((schedule) => schedule._id === scheduleId);
    
        // Check if the Schedule ID is available
        if (scheduleToUpdate) {
            setUpdateScheduleData({ ...scheduleToUpdate });
            setShowUpdateScheduleModal(true);
            document.body.classList.remove('modal-open');
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            for (let i = 0; i < modalBackdrops.length; i++) {
                modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
            }
        } else {
            console.error('Schedule not found for ID:', scheduleId);
            // Handle the case where the Schedule ID is not found, e.g., show an error message
        }
    };
    const updateSchedule = async () => {
        try {
            const response = await axios.put(`http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/schedule/update/${updateScheduleData._id}`, updateScheduleData);
            setScheduleData((prevScheduleData) =>
                prevScheduleData.map((schedule) => (schedule._id === updateScheduleData.scheduleId ? response.data : schedule))
            );
            showSuccessMessage('Schedule updated successfully!');            
            setShowUpdateScheduleModal(false);
            document.body.classList.remove('modal-open');
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            for (let i = 0; i < modalBackdrops.length; i++) {
                modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
            }
        } catch (error) {
            console.error('Error updating Schedule:', error);
            showErrorMessage('Failed to update Schedule. Please try again.');
        }
    };
    const [availableLedIds, setAvailableLedIds] = useState([]);
    const [availableAdIds, setAvailableAdIds] = useState([]);    
/* Schedule Data */    
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setShowSuccessAlert(true);

        // Automatically close the success alert after 5 seconds
        setTimeout(() => {
            setShowSuccessAlert(false);
            setSuccessMessage('');
        }, 5000);
    };

    const showErrorMessage = (message) => {
        setErrorMessage(message);
        setShowErrorAlert(true);

        // Automatically close the error alert after 5 seconds
        setTimeout(() => {
            setShowErrorAlert(false);
            setErrorMessage('');
        }, 5000);
    };

    const [activeTab, setActiveTab] = useState('dashboard'); 

   // const LED_STATUSES = ['Active', 'Inactive', 'Under Maintenance', 'Offline', 'Online', 'Pending Approval', 'Disabled', 'Operational'];
    const LED_STATUSES = ['Active', 'Inactive'];

   // const ADVERTISEMENT_STATUSES = ['Active', 'Inactive', 'Draft', 'Pending Approval', 'Approved', 'Rejected', 'Expired', 'Scheduled'];
    const ADVERTISEMENT_STATUSES = ['Active', 'Inactive'];

    const SCHEDULE_STATUSES = ['Scheduled', 'Completed'];

    const convertUnixToIST = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
        const istTime = date.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        });
        return istTime;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ledsResponse, adsResponse, scheduleDataResponse] = await Promise.all([
                    axios.get('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/led'),
                    axios.get('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/ad'),
                    axios.get('http://ec2-3-25-87-165.ap-southeast-2.compute.amazonaws.com:3000/schedule'),
                ]);
    
                const leds = ledsResponse.data;
                const ads = adsResponse.data;
                const schedules = scheduleDataResponse.data;
    
                setLEDData(leds);
                setAdData(ads);
                setScheduleData(schedules);
    
                // Extract LED and Ad IDs and set them in the state
                const ledIds = leds.map((led) => ({ _id: led._id, name: led.ledName }));
                const adIds = ads.map((ad) => ({ _id: ad._id, name: ad.adName }));
                setAvailableLedIds(ledIds);
                setAvailableAdIds(adIds);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };
    
        fetchData();
}, []);
    
    

return (
    <div className="base-container">
        <div className="nav">
            <div className={`nav-option ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} >
                <i className="fa-solid fa-gauge"></i>
                <h3>Dashboard</h3>
            </div>
            <div className={`nav-option ${activeTab === 'led' ? 'active' : ''}`} onClick={() => setActiveTab('led')}>
                <i className="fa-solid fa-desktop"></i>
                <h3>LED Screen</h3>
            </div>
            <div className={`nav-option ${activeTab === 'ad' ? 'active' : ''}`} onClick={() => setActiveTab('ad')}>
                <i className="fa-solid fa-video"></i>
                <h3>Ads</h3>
            </div>
            <div className={`nav-option ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
                <i className="fa-solid fa-calendar-days"></i>
                <h3>Schedules</h3>
            </div>
            <div className="nav-option logout">
                <i className="fa-solid fa-right-from-bracket"></i>
                <h3>Logout</h3>
            </div>
        </div>

        <div className="main">
            {activeTab === 'led' && (
                <div className="container mt-3">
                    {showSuccessAlert && (
                        <div className="alert alert-success alert-dismissible fade show d-flex" role="alert">
                            {successMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    {showErrorAlert && (
                        <div className="alert alert-danger alert-dismissible fade show d-flex" role="alert">
                            {errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowErrorAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0 text-dark">LED Screen</h1>
                        <button className="btn btn-dark" data-toggle="modal" data-target="#ledModel" onClick={() => setShowCreateModal(true)}>Create LED</button>    
                    </div>
                    <hr className="horizontal-rule"></hr>
                    <div class="table-responsive mt-3 table-style">
                        <table class="table table-hover table-bordered table-rounded-borderd">
                            <thead>
                            <tr>
                                <th class="text-white bg-dark col-1">LED Name</th>
                                <th class="text-white bg-dark col-2">Location</th>
                                <th class="text-white bg-dark col-2">Model</th>
                                <th class="text-white bg-dark col-2">Status</th>
                                <th class="text-white bg-dark">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {ledData.map((data, index) => (
                                    <tr key={index}>
                                    <td>{data.ledName}</td>
                                    <td>{data.location}</td>
                                    <td>{data.model}</td>
                                    <td>{data.status}</td>                                      
                                    <td className="d-flex justify-content-between">
                                        <button className="btn btn-secondary" data-toggle="modal" data-target="#updateLEDModel" onClick={() => handleShowUpdateLEDModal(data._id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteLED(data._id)}>Delete</button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>            
                       
                        {showCreateModal && (
                            <div class="modal fade" id="ledModel" tabindex="-1" role="dialog" aria-labelledby="createLED" aria-hidden="true">
                                <div class="modal-content modal-dialog modal-dialog-centered">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-dark" id="createLED">Create LED</h5>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text" placeholder="LED Name" value={newLEDData.ledName} onChange={(e) => setNewLEDData({ ...newLEDData, ledName: e.target.value })}/>
                                        <input type="text" placeholder="Auth Key" value={newLEDData.authKey} onChange={(e) => setNewLEDData({ ...newLEDData, authKey: e.target.value })}/>
                                        <input type="text" placeholder="Location" value={newLEDData.location} onChange={(e) => setNewLEDData({ ...newLEDData, location: e.target.value })}/>
                                        <input type="text" placeholder="Model" value={newLEDData.model} onChange={(e) => setNewLEDData({ ...newLEDData, model: e.target.value })}/>            
                                        <input type="text" placeholder="Resolution" value={newLEDData.specification.resolution} onChange={(e) => setNewLEDData({...newLEDData, specification: { ...newLEDData.specification, resolution: e.target.value },})}/>
                                        <input type="text" placeholder="Size" value={newLEDData.specification.size} onChange={(e) => setNewLEDData({...newLEDData, specification: { ...newLEDData.specification, size: e.target.value },})}/>            
                                        <select className="form-control" value={newLEDData.status} onChange={(e) => setNewLEDData({ ...newLEDData, status: e.target.value })}>
                                            <option value="" disabled>Select Status</option>
                                            {LED_STATUSES.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowCreateModal(false)}>Close</button>
                                        <button type="button" class="btn btn-dark" onClick={createLED}>Create LED</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showUpdateLEDModal && (
                            <div className="modal fade" id="updateLEDModel" tabIndex="-1" role="dialog" aria-labelledby="updateLED" aria-hidden="true">
                                <div className="modal-content modal-dialog modal-dialog-centered">
                                <div className="modal-header">
                                    <h5 className="modal-title text-dark" id="updateLED">Update LED</h5>
                                </div>
                                <div className="modal-body">
                                    <input type="text" placeholder="LED Name" value={updateLEDData.ledName} onChange={(e) => setUpdateLEDData({ ...updateLEDData, ledName: e.target.value })} />
                                    <input type="text" placeholder="Auth Key" value={updateLEDData.authKey} onChange={(e) => setUpdateLEDData({ ...updateLEDData, authKey: e.target.value })} />
                                    <input type="text" placeholder="Location" value={updateLEDData.location} onChange={(e) => setUpdateLEDData({ ...updateLEDData, location: e.target.value })} />
                                    <input type="text" placeholder="Model" value={updateLEDData.model} onChange={(e) => setUpdateLEDData({ ...updateLEDData, model: e.target.value })} />
                                    <input type="text" placeholder="Resolution" value={updateLEDData.specification.resolution} onChange={(e) => setUpdateLEDData({ ...updateLEDData, specification: { ...updateLEDData.specification, resolution: e.target.value } })} />
                                    <input type="text" placeholder="Size" value={updateLEDData.specification.size} onChange={(e) => setUpdateLEDData({ ...updateLEDData, specification: { ...updateLEDData.specification, size: e.target.value } })} />
                                    <select className="form-control" value={updateLEDData.status} onChange={(e) => setUpdateLEDData({ ...updateLEDData, status: e.target.value })}>
                                        <option value="" disabled>Select Status</option>
                                        {LED_STATUSES.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowUpdateLEDModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={updateLED}>Update LED</button>
                                </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>  
            )}

            {activeTab === 'ad' && (
                <div className="container mt-3">
                    {showSuccessAlert && (
                        <div className="alert alert-success alert-dismissible fade show d-flex" role="alert">
                            {successMessage}
                            <button type="button" className="close" data-dismiss="alert d-flex" aria-label="Close" onClick={() => setShowSuccessAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    {showErrorAlert && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowErrorAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0 text-dark">Advertisement</h1>
                        <button className="btn btn-dark" data-toggle="modal" data-target="#adModel" onClick={() => setShowCreateModal(true)}>Create Ad</button>
                       
                    </div>
                   
                    <hr className="horizontal-rule"></hr>

                    <div class="table-responsive mt-3 table-style">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th class="text-white bg-dark">Ad Name</th>
                                <th class="text-white bg-dark">Content</th>
                                <th class="text-white bg-dark">Duration</th>
                                <th class="text-white bg-dark">Status</th>
                                <th class="text-white bg-dark">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {adData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.adName}</td>
                                        <td>{data.contentUrl}</td>
                                        <td>{data.duration}</td>
                                        <td>{data.status}</td>
                                        <td className="d-flex justify-content-between">                                            
                                            <button className="btn btn-secondary" data-toggle="modal" data-target="#updateAdModel" onClick={() => handleShowUpdateAdModal(data._id)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteAd(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>            
                       
                        {showCreateModal && (
                            <div class="modal fade" id="adModel" tabindex="-1" role="dialog" aria-labelledby="createAd" aria-hidden="true">
                                <div class="modal-content modal-dialog modal-dialog-centered">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-dark" id="createAd">Create Ad</h5>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text" placeholder="Ad Name" value={newAdData.adName} onChange={(e) => setNewAdData({ ...newAdData, adName: e.target.value })}/>
                                        <input type="text" placeholder="Content URL" value={newAdData.contentUrl} onChange={(e) => setNewAdData({ ...newAdData, contentUrl: e.target.value })}/>
                                        <input type="text" placeholder="Duration" value={newAdData.duration} onChange={(e) => setNewAdData({ ...newAdData, duration: e.target.value })}/>
                                        <input type="text" placeholder="Format" value={newAdData.format} onChange={(e) => setNewAdData({ ...newAdData, format: e.target.value })}/>                      
                                        <select className="form-control" value={newAdData.status} onChange={(e) => setNewAdData({ ...newAdData, status: e.target.value })}>
                                            <option value="" disabled>Select Status</option>
                                            {ADVERTISEMENT_STATUSES.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-dark" onClick={createAdvertisement}>Create Ad</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showUpdateAdModal && (
                            <div className="modal fade" id="updateAdModel" tabIndex="-1" role="dialog" aria-labelledby="updateAd" aria-hidden="true">
                                <div className="modal-content modal-dialog modal-dialog-centered">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-dark" id="updateAd">Update Ad</h5>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" placeholder="Ad Name" value={updateAdData.adName} onChange={(e) => setUpdateAdData({ ...updateAdData, adName: e.target.value })}/>
                                        <input type="text" placeholder="Content URL" value={updateAdData.contentUrl} onChange={(e) => setUpdateAdData({ ...updateAdData, contentUrl: e.target.value })}/>
                                        <input type="text" placeholder="Duration" value={updateAdData.duration} onChange={(e) => setUpdateAdData({ ...updateAdData, duration: e.target.value })}/>
                                        <input type="text" placeholder="Format" value={updateAdData.format} onChange={(e) => setUpdateAdData({ ...updateAdData, format: e.target.value })}/>                      
                                        <select className="form-control" value={updateAdData.status} onChange={(e) => setUpdateAdData({ ...updateAdData, status: e.target.value })}>
                                            <option value="" disabled>Select Status</option>
                                            {ADVERTISEMENT_STATUSES.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowUpdateAdModal(false)}>Close</button>
                                        <button type="button" className="btn btn-dark" onClick={updateAdvertisement}>Update Ad</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'schedule' && (
                <div className="container mt-3">
                    {showSuccessAlert && (
                        <div className="alert alert-success alert-dismissible fade show d-flex" role="alert">
                            {successMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    {showErrorAlert && (
                        <div className="alert alert-danger alert-dismissible fade show d-flex" role="alert">
                            {errorMessage}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowErrorAlert(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0 text-dark">Schedules</h1>
                        <button className="btn btn-dark" data-toggle="modal" data-target="#scheduleModel" onClick={() => setShowCreateModal(true)}>Create Schedule</button>    
                    </div>
                    <hr className="horizontal-rule"></hr>
                    <div class="table-responsive mt-2 table-style">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th class="text-white bg-dark">LED Name</th>
                                <th class="text-white bg-dark">Ad Name</th>
                                <th class="text-white bg-dark">Start Time</th>
                                <th class="text-white bg-dark">End TIme</th>
                                <th class="text-white bg-dark">Status</th>
                                <th class="text-white bg-dark">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.map((data, index) => (
                                    <tr key={index}>
                                    <td>{availableLedIds.find((led) => led._id === data.ledId)?.name}</td>
                                    <td>{availableAdIds.find((ad) => ad._id === data.adId)?.name}</td>
                                    <td>{convertUnixToIST(data.startTime)}</td>
                                    <td>{convertUnixToIST(data.endTime)}</td>
                                    <td>{data.status}</td>
                                    <td className="d-flex justify-content-between">                                            
                                        <button className="btn btn-secondary" data-toggle="modal" data-target="#updateScheduleModel" onClick={() => handleShowUpdateScheduleModal(data._id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteSchedule(data._id)}>Delete</button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>  
                       
                        {showCreateModal && (
                            <div class="modal fade" id="scheduleModel" tabindex="-1" role="dialog" aria-labelledby="createSchedule" aria-hidden="true">
                                <div class="modal-content modal-dialog modal-dialog-centered">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-dark" id="createSchedule">Create Schedule</h5>
                                    </div>
                                    <div class="modal-body">
                                        <select value={newScheduleData.ledId} onChange={(e) => setNewScheduleData({ ...newScheduleData, ledId: e.target.value })}>
                                            <option value="" disabled>Select LED Name</option>
                                            {availableLedIds.map((led) => (
                                                <option key={led._id} value={led._id}>{led.name}</option>
                                            ))}
                                        </select>

                                        <select value={newScheduleData.adId} onChange={(e) => setNewScheduleData({ ...newScheduleData, adId: e.target.value })}>
                                            <option value="" disabled>Select Ad Name</option>
                                            {availableAdIds.map((ad) => (
                                                <option key={ad._id} value={ad._id}>{ad.name}</option>
                                            ))}
                                        </select>

                                        <input type="datetime-local" placeholder="Start Time" value={newScheduleData.startTime} onChange={(e) => setNewScheduleData({ ...newScheduleData, startTime: e.target.value })}/>
                                        <input type="datetime-local" placeholder="End Time" value={newScheduleData.endTime} onChange={(e) => setNewScheduleData({ ...newScheduleData, endTime: e.target.value })}/>                      
                                        <select className="form-control" value={newScheduleData.status} onChange={(e) => setNewScheduleData({ ...newScheduleData, status: e.target.value })}>
                                            <option value="" disabled>Select Status</option>
                                            {SCHEDULE_STATUSES.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-dark" onClick={createSchedule}>Create Schedule</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showUpdateScheduleModal && (
                            <div className="modal fade" id="updateScheduleModel" tabIndex="-1" role="dialog" aria-labelledby="updateSchedule" aria-hidden="true">
                                <div className="modal-content modal-dialog modal-dialog-centered">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-dark" id="updateSchedule">Update Schedule</h5>
                                    </div>
                                    <div className="modal-body">
                                        <select value={updateScheduleData.ledId} onChange={(e) => setUpdateScheduleData({ ...updateScheduleData, ledId: e.target.value })}>
                                            <option value="" disabled>Select LED Name</option>
                                            {availableLedIds.map((led) => (
                                                <option key={led._id} value={led._id}>{led.name}</option>
                                            ))}
                                        </select>
                                        <select value={updateScheduleData.adId} onChange={(e) => setUpdateScheduleData({ ...updateScheduleData, adId: e.target.value })}>
                                        <option value="" disabled>Select Ad Name</option>
                                        {availableAdIds.map((ad) => (
                                            <option key={ad._id} value={ad._id}>{ad.name}</option>
                                        ))}
                                        </select>
                                        <input type="datetime-local" placeholder="Start Time" value={updateScheduleData.startTime} onChange={(e) => setUpdateScheduleData({ ...updateScheduleData, startTime: e.target.value })}/>
                                        <input type="datetime-local" placeholder="End Time" value={updateScheduleData.endTime} onChange={(e) => setUpdateScheduleData({ ...updateScheduleData, endTime: e.target.value })}/>
                                        <select className="form-control" value={updateScheduleData.status} onChange={(e) => setUpdateScheduleData({ ...updateScheduleData, status: e.target.value })}>
                                        <option value="" disabled>Select Status</option>
                                        {SCHEDULE_STATUSES.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowUpdateScheduleModal(false)}>Close</button>
                                        <button type="button" className="btn btn-dark" onClick={updateSchedule}>Update Schedule</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MainContent;