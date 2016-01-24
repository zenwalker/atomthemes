import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(this.state || {}, {
      form: this.getDefaultValues(),
      errors: {},
    });
  }

  getDefaultValues() {
    return {};
  }

  bindToForm(e) {
    const { name, value } = e.currentTarget;

    if (this.state.errors && this.state.errors[name]) {
      this.setFormError(name, false);
    }

    this.setFormValue(name, value);
  }

  setFormValue(field, value) {
    this.setState({
      form: Object.assign(this.state.form || {}, {
        [field]: value,
      })
    }, this.formWillUpdate);
  }

  setFormError(field, message) {
    this.setState({
      errors: Object.assign(this.state.errors || {}, {
        [field]: message,
      })
    });
  }

  formWillUpdate() {}
}

export default Form;
