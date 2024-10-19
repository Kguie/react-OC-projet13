import Button from "../../button/Button";

export default function UserHeader(): React.ReactElement {
  return (
    <div className="user-header">
      <h2>
        Welcome back
        <br />
        Tony Jarvis!
      </h2>
      <Button label="Edit Name" />
    </div>
  );
}
