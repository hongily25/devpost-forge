import api from "@forge/api";
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState, Button, Macro, ModalDialog, Form, Select, Option, Image } from "@forge/ui";
import axios from "axios";

const fetchCommentsForIssue = async (issueId) => {
  
  const res = await api
    .asApp()
    .requestJira(`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};


const fetchIssue = async (issueId) => {
  const res = await api
    .asApp()
    .requestJira(`/rest/api/3/issue/${issueId}`);

  const data = await res.json();
  return data;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));
  const issue = async () => await fetchIssue(context.platformContext.issueKey);
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <Button
        text={`Show Map`}
        onClick={() => setOpen(true)}
      />
      {isOpen && (
        <ModalDialog header="Map of Users" onClose={() => setOpen(false)}>
          <Image
            src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
            &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&key=AIzaSyAyzcJb41FFwvQeK0z_eLQV1RH5v7Ccpys"
          />
        </ModalDialog>
      )}
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
