import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditWorkplace() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const navigate = useNavigate();

  const { id } = useParams();

  const getWorkplace = async () => {
    //Here we get the information

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/workplaces/${id}`
      );

      setTitle(response.data.title); //setting the state
      setDescription(response.data.description);
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplace();
  }, []);

  const deleteWorkplace = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/workplaces/${id}`);
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description }; //this is the information we'll send to the backend - We save on this variable what the user has on the input.

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/workplaces/${id}`, body); //needs the url to post to, and the information to send. - We get the request from workplaces.
      navigate(`/workplaces/${id}`); //So we go back to that workplace
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Edit Workplace:</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
        />

        <button type="submit">Edit Workplace</button>
      </form>

      <button onClick={deleteWorkplace}>Delete</button>
    </section>
  );
}

export default EditWorkplace;
