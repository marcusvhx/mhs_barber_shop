import { Router } from "express";
import { Get } from "../controllers/getControllers";
import { Create } from "../controllers/createController";
import { Delete } from "../controllers/deletController";
import { Auth } from "../controllers/authController";

const router = Router();

const getStufs = new Get();
const createStufs = new Create();
const deleteStufs = new Delete();
const login = new Auth();

/* ================= auth ================= */
router.post("/login", login.login);

/* ================= get ================= */
router.get("/getusers", getStufs.users);

router.get("/getreservs/:userId", getStufs.reservs);
router.get("/getallreservs", getStufs.allreservs);

router.get("/getcalendardata", getStufs.availableDays);
router.get("/gethourslist/:date", getStufs.dateTimeList);

/* ================= post ================= */
router.post("/createuser", createStufs.user);
router.post("/createreserv/:userId", createStufs.reserv);

/* ================= delete ================= */
router.delete("/deletereserv/:userId/:id", deleteStufs.reserv);
router.delete("/deleteallreservs", deleteStufs.allReserv);
router.delete("/deleteallusers", deleteStufs.allUsers);

export { router };
