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

  uploadLabReport(values): Promise<Object> {
    return service.post('/lab_reports', values);
  }

  requestPatient(values): Promise<Object> {
    return service.post('/doctors/patient_request?uid='+values.uid, values);
  }

  getLabReports(values): Promise<Object> {
    return service.get('/lab_reports?patient_id='+values.patient_id, values);
  }

  getPrescriptions(values): Promise<Object> {
    return service.get('/prescriptions?patient_id='+values.patient_id, values);
  }
}

export default new User();
