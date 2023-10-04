import { Request, Response } from "express";
import { prismaClient } from "../db/prismaClient";
import {
  CalendarDataProps,
  CalendarDaysProps,
  HoursListProps,
} from "../interfaces";
import moment from "moment";

export class Get {
  /* ============================================================ */

  async availableDays(req: Request, res: Response) {
    const reservs = await prismaClient.reservs.findMany();

    const witchMonth = [
      // esse mes
      moment().month(),
      // proximo mes
      moment().month() + 1,
    ];

    function getDatesOfMonth(month: number) {
      //
      const daysOfMonth = moment().set("M", month).daysInMonth();

      const days: CalendarDaysProps[] = [];
      for (let i = 1; i <= daysOfMonth; i++) {
        //

        const date = moment().month(month).date(i);
        const dayOfWeek = date.day();

        const contitions = [date >= moment().hour(1).minute(0).second(0)];
        const isAvailable = contitions.every((t) => t);

        if (dayOfWeek !== 0) {
          days.push({
            date: date.format(),
            available: isAvailable,
            selected: moment(date).format("DD MM") === moment().format("DD MM"),
          });
        }
      }
      return days;
    }

    function positionsDateInRigthDay(month: number) {
      const daysOfMonth = getDatesOfMonth(month);
      const firstDate = daysOfMonth[0].date;

      if (moment(firstDate).day() > 1) {
        for (let i = 0; i < moment(firstDate).day(); i++) {
          //
          const yesterDays = moment(firstDate).date(-i);
          if (yesterDays.day() !== 0) {
            daysOfMonth.unshift({
              date: yesterDays.format(),
              available: false,
              selected: false,
            });
          }
        }
      }
      return daysOfMonth;
    }

    function fillEmptySlotsAtEndOfCalendar(month: number) {
      const daysOfMonth = positionsDateInRigthDay(month);
      const lastDate = daysOfMonth[daysOfMonth.length - 1].date;

      for (let i = 1; i <= 6 - moment(lastDate).day(); i++) {
        const tomorrows = moment(lastDate)
          .month(moment(lastDate).month() + 1)
          .date(i)
          .format();

        daysOfMonth.push({
          date: tomorrows,
          available: false,
          selected: false,
        });
      }
      return daysOfMonth;
    }

    function setAvailableDates(month: number) {
      const daysOfMonth = fillEmptySlotsAtEndOfCalendar(month);

      daysOfMonth.forEach((day) => {
        if (day.available) {
          const vacancies = [];
          var vacanciesNum = 0;

          const initialHours =
            moment(day.date).format("DD MM") === moment().format("DD MM")
              ? moment()
                  .hour(moment().hour() + 1)
                  .minute(0)
              : moment().hour(10).minute(0);

          for (
            let i = initialHours;
            i < moment().hour(20).minute(0);
            i.set("minute", i.minute() + 20)
          ) {
            if (i.hour() < 20) vacancies.push(moment(i).format("HH mm"));
          }

          vacancies.forEach((vac) => {
            reservs.map((reserv) => {
              if (
                moment(reserv.dateTime).format("DD MM") ===
                moment(day.date).format("DD MM")
              ) {
                if (moment(reserv.dateTime).format("HH mm") === vac) {
                  vacanciesNum++;
                }
              }
            });
          });

          if (vacanciesNum === vacancies.length) {
            day.available = false;
          }
        }
      });
      return daysOfMonth;
    }

    const data: CalendarDataProps = {
      current: setAvailableDates(witchMonth[0]),
      next: setAvailableDates(witchMonth[1]),
    };

    res.send(data);
  }

  /* ============================================================ */

  async dateTimeList(req: Request, res: Response) {
    const dateOfReserv = await req.params.date;

    const reservHours: HoursListProps[] = [];

    prismaClient.reservs.findMany().then((resp) => {
      for (
        let i = moment(dateOfReserv).hour(10).minute(0);
        i <= moment(dateOfReserv).hour(20).minute(0);
        i.set("minute", i.minute() + 20)
      ) {
        const isAvailable = resp.every(
          (t) =>
            moment(t.dateTime).format("DD MM HH mm") !== i.format("DD MM HH mm")
        );
        if (i > moment()) {
          reservHours.push({
            number: i.toISOString(),
            available: isAvailable,
          });
        }
      }
      res.status(200).json(reservHours);
    });
  }

  /* ============================================================ */
  /* ============================================================ */

  async reservs(req: Request, res: Response) {
    const { userId } = req.params;

    function setReservStatus(dateTime: Date) {
      if (
        moment(dateTime).set("minute", moment(dateTime).minute() + 3) < moment()
      ) {
        if (moment(dateTime) < moment().set("hour", moment().hour() - 2)) {
          return "perdido";
        }

        return "atrasado";
      }
      return "pendente";
    }

    prismaClient.reservs.findMany({ where: { userId } }).then((resp) => {
      const reservs = resp.map((i) => ({
        ...i,
        status: setReservStatus(i.dateTime),
      }));
      res.status(200).json(reservs);
    });
  }
  /**
  marcado = 10 
  agora = 11
*/

  /* ============================================================ */

  async allreservs(req: Request, res: Response) {
    prismaClient.reservs.findMany().then((resp) => res.status(200).json(resp));
  }

  /* ============================================================ */

  async users(req: Request, res: Response) {
    prismaClient.users.findMany().then((resp) => res.status(200).json(resp));
  }

  /* ============================================================ */

  async oneUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prismaClient.users.findFirst({ where: { id } });

    const { password: _, ...logData } = user;

    res.status(200).json({ ...logData });
  }
}
