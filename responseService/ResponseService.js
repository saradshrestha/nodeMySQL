class ResponseService {
    static success(data = null, message = 'Success') {
      return {
        success: true,
        data,
        message,
      };
    }
  
    static error(message = 'Internal Server Error', status = 500) {
      return {
        success: false,
        message,
        status,
      };
    }
  
    static validationError(errors) {
      return {
        success: false,
        message: 'Validation Error',
        errors,
      };
    }
  }
  
  module.exports = ResponseService;
  