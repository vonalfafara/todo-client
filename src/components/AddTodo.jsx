import { Card, Button, Form, Input, TextArea } from "semantic-ui-react";
import { useState } from "react";

const AddTodo = ({ submit, logout, errors }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createTodo() {
    submit({ name, description });
    setName("");
    setDescription("");
  }
  return (
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Your todo list</span>
          <Button color="red" style={{ margin: 0 }} onClick={logout}>
            Logout
          </Button>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Form>
          <Form.Field
            control={Input}
            label="What do you need to do?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Form.Field
            control={TextArea}
            label="Describe what you're going to do."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form>
      </Card.Content>
      <Card.Content style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button primary style={{ margin: 0 }} onClick={createTodo}>
          Create
        </Button>
      </Card.Content>
    </Card>
  );
};

export default AddTodo;
