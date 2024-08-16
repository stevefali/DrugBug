import { Stack } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./Interaction.scss";

const Interaction = ({ interaction }) => {
  return (
    <div className="interaction">
      <p className="interaction__medicine">{interaction.medicine}</p>
      <Stack>
        {interaction.matches.map((match) => {
          return (
            <p className="interaction__match" key={uuidv4()}>
              {match}
            </p>
          );
        })}
      </Stack>
    </div>
  );
};

export default Interaction;
