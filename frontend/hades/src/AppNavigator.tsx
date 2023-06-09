import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeBuilder } from './routes/routes';
import { LoginForm } from './components/Register/LoginForm';
import { RegisterForm } from './components/Register/RegisterForm';
import { CurrentUserDetails } from './components/UserDetails/CurrentUserDetails';
import { UsersList } from './components/UsersList/UsersList';
import { appStyles } from './styles/app';
import { NotFound } from './components/Common/NotFound';
import { SelectedUserDetails } from './components/UserDetails/SelectedUserDetails';
import { ProductsList } from './components/Products/ProductsList';
import { CategoriesList } from './components/Categories/CategoriesList';
import { AddProductForm } from './components/Products/AddProductForm';
import { AddCategory } from './components/Categories/AddCategory';
import { HomePage } from './components/HomePage/HomePage';

export const AppNavigator: React.FC = () => (
  <div style={appStyles.navigator}>
    <Switch>
      <Route path={routeBuilder.home} component={HomePage} exact />
      <Route path={routeBuilder.addProduct} component={AddProductForm} exact />
      <Route path={routeBuilder.addCategory} component={AddCategory} exact />
      <Route path={routeBuilder.details} component={CurrentUserDetails} exact />
      <Route path={routeBuilder.categories} component={CategoriesList} exact />
      <Route path={routeBuilder.login} component={LoginForm} exact />
      <Route path={routeBuilder.products} component={ProductsList} exact />
      <Route path={routeBuilder.register} component={RegisterForm} exact />
      <Route path={routeBuilder.userId} component={SelectedUserDetails} exact />
      <Route path={routeBuilder.users} component={UsersList} exact />
      <Route path={routeBuilder.noPage} component={NotFound} />
    </Switch>
  </div>
);