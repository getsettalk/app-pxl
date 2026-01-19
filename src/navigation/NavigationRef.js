
import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();


export function navigate(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName, params);
  } else {
    console.error('Navigation is not ready');
  }
}

export function reset(name) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name }],
      })
    );
  }
}


export function goBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.error('No routes to go back to');
  }
}


export function resetNavigationStack(routes) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      })
    );
  } else {
    console.error('Navigation is not ready');
  }
}


export function replace(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  } else {
    console.error('Navigation is not ready');
  }
}


export function push(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  } else {
    console.error('Navigation is not ready');
  }
}


export function pop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop());
  } else {
    console.error('Navigation is not ready');
  }
}


export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  } else {
    console.error('Navigation is not ready');
  }
}



export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
}


export function isCurrentRoute(routeName) {
  return getCurrentRouteName() === routeName;
}