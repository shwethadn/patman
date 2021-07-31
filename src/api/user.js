import service from './service';
// import queryString from 'query-string';
// import Config from 'react-native-config';

class User {
  // User Details
  me(values): Promise<Object> {
    return service.get('/users/me');
  }

  // User signout API
  signOut(values): Promise<Object> {
    return service.post('/users/sign_out');
  }

  uploadPrescription(values): Promise<Object> {
    return service.post('/prescriptions', values);
  }

  requestPatient(values): Promise<Object> {
    return service.post('/doctors/patient_request?uid='+values.uid, values);
  }
}

export default new User();
