import React from "react";
import styled from "styled-components";

const Item = styled.div`
  background-color: #fff6;
  cursor: pointer;
`;

const ListItem = ({ item, prepareAction, isGrid }) => {
  return (
    <Item
      className={isGrid ? "col-md-3 grid-group-item" : "list-group-item"}
      data-toggle="modal"
      data-target="#actionModal"
      id={`person-${item.id}`}
      key={item.id}
      onClick={() => prepareAction(item)}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{item.name}</h5>
        <small>Phone: {item.phone}</small>
      </div>
      <p className="mb-1">{item.email}</p>
      <small>
        More on:{" "}
        <i>
          <a href={`https://${item.website}`}>www.{item.website}</a>
        </i>
      </small>
    </Item>
  );
};

export default ListItem;
