import { CollageInterface, ServerSideCollageInterface } from "../interfaces";
import { prerenderAuthorizationCheck } from "../util/logic";

import { useState } from "react";
import { Modal } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

import ProjectForm from "./ProjectForm";

const Projects = ({ collages }) => {
  // model variables
  const [open, setOpen] = useState<boolean>(false);

  // get userUUID
  const router = useRouter();
  const { userUUID } = router.query;

  prerenderAuthorizationCheck(router);

  return (
    <div>
      <h1>Your Collages - {collages.length}</h1>

      {collages.length < 1 && <h1>Create your first collage</h1>}

      {collages.map((collage: CollageInterface) => (
        <Link
          key={collage.uuid}
          href={`http://localhost:3000/collages/${collage.uuid}`}
        >
          <a>
            <p key={collage.uuid}>{collage.projectName}</p>
          </a>
        </Link>
      ))}

      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* seems to be giving some children error */}
        <ProjectForm userUUID={userUUID} />
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  // fetch request for collages
  let collages: CollageInterface[];
  await fetch(
    `http://localhost:8080/collage/getAll/${context.params.userUUID}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      collages = data.map((collage: ServerSideCollageInterface) => {
        return {
          id: collage.projectID,
          uuid: collage.projectUUID,
          userUUID: collage.accountUUID,
          projectName: collage.projectName,
        } as CollageInterface;
      });
    });

  return {
    props: {
      collages,
    },
  };
}

export default Projects;
