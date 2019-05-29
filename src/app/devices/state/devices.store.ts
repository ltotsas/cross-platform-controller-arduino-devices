import { State, Action, StateContext, Selector, createSelector, UpdateState } from '@ngxs/store';
import { Device } from '../models/device.model';
import { produce } from 'immer';
import { SetDevicesState, UpdateGroupOnDevice } from '../state/devices.actions';

export interface DevicesStateModel {
  devices: Device[];
}

@State<DevicesStateModel>({
  name: 'DevicesState',
  defaults: {
    devices: []
  }
})
export class DevicesState {
  // Get all devices
  @Selector() static getDevices(state: DevicesStateModel) {
    return state.devices;
  }

  // Get number of devices
  @Selector() static getNumberOfDevices(state: DevicesStateModel) {
    return state.devices.length;
  }

  // Get number of checked devices
  // @Selector() static getNumberOfCheckedDevices(state: DevicesStateModel) {
  //   let checkedDevices = 0;
  //   state.ggroup.map(
  //     (val) => {
  //       if (val.devices.map( (device) => device.checked)) { // number of checked devices, default is false
  //         checkedDevices = checkedDevices + 1;
  //       }
  //     });
  //     return checkedDevices;
  // }

  @Action(SetDevicesState)
  SetDevicesStateFromSocket(ctx: StateContext<DevicesStateModel>, action: SetDevicesState) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      devices: action.devices
    });
  }

  @Action(UpdateGroupOnDevice)
  UpdateGroupOnSelectedDevice(ctx: StateContext<DevicesStateModel>, action: UpdateGroupOnDevice) {
    ctx.setState(
      produce(draft => {
        draft.devices.filter(dev => dev.name === action.device.name, action.device);
      })
    );
  }
}
