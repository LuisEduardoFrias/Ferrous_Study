import { useState, useRef } from 'react';
import Loading from '../components/loading';
import { SignIn } from '@clerk/tanstack-react-start'
import { SignUp } from '@clerk/tanstack-react-start'

type AuthFormProps = {
  signinup: string
};

const appearance = {
  elements: {
    footer: 'hidden',
    socialButtonsBlockButton: 'bg-theme-3-l',
    formButtonPrimary: 'bg-theme-d-4 hover:bg-theme-3 text-sm',
  },
}

export default function AuthForm({ signinup }: AuthFormProps) {
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
        fallback={
          <div className="w-full h-32">
            <Loading fill="black" />
          </div>
        }
        oauthFlow="popup"
        routing="hash"
        signUpFallbackRedirectUrl="/"
        signUpUrl="/signinup/:up"
        //  withSignUp={true}
        appearance={appearance}
      />
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
          fallback={
            <div className="w-full h-32">
              <Loading fill="black" />
            </div>
          }
          oauthFlow="popup"
          routing="hash"
          signUpFallbackRedirectUrl="/signinup/:in"
          signUpUrl="/signinup/:in"
          withSignUp={true}
          appearance={appearance}
        />
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
      </div>
    </div>
  );
}