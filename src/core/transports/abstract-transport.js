

const  IMPL_ERROR = 'Not implemented!';

class AbstractTransport
{
  connect() {
    throw new Error(IMPL_ERROR);
  }
  
  disconnect() {
    throw new Error(IMPL_ERROR);
  }
  
  subscribe() {
    throw new Error(IMPL_ERROR);
  }
  
}