import { Grid, Card, Button } from "semantic-ui-react";
import Todo from "./Todo";

const Todos = ({ todos, update, destory, statuses }) => {
  return (
    <Grid.Column>
      <h3>Your Todos</h3>
      <Grid.Row>
        {todos.map((todo) => {
          return (
            <Todo
              todo={todo}
              key={todo.id}
              update={update}
              destory={destory}
              statuses={statuses}
            />
          );
        })}
      </Grid.Row>
    </Grid.Column>
  );
};

export default Todos;
