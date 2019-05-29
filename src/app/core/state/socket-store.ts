import { State, Action, StateContext } from '@ngxs/store';
import { GetSocketState } from './socket-actions';

export interface SocketStateModel {
  value: number;
}

@State<SocketStateModel>({
  name: 'SocketState',
  defaults: {
    value: 3
  }
})
export class SocketState {
  @Action(GetSocketState)
  loginWithEmailAndPassword(ctx: StateContext<SocketStateModel>, action: GetSocketState) {
    const state = ctx.getState();
    if (state.value !== action.value) {
      ctx.setState({
        ...state,
        value: action.value
      });
    }
  }
}
