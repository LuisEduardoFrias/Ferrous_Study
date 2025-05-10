import React from 'react';
import { createFileRoute } from '@tanstack/react-router'
import Paragraph from '../components/paragraph'

export const Route = createFileRoute('/about')({
  component: About,
});

interface Tool {
  name: string;
  url: string;
  description: string;
}

const tools: Tool[] = [
  {
    name: 'Termux',
    url: 'https://f-droid.org/es/packages/com.termux/',
    description:
      'Emulador de terminal para Android que te permite ejecutar una interfaz de línea de comandos Linux directamente en tu dispositivo, brindando acceso a potentes herramientas y comandos.',
  },
  {
    name: 'Acode',
    url: 'https://acode.foxdebug.com/',
    description:
      'Editor de código potente y ligero para Android. Ofrece resaltado de sintaxis para múltiples lenguajes, autocompletado, búsqueda y reemplazo, y la capacidad de editar archivos locales y remotos.',
  },
  {
    name: 'React',
    url: 'https://react.dev/',
    description:
      'Biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas. Se enfoca en la creación de componentes reutilizables y en la gestión eficiente del estado de la aplicación.',
  },
  {
    name: 'Vite',
    url: 'https://vitejs.dev/',
    description:
      'Herramienta de construcción de última generación para proyectos web modernos. Destaca por su velocidad de inicio instantánea y su recarga de módulos instantánea durante el desarrollo.',
  },
  {
    name: 'Express.js',
    url: 'https://expressjs.com/',
    description:
      'Framework web minimalista y flexible para Node.js, diseñado para construir aplicaciones web y APIs robustas con un conjunto amplio de características para el enrutamiento, middleware y manejo de solicitudes HTTP.',
  },
];


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
      <Paragraph className="text-gray-700 mb-4">
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
      </Paragraph>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Licencia del Contenido Base Adaptado</h3>
        <Paragraph className="text-gray-700">
          El contenido base de este curso (las lecciones y ejercicios adaptados de Comprehensive Rust) se utiliza bajo los términos de la{' '}
          <a
            href={apache2LicenseLink}
            target="_blank"
            rel="noopener noreferrer"

          >
            {apache2LicenseName}
          </a>
          .
        </Paragraph>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Modificaciones y Adiciones</h3>
        <Paragraph className="text-gray-700 mb-4">
          Se han realizado algunas modificaciones en el contenido original para mejorar la interpretación, la claridad y la adaptación a este formato de curso. Estas modificaciones incluyen ajustes en la redacción, adiciones de explicaciones y ligeras alteraciones en algunos ejemplos de código.
        </Paragraph>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sobre el Autor</h2>
        <Paragraph className="text-gray-700 mb-2">
          Este curso fue creado por{' '}
          <a
            href={yourLinkedInProfile}
            target="_blank"
            rel="noopener noreferrer"

          >
            Luis Eduardo Frías
          </a>
          .
        </Paragraph>
        <Paragraph className="text-gray-700">
          Puedes encontrar más sobre mi trabajo y proyectos en{' '}
          <a
            href={yourGitHubProfile}
            target="_blank"
            rel="noopener noreferrer"

          >
            mi perfil de GitHub
          </a>
          .
        </Paragraph>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Créditos y Herramientas</h2>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Iconos SVG he imagenes</h3>

        <div className="list-disc list-inside text-gray-700">

          <Paragraph className="text-gray-700 mb-2">
            Los iconos SVG utilizados en este sitio web provienen de{' '}
            <a
              href="https://www.svgrepo.com/"
              target="_blank"
              rel="noopener noreferrer"

            >
              SVG Repo
            </a>
            , un excelente recurso de iconos vectoriales gratuitos.
          </Paragraph>

          <Paragraph className="text-gray-700 mb-2">
            El iconos SVG de Ferris en este sitio web provienen de{' '}
            <a
              href="https://rustacean.net/"
              target="_blank"
              rel="noopener noreferrer"

            >
              Rustacean
            </a>
            , un excelente recurso de vectores, images, gifs, y otros, sobre Ferris, gratuitos.
          </Paragraph>

          <Paragraph className="text-gray-700 mb-2">
            El gif de Ferris en este sitio web provienen de{' '}
            <a
              href="https://www.rust-lang.org/es/learn/get-started"
              target="_blank"
              rel="noopener noreferrer"

            >
              Rust lang - pagina oficial de Rust
            </a>
            , donde encontraras toda la información de Rust de forma oficial.
          </Paragraph>

        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Herramientas y Tecnologías de Desarrollo</h3>
        <ul className="list-disc list-inside text-gray-700">
          <ToolList />
        </ul>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Licencia para el Contenido Original</h2>
        <Paragraph className="text-gray-700">
          El diseño de esta página web, la estructura del curso y cualquier adición o modificación sustancial realizada por el autor (Luis Eduardo Frías) se distribuyen bajo la{' '}
          <a
            href={yourCreativeCommonsLicenseLink}
            target="_blank"
            rel="noopener noreferrer"

          >
            {yourCreativeCommonsLicenseName}
          </a>
          .
        </Paragraph>
        <Paragraph className="text-sm text-gray-500 mt-2">
          Esto significa que puedes compartir, copiar y redistribuir el material no comercialmente, siempre que des el crédito apropiado y distribuyas tus contribuciones bajo la misma licencia.
        </Paragraph>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <Paragraph className="text-gray-700">{yourCopyright}</Paragraph>
      </div>
    </div>
  );
}


interface ToolItemProps {
  tool: Tool;
}

function ToolItem({ tool }: ToolItemProps) {
  return (
    <li>
      <a href={tool.url} target="_blank" rel="noopener noreferrer">
        {tool.name}
      </a>{' '}
      <Paragraph>{tool.description}</Paragraph>
    </li>
  );
};

function ToolList() {
  return (
    <ul className="list-disc list-inside text-gray-700">
      {tools.map((tool) => (
        <ToolItem key={tool.name} tool={tool} />
      ))}
    </ul>
  );
};
