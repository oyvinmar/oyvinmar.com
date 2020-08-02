open Utils;

[%bs.raw {|require('../styles/cv.css')|}];

let component = ReasonReact.statelessComponent("CvPage");

[@bs.module] external profileImage: string = "../img/profile.png";

let css = ReactDOMRe.Style.make;

module Heading = {
  [@react.component]
  let make = (~title: string) =>
    <>
      <h2 className="mb-0"> {str(title)} </h2>
      <hr className="w-16 bg-pink-600 mt-1 mb-4 h-2" />
    </>;
};

[@react.component]
let make = () => {
  <div id="cv" className="bg-white text-gray-700 antialiased leading-tight">
    <section className="md:flex">
      <div className="px-6 lg:px-12 py-4 bg-sidebar space-y-4 md:max-w-xs">
        <div className="flex items-center md:block">
          <figure className="md:my-4">
            <img
              className="w-16 mr-6 md:w-40 md:mx-auto rounded-full border-solid border-4 border-white"
              alt="Picture of Øyvind Marthinsen"
              src=profileImage
            />
          </figure>
          <h1 className="md:text-center text-3xl">
            {str({js|Øyvind Marthinsen|js})}
          </h1>
        </div>
        <dl className="grid sidebar-info row-gap-2 col-gap-6">
          <dt> {str("Telefon:")} </dt>
          <dd> {str("970 61 833")} </dd>
          <dt> {str({js|Fødselsdato:|js})} </dt>
          <dd> {str("06.10.1984")} </dd>
          <dt> {str("Bosted:")} </dt>
          <dd> {str("Oslo")} </dd>
        </dl>
      </div>
      <article className="px-6 lg:px-12 py-2 lg:max-w-2xl space-y-6">
        <section>
          <Heading title={js|Profil|js} />
          <p>
            {str(
               {js|Jeg er en engasjert utvikler som brenner for utvikling av moderne web applikasjoner. Jeg har hatt ulike roller i flere større og mindre prosjekter, men trives best som techlead for et frontend team. Gjennom flere år som konsulent har jeg fått kunnskap om og erfaring med hele systemutviklingsprosessen, fra planlegging og design til testing og produksjonssetting. Jeg er flink til å se kundens behov og setter alltid brukeren i fokus under utvikling av løsninger. Jeg er også en pragmatisk person som liker å utfordre seg selv på å lage enkle løsninger for komplekse problemer.|js},
             )}
          </p>
        </section>
        <section>
          <Heading title="Teknologikart" />
          <p className="mb-2">
            {str(
               {js|Nedenfor har jeg listet teknologier, verktøy og metoder jeg har erfaring med.|js},
             )}
          </p>
          <dl>
            <dt> {str({js|Programmeringsspråk|js})} </dt>
            <dd>
              {str(
                 "JavaScript (ECMAScript 201X), TypeScript, Scala, Java, C, Groovy, Python, Ruby",
               )}
            </dd>
            <dt className="mt-1"> {str("Webteknologi")} </dt>
            <dd>
              {str(
                 "HTML5, CSS3, Responsive design, React, Emotion, Redux, Immutable.js, SASS, SVG, Express, Apollo Client/Server, lodash, Less, Highcharts ",
               )}
            </dd>
            <dt className="mt-1"> {str({js|Webverktøy|js})} </dt>
            <dd>
              {str(
                 "Babel, Webpack, ESLint, npm, Prettier, yarn, Lerna, Razzle, PostCSS, Parcel, Jest, now, NextJS, Travis, Gulp.js, Cypress",
               )}
            </dd>
            <dt className="mt-1"> {str("Databaser")} </dt>
            <dd> {str("MySQL, PostgreSQL, Microsoft SQL Server")} </dd>
            <dt className="mt-1"> {str("Integrasjon")} </dt>
            <dd> {str("GraphQL, REST, JSON, XML")} </dd>
            <dt className="mt-1"> {str("Metode")} </dt>
            <dd>
              {str("Parprogrammering, Scrum, Testdrevet utvikling (TDD), XP")}
            </dd>
            <dt className="mt-1">
              {str({js|Utviklingsverktøy (IDE)|js})}
            </dt>
            <dd> {str("VS Code, vim")} </dd>
            <dt className="mt-1"> {str({js|Versjonshåndtering|js})} </dt>
            <dd> {str("Git, Subversion")} </dd>
          </dl>
        </section>
        <section>
          <Heading title="Prosjekterfaring" />
          {ProjectData.projects
           |> Array.map((project: ProjectData.cvProject) =>
                <Project
                  name={project.name}
                  timeSpan={project.timeSpan}
                  description={project.description}
                  role={project.role}
                  technologies={project.technologies}
                />
              )
           |> ReasonReact.array}
        </section>
        <section>
          <Heading title="Karriereerfaring" />
          <DescriptiveList>
            <dt> {str("2009 - dd")} </dt>
            <dd> {str("Knowit, Konsulent")} </dd>
            <dt> {str("2007 - 2008")} </dt>
            <dd> {str("Computas AS, Deltidsjobb")} </dd>
          </DescriptiveList>
        </section>
        <section>
          <Heading title="Utdannelse" />
          <DescriptiveList>
            <dt> {str("2004 - 2009")} </dt>
            <dd>
              {str("Universitet i Oslo, Master i informatikk")}
              <p>
                {str(
                   "Masteroppgave: Brukerkontroll i kontekstsensitive mobile
              nettjenster",
                 )}
              </p>
            </dd>
          </DescriptiveList>
        </section>
        <section>
          <Heading title="Foredrag/Workshops" />
          <DescriptiveList>
            <dt> {str("2013")} </dt>
            <dd>
              {str("NTNU Kurs - ")}
              {str("Testdrevet utvikling med JavaScript")}
            </dd>
            <dt> {str("2014")} </dt>
            <dd>
              {str("Knowit Developer Summit - ")}
              <a href="http://oyvinmar.github.io/gulpjs-presentation/">
                {str("Gulp.js")}
              </a>
            </dd>
            <dt> {str("2014")} </dt>
            <dd>
              {str("NTNU Kurs - ")}
              <a href="https://github.com/knowit/programming-ladder">
                {str("Programming ladder")}
              </a>
            </dd>
            <dt> {str("2016")} </dt>
            <dd>
              {str("Knowit Web Summit - ")}
              <a
                href="https://oyvinmar.github.io/universal-javascript-presentation/">
                {str("Universal JavaScript")}
              </a>
            </dd>
            <dt> {str("2016")} </dt>
            <dd>
              {str("UIO Kurs - ")}
              <a href="https://github.com/knowit/programming-ladder">
                {str("Programming ladder")}
              </a>
            </dd>
            <dt> {str("2017")} </dt>
            <dd>
              {str("Knowit Fagseminar Palma - ")}
              <a
                href="https://oyvinmar.github.io/what-backend-can-learn-from-frontend-presentation/#">
                {str("What backend can learn from frontend")}
              </a>
            </dd>
            <dt> {str("2018")} </dt>
            <dd>
              {str("Knowit Developer Summit - ")}
              <a
                href="https://oyvinmar.github.io/error-reporting-in-js-presentation/">
                {str("Error reporting in JavaScript")}
              </a>
            </dd>
            <dt> {str("2019")} </dt>
            <dd>
              {str("NTNU Kurs - ")}
              <a href="https://github.com/knowit/react-workshop">
                {str("React workshop")}
              </a>
            </dd>
            <dt> {str("2019")} </dt>
            <dd>
              {str("Knowit Fagseminar Praha - ")}
              <a href="https://dev-env-in-the-cloud.now.sh">
                {str("Development Environment in the Cloud")}
              </a>
            </dd>
          </DescriptiveList>
        </section>
        <section>
          <Heading title={js|Språkkunnskaper|js} />
          <DescriptiveList>
            <dt> {str("Norsk")} </dt>
            <dd> {str({js|Morsmål|js})} </dd>
            <dt> {str("Engelsk")} </dt>
            <dd> {str("Flytende")} </dd>
          </DescriptiveList>
        </section>
      </article>
    </section>
  </div>;
};
