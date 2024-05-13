export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 md:px-6">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          React + NextJS, Tailwind CSS e TypeScript - Demonstração
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Este é um aplicativo de demonstração criado como parte da disciplina
          de Engenharia de Software, ministrada pelo Professor Otacílio.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left">
          <h2 className="text-2xl font-bold mb-4">
            Sobre Engenharia de Software
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Engenharia de Software é uma disciplina que se concentra nos
            princípios, métodos e ferramentas utilizados no desenvolvimento de
            sistemas de software. Ela abrange tópicos como arquitetura de
            software, padrões de design, engenharia de requisitos, gerenciamento
            de projetos e testes.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Este aplicativo de demonstração mostra o uso de tecnologias modernas
            de desenvolvimento web, incluindo NextJS, Tailwind CSS e TypeScript,
            que são comumente usadas no campo da engenharia de software.
          </p>
        </div>
      </div>
    </main>
  );
}
