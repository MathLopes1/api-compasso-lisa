class NotFound extends Error{
  constructor(msg){
    super(msg);
    this.message = 'ID NotFound';
  }
}

module.exports = NotFound;