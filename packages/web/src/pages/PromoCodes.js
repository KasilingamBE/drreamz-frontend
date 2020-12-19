import React, { useEffect, useState } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";
import { connect } from "react-redux";
import AccessDenied from "../app/components/AccessDenied";
import AddPromoCodeModal from "../app/components/AddPromoCodeModal";
import { client } from "../app/graphql";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import PromoCodeDetailsModal from "../app/components/PromoCodeDetailsModal";
import { MdEdit, MdDelete, MdInfoOutline } from "react-icons/md";

const GET_PROMO_CODES_BY_LISTING_ID = gql`
  query GetPromoCodesByListingId($listingId: String!) {
    getPromoCodesByListingId(listingId: $listingId) {
      _id
      code
      listingId
      createdAt
      discount
    }
  }
`;

const CREATE_PROMO_CODE = gql`
  mutation CreatePromoCode(
    $code: String!
    $listingId: String!
    $discount: Float!
  ) {
    createPromoCode(code: $code, listingId: $listingId, discount: $discount) {
      _id
      code
      listingId
      createdAt
      discount
    }
  }
`;

const UPDATE_PROMO_CODE = gql`
  mutation UpdatePromoCode($id: ID!, $code: String, $discount: Float) {
    updatePromoCode(id: $id, code: $code, discount: $discount) {
      _id
      code
      listingId
      createdAt
      discount
    }
  }
`;

const DELETE_PROMO_CODE = gql`
  mutation DeletePromoCode($id: ID!) {
    deletePromoCode(id: $id)
  }
`;

// const TOGGLE_PROMO_CODE_VALIDITY = gql`
//   mutation UpdatePromoCode($id: ID!, $isValid: Boolean) {
//     updatePromoCode(id: $id, isValid: $isValid) {
//         _id
//         code
//         listingId
//         ownerId
//         isValid
//         createdAt
//         expiresAt
//         maxLimit
//         discount
//     }
// }`;

const PromoCodes = ({ listings, id }) => {
  const [createPromoCode] = useMutation(CREATE_PROMO_CODE);
  const [updatePromoCode] = useMutation(UPDATE_PROMO_CODE);
  const [deletePromoCode] = useMutation(DELETE_PROMO_CODE);
  // const [togglePromoCode] = useMutation(TOGGLE_PROMO_CODE_VALIDITY);

  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(
    listings.filter((item) => item._id == id)[0]
  );

  const [showPromoCodeModal, setShowPromoCodeModal] = useState(false);
  const [showPromoCodeDetails, setShowPromoCodeDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [promoCodeId, setPromoCodeId] = useState("");

  const addPromoCodeHandler = async (data) => {
    try {
      const response = await createPromoCode({
        variables: { ...data, listingId: id },
      });
      setPromoCodes([...promoCodes, response.data.createPromoCode]);
      alert("Promo Code Added Successfully");
      // toast.success("Promo Code Added Successfully");
    } catch (error) {
      // toast.warn("Something Went Wrong!");
      alert("Something Went Wrong!");
      console.log(error);
    }
  };

  const updatePromoCodeHandler = async (data) => {
    try {
      const response = await updatePromoCode({
        variables: data,
      });
      setPromoCodes(
        promoCodes.map((item) =>
          item._id === data.id ? response.data.updatePromoCode : item
        )
      );
      setEdit(false);
      setPromoCodeId("");
      // toast.success("Promo Code Updated Successfully");
      alert("Promo Code Updated Successfully");
    } catch (error) {
      // toast.warn("Something Went Wrong!");
      alert("Something Went Wrong!");
      console.log(error);
    }
  };

  const deletePromoCodeHandler = async (id) => {
    try {
      const response = await deletePromoCode({
        variables: { id: id },
      });
      setPromoCodes(promoCodes.filter((item) => item._id !== id));
      // toast.success("Promo Code Deleted Successfully");
      alert("Promo Code Deleted Successfully");
    } catch (error) {
      // toast.warn("Something Went Wrong!");
      alert("Something Went Wrong!");
      console.log(error);
    }
  };

  // const togglePromoCodeValidity = async (id,isValid)=>{
  //     try {
  //         const response = await togglePromoCode({
  //           variables: {id:id,isValid:!isValid},
  //         });
  //         console.log(response.data.updatePromoCode);
  //         setPromoCodes(promoCodes.map(item=>item._id===id?response.data.updatePromoCode:item));
  //         if(isValid){
  //         toast.success("Promo Code Inactivated Successfully");
  //         }else{
  //         toast.success("Promo Code Activated Successfully");
  //         }
  //       } catch (error) {
  //         toast.warn("Something Went Wrong!");
  //         console.log(error);
  //       }
  // }

  const editButtonHandler = (id) => {
    setPromoCodeId(id);
    setEdit(true);
    setShowPromoCodeModal(true);
  };

  const infoButtonHandler = (id) => {
    setPromoCodeId(id);
    setShowPromoCodeDetails(true);
  };

  useEffect(() => {
    const getPromoCodes = () => {
      try {
        client
          .query({
            query: GET_PROMO_CODES_BY_LISTING_ID,
            variables: { listingId: id },
          })
          .then(({ data }) => {
            setPromoCodes(data.getPromoCodesByListingId);
            console.log(data.getPromoCodesByListingId);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getPromoCodes();
  }, []);

  if (!id) {
    return <AccessDenied />;
  }

  if (!listing) {
    return <AccessDenied />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dg__account">
      <div className="heading-bar">
        <h1 className="heading">Promo Codes</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowPromoCodeModal(true);
          }}
        >
          Create Promo Code
        </Button>
        <AddPromoCodeModal
          show={showPromoCodeModal}
          handleSave={addPromoCodeHandler}
          handleUpdate={updatePromoCodeHandler}
          edit={edit}
          id={promoCodeId}
          handleClose={() => {
            setShowPromoCodeModal(false);
          }}
          promoCodes={promoCodes.length > 0 ? promoCodes : []}
        />
      </div>
      <p className="lead">{listing.locationDetails.address}</p>

      {promoCodes.length > 0 ? (
        <ListGroup>
          {promoCodes.map((item) => (
            <ListGroup.Item>
              <div className="vehicle-name">{item.code}</div>{" "}
              <div className="vehicle-control-btns">
                {/* <Form>
                <Form.Check 
                  type="switch"
                  name="isValid"
                  id="custom-switch"
                  checked={item.isValid}
                  value={item.isValid}
                  label={item.isValid?"Active":"Inactive"}
                  onChange={(event)=>{
                      togglePromoCodeValidity(item._id,item.isValid);
                  }}
                />
              </Form> */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    infoButtonHandler(item._id);
                  }}
                >
                  <MdInfoOutline />
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    editButtonHandler(item._id);
                  }}
                >
                  <MdEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deletePromoCodeHandler(item._id);
                  }}
                >
                  <MdDelete />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="loading">No Promo Codes found</div>
      )}
      {promoCodes.length > 0 && promoCodeId && (
        <PromoCodeDetailsModal
          show={showPromoCodeDetails}
          handleClose={() => {
            setShowPromoCodeDetails(false);
          }}
          promoCode={promoCodes.filter((item) => item._id === promoCodeId)[0]}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  listings: user.listings,
});

export default connect(mapStateToProps)(PromoCodes);
