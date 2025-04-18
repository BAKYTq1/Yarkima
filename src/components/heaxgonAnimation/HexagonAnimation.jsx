import React from 'react';
import './style.scss';
import hiveIcon from '../../assets/image/honeycomb-svgrepo-com.svg';

const HexagonAnimation = () => {
  return (
    <div className="hexagon-container33">
      <div className="hexagon3 first3">
        <img src={hiveIcon} alt="hive" className="icon-5" />
      </div>
      <div className="hexagon3 second3">
        <img src={hiveIcon} alt="hive" className="icon-5" />
      </div>
      <div className="hexagon3 third3">
        <img src={hiveIcon} alt="hive" className="icon-5" />
      </div>
    </div>
  );
};

export default HexagonAnimation;
