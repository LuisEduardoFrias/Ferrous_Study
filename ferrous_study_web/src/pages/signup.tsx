import { useState, useRef, ReactNode } from 'react'
import Loading from '../components/loading'
import { useTitle } from '../hooks/use_title'
import Paragraph from '../components/paragraph'
import { ArrowRightIcon } from '../assets/svgs'
import { SignIn, SignUp } from '@clerk/tanstack-react-start'

const appearance = {
  elements: {
    footer: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton: 'bg-theme-3-l hover:bg-theme-4 hover:text-theme-0',
    formButtonPrimary: 'bg-theme-d-4 hover:bg-theme-3 text-sm',
  },
}

export default function AuthForm() {
  useTitle('Acceder y registrarse')
  const [isLogin, setIsLogin] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  function handleToggleAuth() {
    if (formRef.current) {
      formRef.current.style.transform = `rotateY(${isLogin ? 180 : 0}deg)`;
    }
    setIsLogin(!isLogin);
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md h-auto" style={{ perspective: '3500px' }}>
        <div
          ref={formRef}
          className="relative transition-transform duration-300 transform-style-3d h-full"
          style={{ transformOrigin: 'center center' }}
        >
          <div className={`absolute w-full h-full ${isLogin ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <LoginForm onToggleAuth={handleToggleAuth} />
          </div>

          <div className={`absolute w-full h-full ${!isLogin ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ transform: 'rotateY(180deg)' }}>
            <SignupForm onToggleAuth={handleToggleAuth} />
          </div>
        </div>
      </div>
    </div>
  );
}

type LoginFormProps = {
  onToggleAuth: () => void;
};

function LoginForm(props: LoginFormProps) {
  return (
    <div className="absolute w-full h-full bg-white rounded-lg shadow-md p-6 backface-hidden">

      <SignIn
        // @ts-ignore
        fallback={
          <div className="w-full h-32">
            <Loading fill="black" />
          </div>
        }
        oauthFlow="popup"
        routing="hash"
        signUpFallbackRedirectUrl="/"
        appearance={appearance}
      />
      <Footer>
        <p className="mt-4 text-sm text-gray-600 text-center">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={props.onToggleAuth}
            className="font-semibold text-theme-3 hover:text-theme-4 focus:outline-none"
          >
            Regístrate
          </button>
        </p>
      </Footer>
    </div>
  );
}

type SignupFormProps = {
  onToggleAuth: () => void;
};

function SignupForm(props: SignupFormProps) {
  return (
    <div
      className="absolute w-full h-full bg-white rounded-lg shadow-md p-6 backface-hidden"
      style={{ transform: 'rotateY(180deg)' }}
    >
      <div style={{ transform: 'rotateY(180deg)' }}>
        <SignUp
          // @ts-ignore
fallback={
            <div className="w-full h-32">
              <Loading fill="black" />
            </div>
          }
          oauthFlow="popup"
          routing="hash"
          signUpFallbackRedirectUrl="/signinup"
          withSignUp={true}
          appearance={appearance}
        />
        <Footer>
          <p className="mt-4 text-sm text-gray-600 text-center">
            ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={props.onToggleAuth}
              className="font-semibold text-theme-3 hover:text-theme-4 focus:outline-none"
            >
              Inicia Sesión
            </button>
          </p>
        </Footer>
      </div>
    </div>
  );
}

function Footer({ children }: { children: ReactNode }) {
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div>
      {children}

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={toggleExplanation}
          className="font-semibold text-theme-3 hover:text-theme-4 focus:outline-none"
        >
          {showExplanation ?
            <ArrowRightIcon fill="back" className="transform -rotate-90 " /> : '¿Por qué tener una cuenta de FerrousStudy?'}
        </button>
        <div className={`text-sm text-left text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${showExplanation ? 'max-h-50 opacity-100' : 'max-h-0 opacity-0'}`}>
          <Paragraph>
            Al crear una cuenta en FerrousStudy, te unes a una comunidad apasionada por Rust.
          </Paragraph>
          <Paragraph>
            Podrás contribuir directamente a la creación de nuevas clases y ejercicios, enriquecer las explicaciones existentes y colaborar en la traducción de contenido para que el aprendizaje de Rust sea accesible para todos.
          </Paragraph>
          <Paragraph>
            ¡Tu aporte es fundamental para hacer crecer esta plataforma!
          </Paragraph>
        </div>
      </div>
    </div>
  );
}