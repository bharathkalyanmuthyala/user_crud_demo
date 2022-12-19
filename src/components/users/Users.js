import React, { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GrSave } from "react-icons/gr";
import Empty from '../../images/giphy.gif'

function Users() {
  //users state
  let [users, setUsers] = useState([]);
  let [error, setError] = useState("");
  //state of user to edit
  let [userToEdit, setUserToEdit] = useState({});
  //useForm
  let {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //navigate hook
  let navigate = useNavigate();
  //modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //network request
  useEffect(() => getUsers(), [users.length]);

  // //create user
  const getUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
          //clear error message
          setError("");
          //  navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };

  //go to Adduser
  const gotoAddUser = () => {
    navigate("/");
  };
  //delete user
  const deleteUser = (user) => {
    axios
      .post(`http://localhost:4000/removedUsers`,user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // remove user from "users"
          axios.delete(`http://localhost:4000/users/${user.id}`)
          .then(res=>{
            if(res.status===200){
              getUsers();
            }
          })
          
          //clear error message
          setError("");
          //  navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };
  //edit  user
  const editUser = (userToEdit) => {
    //show modal
    handleShow();
    //set user edit state
    setUserToEdit(userToEdit);
    //set values to edit for
    setValue("name", userToEdit.name);
    setValue("email", userToEdit.email);
    setValue("dob", userToEdit.dob);
    setValue("image", userToEdit.image);
  };

  //save modified user
  const saveUser = () => {
    //close modal
    handleClose();

    //get values from form
    let modifiedUser = getValues();
    //add id
    modifiedUser.id = userToEdit.id;
    //modify user in DB
    axios
      .put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
      .then((res) => {
        if (res.status === 200) {
          //get recent users
          getUsers();
          //clear error message
          setError("");
          //  navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className="container users-data ">
     
      {/* add user link */}
      <button className="back-to-add-user" onClick={gotoAddUser}>
        +
      </button>
      <p className="display-2 text-center fw-bold text-white-50 ">List of Users</p>
      {/* get users data error */}

      {error.length !== 0 && (
        <p className="text-danger fw-bold display-2 text-center">{error}</p>
      )}
      {/* diaplay users data */}
      {users.length === 0 ? (
        <div className="text-center text-warning display-3 mt-5">
          Users list is empty !!
          <div>
          <img src={Empty} alt=""  width="600px" />
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {users.map((userObj) => (
            <div className="col text-center mx-auto" key={userObj.id}>
              <div className="card">
                <img
                  src={userObj.image}
                  alt=""
                  className="mx-auto p-3 profile-image"
                />
                <div className="card-body">
                  <p className="display-3 name">{userObj.name}</p>
                  <p className="lead fs-4">{userObj.email}</p>
                  <p className="lead">DOB : {userObj.dob}</p>
                  <button
                    className="btn btn-warning float-start"
                    onClick={() => editUser(userObj)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => deleteUser(userObj)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal to edit user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-form">
          {/* edit form */}
          <form onSubmit={handleSubmit(saveUser)}>
            {/* name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="namexyz"
                {...register("name")}
              />
              <label htmlFor="name">Name</label>
            </div>
            {/* email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                {...register("email")}
              />
              <label htmlFor="email">Email address</label>
            </div>
            {/* dob */}
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="dob"
                placeholder="name@example.com"
                {...register("dob")}
              />
              <label htmlFor="dob">Date of birth</label>
            </div>
            {/* image url */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="namexyz"
                {...register("image")}
                disabled
              />
              <label htmlFor="image">Add image url</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
