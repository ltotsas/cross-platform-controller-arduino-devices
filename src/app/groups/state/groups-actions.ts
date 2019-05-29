import { GroupParameters } from '@app/groups/models/group.model';

export class AddDeviceToGroup {
  static type = '[Update Group] Set device to group';
  constructor(public device: string, public groupName: string) {}
}

export class SetGroupsState {
  static type = '[Set Group] Set group state';
  constructor(public devices: string[]) {}
}

export class RemoveDeviceFromGroup {
  static type = '[Update Group] Remove device from group';
  constructor(public device: string, public groupName: string) {}
}

export class GetGroups {
  static readonly type = '[Fetch Groups] Get group array';
  constructor() {}
}

export class SetGroupState {
  static type = '[Set State] start/stop group';
  constructor(public state: number, public groupName: string) {}
}

export class SetGroupOpen {
  static type = '[Set Open] Open/close group';
  constructor(public openned: number, public groupName: string) {}
}

export class SetGroupToBlink {
  static type = '[Set Blinking] Start/stop blinking';
  constructor(public blink: number, public groupName: string) {}
}

export class SortDevicesFromGroup {
  static type = '[Sort Devices] Sort devices from group';
  constructor(public previousIndex: number, public currentIndex: number, public groupName: string) {}
}

export class CreateNewGroup {
  static type = '[Create Group] Create a new group';
  constructor(public name: string, public color: string) {}
}

export class SetGroupParams {
  static type = '[Set Params] Set groups parameters';
  constructor(public params: GroupParameters, public groupName: string) {}
}
