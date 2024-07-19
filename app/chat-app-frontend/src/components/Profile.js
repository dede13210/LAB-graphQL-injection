import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USER_QUERY = gql`
  {
    user(id: "user-id") {
      email
      phone
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {data.user.email}</p>
      <p>Phone: {data.user.phone}</p>
    </div>
  );
};

export default Profile;
