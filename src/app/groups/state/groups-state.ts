import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import produce from 'immer';
import { GroupsStateModel } from './groups-state';
import {
  AddDeviceToGroup,
  RemoveDeviceFromGroup,
  SortDevicesFromGroup,
  SetGroupState,
  CreateNewGroup,
  SetGroupOpen,
  SetGroupToBlink,
  SetGroupParams
} from './groups-actions';
import { Group } from '../models/group.model';
import { SetGroupsState } from '@app/groups/state/groups-actions';
import * as _ from 'lodash';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface GroupsStateModel {
  groups: Group[];
  devices: string[];
}

@State<GroupsStateModel>({
  name: 'GroupsState',
  defaults: {
    groups: [
      {
        name: 'default',
        color: 'black',
        ids: [],
        state: 0,
        openned: 0,
        blink: 0,
        params: {
          amplitude: 50,
          setpoint: 20,
          fansignal: 0,
          active_interval: 0,
          passive_interval: 0
        }
      }
    ],
    devices: []
  }
})
export class GroupsState {
  @Selector() static getGroups(state: GroupsStateModel) {
    return state.groups;
  }

  @Selector() static getNumberOfGroups(state: GroupsStateModel) {
    return state.groups.length;
  }

  @Selector() static groupParams(state: GroupsStateModel) {
    return (groupName: string) => {
      return state.groups.filter(s => s.name.indexOf(groupName) > -1).map(s => s.params);
    };
  }

  @Action(CreateNewGroup)
  NewGroup(ctx: StateContext<GroupsStateModel>, action: CreateNewGroup) {
    ctx.setState(
      produce(draft => {
        draft.groups.push({
          name: action.name,
          color: action.color,
          ids: [],
          state: 0,
          openned: 0,
          blink: 0,
          params: {
            amplitude: 50,
            setpoint: 20,
            fansignal: 0,
            active_interval: 0,
            passive_interval: 0
          }
        });
      })
    );
  }

  @Action(AddDeviceToGroup)
  AddToGroup(ctx: StateContext<GroupsStateModel>, action: AddDeviceToGroup) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            group.ids.push(action.device);
            _.pull(draft.groups[0].ids, action.device);
          }
        });
      })
    );
  }

  @Action(RemoveDeviceFromGroup)
  RemoveFromGroup(ctx: StateContext<GroupsStateModel>, action: RemoveDeviceFromGroup) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            _.pull(group.ids, action.device);
            draft.groups[0].ids.push(action.device);
          }
        });
      })
    );
  }

  @Action(SetGroupParams)
  SetGroupParams(ctx: StateContext<GroupsStateModel>, action: SetGroupParams) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            group.params = action.params;
          }
        });
      })
    );
  }

  @Action(SetGroupsState)
  SetGroupsState(ctx: StateContext<GroupsStateModel>, action: SetGroupsState) {
    ctx.setState(
      produce(draft => {
        _.difference(draft.devices, action.devices).map(devDisconnected => {
          if (draft.devices.includes(devDisconnected)) {
            draft.groups.map(group => {
              group.ids.map(nonExistedDevice => {
                if (nonExistedDevice === devDisconnected) {
                  _.pull(group.ids, devDisconnected);
                  _.pull(draft.devices, devDisconnected);
                }
              });
            });
          }
        });
        _.difference(action.devices, draft.devices).map(missingDev => {
          if (!draft.devices.includes(missingDev)) {
            draft.groups[0].ids.push(missingDev);
            draft.devices.push(missingDev);
          }
        });
      })
    );
  }

  @Action(SortDevicesFromGroup)
  SortDevicesFromGroup(ctx: StateContext<GroupsStateModel>, action: SortDevicesFromGroup) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            moveItemInArray(group.ids, action.previousIndex, action.currentIndex);
          }
        });
      })
    );
  }

  @Action(SetGroupState)
  SetGroupState(ctx: StateContext<GroupsStateModel>, action: SetGroupState) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            group.state = action.state;
          }
        });
      })
    );
  }

  @Action(SetGroupOpen)
  SetGroupOpen(ctx: StateContext<GroupsStateModel>, action: SetGroupOpen) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            group.openned = action.openned;
          }
        });
      })
    );
  }

  @Action(SetGroupToBlink)
  SetGroupToBlink(ctx: StateContext<GroupsStateModel>, action: SetGroupToBlink) {
    ctx.setState(
      produce(draft => {
        draft.groups.map(group => {
          if (group.name === action.groupName) {
            group.blink = action.blink;
          }
        });
      })
    );
  }

  // probably sthg i must remember but i can not :D
  // ctx.setState(produce((draft) => {
  //   draft.ids.push({names: 'dsds'});
  // }));
}
