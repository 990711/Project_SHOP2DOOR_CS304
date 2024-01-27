import React from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CustomConfirmAlert = ({ item, onConfirm, onCancel }) => {
  const alertQuantityRef = React.createRef();

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onCancel();
    }
  };

  const customUI = ({ onClose }) => (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="custom-confirm-alert">
        <h1>{item.name}</h1>
        <label>
          Quantity:
          <input
            ref={alertQuantityRef}
            type="number"
            min="1"
            defaultValue="1"
          />
        </label>
        <button
          className="popup-btn btn-yes"
          onClick={() => {
            const alertQuantity = parseInt(alertQuantityRef.current.value, 10);
            onConfirm(alertQuantity);
            onClose();
          }}
        >
          Yes
        </button>
        <button className="popup-btn btn-no" onClick={() => { onCancel(); onClose(); }}>No</button>
      </div>
    </div>
  );

  const showAlert = () => {
    confirmAlert({
      customUI,
    });
  };

  showAlert();
};

CustomConfirmAlert.propTypes = {
  item: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CustomConfirmAlert;
