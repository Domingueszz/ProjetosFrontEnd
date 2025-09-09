'use client';

import React, { useState } from 'react';
import styles from './login.module.css';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Aqui você adicionaria a lógica de autenticação
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
    // Aqui você adicionaria a navegação para página de informações
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Aqui você adicionaria a navegação para recuperação de senha
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.content}>
          <div className={styles.welcomeText}>
            <span className={styles.greeting}>Olá,</span>
            <h1 className={styles.welcomeTitle}>Bem vindo a</h1>
          </div>
          
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.globe}>
                <div className={styles.globeInner}>
                  <div className={styles.continents}></div>
                </div>
              </div>
            </div>
            <div className={styles.logoText}>
              <span className={styles.brandName}>2RP</span>
              <span className={styles.brandSub}>net</span>
              <span className={styles.brandSubSmall}>Monitoring</span>
              <span className={styles.brandTagline}>Data-driven Company</span>
            </div>
          </div>

          <p className={styles.description}>
            2RP net Monitoring, onde o gerenciamento, 
            acompanhamento, organizado e possível!
          </p>

          <button className={styles.learnMoreBtn} onClick={handleLearnMore}>
            <span>Saber mais</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            Entre na sua<br />conta agora!
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Senha</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className={styles.options}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Lembrar-me</span>
              </label>
              
              <button
                type="button"
                className={styles.forgotPassword}
                onClick={handleForgotPassword}
              >
                Esqueci minha senha
              </button>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}