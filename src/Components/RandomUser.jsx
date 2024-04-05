import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomUser } from '../Store/Slice/randomUserSlice';
import './RandomUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faMapMarkedAlt,
  faPhone,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

export default function RandomUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.randomUser.user);
  const status = useSelector((state) => state.randomUser.status);
  const error = useSelector((state) => state.randomUser.error);

  useEffect(() => {
    dispatch(fetchRandomUser());
  }, [dispatch]);

  const handleNewUserClick = () => {
    dispatch(fetchRandomUser());
  };

  return (
    <div className="random-user-container">
      {status === 'loading' && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && user && (
        <div className="random-user">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="user-photo"
          />
          <h1>
            <FontAwesomeIcon icon={faUser} />{' '}
            {`${user.name.first} ${user.name.last}`}
          </h1>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> {user.email}
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkedAlt} />{' '}
            {`${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> {user.phone}
          </p>
          <p>
            <FontAwesomeIcon icon={faBirthdayCake} />{' '}
            {new Date(user.dob.date).toLocaleDateString()}
          </p>
          {status === 'succeeded' && (
            <button onClick={handleNewUserClick} className="new-user-button">
              Load Random User
            </button>
          )}
        </div>
      )}
    </div>
  );
}
