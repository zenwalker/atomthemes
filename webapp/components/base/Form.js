import React from 'react';

class Form extends React.Component {
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

  setFormValue(field, value) {
    this.setState({
      form: Object.assign(this.state.form || {}, {
        [field]: value,
      }),
    }, this.formWillUpdate);
  }

  setFormError(field, message) {
    this.setState({
      errors: Object.assign(this.state.errors || {}, {
        [field]: message,
      }),
    });
  }

  bindToForm(e) {
    const { name, value } = e.currentTarget;

    if (this.state.errors && this.state.errors[name]) {
      this.setFormError(name, false);
    }

    this.setFormValue(name, value);
  }

  formWillUpdate() {}
}

export default Form;
