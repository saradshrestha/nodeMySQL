class ResponseService {
  static successMsg(message = 'Success',status = 200) {
      return {
        success: true,
        message,
        status
      };
    }
    static success(data = null, message = 'Success', status=200) {
      return {
        success: true,
        data,
        message,
        status
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
  