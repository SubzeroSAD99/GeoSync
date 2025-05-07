import Employee from "../models/Employee.mjs";

class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await Employee.findAll();

      const nameEmployees = employees.map((it) => {
        return it.name;
      });

      console.log(nameEmployees);

      res.json({ list: nameEmployees });
    } catch (err) {
      res.status(400).json({ err: "Erro ao localizar usuarios!" });
    }
  }
}

export default EmployeeController;
