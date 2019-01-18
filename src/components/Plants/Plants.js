import React from 'react';
import './Plants.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPlantsWithFavorites } from '../../actions/plants';

import { Link } from 'react-router-dom';

class Plants extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plants: []
    };
  }

  componentWillMount() {
    this.props.getAllPlantsWithFavorites();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.plants) {
      this.setState({
        plants: nextProps.plants.plants
      });
    }
  }

  render() {
    const plants = this.state.plants;
    const listPlants = plants.map((plant) => {
      let favorite = plant.first_name ? `${plant.first_name}'s Favorite Plant` : "";
      return (
        <div key={plant.id} className="plant">
          <Link to={`/plants/${plant.id}`}>
            <div className="plant-image" style={{ backgroundImage: `url(${plant.image_url})` }}>
              <div className="plant-hover">
                <h3>{favorite}</h3>
              </div>
            </div>
          </Link>
          <hr/>
          <h2>{plant.title}</h2>
          <p>{plant.description}</p>
        </div>
      );
    });
    return (
      <div className="plants-container">
        {listPlants}
      </div>
    );
  }
};

Plants.propTypes = {
  getAllPlantsWithFavorites: PropTypes.func.isRequired,
  plants: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  plants: state.plants,
  error: state.error
});

export default connect(mapStateToProps, { getAllPlantsWithFavorites })(Plants);
