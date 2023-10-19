import {
  Container,
  Grid,
  Message,
  Transition,
  Pagination,
} from "semantic-ui-react";
import http from "../lib/http";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";

const Home = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [todos, setTodos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [statuses, _] = useState({
    "Not Started": "red",
    Ongoing: "yellow",
    Completed: "green",
  });
  const [errors, setErrors] = useState({
    name: false,
  });
  const [errorsModal, setErrorsModal] = useState({
    name: false,
  });
  const todosRef = useRef(null);

  useEffect(() => {
    getTodos();
    return () => {};
  }, []);

  async function getTodos(page = 1) {
    const api = http({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const response = await api.get(`/todos?page=${page}`);
    setTodos(response.data.data);
    setPage(page);
    setPageCount(response.data.meta.last_page);
  }

  async function logout() {
    const api = http({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    await api.post("/logout");
    localStorage.clear();
    navigate("/login");
  }

  async function createTodo(body) {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const response = await api.post("/todos", body);
      setNotification(response.data.message);
      setShowNotification(true);
      setErrors({
        name: false,
      });
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        clearTimeout(notificationTimeout);
      }, 5000);
      getTodos();
    } catch (error) {
      if (error.response.status === 422) {
        setErrors({
          name: {
            content: error.response.data.errors?.name[0],
            pointing: "below",
          },
        });
      }
    }
  }

  async function updateTodo(id, body) {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const response = await api.put(`/todos/${id}`, body);
      getTodos(page);
      setNotification(response.data.message);
      setShowNotification(true);
      setErrorsModal({
        name: false,
      });
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        clearTimeout(notificationTimeout);
      }, 5000);
      return true;
    } catch (error) {
      if (error.response.status === 422) {
        setErrorsModal({
          name: {
            content: error.response.data.errors.name[0],
            pointing: "below",
          },
        });
      }
      return false;
    }
  }

  async function deleteTodo(id) {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const response = await api.delete(`/todos/${id}`);
      getTodos(page);
      setNotification(response.data.message);
      setShowNotification(true);
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        clearTimeout(notificationTimeout);
      }, 5000);
    } catch (error) {
      if (error.response.status === 422) {
        setErrors({
          name: {
            content: error.response.data.errors.name[0],
            pointing: "below",
          },
        });
      }
    }
  }

  function handlePageChange(_, { activePage }) {
    todosRef.current.scrollIntoView({ behavior: "smooth" });
    getTodos(activePage);
  }
  return (
    <Container style={{ marginTop: "5rem" }}>
      <Grid centered columns={2}>
        <Grid.Column>
          <AddTodo submit={createTodo} logout={logout} errors={errors} />
        </Grid.Column>
        <Grid.Row ref={todosRef}>
          <Todos
            todos={todos}
            update={updateTodo}
            destory={deleteTodo}
            statuses={statuses}
            errors={errorsModal}
          />
        </Grid.Row>
        <Grid.Row>
          <Pagination
            defaultActivePage={page}
            totalPages={pageCount}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={handlePageChange}
          />
        </Grid.Row>
      </Grid>
      <Transition visible={showNotification} animation="scale" duration={500}>
        <Message
          positive
          style={{
            position: "fixed",
            margin: 0,
            top: "1rem",
            right: "1rem",
            minWidth: "25rem",
          }}
        >
          <Message.Header>{notification}</Message.Header>
          <p>Please check your list for the updates</p>
        </Message>
      </Transition>
    </Container>
  );
};

export default Home;
