import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserPage() {
  const [user, setUser] = useState(null);

  let currentUser = req.payload._id;

  const getUser = async () => {
    //Here we get the information

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${currentUser}`
      );

      setWorkplace(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getUser();
  }, []); //Dependency array []

  return (
    <div>
      {user && ( //So that this runs after workplace
        <>
          <h1>{user.name}</h1>
        </>
      )}

      <h2>Favorites:</h2>
      {user &&
        user.favoriteWorkplaces.map((favoriteWorkplaces) => {
          return (
            <div key={favoriteWorkplaces._id}>
              <p>{favoriteWorkplaces}</p>
            </div>
          );
        })}

      <h2>Created:</h2>
      {user &&
        user.createdWorkplaces.map((createdWorkplaces) => {
          return <div key={createdWorkplaces._id}></div>;
        })}

      <h2>Comments:</h2>
      {user &&
        user.userComments.map((userComments) => {
          return <div key={userComments._id}></div>;
        })}
    </div>
  );
}

export default UserPage;
