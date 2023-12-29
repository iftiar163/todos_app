import { useEffect, useState } from "react";
import "./Todos.css";
import axios from "axios";

// Todos State
const Todos = () => {
  const [todos, setTodos] = useState([]);

  // Input state Declaration

  const [input, setInput] = useState([
    {
      title: "",
      type: "",
    },
  ]);

  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Todos Data
  const handleTodosData = async () => {
    await axios.post("http://localhost:7070/todos", input);
    handleGetTodos();
  };

  // Get All Todos
  const handleGetTodos = async () => {
    const response = await axios.get("http://localhost:7070/todos");
    setTodos(response.data);
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <>
      {/* Todos Design */}
      <div className="container my-5 ">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-light shadow main-colomn">
            {/* First Row */}
            <div className="row">
              <div className="col-md-12 row-header">
                <h2>To Do App</h2>
                {/* Mid Row */}
                <div className="todos-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter A Task Here"
                      name="title"
                      value={input.title}
                      onChange={handleInputValue}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="type"
                      id=""
                      className="form-select form-select-md"
                      value={input.type}
                      onChange={handleInputValue}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={handleTodosData}
                      type="submit"
                      className="btn btn-sm btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Table Row */}
            <div className="row my-5">
              <div className="col-md-12">
                <div className="table-section">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>To Do Item</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos?.length > 0 ? (
                        todos.map((item, index) => {
                          return (
                            <tr className="align-middle" key={index}>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.type}</td>
                              <td>
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td className="align-middle" colSpan={4}>
                            No Data Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
