import React, { useEffect, useState } from "react";
import { ReactSortable, Swap, Sortable } from "react-sortablejs";
import axios from "axios";

import ListItem from "./ListItem";
import { BASE_URL } from "../constants";
import ActionModal from "./ActionModal";

import "./SimpleList.css";

const initialState = {
  id: "",
  name: "",
  phone: "",
  email: "",
  website: "",
};

Sortable.mount(new Swap());

const SimpleList = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(initialState);
  const [isGrid, setIsGrid] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [actionItem, setActionItem] = useState(initialState);

  const handleChange = (event) => {
    if (isEdit) {
      setActionItem({
        ...actionItem,
        [event.target.name]: event.target.value,
      });
    } else {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
  };

  const prepareAction = (item) => {
    setIsEdit(true);
    setActionItem(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEdit) {
      const copyList = [...list];
      let index = copyList.findIndex((item) => item.id === actionItem.id);

      copyList[index] = actionItem;
      setList(copyList);
    } else {
      setList([...list, user]);
    }

    setSuccess(true);

    reset();
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
    reset();
  };

  const handleLayoutChange = () => {
    setIsGrid(!isGrid);
  };

  const reset = () => {
    document.getElementById("list-form").reset();
    setIsEdit(false);
    setUser(initialState);
    setActionItem(initialState);

    setTimeout(function () {
      setSuccess(false);
    }, 5000);
  };

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <>
      {isSuccess ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit} id="list-form">
        <div className="form-row">
          <div className="col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              required
              className="form-control"
              id="name"
              name="name"
              defaultValue={actionItem.name}
              placeholder="Type your name..."
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              required
              className="form-control"
              id="phone"
              name="phone"
              defaultValue={actionItem.phone}
              placeholder="Type your phone..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row mt-2">
          <div className="col">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              required
              className="form-control"
              id="email"
              name="email"
              defaultValue={actionItem.email}
              placeholder="Type your email..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row mt-2">
          <div className="col">
            <label htmlFor="website">Your Website:</label>
            <input
              type="text"
              required
              className="form-control"
              id="website"
              name="website"
              defaultValue={actionItem.website}
              placeholder="Type your website..."
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-4 mt-2">
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary mb-4 ml-2 mt-2"
          onClick={reset}
        >
          Clear
        </button>
      </form>

      <hr className="mb-4" />

      <div className="mb-3">
        <label className="switch ">
          <input type="checkbox" onChange={handleLayoutChange} />
          <span className="slider"></span>
        </label>
        <span className="ml-2">Toggle Grid</span>
      </div>

      <ReactSortable
        swap
        id={isGrid ? "people-grid" : "people-list"}
        className={isGrid ? "row" : "list-group"}
        chosenClass="chosen-list"
        list={list}
        setList={setList}
        animation={150}
      >
        {isGrid
          ? parseToGrid(list).map((array) =>
              array.map((item) => (
                <ListItem
                  isGrid={isGrid}
                  prepareAction={prepareAction}
                  item={item}
                  key={item.id}
                />
              ))
            )
          : list.map((item) => (
              <ListItem
                isGrid={isGrid}
                prepareAction={prepareAction}
                item={item}
                key={item.id}
              />
            ))}
      </ReactSortable>

      <ActionModal item={actionItem} handleDelete={handleDelete} />
    </>
  );
};

function parseToGrid(array, cols = 4) {
  let [...arr] = array;
  var res = [];
  while (arr.length) {
    res.push(arr.splice(0, cols));
  }
  return res;
}

export default SimpleList;
