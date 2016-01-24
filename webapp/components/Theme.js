import React from 'react';
import '../styles/theme.css';

const Theme = (props) => {
  const { data } = props;

  return (
    <div className="theme">
      <h2 className="theme_name">{data.name}</h2>
      <img className="theme_screenshot" src={data.screenshot} alt="" />
    </div>
  )
};

export default Theme;
