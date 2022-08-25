import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/emptySplitApi';

import loginReducer from './containers/Login/loginSlice';
import viewEditReducer from './containers/ViewEdit/viewEditSlice';
import navibarReducer from './components/Navibar/navibarSlice';
import assetCardReducer from './components/AssetCard/assetCardSlice';
import accessoryCardReducer from './components/AccessoryCard/accessoryCardSlice';
import staffCardReducer from './components/StaffCard/staffCardSlice';
import locationCardReducer from './components/LocationCard/locationCardSlice.js';
import suggestListReducer from './components/SuggestBox/suggestBoxSlice';


export default configureStore({
  reducer: {
    user: loginReducer,
    viewedit: viewEditReducer,
    route: navibarReducer,
    asset: assetCardReducer,
    accessory: accessoryCardReducer,
    staff: staffCardReducer,
    locations: locationCardReducer,
    suggestlists: suggestListReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(emptySplitApi.middleware)
});
