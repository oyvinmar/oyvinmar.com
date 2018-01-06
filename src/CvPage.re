open Utils;

[%bs.raw {|require('./styles/cv.scss')|}];

let component = ReasonReact.statelessComponent("CvPage");

[@bs.module] external oyvindM150 : string = "./app/img/Oyvind-Marthinsen_150.jpg";

[@bs.module] external oyvindM300 : string = "./app/img/Oyvind-Marthinsen_300.jpg";

let getSrcSets = () => {
  let list = [oyvindM300 ++ " 300w", oyvindM150 ++ " 150w"];
  String.concat(",", list)
};

let make = (_children) => {
  ...component,
  render: (_self) =>
  <div id="cv">
  <div className="container" >
    <header className="row">
      <div className="col-md-12">
        <h1>(str({js|CV - Øyvind Marthinsen|js}))</h1>
      </div>
    </header>
    <section className="row">
      <figure className="col-lg-3 col-md-4">
        <img
        alt="Picture of Øyvind Marthinsen"
        src=(oyvindM300)
      />
      </figure>
      <article className="col-lg-9 col-md-8">
        <header>
          <h2>(str("Profil"))</h2>
        </header>
        <dl className="dl-horizontal" style=(ReactDOMRe.Style.make(~margin="20px 0 30px 0", () ))>
          <dt>(str("Telefon:"))</dt>
          <dd>(str("970 61 833"))</dd>
          <dt>(str({js|Fødselsdato:|js}))</dt>
          <dd>(str("06.10.1984"))</dd>
          <dt>(str("Bosted:"))</dt>
          <dd>(str("Oslo"))</dd>
        </dl>
        <p>
          (str({js|Jeg er en engasjert utvikler som brenner for utvikling av moderne web
          applikasjoner. Jeg trives like godt på klientsiden som på serversiden,
          og har gjennom deltakelse i flere større og mindre prosjekter tilegnet
          meg mye kunnskap om smidige metoder og prosjektstyring. Selv om jeg er
          en fullstack utvikler så har jeg de siste årene jobbet mest med
          frontendteknologier som JavaScript, HTML5 og CSS3. I tillegg har jeg
          stor interesse for mobile plattformer og responsivt design. Gjennom
          flere år som konsulent har jeg fått kunnskap om og erfaring med hele
          systemutviklingsprosessen, fra planlegging og design til testing og
          produksjonssetting. Jeg anser meg selv som flink til å se brukerens
          behov og setter alltid brukeren i fokus under utvikling av løsninger.
          Jeg er også en pragmatisk person som liker å utfordre meg selv på å
          lage enkle løsninger for komplekse problemer.|js}))
        </p>
      </article>
    </section>
    <section className="row">
      <section className="col-md-12">
        <header>
          <h2>(str("Teknologikart"))</h2>
        </header>
        <p>
          (str({js|Nedenfor har jeg listet opp teknologier, verktøy og metoder jeg har
          erfaring med. Utover dette er jeg fortiden interessert i |js}))
          <a href="https://facebook.github.io/react-native/">(str("React Native"))</a>
          (str(" for utvikling av mobile mobil applikasjoner, "))
          <a href="http://graphql.org/">(str("GraphQL"))</a>(str(" som et alternativ til REST og fordeler og ulemper med "))
          <a href="http://danluu.com/monorepo/">(str("monorepo"))</a>
          (str("."))
        </p>
        <dl className="dl-vertical">
          <dt>(str({js|Programmeringsspråk|js}))</dt>
          <dd>
            (str("JavaScript (ECMAScript 2015), Scala, Java, C, Groovy, Python, Ruby"))
          </dd>
          <dt>(str("Webteknologi"))</dt>
          <dd>
            (str("HTML5, CSS3, React, Redux, Immutable.js, SASS, LESS, SVG, Angular.js, Twitter Bootstrap, lodash, Express, Highcharts, jQuery"))
          </dd>
          <dt>(str({js|Webverktøy|js}))</dt>
          <dd>
            (str("Webpack, ESLint, npm, Gulp.js, Livereload/BrowserSync, Karma, Jasmine, Mocha, Grunt, Browserify, RequireJS, Bower"))
          </dd>
          <dt>(str("Applikasjonsservere"))</dt>
          <dd>(str("Apache, Jetty, Tomcat, Node.js"))</dd>
          <dt>(str("Applikasjonsrammeverk"))</dt>
          <dd>
            (str("Ehcache, Hibernate, JUnit, Java SE/EE/ME, Log4j, Logback, Spring"))
          </dd>
          <dt>(str({js|Byggeverktøy/kontinuerlig integrasjon|js}))</dt>
          <dd>(str("Artifactory, npm, Jenkins, Gradle, Maven, Nexus"))</dd>
          <dt>(str("Databaser"))</dt>
          <dd>(str("Microsoft SQL Server, MySQL, PostgreSQL"))</dd>
          <dt>(str("Integrasjon"))</dt>
          <dd>(str("HTTP, REST, JSON, SOAP, XML"))</dd>
          <dt>(str("Metode"))</dt>
          <dd>(str("Parprogrammering, Scrum, Testdrevet utvikling (TDD), XP"))</dd>
          <dt>(str({js|Utviklingsverktøy (IDE)|js}))</dt>
          <dd>(str("IntelliJ IDEA, Atom, vim"))</dd>
          <dt>(str({js|Versjonshåndtering|js}))</dt>
          <dd>(str("Git, Subversion"))</dd>
        </dl>
      </section>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>(str("Prosjekterfaring"))</h2>
        </header>
        <div className="project">
          <h4>
            <span className="pull-right">(str("2013 - dd"))</span>
            (str("Kommuneforlaget (KF), Diverse prosjekter og oppgaver "))
          </h4>

          <p>
            (str({js|Kommuneforlaget har en produktportefølje av IT-løsninger som blant
            annet omfatter systemer for styring, saksbehandling og
            kvalitetssikring. Knowit er en sentral leverandør av løsninger til
            denne porteføljen, og har blant annet levert løsning for
            brukerhåndtering og sentralisert pålogging, behandlingssystem for
            avvik, portalløsning, styringssystem, tjenestekatalog samt
            presentasjonsløsning for årshjul. Knowit bistår også KF med
            rådgivning i forhold til forskjellige behov som f.eks.
            single-sign-on, leverandørevaluering, mv.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg startet som utvikler i prosjektet, og har siden siste halvdel
              av 2015 vært prosjektleder. I løpet av perioden i KF har jeg vært
              med på å utarbeide løsningsforslag, estimere, utvikle og levere
              flere nye webapplikasjoner. Jeg har også jobbet med forvaltning av
              eksisterende applikasjoner og vært sentral i innføring av en
              moderne frontendstack.|js}))
            </p>

            <p>
              <b>(str("Teknologier: ")) </b>
              (str("Scala, ES2015, React, Redux, Immutable.js, Scalatra, Webpack, npm,
              SASS, Highcharts, ESLint, Karma, Jasmine/Mocha, Maven"))
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">(str("2013 - 2014"))</span>(str("PhonectUC"))
          </h4>

          <p>
            (str({js|PhonectUC er en selvbetjent og skybasert kommunikasjonstjeneste
            basert på Microsoft Lync 2013. Tjenesten gir deg telefoni og
            samhandlingstjenester med video- og talekonferanseløsninger til PC,
            nettbrett og mobil, hvor du enkelt kan kommunisere og samarbeide via
            direktemeldinger, video, lyd, deling av skjerm, programmer og
            presentasjoner.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg kom inn på et tidspunkt hvor produktet nettopp var blitt satt
              i produksjon. Produktet, med all kildekoden, var kjøpt fra et
              annet selskap. Min rolle var å få dette produktet opp i en stand
              hvor det kunne forvaltes på en bedre måte. Grep vi gjorde for å få
              til dette var å gå fra svn til git som versjonskontrollsystem. Vi
              migrerte den webbaserte selvbetjeningsløsningen fra en Microsoft
              Server plattform til Linux plattform. Gikk over fra Ant til Gradle
              som byggesystem, slettet overflødig og utdatert kode ved hjelp av
              TDD. I tillegg satt jeg opp et nytt produksjonssettingsløp
              inspirert av continuous deployment prinsipper.|js}))
            </p>

            <p>
              <b>(str("Teknologier: "))</b>
              (str("Java 7, Tomcat, Sencha, Gradle, Jenkins, CentOS, Git, Powershell"))
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">(str("2013"))</span>(str("NAV, Modernisering"))
          </h4>
          <p>
            (str({js|Moderniseringsprogrammet ble startet sommeren 2012 av NAV.
            Programmet skulle gå over en periode på 6-7 år, med ca 17 scrum team
            (mellom 200-300 mennesker) involvert samtidig. Målet med programmet
            var å modernisere NAV sine it-systemer for å lage mer sammensatte
            systemer hvor brukeren er i fokus. Viktige elementer i dette var å
            koble sammen arbeids- og trygdetjenester for å få folk i arbeid,
            samle tråder fra forskjellige områder til en felles vedtaksprosess
            og forbedre dialogen mellom arbeidsgivere, arbeidstakere,
            samarbeidspartnere og NAV.|js}))
          </p>
          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg var del av et frontendteam som var nært knyttet til
              rammeverksteamet. Teamet var ansvarlig for å implementere felles
              wicket- og javascriptkomponenter som kan brukes på tvers av ulike
              løsninger. Andre oppgaver besto blant annet av å implementere et
              design for den interne arbeidsflaten MODIA, sikre at løsningene
              fulgte krav til Universal Utforming og etablere retningslinjer for
              frontendutvikling.|js}))
            </p>

            <p>
              <b>(str("Teknologier: ")) </b>
              (str("CSS, Jasmine, Java, JavaScript, Jetty, Less, Maven, Responsivt design, Sonar, Twitter Bootstrap, Wicket, jQuery"))
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">(str("2012"))</span>(str("CVReg"))
          </h4>
          <p>
            (str({js|CVReg er en intern web-applikasjon for håndtering av CV’er. Systemet
            håndterer innlegging og eksportering av CV’er for alle ansatte, samt
            søk og versjonering. CVReg ble en stor suksess og er nå i ferd med å
            bli tatt bruk av hele Knowit konsernet.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg var hovedansvarlig for utvikling, ferdigstilling og produksjonssetting av første versjon av web-applikasjonen.|js}))
            </p>

            <p>
              <b>(str("Teknologier: ")) </b>
              (str("Compass, Grails, Groovy, HTML5, Jasper Reports, JavaScript, LESS, Lucene, Responsive Design, Twitter Bootstrap, jQuery"))
            </p>
          </div>
        </div>

        <div className="project">
          <h4>
            <span className="pull-right"> (str("2011 - 2012")) </span>
            (str("NAV, Fellessystemer"))
          </h4>

          <p>
            (str({js|NAV Fellessystemer er en systemportefølje inneholdende 5 sentrale
            støttesystemer for saksbehandlere i NAV. Blant annet inngår systemet
            GOSYS hvor alle brukerhenvendelser registreres og videre saksgang
            besluttes. GOSYS gir god støtte for arbeidsflyt og deling av
            informasjon for effektiv saksbehandling på tvers av enhetene i NAV.
            I porteføljen inngår også systemet RUTING som støtter opp under
            elektronisk dokumenthåndtering i etaten (skanning og journalføring
            av ca 15 millioner forsendelser årlig). Systemporteføljen benytter
            NAVs felles rammeverk for applikasjonsutvikling av web- og
            batch-løsninger, samt integrasjon med NAVs tjenesteorienterte
            plattform.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg jobbet med videreutvikling og vedlikehold av alle systemene i
              porteføljen og var Scrum Master for et team på fire utviklere.
              Noen eksempler på arbeidsoppgaver er implementering av nye
              tjenester på konsument- og produsentsiden av ESB’en, analyse av
              produksjonsfeil, oppbygning av nye skjermbilder, innfasing av nye
              prosjektmedlemmer og integrering mot et aksesspunkt for tjenester
              fra EU.|js}))
            </p>

            <p>
              <b>(str("Teknologier: "))</b>
              (str("DB2 Teknologier, ESB, Greenhopper, Hibernate, IBM WebSphere, JSF
              (Java Server Faces), Java 6, JavaScript, Maven 2, RichFaces/A4j,
              SOAP, SoapUI, Spring, Spring WebFlow, Subversion, Twitter
              bootstrap"))
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right"> (str("2009 - 2011")) </span>
            (str({js|Statens Vegvesen, System for kontroll av kjøretøy (VaDIS)|js}))
          </h4>

          <p>
            (str({js|VaDIS er et IT-system som støtter gjennomføring av kontroller av
            førere og kjøretøy på norske veier. Håndholdte terminaler (PDA’er)
            kommuniserer trådløst mot sentrale systemer. VaDIS støtter en rekke
            kontrolltyper, teknisk tilstand på kjøretøy og last, samt førerens
            adferd gjennom kjøre- og hviletidskontroller. Dette innebærer blant
            annet at digitale sjåførkort leses og valideres i løpet av selve
            kontrollen. VaDIS inneholder også en web-løsning med moduler for
            kontrollvirksomheten, administrasjon, saksbehandling og statistikk.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg jobbet med videreutvikling og testing av VaDIS systemet. Hadde
              hovedansvaret for implementeringen av en tidslinjekomponent i Flex
              og integreringen av denne komponenten med en Java EE arkitektur.
              Det siste året jobbet jeg med planlegging og implementering av et
              grensesnitt for utføring av kontroller på web der fokus var
              gjenkjennelighet, rikt grensesnitt og stabilitet.|js}))
            </p>

            <p>
              <b>(str("Teknologier: "))</b>
             (str(" BlazeDS, Confluence, DWR, Flex, Hibernate, JSP (Java Server
              Pages), Java 5, JavaScript, Maven2, Spring, Struts, jQuery UI"))
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right"> (str("2007 - 2008 "))</span>
            (str("Mattilsynet, MATS"))
          </h4>

          <p>
            (str({js|MATS – Mattilsynets tilsynssystem er et fagsystem som vil erstatte
            ca. 30 eksisterende systemer, samordne alle virksomheter som
            Mattilsynet fører tilsyn med og vil være springbrettet for en mer
            effektiv forvaltning av ca 1000 forskrifter innen mattrygghet og
            dyrevern. Fagsystemet bygger på Computas rammeverk for arbeidsflyt
            og prosesstøtte FrameSolutions, satt inn i en SOA arkitektur.
            Fagsystemet utvikles i Java og en rekke teknologier knyttet til Java
            EE blir brukt. Prosjektet tok også i bruk smidige metoder.|js}))
          </p>

          <div className="role">
            <p>
              <b>(str("Rolle: "))</b>
              (str({js|Jeg jobbet på prosjektet i et år både som sommerjobb og
              deltidsjobb ved siden av studiene. Arbeidsoppgavene besto blant
              annet av automatisk funksjonell webtesting, ytelsestesting,
              forbedring av webgrensesnitt, rapportgenerering, samt
              implementering og forbedring av regelstyrte arbeidsprosesser.|js}))
            </p>

            <p>
              <b>(str("Teknologier: "))</b>
              (str("EJB3, FrameSolutions, JBoss, Java 6, Ruby, Watir"))
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>(str("Karriereerfaring"))</h2>
        </header>
        <dl className="dl-horizontal">
          <dt>(str("2009 - dd"))</dt>
          <dd>(str("Knowit, Konsulent"))</dd>
          <dt>(str("2007 - 2008"))</dt>
          <dd>(str("Computas AS, Deltidsjobb"))</dd>
        </dl>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>(str("Utdannelse"))</h2>
        </header>
        <dl className="dl-horizontal">
          <dt>(str("2004 - 2009"))</dt>
          <dd>
            (str("Universitet i Oslo, Master i informatikk"))
            <p>
              (str("Masteroppgave: Brukerkontroll i kontekstsensitive mobile
              nettjenster"))
            </p>
          </dd>
        </dl>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>(str("Foredrag"))</h2>
        </header>
        <div>
          <dl className="dl-horizontal">
            <dt>(str("2014"))</dt>
            <dd>
              (str("Knowit Developer Summit - "))
              <a href="http://oyvinmar.github.io/gulpjs-presentation/">
                (str("Gulp.js"))
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>(str({js|Språkkunnskaper|js}))</h2>
        </header>

        <div>
          <dl className="dl-horizontal">
            <dt>(str("Norsk"))</dt>
            <dd>(str({js|Morsmål|js}))</dd>
            <dt>(str("Engelsk"))</dt>
            <dd>(str("Flytende"))</dd>
          </dl>
        </div>
      </div>
    </section>
    </div>
  </div>
};