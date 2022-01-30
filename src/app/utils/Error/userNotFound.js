class NotFound extends Error{
  constructor(msg){
    super(msg);
    this.message = 'User NotFound';
  }
}
  
module.exports = NotFound;