import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
// import { client } from "../../../graphql/index";
import { client } from '@parkyourself-frontend/shared/graphql'
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Edit, Eye, EyeOff } from "react-feather";
import Table from "./OptionsTable";

const UPDATE_ONE = gql`
  mutation UpdateOneFormOption(
    $id: ID!
    $options: [FormOptionInput]
    $updatedBy: String
  ) {
    updateOneFormOption(id: $id, options: $options, updatedBy: $updatedBy) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const GET_ONE = gql`
  query GetOneFormOption($id: ID!) {
    getOneFormOption(id: $id) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

function FormOptionCRUD(props) {
  const [updateOneFormOption] = useMutation(UPDATE_ONE);
  const [payload, setPayload] = useState({
    index: 0,
    options: [],
  });
  const [edit, setEdit] = useState(false);
  const [disabled, updateDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [oneData, setOneData] = useState({ options: [] });
  const [showModal, setShowModal] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    try {
      let { data } = await client.query({
        query: GET_ONE,
        variables: { id: props.id },
      });
      setOneData(data.getOneFormOption);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleDelete = async (index) => {
    try {
      updateDisabled(true);
      if (window.confirm("Are you sure you want to delete this item!")) {
        props.dispatch(showLoading());
        let tempOptions = oneData.options.filter((o, i) => i !== index);
        let { data } = await updateOneFormOption({
          variables: {
            id: props.id,
            options: tempOptions.map((i) => ({
              value: i.value,
              label: i.label,
              published: i.published,
            })),
            updatedBy: props.userId,
          },
        });
        setOneData({
          ...oneData,
          options: data.updateOneFormOption.options,
        });
        updateDisabled(false);
        props.dispatch(hideLoading());
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      // console.log("Error", error);
      props.dispatch(hideLoading());
      updateDisabled(false);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDisabled(true);
    props.dispatch(showLoading());
    try {
      let { data } = await updateOneFormOption({
        variables: {
          id: props.id,
          options: payload.options,
          updatedBy: props.userId,
        },
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options,
      });
      props.dispatch(hideLoading());
      updateDisabled(false);
      setShowModal(false);
    } catch (error) {
      // console.log(error);
      updateDisabled(false);
      props.dispatch(hideLoading());
      alert("Something went wrong please try again");
    }
  };

  const handlePublish = async (index) => {
    try {
      updateDisabled(true);
      props.dispatch(showLoading());
      let { data } = await updateOneFormOption({
        variables: {
          id: props.id,
          options: oneData.options.map((o, i) => {
            if (i === index) {
              console.log("Changed Status");
              return {
                value: o.value,
                label: o.label,
                published: !o.published,
              };
            } else {
              return {
                value: o.value,
                label: o.label,
                published: o.published,
              };
            }
          }),
          updatedBy: props.userId,
        },
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options,
      });
      updateDisabled(false);
      props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      props.dispatch(hideLoading());
      alert("Something went wrong!");
    }
  };

  const handleChangeFormOption = (e) => {
    const value = e.target.value;
    let tempA = [...payload.options];
    tempA = tempA.map((a, i) => {
      if (i === payload.index) {
        let tempa = a;
        tempa.value = value;
        tempa.label = value;
        return tempa;
      } else {
        return a;
      }
    });
    setPayload({
      ...payload,
      options: tempA,
    });
  };

  const handleAddNew = () => {
    setPayload({
      index: oneData.options.length,
      options: [
        ...oneData.options.map((i) => ({
          value: i.value,
          label: i.label,
          published: i.published,
        })),
        { value: "", label: "", published: true },
      ],
    });
    setEdit(false);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setPayload({
      index: index,
      options: oneData.options.map((i) => ({
        value: i.value,
        label: i.label,
        published: i.published,
      })),
    });
    setEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="pt-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChangeFormOption}
                value={
                  payload.options[payload.index]
                    ? payload.options[payload.index].value
                    : ""
                }
                type="text"
                name="value"
                placeholder="Name"
                required
              />
            </Form.Group>
            <div className="mt-3">
              <Button disabled={disabled} type="submit" variant="primary">
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : edit ? (
                  "Update"
                ) : (
                      "Create"
                    )}
              </Button>{" "}
              <Button
                className="ml-2"
                disabled={disabled}
                type="button"
                variant="danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {preview ? (
        <Edit
          size={30}
          className="cursor-pointer ml-3"
          onClick={() => setPreview(false)}
        />
      ) : (
          <>
            <Button variant="primary" onClick={handleAddNew}>
              Add New
          </Button>
            <Eye
              size={30}
              className="cursor-pointer ml-3"
              onClick={() => setPreview(true)}
            />
          </>
        )}
      {loading && (
        <div className="text-center pt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {preview ? (
        <Form className="pt-4 pb-3">
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{oneData.title}</Form.Label>
            <Form.Control as="select" custom>
              {oneData.options.map((o, i) =>
                o.published ? (
                  <option key={i} value={o.value}>
                    {o.label}
                  </option>
                ) : null
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      ) : (
          <Table
            oneData={oneData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handlePublish={handlePublish}
            disabled={disabled}
          />
        )}
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(FormOptionCRUD);
