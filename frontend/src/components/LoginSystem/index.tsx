import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./LoginSystem.module.css"

const LoginSystem = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    // Impede o comportamento padrão do formulário de recarregar a página
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      await login(email, password);
      // Se chegou aqui deu certo, o AuthContext já cuida de trocar a tela
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.background_container}>
      <h1 className={styles.title}>Seja bem vindo</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <p className={styles.form__text}>Digite as credenciais abaixo para realizar o login:</p>
        <label htmlFor="user_email" className={styles.form__label}>Email:</label>
        <br />
        <input
          type="email"
          id="user_email"
          placeholder="Digite aqui o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.form__input}
        />
        <br />
        <label htmlFor="user_password" className={styles.form__label}>Senha:</label>
        <br />
        <input
          type="password"
          id="user_password"
          placeholder="Digite aqui a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.form__input}
        />
        <br />
        {erro && <p className={styles.form__error_text}>{erro}</p>}
        <button type="submit" disabled={carregando} className={styles.form__submit_button}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginSystem;