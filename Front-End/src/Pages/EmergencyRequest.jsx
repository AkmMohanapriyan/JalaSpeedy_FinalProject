import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import axios from "../Utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmergencyRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const openModal = () => {
    setShowModal(true);
    setTimeout(initMap, 300);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const initMap = () => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const defaultPosition = [20.5937, 78.9629];
    const map = L.map("map").setView(defaultPosition, 5);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        const center = e.geocode.center;
        map.setView(center, 15);
        if (markerRef.current) {
          markerRef.current.setLatLng(center);
        } else {
          markerRef.current = L.marker(center, { draggable: true }).addTo(map);
          markerRef.current.on("dragend", (e) => {
            updateLocation(e.target.getLatLng());
          });
        }
        updateLocation(center);
      })
      .addTo(map);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        map.setView(latlng, 15);
        markerRef.current = L.marker(latlng, { draggable: true }).addTo(map);
        markerRef.current.on("dragend", (e) => {
          updateLocation(e.target.getLatLng());
        });
        updateLocation({ lat: latlng[0], lng: latlng[1] });
      },
      () => {
        map.setView(defaultPosition, 5);
      }
    );
  };

  const updateLocation = ({ lat, lng }) => {
    setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    purpose,
    amount,
    date,
    location,
  };

  try {
    const response = await axios.post("http://localhost:5000/api/emergency-requests", payload);
    toast.success("Request submitted successfully!");
    closeModal();
    setPurpose("");
    setAmount("");
    setLocation("");
    setDate(new Date().toISOString().split("T")[0]);
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Failed to submit emergency request."
    );
  }
};

  return (
    <>
      {/* Emergency Button */}
      <button
        onClick={openModal}
        className="btn btn-warning rounded-circle position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          fontSize: "22px",
          zIndex: 1050,
        }}
        title="Emergency Water Request"
      >
        🚩
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Emergency Water Request</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Purpose</label>
                    <select
                      className="form-select"
                      required
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Drinking">Drinking</option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (Liters)</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date Needed</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location (Editable)</label>
                    <div id="map" style={{ height: "300px", borderRadius: "8px" }}></div>
                    <input
                      type="text"
                      className="form-control mt-2"
                      value={location}
                      readOnly
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-submit w-100" type="submit">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}



      <style>{`
        .modal-content {
            background-color: #f8f9fa;
            width: 90%;
            max-width: 600px;
            margin: auto;
            padding: 10px;
            height: 100%;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .btn-submit {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `}</style>


    </>
  );
};

export default EmergencyRequest;