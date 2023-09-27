import moment from "moment";
import { ReservProps } from "../interfaces";

export class Reserv {
  private props: ReservProps;

  get costumer() {
    return { name: this.props.name, phoneNumber: this.props.phoneNumber };
  }

  get dateTime() {
    return this.props.dateTime;
  }

  get service() {
    return this.props.service;
  }

  constructor(props: ReservProps) {
    const { dateTime } = props;
    if (moment(dateTime) <= moment()) {
      throw new Error("invalid date");
    }

    this.props = props;
  }
}
