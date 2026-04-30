import axios from "axios";

export const getUserFriendlyErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message =
      data?.message || data?.error?.message || data?.error || null;

    switch (status) {
      case 400:
        return "Невірний запит";
      case 401:
        return message === "Invalid credentials"
          ? "Невірний email або пароль"
          : "Сесія завершена, увійдіть знову";
      case 403:
        return "Недостатньо прав для цієї дії";
      case 404:
        return "Ресурс не знайдено";
      case 409:
        return message === "Email in use"
          ? "Такий email вже використовується"
          : "Такий запис вже існує";
      case 422:
        return "Перевір правильність введених даних";
      case 500:
        return "Помилка сервера, спробуйте пізніше";
      default:
        break;
    }

    switch (message) {
      case "Invalid credentials":
        return "Невірний email або пароль";

      case "User not found":
        return "Користувача не знайдено";

      case "Token expired":
        return "Посилання застаріло, спробуйте ще раз";

      case "Email already verified":
        return "Email вже підтверджено";

      case "Invalid email":
        return "Некоректний email";

      case "Verification email sent":
        return "Лист для підтвердження надіслано";

      case "Missing required fields":
        return "Заповни всі обов'язкові поля";

      default:
        return message || "Щось пішло не так, спробуйте ще раз";
    }
  }

  if (error instanceof Error) return error.message;

  return "Щось пішло не так, спробуйте ще раз";
};
