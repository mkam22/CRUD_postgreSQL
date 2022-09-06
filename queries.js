const Pool = require("pg").Pool;
const pool = new Pool({
  user: "muhammadkamran",
  host: "localhost",
  database: "Student",
  password: "pgAdmin22",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM public.name ORDER BY id ASC ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(response);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM public.name WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { name } = request.body;

  pool.query(
    "INSERT INTO public.name (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  pool.query(
    "UPDATE public.name SET name = $1 WHERE id = $2",
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM public.name WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
