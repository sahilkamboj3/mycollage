import axios from "axios";
import { getCookieValue } from "../util/logic";
import { CollageInterface } from "../interfaces";
import { useRouter } from "next/router";

const Collages = ({ collages }) => {
  const userUUID = getCookieValue("userUUID");
  console.log(userUUID);
  console.log(typeof userUUID);

  console.log(collages);
  return <div>Your Collages</div>;
};

export async function getStaticProps() {
  const router = useRouter();
  const { userUUID } = router.query;
  //  const userUUID = getCookieValue("userUUID");
  //  const userUUID = "ee59f59d-3d5f-40f3-9cd8-353e1c92dc76";
  //  console.log(userUUID);

  const res = await fetch(`http://localhost:8080/collage/getAll/${userUUID}`);
  const collages = await res.json();

  return {
    props: {
      collages,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/accounts/getAll");
  const data = await res.json();

  const accounts = data["accounts"];

  //  const paths = {
  //    params: { id: userUUID },
  //  };

  const paths = accounts.map((account) => ({
    params: { userUUID: account.uuid },
  }));
  //
  //    return {
  //
  //    }

  return { paths, fallback: false };
}

export default Collages;
