import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const yourCreativeCommonsLicenseName = 'Licencia Creative Commons NoComercial CompartirIgual 4.0';
  const yourCreativeCommonsLicenseLink = 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
  const apache2LicenseLink = 'https://www.apache.org/licenses/LICENSE-2.0';
  const apache2LicenseName = 'Licencia Apache-2.0';
  const yourCopyright = `© ${new Date().getFullYear()} Luis Eduardo Frías. Todos los derechos reservados.`;
  const yourLinkedInProfile = 'https://do.linkedin.com/in/luis-eduardo-frias-64204b1a3';
  const yourGitHubProfile = 'https://github.com/LuisEduardoFrias';

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Contenido Basado en Comprehensive Rust de Google
      </h2>
      <p className="text-gray-700 mb-4">
        El contenido de este curso, incluyendo las lecciones y los ejercicios adaptados, se basa en el excelente proyecto de código abierto{' '}
        <a
          href="https://github.com/google/comprehensive-rust"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Comprehensive Rust
        </a>{' '}
        de Google, distribuido bajo la{' '}
        <a
          href={apache2LicenseLink}
          target="_blank"
          rel="noopener noreferrer"
          
        >
          {apache2LicenseName}
        </a>
        . Agradesco enormemente su dedicación a la creación de este recurso educativo de alta calidad. Puedes visitar la página web original{' '}
        <a
          href="https://google.github.io/comprehensive-rust/es/print.html"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          aquí
        </a>
        .
      </p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Licencia del Contenido Base Adaptado</h3>
        <p className="text-gray-700">
          El contenido base de este curso (las lecciones y ejercicios adaptados de Comprehensive Rust) se utiliza bajo los términos de la{' '}
          <a
            href={apache2LicenseLink}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            {apache2LicenseName}
          </a>
          .
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Modificaciones y Adiciones</h3>
        <p className="text-gray-700 mb-4">
          Se han realizado algunas modificaciones en el contenido original para mejorar la interpretación, la claridad y la adaptación a este formato de curso. Estas modificaciones incluyen ajustes en la redacción, adiciones de explicaciones y ligeras alteraciones en algunos ejemplos de código.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sobre el Autor</h2>
        <p className="text-gray-700 mb-2">
          Este curso fue creado por{' '}
          <a
            href={yourLinkedInProfile}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            Luis Eduardo Frías
          </a>
          .
        </p>
        <p className="text-gray-700">
          Puedes encontrar más sobre mi trabajo y proyectos en{' '}
          <a
            href={yourGitHubProfile}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            mi perfil de GitHub
          </a>
          .
        </p>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Créditos y Herramientas</h2>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Iconos SVG</h3>
        <p className="text-gray-700 mb-2">
          Los iconos SVG utilizados en este sitio web provienen de{' '}
          <a
            href="https://www.svgrepo.com/"
            target="_blank"
            rel="noopener noreferrer"
            
          >
            SVG Repo
          </a>
          , un excelente recurso de iconos vectoriales gratuitos.
        </p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Herramientas de Desarrollo</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a
              href="https://f-droid.org/es/packages/com.termux/"
              target="_blank"
              rel="noopener noreferrer"
              
            >
              Termux
            </a>{' '}
            (Terminal Emulator para Android)
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=com.foxdebug.acode"
              target="_blank"
              rel="noopener noreferrer"
              
            >
              Acode
            </a>{' '}
            (Editor de código para Android)
          </li>
        </ul>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Licencia para el Contenido Original</h2>
        <p className="text-gray-700">
          El diseño de esta página web, la estructura del curso y cualquier adición o modificación sustancial realizada por el autor (Luis Eduardo Frías) se distribuyen bajo la{' '}
          <a
            href={yourCreativeCommonsLicenseLink}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            {yourCreativeCommonsLicenseName}
          </a>
          .
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Esto significa que puedes compartir, copiar y redistribuir el material no comercialmente, siempre que des el crédito apropiado y distribuyas tus contribuciones bajo la misma licencia.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-gray-700">{yourCopyright}</p>
      </div>
    </div>
  );
}
