import { Router } from "express";
import { Get } from "../controllers/getControllers";
import { Create } from "../controllers/createController";
import { Delete } from "../controllers/deletController";
import { Auth } from "../controllers/authController";
import { Edit } from "../controllers/editControllers";

const router = Router();

const getStufs = new Get();
const createStufs = new Create();
const deleteStufs = new Delete();
const editStufs = new Edit();

const login = new Auth();

/* ================= auth ================= */
router.post("/login", login.login);

/* ================= get ================= */
router.get("/getallusers", getStufs.users);
router.get("/getuser/:id", getStufs.oneUser);

router.get("/getreservs/:userId", getStufs.reservs);
router.get("/getallreservs/:id", getStufs.allreservs);

router.get("/getcalendardata", getStufs.availableDays);
router.get("/gethourslist/:date", getStufs.dateTimeList);

/* ================= post ================= */
router.post("/createuser", createStufs.user);
router.post("/createreserv/:userId", createStufs.reserv);

/* ================= delete ================= */
router.delete("/deletereserv/:id", deleteStufs.reserv);
router.delete("/deleteallreservs", deleteStufs.allReserv);
router.delete("/deleteallusers", deleteStufs.allUsers);

/* ================= delete ================= */
router.put("/changestatus/:reservId", editStufs.changeStatus);
router.put("/editreserv/:reservId", editStufs.editReserv);
router.put("/edituser/:userId", editStufs.editUser);
router.put("/editpassword/:userId", editStufs.editPassword);

export { router };
