import React from 'react';
import './TextArea.css';

class TextArea extends React.Component {
  render() {
    return (
      <div className="form-group">
        <textarea
          rows={this.props.rows}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(event)=>{this.props.onChange(event)}}
          className={this.props.errorText && !this.props.value ? 'error' : ''}
        />
        <div className="error-alert">{this.props.errorText}</div>
      </div>
    );
  }
};

export default TextArea;
