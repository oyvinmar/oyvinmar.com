open Utils;

[%bs.raw {|require('./styles/cv.scss')|}];

let component = ReasonReact.statelessComponent("CvPage");

[@bs.module]
external oyvindM150: string = "./app/img/Oyvind-Marthinsen_150.jpg";

[@bs.module]
external oyvindM300: string = "./app/img/Oyvind-Marthinsen_300.jpg";

[@bs.module] external profileImage: string = "./app/img/profile.png";

let getSrcSets = () => {
  let list = [oyvindM300 ++ " 300w", oyvindM150 ++ " 150w"];
  String.concat(",", list);
};

let css = ReactDOMRe.Style.make;

[@react.component]
let make = () => {
  <div id="cv">
    <div className="container">
      <section className="flex">
        <figure>
          <img alt="Picture of Øyvind Marthinsen" src=profileImage />
        </figure>
        <article>
          <h1> {str({js|Øyvind Marthinsen|js})} </h1>
          <dl
            className="dl-horizontal"
            style={css(~margin="20px 0 30px 0", ())}>
            <dt> {str("Telefon:")} </dt>
            <dd> {str("970 61 833")} </dd>
            <dt> {str({js|Fødselsdato:|js})} </dt>
            <dd> {str("06.10.1984")} </dd>
            <dt> {str("Bosted:")} </dt>
            <dd> {str("Oslo")} </dd>
          </dl>
          <p>
            {str(
               {js|Jeg er en engasjert utvikler som brenner for utvikling av moderne web applikasjoner. Jeg har hatt ulike roller i flere større og mindre prosjekter, men trives best som techlead for et frontend team. Gjennom flere år som konsulent har jeg fått kunnskap om og erfaring med hele systemutviklingsprosessen, fra planlegging og design til testing og produksjonssetting. Jeg er flink til å se kundens behov og setter alltid brukeren i fokus under utvikling av løsninger. Jeg er også en pragmatisk person som liker å utfordre seg selv på å lage enkle løsninger for komplekse problemer.|js},
             )}
          </p>
        </article>
      </section>
      <section className="row">
        <section className="col-md-12">
          <header> <h2> {str("Teknologikart")} </h2> </header>
          <p>
            {str(
               {js|Nedenfor har jeg listet teknologier, verktøy og metoder jeg har erfaring med.|js},
             )}
          </p>
          <dl className="dl-vertical">
            <dt> {str({js|Programmeringsspråk|js})} </dt>
            <dd>
              {str(
                 "JavaScript (ECMAScript 201X), TypeScript, Scala, Java, C, Groovy, Python, Ruby",
               )}
            </dd>
            <dt> {str("Webteknologi")} </dt>
            <dd>
              {str(
                 "HTML5, CSS3, Responsive design, React, Emotion, Redux, Immutable.js, SASS, SVG, Express, Apollo Client/Server ",
               )}
            </dd>
            // <dd> {str("Angular.js, lodash, LESS, Highcharts")} </dd>
            <dt> {str({js|Webverktøy|js})} </dt>
            <dd>
              {str(
                 "Babel, Webpack, ESLint, npm, Prettier, yarn, Lerna, Razzle, PostCSS, Parcel, Jest, now, NextJS, Travis, Gulp.js, Cypress",
               )}
            </dd>
            <dt> {str("Databaser")} </dt>
            <dd> {str("MySQL, PostgreSQL, Microsoft SQL Server")} </dd>
            <dt> {str("Integrasjon")} </dt>
            <dd> {str("GraphQL, REST, JSON, XML")} </dd>
            <dt> {str("Metode")} </dt>
            <dd>
              {str("Parprogrammering, Scrum, Testdrevet utvikling (TDD), XP")}
            </dd>
            <dt> {str({js|Utviklingsverktøy (IDE)|js})} </dt>
            <dd> {str("VS Code, vim")} </dd>
            <dt> {str({js|Versjonshåndtering|js})} </dt>
            <dd> {str("Git, Subversion")} </dd>
          </dl>
        </section>
      </section>
      <section className="row">
        <div className="col-md-12">
          <header> <h2> {str("Prosjekterfaring")} </h2> </header>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2016-2019")} </span>
              {str({js|Nasjonal Digital Læringsarena (NDLA)|js})}
            </h4>
            <p>
              {str(
                 {js|Nasjonal Digital Læringsarena (NDLA) er et interfylkeskommunalt samarbeid som tilbyr fritt tilgjengelige åpne digitale læringsressurser for videregående opplæring. Knowit har bidratt med evaluering av eksisterende teknologiplattform og løsninger, rådgivning rundt endringer av plattform og implementasjon av nye løsninger på en skybasert mikrotjenestearkitektur. Løsningene inkluderer tilgjengeliggjøring av innhold gjennom diverse åpne API'er, utvikling av administrasjons- og produksjonsverktøy for innhold i API’ene og utvikling av frontendapplikasjoner for visning av innholdet fra API’ene. Frontendapplikasjonene, produksjons- og administrasjonsverktøyene som Knowit utvikler, benytter moderne og velkjent JavaScript-teknologi. Knowit har forvaltnings- og applikasjonsdriftansvar på komponenter som utvikles. Drift og forvaltning av disse utføres ved bruk av moderne skybaserte verktøy. |js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Min rolle var lead frontend utvikler for hele porsjektet. Jeg var delaktig i utvikling og lansering av ny plattform og frontend for ndla.no med et tilhørende designsystem, samt utvikling av POCer og annen rådgiving. Jeg var også vært med på tilpasse API'er for enkel uthentingen av bilde, video, tekst og interaktive ressurser i frontenden.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "Git, Github, Express, Nginx, Travis CI, npm, React, Docker, Node.js, Redux, redux-forms, PostCSS cssnext, React, Router, Babel, React DND, webpack, Yarn, lerna, Jest, eslint, Emotion, GraphQL, Designsystem",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2014 - 2016")} </span>
              {str("Kommuneforlaget (KF), Diverse prosjekter og oppgaver ")}
            </h4>
            <p>
              {str(
                 {js|Kommuneforlaget har en produktportefølje av IT-løsninger som blant
            annet omfatter systemer for styring, saksbehandling og
            kvalitetssikring. Knowit er en sentral leverandør av løsninger til
            denne porteføljen, og har blant annet levert løsning for
            brukerhåndtering og sentralisert pålogging, behandlingssystem for
            avvik, portalløsning, styringssystem, tjenestekatalog samt
            presentasjonsløsning for årshjul. Knowit bistår også KF med
            rådgivning i forhold til forskjellige behov som f.eks.
            single-sign-on, leverandørevaluering, mv.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg startet som utvikler i prosjektet, men gikk over til å være prosjektleder det siste året jeg jobbet på prosjektet.  I løpet av perioden i KF har jeg vært med på å utarbeide løsningsforslag, estimere, utvikle og levere flere nye webapplikasjoner. Jeg har også jobbet med forvaltning av eksisterende applikasjoner og vært sentral i innføring av en moderne frontendstack.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "Scala, ES2015, React, Redux, Immutable.js, Scalatra, Webpack, npm,
              SASS, Highcharts, ESLint, Angular.js, Karma, Jasmine/Mocha, Maven",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2013 - 2014")} </span>
              {str("PhonectUC")}
            </h4>
            <p>
              {str(
                 {js|PhonectUC er en selvbetjent og skybasert kommunikasjonstjeneste
            basert på Microsoft Lync 2013. Tjenesten gir deg telefoni og
            samhandlingstjenester med video- og talekonferanseløsninger til PC,
            nettbrett og mobil, hvor du enkelt kan kommunisere og samarbeide via
            direktemeldinger, video, lyd, deling av skjerm, programmer og
            presentasjoner.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg kom inn på et tidspunkt hvor produktet nettopp var blitt satt
              i produksjon. Produktet, med all kildekoden, var kjøpt fra et
              annet selskap. Min rolle var å få dette produktet opp i en stand
              hvor det kunne forvaltes på en bedre måte. Grep vi gjorde for å få
              til dette var å gå fra svn til git som versjonskontrollsystem. Vi
              migrerte den webbaserte selvbetjeningsløsningen fra en Microsoft
              Server plattform til Linux plattform. Gikk over fra Ant til Gradle
              som byggesystem, slettet overflødig og utdatert kode ved hjelp av
              TDD. I tillegg satt jeg opp et nytt produksjonssettingsløp
              inspirert av continuous deployment prinsipper.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "Java 7, Tomcat, Sencha, Gradle, Jenkins, CentOS, Git, Powershell",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2013")} </span>
              {str("NAV, Modernisering")}
            </h4>
            <p>
              {str(
                 {js|Moderniseringsprogrammet ble startet sommeren 2012 av NAV.
            Programmet skulle gå over en periode på 6-7 år, med ca 17 scrum team
            (mellom 200-300 mennesker) involvert samtidig. Målet med programmet
            var å modernisere NAV sine it-systemer for å lage mer sammensatte
            systemer hvor brukeren er i fokus. Viktige elementer i dette var å
            koble sammen arbeids- og trygdetjenester for å få folk i arbeid,
            samle tråder fra forskjellige områder til en felles vedtaksprosess
            og forbedre dialogen mellom arbeidsgivere, arbeidstakere,
            samarbeidspartnere og NAV.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg var del av et frontendteam som var nært knyttet til
              rammeverksteamet. Teamet var ansvarlig for å implementere felles
              wicket- og javascriptkomponenter som kan brukes på tvers av ulike
              løsninger. Andre oppgaver besto blant annet av å implementere et
              design for den interne arbeidsflaten MODIA, sikre at løsningene
              fulgte krav til Universal Utforming og etablere retningslinjer for
              frontendutvikling.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "CSS, Jasmine, Java, JavaScript, Jetty, Less, Maven, Responsivt design, Sonar, Twitter Bootstrap, Wicket, jQuery",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2012")} </span>
              {str("CVReg")}
            </h4>
            <p>
              {str(
                 {js|CVReg er en intern web-applikasjon for håndtering av CV’er. Systemet
            håndterer innlegging og eksportering av CV’er for alle ansatte, samt
            søk og versjonering. CVReg ble en stor suksess og er nå i ferd med å
            bli tatt bruk av hele Knowit konsernet.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg var hovedansvarlig for utvikling, ferdigstilling og produksjonssetting av første versjon av web-applikasjonen.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "Compass, Grails, Groovy, HTML5, Jasper Reports, JavaScript, LESS, Lucene, Responsive Design, Twitter Bootstrap, jQuery",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2011 - 2012")} </span>
              {str("NAV, Fellessystemer")}
            </h4>
            <p>
              {str(
                 {js|NAV Fellessystemer er en systemportefølje inneholdende 5 sentrale
            støttesystemer for saksbehandlere i NAV. Blant annet inngår systemet
            GOSYS hvor alle brukerhenvendelser registreres og videre saksgang
            besluttes. GOSYS gir god støtte for arbeidsflyt og deling av
            informasjon for effektiv saksbehandling på tvers av enhetene i NAV.
            I porteføljen inngår også systemet RUTING som støtter opp under
            elektronisk dokumenthåndtering i etaten (skanning og journalføring
            av ca 15 millioner forsendelser årlig). Systemporteføljen benytter
            NAVs felles rammeverk for applikasjonsutvikling av web- og
            batch-løsninger, samt integrasjon med NAVs tjenesteorienterte
            plattform.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg jobbet med videreutvikling og vedlikehold av alle systemene i
              porteføljen og var Scrum Master for et team på fire utviklere.
              Noen eksempler på arbeidsoppgaver er implementering av nye
              tjenester på konsument- og produsentsiden av ESB’en, analyse av
              produksjonsfeil, oppbygning av nye skjermbilder, innfasing av nye
              prosjektmedlemmer og integrering mot et aksesspunkt for tjenester
              fra EU.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   "DB2 Teknologier, ESB, Greenhopper, Hibernate, IBM WebSphere, JSF
              (Java Server Faces), Java 6, JavaScript, Maven 2, RichFaces/A4j,
              SOAP, SoapUI, Spring, Spring WebFlow, Subversion, Twitter
              bootstrap",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2009 - 2011")} </span>
              {str(
                 {js|Statens Vegvesen, System for kontroll av kjøretøy (VaDIS)|js},
               )}
            </h4>
            <p>
              {str(
                 {js|VaDIS er et IT-system som støtter gjennomføring av kontroller av
            førere og kjøretøy på norske veier. Håndholdte terminaler (PDA’er)
            kommuniserer trådløst mot sentrale systemer. VaDIS støtter en rekke
            kontrolltyper, teknisk tilstand på kjøretøy og last, samt førerens
            adferd gjennom kjøre- og hviletidskontroller. Dette innebærer blant
            annet at digitale sjåførkort leses og valideres i løpet av selve
            kontrollen. VaDIS inneholder også en web-løsning med moduler for
            kontrollvirksomheten, administrasjon, saksbehandling og statistikk.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg jobbet med videreutvikling og testing av VaDIS systemet. Hadde
              hovedansvaret for implementeringen av en tidslinjekomponent i Flex
              og integreringen av denne komponenten med en Java EE arkitektur.
              Det siste året jobbet jeg med planlegging og implementering av et
              grensesnitt for utføring av kontroller på web der fokus var
              gjenkjennelighet, rikt grensesnitt og stabilitet.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str(
                   " BlazeDS, Confluence, DWR, Flex, Hibernate, JSP (Java Server
              Pages), Java 5, JavaScript, Maven2, Spring, Struts, jQuery UI",
                 )}
              </p>
            </div>
          </div>
          <div className="project">
            <h4>
              <span className="pull-right"> {str("2007 - 2008 ")} </span>
              {str("Mattilsynet, MATS")}
            </h4>
            <p>
              {str(
                 {js|MATS – Mattilsynets tilsynssystem er et fagsystem som vil erstatte
            ca. 30 eksisterende systemer, samordne alle virksomheter som
            Mattilsynet fører tilsyn med og vil være springbrettet for en mer
            effektiv forvaltning av ca 1000 forskrifter innen mattrygghet og
            dyrevern. Fagsystemet bygger på Computas rammeverk for arbeidsflyt
            og prosesstøtte FrameSolutions, satt inn i en SOA arkitektur.
            Fagsystemet utvikles i Java og en rekke teknologier knyttet til Java
            EE blir brukt. Prosjektet tok også i bruk smidige metoder.|js},
               )}
            </p>
            <div className="role">
              <p>
                <b> {str("Rolle: ")} </b>
                {str(
                   {js|Jeg jobbet på prosjektet i et år både som sommerjobb og
              deltidsjobb ved siden av studiene. Arbeidsoppgavene besto blant
              annet av automatisk funksjonell webtesting, ytelsestesting,
              forbedring av webgrensesnitt, rapportgenerering, samt
              implementering og forbedring av regelstyrte arbeidsprosesser.|js},
                 )}
              </p>
              <p>
                <b> {str("Teknologier: ")} </b>
                {str("EJB3, FrameSolutions, JBoss, Java 6, Ruby, Watir")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="row">
        <div className="col-md-12">
          <header> <h2> {str("Karriereerfaring")} </h2> </header>
          <dl className="dl-horizontal">
            <dt> {str("2009 - dd")} </dt>
            <dd> {str("Knowit, Konsulent")} </dd>
            <dt> {str("2007 - 2008")} </dt>
            <dd> {str("Computas AS, Deltidsjobb")} </dd>
          </dl>
        </div>
      </section>
      <section className="row">
        <div className="col-md-12">
          <header> <h2> {str("Utdannelse")} </h2> </header>
          <dl className="dl-horizontal">
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
          </dl>
        </div>
      </section>
      <section className="row">
        <div className="col-md-12">
          <header> <h2> {str("Foredrag/Workshops")} </h2> </header>
          <div>
            <dl className="dl-horizontal">
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
            </dl>
          </div>
        </div>
      </section>
      <section className="row">
        <div className="col-md-12">
          <header> <h2> {str({js|Språkkunnskaper|js})} </h2> </header>
          <div>
            <dl className="dl-horizontal">
              <dt> {str("Norsk")} </dt>
              <dd> {str({js|Morsmål|js})} </dd>
              <dt> {str("Engelsk")} </dt>
              <dd> {str("Flytende")} </dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  </div>;
};