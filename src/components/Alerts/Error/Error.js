import React  from 'react';
import './Error.css';

export const ErrorAlert = props => (
  props.message ?
    <div className="error-message">
      {props.message}
    </div> : <span></span>
);
