import React from 'react';
import './Input.css';

class Input extends React.Component {
  render() {
    return (
      <div className="form-group">
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(event)=>{this.props.onChange(event)}}
          className={this.props.errorText ? 'error' : ''}
        />
        <div className="error-alert">{this.props.errorText}</div>
      </div>
    );
  }
};

export default Input;
