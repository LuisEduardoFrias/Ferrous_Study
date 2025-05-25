/*
import { ReactNode } from 'react';
import { TUser } from '../types/user';
import { saveValue, getValue } from './local_storage';

const USER_STORAGE_KEY = 'user';

export function setUser(newUser: TUser | null) {
  saveValue<TUser>(USER_STORAGE_KEY, newUser);
}

export function getUser() {
  return getValue<TUser>(USER_STORAGE_KEY);
}

export function SignedIn({ children }: { children: ReactNode }) {
  const user = getUser();
  if (!user)
    return null;

  return <>{children}</>;
};

export function SignedOut({ children }: { children: ReactNode }) {
  const user = getUser();
  if (user)
    return null;

  return <>{children}</>;
};
*/

import { ReactNode, useState, useEffect } from 'react'; // Importamos useState y useEffect
import { TUser } from '../types/user';
import { saveValue, getValue } from '../hooks/local_storage';

const USER_STORAGE_KEY = 'user';

// --- SISTEMA DE SUSCRIPTOR BÁSICO ---
// Creamos un "observable" simple para nuestro usuario
let currentUser: TUser | null = getValue<TUser>(USER_STORAGE_KEY); // Estado inicial desde localStorage
const subscribers: Set<() => void> = new Set(); // Un Set para almacenar funciones de "callback"

// Función para notificar a todos los suscriptores
function notifySubscribers() {
  subscribers.forEach(callback => callback());
}

// Función para actualizar el usuario y notificar
export function setUser(newUser: TUser | null) {
  currentUser = newUser; // Actualizamos nuestro estado interno
  saveValue<TUser>(USER_STORAGE_KEY, newUser); // Guardamos en localStorage
  notifySubscribers(); // Notificamos a todos los componentes suscritos
}

// Función para obtener el usuario (ahora desde nuestro estado interno observable)
export function getUser() {
  return currentUser;
}

// Escuchamos los cambios de localStorage desde otras pestañas/ventanas
// Esto es importante para que si el login/logout ocurre en otra pestaña,
// esta pestaña también se actualice.

const handleStorageChange = (event: StorageEvent) => {
  if (event.key === USER_STORAGE_KEY) {
    currentUser = getValue<TUser>(USER_STORAGE_KEY); // Actualizamos nuestro estado interno
    notifySubscribers(); // Notificamos a los componentes
  }
};

window.addEventListener('storage', handleStorageChange);



// --- COMPONENTES MODIFICADOS ---

// Hook personalizado para que los componentes se suscriban a los cambios del usuario
function useUserSubscription() {
  // Usamos useState para forzar un re-render cuando el usuario cambie
  const [user, setUserState] = useState<TUser | null>(getUser());

  useEffect(() => {
    // Función para actualizar el estado del componente y re-renderizar
    const updateComponentUser = () => {
      setUserState(getUser());
    };

    // Suscribimos el componente a los cambios del usuario
    subscribers.add(updateComponentUser);

    // Función de limpieza al desmontar el componente
    return () => {
      subscribers.delete(updateComponentUser); // Dejamos de suscribirnos
    };
  }, []); // El array vacío asegura que esto se ejecuta solo una vez al montar

  return user;
}

export function SignedIn({ children }: { children: ReactNode }) {
  const user = useUserSubscription(); // Usamos nuestro hook de suscripción
  if (!user) return null;
  return <>{children}</>;
};

export function SignedOut({ children }: { children: ReactNode }) {
  const user = useUserSubscription(); // Usamos nuestro hook de suscripción
  if (user) return null;
  return <>{children}</>;
};
