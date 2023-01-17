import { HttpLink } from '@apollo/client';

export class NetworkInterface extends HttpLink {
  setUri(uri) {
    this._uri = uri
  }
}


//const networkInterface = new NetworkInterface('/grapqlendpoint1')
//networkInterface.setUri('/graphqlendpoint2')