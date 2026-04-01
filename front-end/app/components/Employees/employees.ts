import employee1 from "@/public/png/employees/employee-image-1.png";
import employee2 from "@/public/png/employees/employee-image-2.png";
import employee3 from "@/public/png/employees/employee-image-3.png";
import { randomUUID } from "crypto";

const employees = [
  {id: randomUUID(), name: "Tlock", role: "barbeiro", image: employee1 },
  {id: randomUUID(), name: "Rhagrid", role: "barbeiro", image: employee2 },
  {id: randomUUID(), name: "Bjorn", role: "quimico capilar", image: employee3 },
];

export { employees };
