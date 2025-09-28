import React, { useState } from 'react';
import Link from '../components/Link';
import { MailIcon, LockClosedIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://pagina-web-fw5b.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        // Redirecionar para a página de gestão do blog
        window.location.href = '/blog-management';
      } else {
        const errorData = await response.json();
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-0 bg-off-white rounded-xl shadow-2xl overflow-hidden">
          {/* Form Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
              <Link href="/" className="inline-block text-3xl font-bold tracking-wider text-navy">
                EasyData<span className="text-cyan-vibrant">360</span>
              </Link>
              <h1 className="mt-4 text-2xl font-bold text-navy">Bem-vindo ao Portal do Cliente</h1>
              <p className="text-gray-600 mt-2">Acesse seu sistema para continuar.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-cyan-vibrant focus:border-cyan-vibrant transition"
                    placeholder="seu.email@empresa.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">Senha</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-cyan-vibrant focus:border-cyan-vibrant transition"
                    placeholder="Sua senha"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-sm text-center">
              <Link href="#" className="font-medium text-cyan-vibrant hover:text-navy">
                Esqueci minha senha
              </Link>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Ainda não tem acesso?{' '}
              <Link href="/demo" className="font-medium text-cyan-vibrant hover:text-navy">
                Solicite uma conta
              </Link>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="hidden md:block relative">
            <img 
              src="https://picsum.photos/seed/dashboardlogin/800/1000" 
              alt="Dashboard de sistemas EasyData360"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy opacity-40"></div>
             <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-2xl font-bold">Inteligência e Controle</h2>
                  <p className="mt-2 text-gray-200">Acesse dashboards, relatórios e todas as ferramentas para otimizar sua gestão.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
