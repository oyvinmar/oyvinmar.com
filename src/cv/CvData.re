type cvProject = {
  name: string,
  timeSpan: string,
  description: string,
  role: string,
  technologies: string,
};

let projects = [|
  {
    name: "Entur",
    timeSpan: "2019 - dd",
    role: {js|Det første jeg gjorde på Entur var å utvikle en applikasjon for visualisering av data i pris og produkt domenet. Applikasjonen ble raskt tatt i bruk internt i Entur, av både utviklere og andre som jobber med domenet. Jeg ble også raskt valgt til å ta over som tech lead i Entur Partner teamet. I den rollen har han uført oppgaver som: oppgradere kode vha codemods, innført TypeScript, holdt presentasjoner og demoer, hjulpet med å intervju nye teammedlemmer, forenklet prosjektoppsett, satt opp e2e på CI server, og diverse utviklingsoppgaver med høy prioritet. Jeg jobber nå med å designe og implementere en micro frontend arkitektur, slik at flere teams kan utvikle funksjonalitet inn i Entur Partner applikasjonen.|js},
    description: {js|Entur ble etablert i 2016 som et ledd i den norske jernbanereformen. Entur tok over flere av systemene som er relatert til billettsalg fra NSB og drifter i dag billettsystem, tjenester for salg og service på kundesenter og stasjonene på vegne av togoperatører i Norge. Entur sitt mål er å levere tjenester som gjør det enkelt å planlegge, kjøpe og gjøre kollektivreiser i hele landet. For å møte utfordringene med mange operatører moderniseres salgssystemene i prosjektet Sprang. Leverandøren er en aktiv samarbeidspartner med Entur og er sentral i moderniseringsprosjektet.

Entur Partner er en web-applikasjon for konfigurering av blant annet priser og produkter, organisasjoner og konduktører for de forskjellige operatørene som Vy, Go-Ahead og SJ.|js},
    technologies: "React, TypeScript, Micro frontends, CircleCI, GCP, SCSS, Node.js, Express, REST, JsCodeShift, Jest, Cypress.js, eslint, Prettier, Create React App, Docker, Redux, Auth0, Git, Kubernetes",
  },
  {
    name: {js|Nasjonal Digital Læringsarena (NDLA)|js},
    timeSpan: "2016-2019",
    role: {js|Min rolle var lead frontend utvikler for hele porsjektet. Jeg var delaktig i utvikling og lansering av ny plattform og frontend for ndla.no med et tilhørende designsystem, samt utvikling av POCer og annen rådgiving. Jeg var også vært med på tilpasse API'er for enkel uthentingen av bilde, video, tekst og interaktive ressurser i frontenden. |js},
    description: {js|Nasjonal Digital Læringsarena (NDLA) er et interfylkeskommunalt samarbeid som tilbyr fritt tilgjengelige åpne digitale læringsressurser for videregående opplæring. Knowit har bidratt med evaluering av eksisterende teknologiplattform og løsninger, rådgivning rundt endringer av plattform og implementasjon av nye løsninger på en skybasert mikrotjenestearkitektur. Løsningene inkluderer tilgjengeliggjøring av innhold gjennom diverse åpne API'er, utvikling av administrasjons- og produksjonsverktøy for innhold i API’ene og utvikling av frontendapplikasjoner for visning av innholdet fra API’ene. Frontendapplikasjonene, produksjons- og administrasjonsverktøyene som Knowit utvikler, benytter moderne og velkjent JavaScript-teknologi. Knowit har forvaltnings- og applikasjonsdriftansvar på komponenter som utvikles. Drift og forvaltning av disse utføres ved bruk av moderne skybaserte verktøy.|js},
    technologies: "Git, Github, Express, Nginx, Travis CI, npm, React, Docker, Node.js, Redux, redux-forms, PostCSS cssnext, React, Router, Babel, React DND, webpack, Yarn, lerna, Jest, eslint, Emotion, GraphQL, Designsystem",
  },
  {
    timeSpan: "2014 - 2016",
    name: {js|Kommuneforlaget (KF), Diverse prosjekter og oppgaver|js},
    description: {js|Kommuneforlaget har en produktportefølje av IT-løsninger som blant annet omfatter systemer for styring, saksbehandling og kvalitetssikring. Knowit er en sentral leverandør av løsninger til denne porteføljen, og har blant annet levert løsning for brukerhåndtering og sentralisert pålogging, behandlingssystem for avvik, portalløsning, styringssystem, tjenestekatalog samt presentasjonsløsning for årshjul. Knowit bistår også KF med rådgivning i forhold til forskjellige behov som f.eks. single-sign-on, leverandørevaluering, mv.

|js},
    role: {js|Jeg startet som utvikler i prosjektet, men gikk over til å være prosjektleder det siste året jeg jobbet på prosjektet. I løpet av perioden i KF har jeg vært med på å utarbeide løsningsforslag, estimere, utvikle og levere flere nye webapplikasjoner. Jeg har også jobbet med forvaltning av eksisterende applikasjoner og vært sentral i innføring av en moderne frontendstack.|js},
    technologies: "Scala, ES2015, React, Redux, Immutable.js, Scalatra, Webpack, npm, SASS, Highcharts, ESLint, Angular.js, Karma, Jasmine/Mocha, Maven",
  },
  {
    timeSpan: "2013 - 2014",
    name: {js|PhonectUC|js},
    description: {js|PhonectUC er en selvbetjent og skybasert kommunikasjonstjeneste basert på Microsoft Lync 2013. Tjenesten gir deg telefoni og samhandlingstjenester med video- og talekonferanseløsninger til PC, nettbrett og mobil, hvor du enkelt kan kommunisere og samarbeide via direktemeldinger, video, lyd, deling av skjerm, programmer og presentasjoner.|js},
    role: {js|Jeg kom inn på et tidspunkt hvor produktet nettopp var blitt satt i produksjon. Produktet, med all kildekoden, var kjøpt fra et annet selskap. Min rolle var å få dette produktet opp i en stand hvor det kunne forvaltes på en bedre måte. Grep vi gjorde for å få til dette var å gå fra svn til git som versjonskontrollsystem. Vi migrerte den webbaserte selvbetjeningsløsningen fra en Microsoft Server plattform til Linux plattform. Gikk over fra Ant til Gradle som byggesystem, slettet overflødig og utdatert kode ved hjelp av TDD. I tillegg satt jeg opp et nytt produksjonssettingsløp inspirert av continuous deployment prinsipper.|js},
    technologies: "Java 7, Tomcat, Sencha, Gradle, Jenkins, CentOS, Git, Powershell",
  },
  {
    timeSpan: "2013",
    name: {js|NAV, Modernisering|js},
    description: {js|Moderniseringsprogrammet ble startet sommeren 2012 av NAV. Programmet skulle gå over en periode på 6-7 år, med ca 17 scrum team (mellom 200-300 mennesker) involvert samtidig. Målet med programmet var å modernisere NAV sine it-systemer for å lage mer sammensatte systemer hvor brukeren er i fokus. Viktige elementer i dette var å koble sammen arbeids- og trygdetjenester for å få folk i arbeid, samle tråder fra forskjellige områder til en felles vedtaksprosess og forbedre dialogen mellom arbeidsgivere, arbeidstakere, samarbeidspartnere og NAV.|js},
    role: {js|Jeg var del av et frontendteam som var nært knyttet til rammeverksteamet. Teamet var ansvarlig for å implementere felles wicket- og javascriptkomponenter som kan brukes på tvers av ulike løsninger. Andre oppgaver besto blant annet av å implementere et design for den interne arbeidsflaten MODIA, sikre at løsningene fulgte krav til Universal Utforming og etablere retningslinjer for frontendutvikling.|js},
    technologies: "CSS, Jasmine, Java, JavaScript, Jetty, Less, Maven, Responsivt design, Sonar, Twitter Bootstrap, Wicket, jQuery",
  },
  {
    timeSpan: "2012",
    name: {js|CVReg|js},
    description: {js|CVReg er en intern web-applikasjon for håndtering av CV’er. Systemet håndterer innlegging og eksportering av CV’er for alle ansatte, samt søk og versjonering. CVReg ble en stor suksess og er nå i ferd med å bli tatt bruk av hele Knowit konsernet.

|js},
    role: {js|Jeg var hovedansvarlig for utvikling, ferdigstilling og produksjonssetting av første versjon av web-applikasjonen.|js},
    technologies: "Compass, Grails, Groovy, HTML5, Jasper Reports, JavaScript, LESS, Lucene, Responsive Design, Twitter Bootstrap, jQuery",
  },
  {
    timeSpan: "2011 - 2012",
    name: {js|NAV, Fellessystemer|js},
    description: {js|NAV Fellessystemer er en systemportefølje inneholdende 5 sentrale støttesystemer for saksbehandlere i NAV. Blant annet inngår systemet GOSYS hvor alle brukerhenvendelser registreres og videre saksgang besluttes. GOSYS gir god støtte for arbeidsflyt og deling av informasjon for effektiv saksbehandling på tvers av enhetene i NAV. I porteføljen inngår også systemet RUTING som støtter opp under elektronisk dokumenthåndtering i etaten (skanning og journalføring av ca 15 millioner forsendelser årlig). Systemporteføljen benytter NAVs felles rammeverk for applikasjonsutvikling av web- og batch-løsninger, samt integrasjon med NAVs tjenesteorienterte plattform.|js},
    role: {js|Jeg jobbet med videreutvikling og vedlikehold av alle systemene i porteføljen og var Scrum Master for et team på fire utviklere. Noen eksempler på arbeidsoppgaver er implementering av nye tjenester på konsument- og produsentsiden av ESB’en, analyse av produksjonsfeil, oppbygning av nye skjermbilder, innfasing av nye prosjektmedlemmer og integrering mot et aksesspunkt for tjenester fra EU.|js},
    technologies: "DB2 Teknologier, ESB, Greenhopper, Hibernate, IBM WebSphere, JSF (Java Server Faces), Java 6, JavaScript, Maven 2, RichFaces/A4j, SOAP, SoapUI, Spring, Spring WebFlow, Subversion, Twitter bootstrap",
  },
  {
    timeSpan: "2009 - 2011",
    name: {js|Statens Vegvesen, System for kontroll av kjøretøy (VaDIS)|js},
    description: {js|VaDIS er et IT-system som støtter gjennomføring av kontroller av førere og kjøretøy på norske veier. Håndholdte terminaler (PDA’er) kommuniserer trådløst mot sentrale systemer. VaDIS støtter en rekke kontrolltyper, teknisk tilstand på kjøretøy og last, samt førerens adferd gjennom kjøre- og hviletidskontroller. Dette innebærer blant annet at digitale sjåførkort leses og valideres i løpet av selve kontrollen. VaDIS inneholder også en web-løsning med moduler for kontrollvirksomheten, administrasjon, saksbehandling og statistikk.|js},
    role: {js|Jeg jobbet med videreutvikling og testing av VaDIS systemet. Hadde hovedansvaret for implementeringen av en tidslinjekomponent i Flex og integreringen av denne komponenten med en Java EE arkitektur. Det siste året jobbet jeg med planlegging og implementering av et grensesnitt for utføring av kontroller på web der fokus var gjenkjennelighet, rikt grensesnitt og stabilitet.|js},
    technologies: "BlazeDS, Confluence, DWR, Flex, Hibernate, JSP (Java Server Pages), Java 5, JavaScript, Maven2, Spring, Struts, jQuery UI",
  },
  {
    timeSpan: "2007 - 2008",
    name: {js|Mattilsynet, MATS|js},
    description: {js|MATS – Mattilsynets tilsynssystem er et fagsystem som vil erstatte ca. 30 eksisterende systemer, samordne alle virksomheter som Mattilsynet fører tilsyn med og vil være springbrettet for en mer effektiv forvaltning av ca 1000 forskrifter innen mattrygghet og dyrevern. Fagsystemet bygger på Computas rammeverk for arbeidsflyt og prosesstøtte FrameSolutions, satt inn i en SOA arkitektur. Fagsystemet utvikles i Java og en rekke teknologier knyttet til Java EE blir brukt. Prosjektet tok også i bruk smidige metoder.|js},
    role: {js|Jeg jobbet på prosjektet i et år både som sommerjobb og deltidsjobb ved siden av studiene. Arbeidsoppgavene besto blant annet av automatisk funksjonell webtesting, ytelsestesting, forbedring av webgrensesnitt, rapportgenerering, samt implementering og forbedring av regelstyrte arbeidsprosesser.|js},
    technologies: "EJB3, FrameSolutions, JBoss, Java 6, Ruby, Watir",
  },
|];

type cvPresentation = {
  title: string,
  year: string,
  where: string,
  link: option(string),
};

let presentations: array(cvPresentation) = [|
  {
    year: "2013",
    where: "NTNU Kurs",
    title: "Testdrevet utvikling med JavaScript",
    link: None,
  },
  {
    year: "2014",
    where: "Knowit Developer Summit",
    link: Some("http://oyvinmar.github.io/gulpjs-presentation/"),
    title: "Gulp.js",
  },
  {
    year: "2014",
    where: "NTNU Kurs",
    link: Some("https://github.com/knowit/programming-ladder"),
    title: "Programming ladder",
  },
  {
    year: "2016",
    where: "Knowit Web Summit",
    link:
      Some("https://oyvinmar.github.io/universal-javascript-presentation/"),
    title: "Universal JavaScript",
  },
  {
    year: "2016",
    where: "UIO Kurs",
    link: Some("https://github.com/knowit/programming-ladder"),
    title: "Programming ladder",
  },
  {
    year: "2017",
    where: "Knowit Fagseminar Palma",
    link:
      Some(
        "https://oyvinmar.github.io/what-backend-can-learn-from-frontend-presentation/#",
      ),
    title: "What backend can learn from frontend",
  },
  {
    year: "2018",
    where: "Knowit Developer Summit",
    link:
      Some("https://oyvinmar.github.io/error-reporting-in-js-presentation/"),
    title: "Error reporting in JavaScript",
  },
  {
    year: "2019",
    where: "NTNU Kurs",
    link: Some("https://github.com/knowit/react-workshop"),
    title: "React workshop",
  },
  {
    year: "2019",
    where: "Knowit Fagseminar Praha",
    link: Some("https://dev-env-in-the-cloud.now.sh"),
    title: "Development Environment in the Cloud",
  },
  {
    year: "2020",
    where: "Knowit Fagseminar Onlin",
    link: Some("https://www.youtube.com/watch?v=TmDtIdntbN4"),
    title: "Micro Frontends i Entur",
  },
|];
