import { useState } from "react";
import "./AddUser.css";
import { useForm } from "react-hook-form";
import { GrUserAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  //error state
  let [error, setError] = useState("");

  //useForm
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //useNavigate
  const navigate = useNavigate();

  //create user
  const createUser = (newUser) => {
    //add unique id
    newUser.id=Math.floor(Math.random() * 100);
    axios
      .post("http://localhost:4000/users", newUser)
      .then((res) => {
        if (res.status == 201) {
          //clear error message
          setError("");
          navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          //console.log(err.response.data);
          //console.log(err.response.status);
          //console.log(err.response.headers);
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
    <div className="add-user">
      <p className="display-3 text-center">Add New User</p>
      {/* form submission error */}
      {error.length !== 0 && (
        <p className="text-danger fw-bold display-2 text-center">{error}</p>
      )}
      <div className="row ">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(createUser)}>
            {/* name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="namexyz"
                {...register("name",{required:true})}
              />
              {/* validation error message for name field */}
              {errors.name?.type==='required'&&<p className="text-danger fw-bold fs-5">*Name is required</p>}
              <label htmlFor="name">Name</label>
            </div>
            {/* email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                {...register("email",{required:true})}
              />
               {/* validation error message for email field */}
               {errors.email?.type==='required'&&<p className="text-danger fw-bold fs-5">*Email is required</p>}
              <label htmlFor="email">Email address</label>
            </div>
            {/* dob */}
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="dob"
                placeholder="name@example.com"
                {...register("dob",{required:true})}
              />
               {/* validation error message for name field */}
               {errors.dob?.type==='required'&&<p className="text-danger fw-bold fs-5">*Date of birth is required</p>}
              <label htmlFor="dob">Date of birth</label>
            </div>
            {/* image url */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="namexyz"
                {...register("image",{required:true})}
              
              />
               {/* validation error message for name field */}
               {errors.image?.type==='required'&&<p className="text-danger fw-bold fs-5">*Image URL is required</p>}
              <label htmlFor="image">Add image url</label>
            </div>
            {/* submit button */}
            <button type="submit" className="float-end btn add-user-btn">
              <GrUserAdd
                style={{
                  marginRight: "5px",
                  fontSize: "1.5rem",
                  color: "white",
                }}
              />
              Create New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
