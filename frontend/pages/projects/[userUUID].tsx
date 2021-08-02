import { CollageInterface, ServerSideCollageInterface } from "../interfaces";
import { prerenderAuthorizationCheck } from "../util/logic";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

import ProjectForm from "./ProjectForm";
import { JAVA_BACKEND_SERVER } from "../../config";

const Projects = ({ collages }) => {
  // model variables
  const [open, setOpen] = useState<boolean>(false);

  // get userUUID
  const router = useRouter();
  const { userUUID } = router.query;

  prerenderAuthorizationCheck(router);

  /*
  <Link
    key={collage.uuid}
    href={`http://localhost:3000/collages/${collage.uuid}`}
  >
    <a>
      <p key={collage.uuid}>{collage.projectName}</p>
    </a>
  </Link>;
     */

  const left = "10vw";
  const right = "10vw";

  return (
    <div className="wrapper projectsPage">
      <div className="projectsContent">
        <h1 style={{ paddingLeft: left }}>Your Collages - {collages.length}</h1>

        <div className="cards">
          {collages.map((collage: CollageInterface) => (
            <Card
              key={collage.uuid}
              style={{
                background: "lightgrey",
                paddingLeft: left,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    width: "50vw",
                    marginRight: right,
                  }}
                >
                  {collage.projectName}
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    href={`http://localhost:3000/collages/${collage.uuid}`}
                  >
                    Edit
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          color="primary"
          variant="contained"
          style={{ marginLeft: left, marginTop: "2.5vh" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Start New Collage
        </Button>

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
    </div>
  );
};

export async function getServerSideProps(context) {
  // fetch request for collages
  let collages: CollageInterface[];
  await fetch(
    //`http://localhost:8080/collage/getAll/${context.params.userUUID}`,
    `${JAVA_BACKEND_SERVER}/collage/getAll/${context.params.userUUID}`,
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
