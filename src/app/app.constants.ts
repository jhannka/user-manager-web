import {environment} from "../environments/environment";


const EndPoint = (resource: string): string => {
  return environment.url_api + resource;
};

export const CONSTANT = {
  AUTH: {
    URL: {
      LOGIN: environment.url + 'auth/token',
      INFOUSER: EndPoint('user/auth')
    }
  },
}
