import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories,deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage Categories here">      
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Go back To Admin Home</span>
      </Link>
      <div className="row">
        <div class="container"  className="col-12">
        
          <h2 className="text-left text-white my-3">List of all Categories:</h2><br/>
          <table width="50%" align="center" border="5px solid"  >
          {categories.map((category, index) => {
            return (
               <div key={index} className="row text-center mb-2 ">
                <div className="col-6">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
         </table>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
