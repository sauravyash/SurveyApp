class IncompleteError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export default IncompleteError;