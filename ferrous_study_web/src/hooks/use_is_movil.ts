import { useState, useEffect } from 'react';

export default function useIsMovil() {
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const verificarMovil = () => {
      setEsMovil(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    // Verificar al montar el componente
    verificarMovil();

    // También podrías querer verificar en cambios de tamaño de la ventana
    const handleResize = () => {
      verificarMovil();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return esMovil;
}