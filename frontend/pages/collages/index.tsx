//import axios from "axios";
//import { getCookieValue } from "../util/logic";
//import { CollageInterface } from "../interfaces";
import { useEffect } from "react";

const Collages = ({ collages }) => {
  //  const userUUID = getCookieValue("userUUID");
  //  console.log(userUUID);
  //  console.log(typeof userUUID);
  //
  //  console.log(collages);
  //  useEffect(() => {
  //    fetch("http://localhost:5000/accounts/retrieveUUID", {
  //      credentials: "include",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //    })
  //      .then((res) => res.json())
  //      .then((data) => console.log(data));
  //  }, []);

  return <div>Your Collages</div>;
};

//export async function getStaticProps() {
//  //  const userUUID = getCookieValue("userUUID");
//  //  console.log(userUUID);
//
//  //  const res = await fetch(`http://localhost:8080/collage/getAll/${userUUID}`);
//  //  const collages = await res.json();
//
//  fetch("http://localhost:5000/accounts/retrieveUUID", {
//    credentials: "include",
//    headers: {
//      "Content-Type": "application/json",
//    },
//  })
//    .then((res) => res.json())
//    .then((data) => console.log(data));
//
//  const collages = ["hi", "bye"];
//  return {
//    props: {
//      collages,
//    },
//  };
//}

export async function getInitialProps() {
  //  const userUUID = getCookieValue("userUUID");
  //  console.log(userUUID);

  //  const res = await fetch(`http://localhost:8080/collage/getAll/${userUUID}`);
  //  const collages = await res.json();

  fetch("http://localhost:5000/accounts/retrieveUUID", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  const collages = ["hi", "bye"];
  return {
    props: {
      collages,
    },
  };
}

export default Collages;
