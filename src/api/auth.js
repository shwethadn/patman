import service from './service';

class Auth {
  // User Registration
  signup(values): Promise<Object> {
    const params = {
      mobile: values.mobile,
      name: values.name,
      type: values.role,
      password: values.password,
    };
    return service.post('/users/sign_up', params);
  }

  // User Login API
  login(values): Promise<Object> {
    const params = {
      mobile: values.mobile,
      password: values.password,
    };
    return service.post('/users/sign_in', params);
  }
}

export default new Auth();
