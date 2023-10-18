import {
  Card,
  Button,
  Icon,
  Modal,
  Transition,
  Form,
  Input,
  TextArea,
  Header,
  Label,
  Radio,
} from "semantic-ui-react";
import { useState } from "react";

const Todo = ({ todo, update, destory, statuses }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [status_id, setStatus] = useState(todo.status.id);

  function updateTodo() {
    const body = {
      name,
      description,
      status_id,
    };
    update(todo.id, body);
    setOpenUpdate(false);
  }

  function deleteTodo() {
    destory(todo.id);
    setOpenDelete(false);
  }
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{todo.name}</span>
            <Button.Group>
              <Button primary icon onClick={() => setOpenUpdate(true)}>
                <Icon name="edit" />
              </Button>
              <Button color="red" icon onClick={() => setOpenDelete(true)}>
                <Icon name="delete" />
              </Button>
            </Button.Group>
          </Card.Header>
        </Card.Content>
        <Card.Content>{todo.description}</Card.Content>
        <Card.Content extra>
          <Label color={statuses[todo.status.name]}>{todo.status.name}</Label>
        </Card.Content>
      </Card>
      <Transition visible={openUpdate} animation="scale" duration={500}>
        <Modal
          size="tiny"
          onClose={() => setOpenUpdate(false)}
          onOpen={() => setOpenUpdate(true)}
          open={openUpdate}
        >
          <Modal.Header>Edit {todo.name}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field
                control={Input}
                label="What do you need to do?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Field
                control={TextArea}
                label="Describe what you're going to do."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Field>
                <label>Status</label>
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Not Started"
                  name="status"
                  value={1}
                  checked={status_id === 1}
                  onChange={(_, { value }) => setStatus(value)}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Ongoing"
                  name="status"
                  value={2}
                  checked={status_id === 2}
                  onChange={(_, { value }) => setStatus(value)}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Completed"
                  name="status"
                  value={3}
                  checked={status_id === 3}
                  onChange={(_, { value }) => setStatus(value)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setOpenUpdate(false)}>
              Cancel
            </Button>
            <Button positive onClick={updateTodo}>
              Update
            </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
      <Transition visible={openDelete} animation="scale" duration={500}>
        <Modal
          basic
          onClose={() => setOpenDelete(false)}
          onOpen={() => setOpenDelete(true)}
          open={openDelete}
          size="tiny"
        >
          <Header icon>
            <Icon name="archive" />
            Delete {todo.name}
          </Header>
          <Modal.Content>
            <p>You are about to delete this item. Are you sure?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={() => setOpenDelete(false)}
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={deleteTodo}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    </>
  );
};

export default Todo;
