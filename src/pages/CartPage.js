import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cart";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Vote Confirmation</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Voting Details is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}> {item.price}</Col>
                  <Col md={2}>
                    <Button
                      className="minus"
                      onClick={() =>
                        dispatch(addToCart(item.product, item.qty - 1))
                      }
                      disabled={item.qty <= 1}
                    >
                      -
                    </Button>
                    <Form.Label className="qty-label">{item.qty}</Form.Label>
                    <Button
                      className="plus"
                      onClick={() =>
                        dispatch(addToCart(item.product, item.qty + 1))
                      }
                      disabled={item.qty === item.countInStock}
                    >
                      +
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total Votes ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              1
              
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="d-grid col-12"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Continue to Vote
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
