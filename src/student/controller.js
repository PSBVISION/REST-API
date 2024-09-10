const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //check email is already exist
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    }
    //add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student added successfully!");
      }
    );
  });
};

const deleteStudent = (req,res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, results) => {
    const noStudnetFound = !results.rows.length;
    if (noStudnetFound){
      res.send("Student does not exist in database, could not be deleted.");
    }
  pool.query(queries.deleteStudent, [id], (error, results) => {
    if(error) throw error;
    res.status(200).send("Student deleted successfully!");
  });
  })
}

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  deleteStudent,
};
