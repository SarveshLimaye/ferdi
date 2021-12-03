import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import AppLayoutContainer from './containers/layout/AppLayoutContainer';
import SettingsWindow from './containers/settings/SettingsWindow';
import RecipesScreen from './containers/settings/RecipesScreen';
import ServicesScreen from './containers/settings/ServicesScreen';
import EditServiceScreen from './containers/settings/EditServiceScreen';
import AccountScreen from './containers/settings/AccountScreen';
import TeamScreen from './containers/settings/TeamScreen';
import EditUserScreen from './containers/settings/EditUserScreen';
import EditSettingsScreen from './containers/settings/EditSettingsScreen';
import InviteSettingsScreen from './containers/settings/InviteScreen';
import SupportFerdiScreen from './containers/settings/SupportScreen';
import WelcomeScreen from './containers/auth/WelcomeScreen';
import LoginScreen from './containers/auth/LoginScreen';
import LockedScreen from './containers/auth/LockedScreen';
import PasswordScreen from './containers/auth/PasswordScreen';
import ChangeServerScreen from './containers/auth/ChangeServerScreen';
import SignupScreen from './containers/auth/SignupScreen';
import ImportScreen from './containers/auth/ImportScreen';
import SetupAssistentScreen from './containers/auth/SetupAssistantScreen';
import InviteScreen from './containers/auth/InviteScreen';
import AuthLayoutContainer from './containers/auth/AuthLayoutContainer';
import WorkspacesScreen from './features/workspaces/containers/WorkspacesScreen';
import EditWorkspaceScreen from './features/workspaces/containers/EditWorkspaceScreen';
import { WORKSPACES_ROUTES } from './features/workspaces/constants';

import SettingsStore from './stores/SettingsStore';

type Props = {
  stores: {
    settings: typeof SettingsStore;
  };
  history: any;
};

@inject('stores', 'actions')
@observer
class Routes extends Component<Props> {
  render() {
    const { locked } = this.props.stores.settings.app;
    const { history } = this.props;

    if (locked) {
      return <LockedScreen />;
    }

    return (
      <Router history={history}>
        <div>
          <Route path="/" component={AppLayoutContainer}>
            <Route path="/settings" render={() => <Redirect to="/settings/recipes" />} component={SettingsWindow}>
              <Switch>
                <Route path="/settings/recipes" component={RecipesScreen} />
                <Route path="/settings/recipes/:filter" component={RecipesScreen} />
                <Route path="/settings/services" component={ServicesScreen} />
                <Route path="/settings/services/:action/:id" component={EditServiceScreen} />
                <Route path={WORKSPACES_ROUTES.ROOT} component={WorkspacesScreen} />
                <Route path={WORKSPACES_ROUTES.EDIT} component={EditWorkspaceScreen} />
                <Route path="/settings/user" component={AccountScreen} />
                <Route path="/settings/user/edit" component={EditUserScreen} />
                <Route path="/settings/team" component={TeamScreen} />
                <Route path="/settings/app" component={EditSettingsScreen} />
                <Route path="/settings/invite" component={InviteSettingsScreen} />
                <Route path="/settings/support" component={SupportFerdiScreen} />
              </Switch>
            </Route>
          </Route>
          <Route path="/auth" render={() => <Redirect to="/auth/welcome" />} component={AuthLayoutContainer}>
            <Switch>
              <Route path="/auth/welcome" component={WelcomeScreen} />
              <Route path="/auth/login" component={LoginScreen} />
              <Route path="/auth/server" component={ChangeServerScreen} />
              <Route path="/auth/signup" render={() => <Redirect to="/auth/signup/form" />} />
              <Switch>
                <Route path="/auth/signup/form" component={SignupScreen} />
                <Route path="/auth/signup/import" component={ImportScreen} />
                <Route path="/auth/signup/setup" component={SetupAssistentScreen} />
                <Route path="/auth/signup/invite" component={InviteScreen} />
              </Switch>
              <Route path="/auth/password" component={PasswordScreen} />
              <Route path="/auth/logout" component={LoginScreen} />
            </Switch>
          </Route>
          <Route path="*" component={AppLayoutContainer} />
        </div>
      </Router>
    );
  }
}

export default Routes;
