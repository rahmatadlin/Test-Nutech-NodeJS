// middleware/errorHandler.js

const handleErrors = (err, req, res, next) => {
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: 400,
      message: err.message, // This will include the specific parsing error message
      data: null,
    });
  }

  // General error handling
  let status = 500; // Default server error status
  let message = "Server error"; // Default server error message

  switch (err.name) {
    case "WrongEmailPassword":
      status = 401; // You can set a specific status for the HTTP response here
      message = "Username atau password salah";
      break;
    case "ExistedEmail":
      status = 400;
      message = "Email sudah terdaftar";
      break;
    case "EmailFormat":
      status = 400;
      message = "Parameter email tidak sesuai format";
      break;
    case "EmptyEmail":
      status = 400; // Changed to 400 for client error
      message = "Parameter email harus diisi";
      break;
    case "EmptyFirstName":
      status = 400;
      message = "Parameter first_name harus diisi";
      break;
    case "EmptyLastName":
      status = 400;
      message = "Parameter last_name harus diisi";
      break;
    case "EmptyPassword":
      status = 400;
      message = "Parameter password harus diisi";
      break;
    case "PasswordLength":
      status = 400;
      message = "Password length minimal 8 karakter";
      break;
    case "EmptyFile":
      status = 400;
      message = "Field file tidak boleh kosong";
      break;
    case "InvalidImageFormat":
      status = 400;
      message = "Format Image tidak sesuai";
      break;
    case "MissingTopUpAmount":
      status = 400;
      message = "Parameter top_up_amount harus di isi";
      break;
    case "InvalidTopUpAmount":
      status = 400;
      message =
        "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0";
      break;
    case "ServiceNotFound":
      status = 400;
      message = "Service atau Layanan tidak ditemukan";
      break;
    case "InsufficientBalance":
      status = 400;
      message = "Saldo tidak mencukupi";
      break;
    case "Unauthorized":
      status = 401;
      message = "Token tidak tidak valid atau kadaluwarsa";
      break;
    case "NotFound":
      status = 404;
      message = "Resource tidak ditemukan";
      break;
    case "ServerError":
      status = 500; // Optionally handle general server errors
      message = "Terjadi kesalahan pada server"; // Customize this message if needed
      break;
  }

  // Set the response status based on error type
  const responseStatus =
    err.name === "WrongEmailPassword"
      ? 103
      : err.name === "Unauthorized"
      ? 108
      : 102;

  res.status(status).json({
    status: responseStatus,
    message,
    data: null, // Keep data consistent with your response structure
  });
};

module.exports = handleErrors;
