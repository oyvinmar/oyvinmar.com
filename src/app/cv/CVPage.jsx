import React from 'react';

const CV = () => (
  <div className="container" id="cv">
    <header className="row">
      <div className="col-md-12">
        <h1>CV - Øyvind Marthinsen</h1>
      </div>
    </header>
    <section className="row">
      <figure className="col-lg-3 col-md-4">
        <img
          alt="Øyvind Marthinsen"
          id="headshot"
          src="/assets/img/Oyvind-Marthinsen.jpg"
        />
      </figure>
      <article className="col-lg-9 col-md-8">
        <header>
          <h2>Profil</h2>
        </header>
        <dl className="dl-horizontal" style={{ margin: '20px 0 30px 0' }}>
          <dt>Telefon:</dt>
          <dd>970 61 833</dd>
          <dt>Fødselsdato:</dt>
          <dd>06.10.1984</dd>
          <dt>Bosted:</dt>
          <dd>Oslo</dd>
        </dl>
        <p>
          Jeg er en engasjert utvikler som brenner for utvikling av moderne web
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
          lage enkle løsninger for komplekse problemer.
        </p>
      </article>
    </section>
    <section className="row">
      <section className="col-md-12">
        <header>
          <h2>Teknologikart</h2>
        </header>
        <p>
          Nedenfor har jeg listet opp teknologier, verktøy og metoder jeg har
          erfaring med. Utover dette er jeg fortiden interessert i{' '}
          <a href="https://facebook.github.io/react-native/">React Native</a>{' '}
          for utvikling av mobile mobil applikasjoner,{' '}
          <a href="http://graphql.org/">GraphQL</a> som et alternativ til REST
          og fordeler og ulemper med{' '}
          <a href="http://danluu.com/monorepo/">monorepo</a>
          .
        </p>
        <dl className="dl-horizontal">
          <dt>Programmeringsspråk</dt>
          <dd>
            JavaScript (ECMAScript 2015), Scala, Java, C, Groovy, Python, Ruby
          </dd>
          <dt>Webteknologi</dt>
          <dd>
            HTML5, CSS3, React, Redux, Immutable.js, SASS, LESS, SVG,
            Angular.js, Twitter Bootstrap, lodash, Express, Highcharts, jQuery{' '}
          </dd>
          <dt>Webverktøy</dt>
          <dd>
            Webpack, ESLint, npm, Gulp.js, Livereload/BrowserSync, Karma,
            Jasmine, Mocha, Grunt, Browserify, RequireJS, Bower
          </dd>
          <dt>Applikasjonsservere</dt>
          <dd>Apache, Jetty, Tomcat, Node.js</dd>
          <dt>Applikasjonsrammeverk</dt>
          <dd>
            Ehcache, Hibernate, JUnit, Java SE/EE/ME, Log4j, Logback, Spring
          </dd>
          <dt>Byggeverktøy/kontinuerlig integrasjon</dt>
          <dd>Artifactory, npm, Jenkins, Gradle, Maven, Nexus</dd>
          <dt>Databaser</dt>
          <dd>Microsoft SQL Server, MySQL, PostgreSQL</dd>
          <dt>Integrasjon</dt>
          <dd>HTTP, REST, JSON, SOAP, XML</dd>
          <dt>Metode</dt>
          <dd>Parprogrammering, Scrum, Testdrevet utvikling (TDD), XP</dd>
          <dt>Utviklingsverktøy (IDE)</dt>
          <dd>IntelliJ IDEA, Atom, vim</dd>
          <dt>Versjonshåndtering</dt>
          <dd>Git, Subversion</dd>
        </dl>
      </section>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>Prosjekterfaring</h2>
        </header>
        <div className="project">
          <h4>
            <span className="pull-right">2013 - dd</span>
            Kommuneforlaget (KF), Diverse prosjekter og oppgaver
          </h4>

          <p>
            Kommuneforlaget har en produktportefølje av IT-løsninger som blant
            annet omfatter systemer for styring, saksbehandling og
            kvalitetssikring. Knowit er en sentral leverandør av løsninger til
            denne porteføljen, og har blant annet levert løsning for
            brukerhåndtering og sentralisert pålogging, behandlingssystem for
            avvik, portalløsning, styringssystem, tjenestekatalog samt
            presentasjonsløsning for årshjul. Knowit bistår også KF med
            rådgivning i forhold til forskjellige behov som f.eks.
            single-sign-on, leverandørevaluering, mv.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg startet som utvikler i prosjektet, og har siden siste halvdel
              av 2015 vært prosjektleder. I løpet av perioden i KF har jeg vært
              med på å utarbeide løsningsforslag, estimere, utvikle og levere
              flere nye webapplikasjoner. Jeg har også jobbet med forvaltning av
              eksisterende applikasjoner og vært sentral i innføring av en
              moderne frontendstack.
            </p>

            <p>
              <b>Teknologier: </b>
              Scala, ES2015, React, Redux, Immutable.js, Scalatra, Webpack, npm,
              SASS, Highcharts, ESLint, Karma, Jasmine/Mocha, Maven
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">2013 - 2014</span>PhonectUC
          </h4>

          <p>
            PhonectUC er en selvbetjent og skybasert kommunikasjonstjeneste
            basert på Microsoft Lync 2013. Tjenesten gir deg telefoni og
            samhandlingstjenester med video- og talekonferanseløsninger til PC,
            nettbrett og mobil, hvor du enkelt kan kommunisere og samarbeide via
            direktemeldinger, video, lyd, deling av skjerm, programmer og
            presentasjoner.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg kom inn på et tidspunkt hvor produktet nettopp var blitt satt
              i produksjon. Produktet, med all kildekoden, var kjøpt fra et
              annet selskap. Min rolle var å få dette produktet opp i en stand
              hvor det kunne forvaltes på en bedre måte. Grep vi gjorde for å få
              til dette var å gå fra svn til git som versjonskontrollsystem. Vi
              migrerte den webbaserte selvbetjeningsløsningen fra en Microsoft
              Server plattform til Linux plattform. Gikk over fra Ant til Gradle
              som byggesystem, slettet overflødig og utdatert kode ved hjelp av
              TDD. I tillegg satt jeg opp et nytt produksjonssettingsløp
              inspirert av continuous deployment prinsipper.
            </p>

            <p>
              <b>Teknologier: </b>
              Java 7, Tomcat, Sencha, Gradle, Jenkins, CentOS, Git, Powershell
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">2013</span>NAV, Modernisering{' '}
          </h4>

          <p>
            Moderniseringsprogrammet ble startet sommeren 2012 av NAV.
            Programmet skulle gå over en periode på 6-7 år, med ca 17 scrum team
            (mellom 200-300 mennesker) involvert samtidig. Målet med programmet
            var å modernisere NAV sine it-systemer for å lage mer sammensatte
            systemer hvor brukeren er i fokus. Viktige elementer i dette var å
            koble sammen arbeids- og trygdetjenester for å få folk i arbeid,
            samle tråder fra forskjellige områder til en felles vedtaksprosess
            og forbedre dialogen mellom arbeidsgivere, arbeidstakere,
            samarbeidspartnere og NAV.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg var del av et frontendteam som var nært knyttet til
              rammeverksteamet. Teamet var ansvarlig for å implementere felles
              wicket- og javascriptkomponenter som kan brukes på tvers av ulike
              løsninger. Andre oppgaver besto blant annet av å implementere et
              design for den interne arbeidsflaten MODIA, sikre at løsningene
              fulgte krav til Universal Utforming og etablere retningslinjer for
              frontendutvikling.
            </p>

            <p>
              <b>Teknologier: </b>
              CSS, Jasmine, Java, JavaScript, Jetty, Less, Maven, Responsivt
              design, Sonar, Twitter Bootstrap, Wicket, jQuery
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right">2012</span>CVReg
          </h4>

          <p>
            CVReg er en intern web-applikasjon for håndtering av CV’er. Systemet
            håndterer innlegging og eksportering av CV’er for alle ansatte, samt
            søk og versjonering. CVReg ble en stor suksess og er nå i ferd med å
            bli tatt bruk av hele Knowit konsernet.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg var hovedansvarlig for utvikling, ferdigstilling og
              produksjonssetting av første versjon av web-applikasjonen.
            </p>

            <p>
              <b>Teknologier: </b>
              Compass, Grails, Groovy, HTML5, Jasper Reports, JavaScript, LESS,
              Lucene, Responsive Design, Twitter Bootstrap, jQuery
            </p>
          </div>
        </div>

        <div className="project">
          <h4>
            <span className="pull-right"> 2011 – 2012 </span> NAV,
            Fellessystemer{' '}
          </h4>

          <p>
            NAV Fellessystemer er en systemportefølje inneholdende 5 sentrale
            støttesystemer for saksbehandlere i NAV. Blant annet inngår systemet
            GOSYS hvor alle brukerhenvendelser registreres og videre saksgang
            besluttes. GOSYS gir god støtte for arbeidsflyt og deling av
            informasjon for effektiv saksbehandling på tvers av enhetene i NAV.
            I porteføljen inngår også systemet RUTING som støtter opp under
            elektronisk dokumenthåndtering i etaten (skanning og journalføring
            av ca 15 millioner forsendelser årlig). Systemporteføljen benytter
            NAVs felles rammeverk for applikasjonsutvikling av web- og
            batch-løsninger, samt integrasjon med NAVs tjenesteorienterte
            plattform.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg jobbet med videreutvikling og vedlikehold av alle systemene i
              porteføljen og var Scrum Master for et team på fire utviklere.
              Noen eksempler på arbeidsoppgaver er implementering av nye
              tjenester på konsument- og produsentsiden av ESB’en, analyse av
              produksjonsfeil, oppbygning av nye skjermbilder, innfasing av nye
              prosjektmedlemmer og integrering mot et aksesspunkt for tjenester
              fra EU.
            </p>

            <p>
              <b>Teknologier: </b>
              DB2 Teknologier, ESB, Greenhopper, Hibernate, IBM WebSphere, JSF
              (Java Server Faces), Java 6, JavaScript, Maven 2, RichFaces/A4j,
              SOAP, SoapUI, Spring, Spring WebFlow, Subversion, Twitter
              bootstrap
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right"> 2009 – 2011 </span> Statens Vegvesen,
            System for kontroll av kjøretøy (VaDIS)
          </h4>

          <p>
            VaDIS er et IT-system som støtter gjennomføring av kontroller av
            førere og kjøretøy på norske veier. Håndholdte terminaler (PDA’er)
            kommuniserer trådløst mot sentrale systemer. VaDIS støtter en rekke
            kontrolltyper, teknisk tilstand på kjøretøy og last, samt førerens
            adferd gjennom kjøre- og hviletidskontroller. Dette innebærer blant
            annet at digitale sjåførkort leses og valideres i løpet av selve
            kontrollen. VaDIS inneholder også en web-løsning med moduler for
            kontrollvirksomheten, administrasjon, saksbehandling og statistikk.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg jobbet med videreutvikling og testing av VaDIS systemet. Hadde
              hovedansvaret for implementeringen av en tidslinjekomponent i Flex
              og integreringen av denne komponenten med en Java EE arkitektur.
              Det siste året jobbet jeg med planlegging og implementering av et
              grensesnitt for utføring av kontroller på web der fokus var
              gjenkjennelighet, rikt grensesnitt og stabilitet.
            </p>

            <p>
              <b>Teknologier: </b>
              BlazeDS, Confluence, DWR, Flex, Hibernate, JSP (Java Server
              Pages), Java 5, JavaScript, Maven2, Spring, Struts, jQuery UI
            </p>
          </div>
        </div>
        <div className="project">
          <h4>
            <span className="pull-right"> 2007 – 2008 </span> Mattilsynet, MATS{' '}
          </h4>

          <p>
            MATS – Mattilsynets tilsynssystem er et fagsystem som vil erstatte
            ca. 30 eksisterende systemer, samordne alle virksomheter som
            Mattilsynet fører tilsyn med og vil være springbrettet for en mer
            effektiv forvaltning av ca 1000 forskrifter innen mattrygghet og
            dyrevern. Fagsystemet bygger på Computas rammeverk for arbeidsflyt
            og prosesstøtte FrameSolutions, satt inn i en SOA arkitektur.
            Fagsystemet utvikles i Java og en rekke teknologier knyttet til Java
            EE blir brukt. Prosjektet tok også i bruk smidige metoder.
          </p>

          <div className="role">
            <p>
              <b>Rolle: </b>
              Jeg jobbet på prosjektet i et år både som sommerjobb og
              deltidsjobb ved siden av studiene. Arbeidsoppgavene besto blant
              annet av automatisk funksjonell webtesting, ytelsestesting,
              forbedring av webgrensesnitt, rapportgenerering, samt
              implementering og forbedring av regelstyrte arbeidsprosesser.
            </p>

            <p>
              <b>Teknologier: </b>
              EJB3, FrameSolutions, JBoss, Java 6, Ruby, Watir
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>Karriereerfaring</h2>
        </header>
        <dl className="dl-horizontal">
          <dt>2009 – dd</dt>
          <dd>Knowit, Konsulent</dd>
          <dt>2007 – 2008</dt>
          <dd>Computas AS, Deltidsjobb</dd>
        </dl>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>Utdannelse</h2>
        </header>
        <dl className="dl-horizontal">
          <dt>2004 – 2009</dt>
          <dd>
            Universitet i Oslo, Master i informatikk{' '}
            <p>
              Masteroppgave: Brukerkontroll i kontekstsensitive mobile
              nettjenster
            </p>
          </dd>
        </dl>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>Foredrag</h2>
        </header>
        <div>
          <dl className="dl-horizontal">
            <dt>2014</dt>
            <dd>
              Knowit Developer Summit -{' '}
              <a href="http://oyvinmar.github.io/gulpjs-presentation/">
                Gulp.js
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section className="row">
      <div className="col-md-12">
        <header>
          <h2>Språkkunnskaper</h2>
        </header>

        <div>
          <dl className="dl-horizontal">
            <dt>Norsk</dt>
            <dd>Morsmål</dd>
            <dt>Engelsk</dt>
            <dd>Flytende</dd>
          </dl>
        </div>
      </div>
    </section>
  </div>
);

CV.propTypes = {};

export default CV;
