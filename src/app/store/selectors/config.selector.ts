import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConfigState } from "../../models/ConfigState";


const getConfigState = createFeatureSelector<ConfigState>('config')

export const selectArea = createSelector(getConfigState, (state: ConfigState) => state.area)

export const selectUser = createSelector(getConfigState, (state: ConfigState) => state.user)

export const selectIsAuthenticated = createSelector(getConfigState, (state: ConfigState) => state.isAuthenticated)

