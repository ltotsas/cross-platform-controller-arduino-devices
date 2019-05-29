import { GroupParameters } from './group.model';
export interface Group {
  name: string;
  color: string;
  ids: string[];
  state: number;
  openned: number;
  blink: number;
  params: GroupParameters;
}

export interface GroupParameters {
  amplitude: number;
  setpoint: number;
  active_interval: number;
  passive_interval: number;
  fansignal: number;
}

export class ParamsMaker {
  static create(event: GroupParameters) {
    return {
      amplitude: event.amplitude,
      setpoint: event.setpoint,
      fansignal: event.fansignal,
      active_interval: event.active_interval,
      passive_interval: event.passive_interval
    };
  }
}
