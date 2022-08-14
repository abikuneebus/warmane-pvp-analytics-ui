import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { Status } from "../features/search/search-slice";

function DogPicture() {
  const state = useAppSelector((e) => e);
  const { status, matches, charachter } = state.search;
  const [image, setImage] = useState("holder.js/100px180");

  useEffect(() => {
    async function getDogPicture() {
      // {"message":"https:\/\/images.dog.ceo\/breeds\/australian-shepherd\/sadie.jpg","status":"success"}
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const j = await response.json();
      setImage(j.message);
    }
    if (image === "holder.js/100px180" && status === Status.LOADING) {
      getDogPicture();
    }
  }, [image, status]);

  if (status === Status.FAILED) {
    return (
      <code>
        <pre>some error occured</pre>
      </code>
    );
  }

  if (status === Status.LOADING) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Real Life Image</Card.Title>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (status === Status.IDLE && matches.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Real Life Image</Card.Title>
          <h2>?</h2>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{charachter} IRL</Card.Title>
          <Card.Text>
            Using advanced Machine Learning and artificial intelligence, we can
            determine exactly what someone looks like{" "}
            <strong>in real life</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Card>
  );
}

export default DogPicture;