import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Col, Media } from "reactstrap";
import { showWhishList } from "../../../../Services/whishListServices";
import { Image, Btn, H6 } from "../../../../AbstractElements";
import Loader from "../../../../Layout/Loader";

const WishListData = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const whishList = useSelector(
    (state) => state?.whislist?.whishlist?.data?.Product
  );

  useEffect(() => {
    dispatch(showWhishList())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      });
  }, [dispatch]);
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Loader />
      </div>
    );
  }
  if (!whishList || whishList.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No wishlist items found.
      </div>
    );
  }
  return (
    <Fragment>
      {whishList?.map((item) => (
        <Col key={item?.id} xl="4" md="6">
          <div className="product-details-box">
            <Media>
              {item?.images && item?.images.length > 0 ? (
                <Image
                  attrImage={{
                    className: "align-self-center img-fluid img-60 border-0",
                    src: item.images[0], // Display the first image
                    alt: item?.name || "Product Image",
                  }}
                />
              ) : (
                <div className="no-image-placeholder">No Image Available</div>
              )}
              <div className="media-body ms-3">
                <div className="product-name">
                  <H6>
                    <a href="3">{item?.name}</a>
                  </H6>
                </div>
                <div className="rating">{/* ... */}</div>
                <div className="price">
                  Price<span>: {item?.price} $</span>
                </div>
                <div className="availability">
                  <div className="text-success">{item?.availability}</div>
                </div>
              </div>
            </Media>
          </div>
        </Col>
      ))}
    </Fragment>
  );
};

export default WishListData;
