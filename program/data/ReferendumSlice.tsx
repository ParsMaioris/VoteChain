import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReferendums as fetchReferendums } from './mock/getReferendums';
import Referendum from '../domain/Referendum';
import { RootState } from './store';

interface ReferendumsState {
  referendums: Referendum[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ReferendumsState = {
  referendums: [],
  status: 'idle',
};

export const getReferendums = createAsyncThunk(
  'referendums/getReferendums',
  async () => {
    const response = await fetchReferendums();
    return response;
  }
);

export const castVote = createAsyncThunk(
  'referendums/castVote',
  async ({ referendum, vote }: { referendum: Referendum; vote: 'yes' | 'no' }, { getState }) => {
    const referendums = (getState() as RootState).referendums.referendums.map(element => {
      if (element.id === referendum.id) {
        return  {...element, userVote: vote, userHasVoted: true}
      }

      return element;
    })

    return referendums;
  }
);

const referendumsSlice = createSlice({
  name: 'referendums',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getReferendums.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getReferendums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.referendums = action.payload;
      })
      .addCase(getReferendums.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(castVote.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(castVote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.referendums = action.payload;
      })
      .addCase(castVote.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default referendumsSlice.reducer;
