

export abstract class BaseService {

  constructor() {
  }

  protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    // either applicationError in header or model error in body
    // if (applicationError) {
    //   return Observable.throw(applicationError);
    // }
    // return Observable.throw(error);
  }
}
