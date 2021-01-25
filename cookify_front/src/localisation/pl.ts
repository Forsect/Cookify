const pl = {
  loading: "Trwa ładowanie",
  registration: {
    registrationText: "Rejestracja",
    regulationsOfService: "Akcpetuję regulamin serwisu cookify.pl",
    buttons: {
      register: "Zarejestruj się",
      login: "Logowanie",
    },
    inputs: {
      email: "Email",
      password: "Hasło",
      repeatPassword: "Powtórz hasło",
    },
    errors: {
      emailRequired: "Adres email jest wymagany!",
      wrongEmail: "Błędny adres email!",
      passwordRequired: "Hasło jest wymagane!",
      passwordsAreNotTheSame: "Hasła się nie zgadzają!",
      regulationsOfServiceAccepted: "Musisz zaakceptować regulamin serwisu!",
      validator: {
        passwordLength: "Hasło powinno zawierać minimum 8 znaków!",
        passwordBigChar: "Hasło powinno zawierać 1 dużą literę!",
        passwordSmallChar: "Hasło powinno zawierać 1 małą literę!",
        passwordSpecialChar: "Hasło powinno zawierać 1 znak specjalny lub cyfrę!",
      },
      emailIsAlreadyTaken: "Podany adres email jest już używany!",
      unknownError: "Wystąpił nieznany błąd, spróbuj ponownie później.",
    },
  },
  login: {
    loginText: "Logowanie",
    inputs: {
      email: "Email",
      password: "Hasło",
    },
    forgotPasswordText: "Zapomiałeś hasła?",
    buttons: {
      login: "Zaloguj się",
      register: "Rejestracja",
    },
    errors: {
      emailRequired: "Adres email jest wymagany!",
      passwordRequired: "Hasło jest wymagane!",
      wrongEmail: "Nieprawidłowy adres email!",
      invalidLoginOrPassword: "Nieprawidłowy adres email lub hasło!",
      unknownError: "Wystąpił nieznany błąd, spróbuj ponownie później.",
      inactiveAccount: "Twoje konto jest nieaktywne. Skontaktuj się z administratorem w celu jego odblokowania.",
    },
  },
  unknownPage: {
    main: "Strona, na którą próbujesz się dostać nie istnieje!",
    button: "Wróć na stronę główną",
  },
  meals: {
    searchButton: "Wyszukaj posiłek",
    newMealButton: "Nowy posiłek",
    mealDetails: {
      name: "Nazwa: ",
      ingredients: "Składniki: ",
      recipe: "Przepis: ",
      additionalInfo: "Dodatkowe uwagi: ",
      close: "Zamknij",
      save: "Zapisz",
    },
  },
};

export default pl;
