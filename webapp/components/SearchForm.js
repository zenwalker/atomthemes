import React, { PropTypes } from 'react';
import Form from './base/Form';
import cx from 'classnames';
import '../styles/search-form.css';

class SearchForm extends Form {
  getDefaultValues() {
    return {
      query: '',
      type: 'ui',
    };
  }

  formWillUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state.form);
    }
  }

  render() {
    const { form } = this.state;
    const placeholder = `Search ${form.type} themes ...`;

    return (
      <form className="search-form">
        <div className="search-form_main">
          <input className="search-form_input" name="query"
            onChange={this.bindToForm.bind(this)}
            placeholder={placeholder}
            value={form.query}
          />
        </div>
        <div className="search-form_switch">
          <label className={cx('search-form_switch_item', {
            '-active': form.type === 'ui'
          })}>
            <input type="radio" name="type" value="ui"
              checked={ form.type === 'ui' }
              onChange={this.bindToForm.bind(this)}
            /> UI
          </label>
          <label className={cx('search-form_switch_item', {
            '-active': form.type === 'syntax'
          })}>
            <input type="radio" name="type" value="syntax"
              checked={ form.type === 'syntax' }
              onChange={this.bindToForm.bind(this)}
            /> Syntax
          </label>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onChange: PropTypes.func,
};

export default SearchForm;
