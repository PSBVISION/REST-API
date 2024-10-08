const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentsById);
router.put("/:id", controller.updateStudent);
router.delete('/:id', controller.deleteStudent);


module.exports = router;