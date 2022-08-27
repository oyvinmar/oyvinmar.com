// "import '../styles/cv.css'";

import { ColorModeToggle } from 'app/components/ThemeToggle';
import { Fragment, ReactNode } from 'react';
import { CvProject, presentations, projects } from '../../data/CvData';
import profileImage from '../../img/profile.png';

let Heading = ({ children }: { children: ReactNode }) => (
  <>
    <h2 className="mb-0">{children}</h2>
    <hr className="w-12 bg-pink-600 mt-1 mb-4 h-2 border-transparent" />
  </>
);

let DescriptiveList = ({ children }: { children: ReactNode }) => (
  <dl className="grid grid-cols-dl gap-y-2 gap-x-8">{children}</dl>
);

let Project = ({
  name,
  timeSpan,
  description,
  role,
  technologies,
}: CvProject) => (
  <div className="py-5 space-y-4">
    <div className="flex items-center">
      <h3 className="mt-0 w-4/5 text-2xl"> {name} </h3>
      <b className="mr-4 block text-grey-600"> {timeSpan} </b>
    </div>
    <p>{description}</p>
    <p>
      <b>Rolle: </b>
      {role}
    </p>
    <p>
      <b>Teknologier:</b> {technologies}{' '}
    </p>
  </div>
);

const Cv = () => (
  <div id="cv" className=" leading-tight">
    <ColorModeToggle />
    <section className="md:flex print:block">
      <div className="px-6 lg:px-12 py-4 bg-teal-800 space-y-4 md:max-w-xs">
        <div className="flex items-center md:block">
          <figure className="md:my-4">
            <img
              className="w-16 mr-6 md:w-40 md:mx-auto rounded-full border-solid border-4 border-white dark:border-gray-900"
              alt="Picture of Øyvind Marthinsen"
              src={profileImage}
            />
          </figure>
          <h1 className="md:text-center text-3xl text-gray-300">
            Øyvind Marthinsen
          </h1>
        </div>
        <dl className="grid sidebar-info gap-y-2 gap-x-6 text-gray-300">
          <dt className="text-gray-100"> Telefon:</dt>
          <dd>970 61 833</dd>
          <dt className="text-gray-100"> Fødselsdato:</dt>
          <dd>06.10.1984</dd>
          <dt className="text-gray-100"> Bosted:</dt>
          <dd>Oslo</dd>
        </dl>
      </div>
      <article className="px-6 lg:px-12 py-8 lg:max-w-2xl space-y-6">
        <section>
          <Heading>Profil</Heading>
          <p>
            Jeg er en engasjert utvikler som brenner for utvikling av moderne
            web applikasjoner. Jeg har hatt ulike roller i flere større og
            mindre prosjekter, men trives best som techlead for et frontend
            team. Gjennom flere år som konsulent har jeg fått kunnskap om og
            erfaring med hele systemutviklingsprosessen, fra planlegging og
            design til testing og produksjonssetting. Jeg er flink til å se
            kundens behov og setter alltid brukeren i fokus under utvikling av
            løsninger. Jeg er også en pragmatisk person som liker å utfordre seg
            selv på å lage enkle løsninger for komplekse problemer.
          </p>
        </section>
        <section>
          <Heading>Teknologikart</Heading>
          <p className="mb-2">
            Nedenfor har jeg listet teknologier, verktøy og metoder jeg har
            erfaring med.
          </p>
          <dl>
            <dt>Programmeringsspråk</dt>
            <dd>
              JavaScript (ECMAScript 201X), TypeScript, Scala, Java, C, Groovy,
              Python, Ruby
            </dd>
            <dt className="mt-2">Webteknologi</dt>
            <dd>
              HTML5, CSS3, Responsive design, React, Emotion, Redux,
              Immutable.js, SASS, SVG, Express, Apollo Client/Server, lodash,
              Less, Highcharts
            </dd>
            <dt className="mt-2">Webverktøy</dt>
            <dd>
              Babel, Webpack, ESLint, npm, Prettier, yarn, Lerna, Razzle,
              PostCSS, Parcel, Jest, now, NextJS, Travis, Gulp.js, Cypress
            </dd>
            <dt className="mt-2">Databaser</dt>
            <dd>MySQL, PostgreSQL, Microsoft SQL Server</dd>
            <dt className="mt-2">Integrasjon</dt>
            <dd>GraphQL, REST, JSON, XML</dd>
            <dt className="mt-2">Metode</dt>
            <dd>Parprogrammering, Scrum, Testdrevet utvikling (TDD), XP</dd>
            <dt className="mt-2">Utviklingsverktøy (IDE)</dt>
            <dd>VS Code, vim</dd>
            <dt className="mt-2">Versjonshåndtering</dt>
            <dd>Git, Subversion</dd>
          </dl>
        </section>
        <section>
          <Heading>Prosjekterfaring</Heading>
          {projects.map((project, i) => (
            <Project key={i} {...project} />
          ))}
        </section>
        <section>
          <Heading>Karriereerfaring</Heading>
          <DescriptiveList>
            <dt>2009 - dd</dt>
            <dd>Knowit, Konsulent</dd>
            <dt>2007 - 2008</dt>
            <dd>Computas AS, Deltidsjobb</dd>
          </DescriptiveList>
        </section>
        <section>
          <Heading>Utdannelse</Heading>
          <DescriptiveList>
            <dt>2004 - 2009</dt>
            <dd>
              Universitet i Oslo, Master i informatikk
              <p>
                Masteroppgave: Brukerkontroll i kontekstsensitive mobile
                nettjenster
              </p>
            </dd>
          </DescriptiveList>
        </section>
        <section>
          <Heading>Foredrag/Workshops</Heading>
          <DescriptiveList>
            {presentations.map(({ title, year, link, where }, i) => (
              <Fragment key={i}>
                <dt>{year}</dt>
                <dl>
                  {where} -{' '}
                  {link ? (
                    <a className="text-link" href={link}>
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </dl>
              </Fragment>
            ))}
          </DescriptiveList>
        </section>
        <section>
          <Heading>Språkkunnskaper</Heading>
          <DescriptiveList>
            <dt>Norsk</dt>
            <dd>Morsmål</dd>
            <dt>Engelsk</dt>
            <dd>Flytende</dd>
          </DescriptiveList>
        </section>
      </article>
    </section>
  </div>
);

export default Cv;
