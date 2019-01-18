import React from 'react';
import './Plant.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPlantWithComments, addComment, addFavorite, removeFavorite } from '../../actions/plants';

import { Link } from 'react-router-dom';

import TextArea from '../Local/TextArea/TextArea';

class Plant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      plant: {},
      comments: [],
      favorites: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    if(this.props.auth.isAuthenticated) {
      this.props.getPlantWithComments(id);
    }
    else {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if(nextProps.plants) {
      this.setState({
        plant: nextProps.plants.plant,
        comments: nextProps.plants.comments,
        favorites: nextProps.plants.favorites
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    if(this.state.comment.length > 0) {
      this.props.addComment(this.props.plants.plant.id, this.state.comment);
      this.setState({ comment: "" });
    }
  }

  handleAddFavorite() {
    this.props.addFavorite(this.props.plants.plant.id);
  }

  handleRemoveFavorite(id) {
    this.props.removeFavorite(this.props.plants.plant.id, id);
  }

  render() {
    const plant = this.state.plant;
    const comments = this.state.comments;
    const favorites = this.state.favorites;
    const userId = this.props.auth.user["sub"]["user_id"];
    const listComments = comments.map((comment) => {
      return (
        <div key={comment.id} className="comment">
          <p>{comment.comment_text}</p>
        </div>
      );
    });
    const favoriteName = favorites.length > 0 ? `${favorites[0].first_name}'s Favorite Plant` : "No one likes this one...";
    let favorite = false;
    for(var i=0;i<favorites.length;i++) {
      if(favorites[i].user_id === userId) {
        favorite = true
      }
      break;
    }
    const FavoriteIcon = () => {
      if(favorite) {
        return (
          <div onClick={() => this.handleRemoveFavorite(favorites[i].id)}>
            <i className="material-icons">star</i>
          </div>
        );
      }
      else {
        return (
          <div onClick={() => this.handleAddFavorite()}>
            <i className="material-icons">star_border</i>
          </div>
        );
      }
    }
    return (
      <div className="plant-container">
        <div>
          <Link to="/">
            <i className="material-icons">arrow_back_ios</i>
          </Link>
        </div>
        <div className="plant-main">
          <div className="plant-image" style={{ backgroundImage: `url(${plant.image_url})` }}></div>
          <div className="plant-info">
            <h3>{favoriteName}</h3>
            <p>{plant.description}</p>
            <div className="favorite-button">
              {FavoriteIcon()}
            </div>
            <h4>Leave a comment:</h4>
            <TextArea
              name="comment"
              rows={4}
              placeholder={`Ask about the ${plant.title}`}
              value={this.state.comment}
              errorText={this.state.error}
              onChange={this.handleInputChange}
            />
            <div className="button-container">
              <button className="button-link" onClick={this.handleSubmit}>Send</button>
            </div>
            <div className="comments-container">
              <h4>Comments</h4>
              {listComments}
            </div>
          </div>
        </div>
        <h2>{plant.title}</h2>
      </div>
    );
  }
};

Plant.propTypes = {
  getPlantWithComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plants: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plants: state.plants,
  error: state.error
});

export default connect(mapStateToProps, { getPlantWithComments, addComment, addFavorite, removeFavorite })(withRouter(Plant));
