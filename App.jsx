import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#080d18", bgCard:"#0f1623", goldDim:"rgba(255,215,0,0.1)", goldBorder:"rgba(255,215,0,0.25)",
  gold:"#FFD700", blue:"#1D3D8F", blueLight:"#4A7FE8", blueDim:"rgba(74,127,232,0.15)",
  green:"#2ECC71", white:"#EFF4FF", gray:"#7A8599", grayDark:"#1E2A3E", red:"#E63946",
};

const SB_URL = "https://asntocdbpqnawneyszpx.supabase.co";
const AF_KEY = "a70341b45b99eafecf1871bb317700b3";
const AF_URL = "https://v3.football.api-sports.io";
const WC_LEAGUE = 1;
const WC_SEASON = 2026;
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbnRvY2RicHFuYXduZXlzenB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDAwMjQsImV4cCI6MjA5NjExNjAyNH0.PKBJ6s2zEbETWmzKlqhaQGNMH6yfrlCgbZdZWKZdDjo";

const TEAMS = [
  {flag:"🇲🇽",name:"México",group:"A"},{flag:"🇿🇦",name:"Sudáfrica",group:"A"},{flag:"🇰🇷",name:"Corea del Sur",group:"A"},{flag:"🇨🇿",name:"Chequia",group:"A"},
  {flag:"🇨🇦",name:"Canadá",group:"B"},{flag:"🇧🇦",name:"Bosnia",group:"B"},{flag:"🇶🇦",name:"Qatar",group:"B"},{flag:"🇨🇭",name:"Suiza",group:"B"},
  {flag:"🇧🇷",name:"Brasil",group:"C"},{flag:"🇲🇦",name:"Marruecos",group:"C"},{flag:"🇭🇹",name:"Haití",group:"C"},{flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",name:"Escocia",group:"C"},
  {flag:"🇺🇸",name:"USA",group:"D"},{flag:"🇵🇾",name:"Paraguay",group:"D"},{flag:"🇦🇺",name:"Australia",group:"D"},{flag:"🇹🇷",name:"Turquía",group:"D"},
  {flag:"🇩🇪",name:"Alemania",group:"E"},{flag:"🇨🇼",name:"Curazao",group:"E"},{flag:"🇨🇮",name:"Costa de Marfil",group:"E"},{flag:"🇪🇨",name:"Ecuador",group:"E"},
  {flag:"🇳🇱",name:"Países Bajos",group:"F"},{flag:"🇯🇵",name:"Japón",group:"F"},{flag:"🇸🇪",name:"Suecia",group:"F"},{flag:"🇹🇳",name:"Túnez",group:"F"},
  {flag:"🇧🇪",name:"Bélgica",group:"G"},{flag:"🇪🇬",name:"Egipto",group:"G"},{flag:"🇮🇷",name:"Irán",group:"G"},{flag:"🇳🇿",name:"N.Zelanda",group:"G"},
  {flag:"🇪🇸",name:"España",group:"H"},{flag:"🇨🇻",name:"Cabo Verde",group:"H"},{flag:"🇸🇦",name:"Arabia Saudita",group:"H"},{flag:"🇺🇾",name:"Uruguay",group:"H"},
  {flag:"🇫🇷",name:"Francia",group:"I"},{flag:"🇸🇳",name:"Senegal",group:"I"},{flag:"🇮🇶",name:"Irak",group:"I"},{flag:"🇳🇴",name:"Noruega",group:"I"},
  {flag:"🇦🇷",name:"Argentina",group:"J"},{flag:"🇩🇿",name:"Argelia",group:"J"},{flag:"🇦🇹",name:"Austria",group:"J"},{flag:"🇯🇴",name:"Jordania",group:"J"},
  {flag:"🇵🇹",name:"Portugal",group:"K"},{flag:"🇨🇩",name:"DR Congo",group:"K"},{flag:"🇺🇿",name:"Uzbekistán",group:"K"},{flag:"🇨🇴",name:"Colombia",group:"K"},
  {flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",name:"Inglaterra",group:"L"},{flag:"🇭🇷",name:"Croacia",group:"L"},{flag:"🇬🇭",name:"Ghana",group:"L"},{flag:"🇵🇦",name:"Panamá",group:"L"},
];

const MATCHES = [
  {id:1,date:"Jun 11",time:"15:00 ET",group:"A",home:"México",away:"Sudáfrica",hf:"🇲🇽",af:"🇿🇦",venue:"Estadio Azteca",country:"México",hs:null,as:null},
  {id:2,date:"Jun 11",time:"22:00 ET",group:"A",home:"Corea del Sur",away:"Chequia",hf:"🇰🇷",af:"🇨🇿",venue:"Zapopan",country:"México",hs:null,as:null},
  {id:3,date:"Jun 12",time:"15:00 ET",group:"B",home:"Canadá",away:"Bosnia",hf:"🇨🇦",af:"🇧🇦",venue:"Toronto",country:"Canadá",hs:null,as:null},
  {id:4,date:"Jun 12",time:"21:00 ET",group:"D",home:"USA",away:"Paraguay",hf:"🇺🇸",af:"🇵🇾",venue:"Inglewood",country:"USA",hs:null,as:null},
  {id:5,date:"Jun 13",time:"15:00 ET",group:"B",home:"Qatar",away:"Suiza",hf:"🇶🇦",af:"🇨🇭",venue:"Santa Clara",country:"USA",hs:null,as:null},
  {id:6,date:"Jun 13",time:"18:00 ET",group:"C",home:"Brasil",away:"Marruecos",hf:"🇧🇷",af:"🇲🇦",venue:"East Rutherford",country:"USA",hs:null,as:null},
  {id:7,date:"Jun 14",time:"13:00 ET",group:"E",home:"Alemania",away:"Curazao",hf:"🇩🇪",af:"🇨🇼",venue:"Houston",country:"USA",hs:null,as:null},
  {id:8,date:"Jun 14",time:"16:00 ET",group:"F",home:"Países Bajos",away:"Japón",hf:"🇳🇱",af:"🇯🇵",venue:"Arlington",country:"USA",hs:null,as:null},
  {id:9,date:"Jun 15",time:"13:00 ET",group:"H",home:"España",away:"Cabo Verde",hf:"🇪🇸",af:"🇨🇻",venue:"Atlanta",country:"USA",hs:null,as:null},
  {id:10,date:"Jun 15",time:"18:00 ET",group:"G",home:"Bélgica",away:"Egipto",hf:"🇧🇪",af:"🇪🇬",venue:"Seattle",country:"USA",hs:null,as:null},
  {id:11,date:"Jun 16",time:"15:00 ET",group:"I",home:"Francia",away:"Senegal",hf:"🇫🇷",af:"🇸🇳",venue:"East Rutherford",country:"USA",hs:null,as:null},
  {id:12,date:"Jun 16",time:"21:00 ET",group:"J",home:"Argentina",away:"Argelia",hf:"🇦🇷",af:"🇩🇿",venue:"Kansas City",country:"USA",hs:null,as:null},
  {id:13,date:"Jun 17",time:"13:00 ET",group:"K",home:"Portugal",away:"DR Congo",hf:"🇵🇹",af:"🇨🇩",venue:"Houston",country:"USA",hs:null,as:null},
  {id:14,date:"Jun 17",time:"16:00 ET",group:"L",home:"Inglaterra",away:"Croacia",hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",af:"🇭🇷",venue:"Arlington",country:"USA",hs:null,as:null},
  {id:15,date:"Jun 18",time:"15:00 ET",group:"A",home:"México",away:"Corea del Sur",hf:"🇲🇽",af:"🇰🇷",venue:"Zapopan",country:"México",hs:null,as:null},
  {id:16,date:"Jun 19",time:"15:00 ET",group:"C",home:"Brasil",away:"Haití",hf:"🇧🇷",af:"🇭🇹",venue:"Philadelphia",country:"USA",hs:null,as:null},
  {id:17,date:"Jun 20",time:"16:00 ET",group:"F",home:"Países Bajos",away:"Suecia",hf:"🇳🇱",af:"🇸🇪",venue:"Houston",country:"USA",hs:null,as:null},
  {id:18,date:"Jun 21",time:"12:00 ET",group:"H",home:"España",away:"Arabia Saudita",hf:"🇪🇸",af:"🇸🇦",venue:"Atlanta",country:"USA",hs:null,as:null},
  {id:19,date:"Jun 22",time:"17:00 ET",group:"I",home:"Francia",away:"Irak",hf:"🇫🇷",af:"🇮🇶",venue:"Philadelphia",country:"USA",hs:null,as:null},
  {id:20,date:"Jun 23",time:"16:00 ET",group:"L",home:"Inglaterra",away:"Ghana",hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",af:"🇬🇭",venue:"Foxborough",country:"USA",hs:null,as:null},
];

// Jugadores oficiales FIFA 2026
const PLAYERS = {
  "Argentina":{flag:"🇦🇷",players:[
    {num:1,name:"E. Martínez",pos:"GK",club:"Aston Villa (ENG)"},{num:12,name:"Rulli",pos:"GK",club:"Olympique Marseille (FRA)"},{num:23,name:"Musso",pos:"GK",club:"Atlético Madrid (ESP)"},
    {num:2,name:"Molina",pos:"DEF",club:"Atlético Madrid (ESP)"},{num:3,name:"Tagliafico",pos:"DEF",club:"Olympique Lyon (FRA)"},{num:4,name:"Montiel",pos:"DEF",club:"River Plate (ARG)"},{num:6,name:"L. Martínez",pos:"DEF",club:"Manchester United (ENG)"},{num:13,name:"Romero",pos:"DEF",club:"Tottenham (ENG)"},{num:19,name:"Otamendi",pos:"DEF",club:"Benfica (POR)"},{num:25,name:"Medina",pos:"DEF",club:"Olympique Marseille (FRA)"},
    {num:5,name:"Paredes",pos:"MID",club:"Boca Juniors (ARG)"},{num:7,name:"De Paul",pos:"MID",club:"Inter Miami (USA)"},{num:8,name:"Barco",pos:"MID",club:"RC Strasbourg (FRA)"},{num:11,name:"Lo Celso",pos:"MID",club:"Real Betis (ESP)"},{num:14,name:"Palacios",pos:"MID",club:"Bayer Leverkusen (GER)"},{num:20,name:"Mac Allister",pos:"MID",club:"Liverpool (ENG)"},{num:24,name:"E. Fernández",pos:"MID",club:"Chelsea (ENG)"},
    {num:9,name:"J. Álvarez",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:10,name:"Messi",pos:"FWD",club:"Inter Miami (USA)"},{num:15,name:"N. González",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:16,name:"Almada",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:17,name:"G. Simeone",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:18,name:"Nico Paz",pos:"FWD",club:"Como (ITA)"},{num:21,name:"López",pos:"FWD",club:"Palmeiras (BRA)"},{num:22,name:"L. Martínez",pos:"FWD",club:"Inter Milán (ITA)"},
  ]},
  "México":{flag:"🇲🇽",players:[
    {num:1,name:"Ochoa",pos:"GK",club:"América (MEX)"},{num:13,name:"Malagón",pos:"GK",club:"América (MEX)"},
    {num:2,name:"J. Sánchez",pos:"DEF",club:"Atlas (MEX)"},{num:3,name:"C. Montes",pos:"DEF",club:"Monterrey (MEX)"},{num:4,name:"E. Álvarez",pos:"DEF",club:"Borussia Dortmund (GER)"},{num:5,name:"Arteaga",pos:"DEF",club:"Genk (BEL)"},
    {num:7,name:"C. Rodríguez",pos:"MID",club:"Tigres (MEX)"},{num:8,name:"O. Pineda",pos:"MID",club:"Cruz Azul (MEX)"},{num:16,name:"H. Herrera",pos:"MID",club:"LAFC (USA)"},{num:18,name:"Romo",pos:"MID",club:"Cruz Azul (MEX)"},
    {num:9,name:"H. Lozano",pos:"FWD",club:"PSV Eindhoven (NED)"},{num:10,name:"R. Jiménez",pos:"FWD",club:"Fulham (ENG)"},{num:17,name:"S. Giménez",pos:"FWD",club:"Feyenoord (NED)"},{num:21,name:"H. Martín",pos:"FWD",club:"América (MEX)"},
  ]},
  "Brasil":{flag:"🇧🇷",players:[
    {num:1,name:"Alisson",pos:"GK",club:"Liverpool (ENG)"},{num:23,name:"Ederson",pos:"GK",club:"Manchester City (ENG)"},
    {num:2,name:"Danilo",pos:"DEF",club:"Flamengo (BRA)"},{num:3,name:"Thiago Silva",pos:"DEF",club:"Fluminense (BRA)"},{num:4,name:"Marquinhos",pos:"DEF",club:"PSG (FRA)"},{num:14,name:"Militão",pos:"DEF",club:"Real Madrid (ESP)"},
    {num:5,name:"Casemiro",pos:"MID",club:"Manchester United (ENG)"},{num:10,name:"Paquetá",pos:"MID",club:"West Ham (ENG)"},{num:17,name:"B. Guimarães",pos:"MID",club:"Newcastle (ENG)"},
    {num:9,name:"Richarlison",pos:"FWD",club:"Tottenham (ENG)"},{num:11,name:"Rodrygo",pos:"FWD",club:"Real Madrid (ESP)"},{num:20,name:"Vinicius Jr.",pos:"FWD",club:"Real Madrid (ESP)"},
  ]},
  "Francia":{flag:"🇫🇷",players:[
    {num:1,name:"Lloris",pos:"GK",club:"Tottenham (ENG)"},{num:16,name:"Maignan",pos:"GK",club:"AC Milan (ITA)"},
    {num:2,name:"Pavard",pos:"DEF",club:"Inter Milán (ITA)"},{num:4,name:"Varane",pos:"DEF",club:"Retired"},{num:5,name:"Konaté",pos:"DEF",club:"Liverpool (ENG)"},{num:22,name:"T. Hernández",pos:"DEF",club:"AC Milan (ITA)"},
    {num:8,name:"Tchouaméni",pos:"MID",club:"Real Madrid (ESP)"},{num:14,name:"Rabiot",pos:"MID",club:"Juventus (ITA)"},{num:17,name:"Camavinga",pos:"MID",club:"Real Madrid (ESP)"},
    {num:7,name:"Griezmann",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:10,name:"Mbappé",pos:"FWD",club:"Real Madrid (ESP)"},{num:11,name:"M. Thuram",pos:"FWD",club:"Inter Milán (ITA)"},
  ]},
  "España":{flag:"🇪🇸",players:[
    {num:1,name:"Unai Simón",pos:"GK",club:"Athletic Bilbao (ESP)"},{num:13,name:"R. Sánchez",pos:"GK",club:"Brighton (ENG)"},
    {num:2,name:"Carvajal",pos:"DEF",club:"Real Madrid (ESP)"},{num:3,name:"Balde",pos:"DEF",club:"Barcelona (ESP)"},{num:4,name:"Laporte",pos:"DEF",club:"Al-Nassr (KSA)"},{num:14,name:"Pau Torres",pos:"DEF",club:"Aston Villa (ENG)"},
    {num:5,name:"Busquets",pos:"MID",club:"Inter Miami (USA)"},{num:6,name:"Gavi",pos:"MID",club:"Barcelona (ESP)"},{num:8,name:"Pedri",pos:"MID",club:"Barcelona (ESP)"},
    {num:7,name:"Á. Morata",pos:"FWD",club:"AC Milan (ITA)"},{num:11,name:"F. Torres",pos:"FWD",club:"Barcelona (ESP)"},{num:20,name:"N. Williams",pos:"FWD",club:"Athletic Bilbao (ESP)"},
  ]},
  "Portugal":{flag:"🇵🇹",players:[
    {num:1,name:"Rui Patrício",pos:"GK",club:"Roma (ITA)"},{num:12,name:"D. Costa",pos:"GK",club:"Porto (POR)"},
    {num:3,name:"Pepe",pos:"DEF",club:"Retired"},{num:4,name:"Rúben Dias",pos:"DEF",club:"Manchester City (ENG)"},{num:19,name:"N. Mendes",pos:"DEF",club:"PSG (FRA)"},{num:20,name:"Cancelo",pos:"DEF",club:"Barcelona (ESP)"},
    {num:10,name:"B. Silva",pos:"MID",club:"Manchester City (ENG)"},{num:11,name:"João Félix",pos:"MID",club:"Chelsea (ENG)"},{num:16,name:"Vitinha",pos:"MID",club:"PSG (FRA)"},
    {num:7,name:"C. Ronaldo",pos:"FWD",club:"Al-Nassr (KSA)"},{num:9,name:"G. Ramos",pos:"FWD",club:"PSG (FRA)"},{num:17,name:"R. Leão",pos:"FWD",club:"AC Milan (ITA)"},
  ]},
  "Alemania":{flag:"🇩🇪",players:[
    {num:1,name:"Neuer",pos:"GK",club:"Bayern München (GER)"},{num:22,name:"Ter Stegen",pos:"GK",club:"Barcelona (ESP)"},
    {num:2,name:"Rüdiger",pos:"DEF",club:"Real Madrid (ESP)"},{num:4,name:"Schlotterbeck",pos:"DEF",club:"Borussia Dortmund (GER)"},{num:6,name:"Kimmich",pos:"DEF",club:"Bayern München (GER)"},{num:13,name:"Raum",pos:"DEF",club:"RB Leipzig (GER)"},
    {num:8,name:"Goretzka",pos:"MID",club:"Bayern München (GER)"},{num:10,name:"F. Wirtz",pos:"MID",club:"Bayer Leverkusen (GER)"},{num:21,name:"Gündogan",pos:"MID",club:"Barcelona (ESP)"},
    {num:9,name:"K. Havertz",pos:"FWD",club:"Arsenal (ENG)"},{num:14,name:"J. Musiala",pos:"FWD",club:"Bayern München (GER)"},{num:19,name:"L. Sané",pos:"FWD",club:"Bayern München (GER)"},
  ]},
  "Inglaterra":{flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",players:[
    {num:1,name:"Pickford",pos:"GK",club:"Everton (ENG)"},{num:22,name:"Nick Pope",pos:"GK",club:"Newcastle (ENG)"},
    {num:2,name:"R. James",pos:"DEF",club:"Chelsea (ENG)"},{num:5,name:"Stones",pos:"DEF",club:"Manchester City (ENG)"},{num:6,name:"Maguire",pos:"DEF",club:"Manchester United (ENG)"},{num:23,name:"Luke Shaw",pos:"DEF",club:"Manchester United (ENG)"},
    {num:4,name:"D. Rice",pos:"MID",club:"Arsenal (ENG)"},{num:19,name:"M. Mount",pos:"MID",club:"Manchester United (ENG)"},{num:22,name:"Bellingham",pos:"MID",club:"Real Madrid (ESP)"},
    {num:9,name:"H. Kane",pos:"FWD",club:"Bayern München (GER)"},{num:17,name:"B. Saka",pos:"FWD",club:"Arsenal (ENG)"},{num:20,name:"P. Foden",pos:"FWD",club:"Manchester City (ENG)"},
  ]},
  "Bélgica":{flag:"🇧🇪",players:[
    {num:1,name:"Courtois",pos:"GK",club:"Real Madrid (ESP)"},{num:2,name:"Lammens",pos:"GK",club:"Manchester United (ENG)"},
    {num:2,name:"Debast",pos:"DEF",club:"Sporting CP (POR)"},{num:3,name:"Theate",pos:"DEF",club:"Eintracht Frankfurt (GER)"},{num:4,name:"Mechele",pos:"DEF",club:"Club Brugge (BEL)"},{num:21,name:"Castagne",pos:"DEF",club:"Fulham (ENG)"},
    {num:6,name:"Witsel",pos:"MID",club:"Girona (ESP)"},{num:7,name:"De Bruyne",pos:"MID",club:"SSC Napoli (ITA)"},{num:8,name:"Tielemans",pos:"MID",club:"Aston Villa (ENG)"},
    {num:9,name:"Lukaku",pos:"FWD",club:"SSC Napoli (ITA)"},{num:10,name:"Trossard",pos:"FWD",club:"Arsenal (ENG)"},{num:11,name:"Doku",pos:"FWD",club:"Manchester City (ENG)"},
  ]},
  "Países Bajos":{flag:"🇳🇱",players:[
    {num:1,name:"Flekken",pos:"GK",club:"Brentford (ENG)"},{num:16,name:"Bijlow",pos:"GK",club:"Feyenoord (NED)"},
    {num:2,name:"Dumfries",pos:"DEF",club:"Inter Milán (ITA)"},{num:4,name:"De Ligt",pos:"DEF",club:"Manchester United (ENG)"},{num:5,name:"Van Dijk",pos:"DEF",club:"Liverpool (ENG)"},{num:22,name:"Blind",pos:"DEF",club:"Girona (ESP)"},
    {num:6,name:"F. de Jong",pos:"MID",club:"Barcelona (ESP)"},{num:8,name:"Schouten",pos:"MID",club:"Bologna (ITA)"},{num:10,name:"Simons",pos:"MID",club:"RB Leipzig (GER)"},
    {num:9,name:"Depay",pos:"FWD",club:"Atlético Madrid (ESP)"},{num:11,name:"Bergwijn",pos:"FWD",club:"Al-Ittihad (KSA)"},{num:17,name:"Gakpo",pos:"FWD",club:"Liverpool (ENG)"},
  ]},
  "USA":{flag:"🇺🇸",players:[
    {num:1,name:"Turner",pos:"GK",club:"Arsenal (ENG)"},{num:18,name:"Horvath",pos:"GK",club:"Nottm Forest (ENG)"},
    {num:2,name:"Dest",pos:"DEF",club:"PSV Eindhoven (NED)"},{num:5,name:"Zimmerman",pos:"DEF",club:"Nashville SC (USA)"},{num:14,name:"Richards",pos:"DEF",club:"Manchester City (ENG)"},{num:15,name:"Long",pos:"DEF",club:"Nashville SC (USA)"},
    {num:4,name:"Adams",pos:"MID",club:"Juventus (ITA)"},{num:8,name:"McKennie",pos:"MID",club:"Juventus (ITA)"},{num:10,name:"Reyna",pos:"MID",club:"Borussia Dortmund (GER)"},
    {num:9,name:"Sargent",pos:"FWD",club:"Norwich City (ENG)"},{num:11,name:"Weah",pos:"FWD",club:"Juventus (ITA)"},{num:22,name:"Pulisic",pos:"FWD",club:"AC Milan (ITA)"},
  ]},
  "Canadá":{flag:"🇨🇦",players:[
    {num:1,name:"Borjan",pos:"GK",club:"Crvena zvezda (SRB)"},{num:13,name:"St-Clair",pos:"GK",club:"Celtic (SCO)"},
    {num:2,name:"Johnston",pos:"DEF",club:"Celtic (SCO)"},{num:5,name:"Vitoria",pos:"DEF",club:"Anderlecht (BEL)"},{num:6,name:"Miller",pos:"DEF",club:"Wolfsburg (GER)"},{num:12,name:"Adekugbe",pos:"DEF",club:"Fenerbahçe (TUR)"},
    {num:4,name:"Eustaquio",pos:"MID",club:"Porto (POR)"},{num:8,name:"Osorio",pos:"MID",club:"Real Betis (ESP)"},{num:10,name:"Laryea",pos:"MID",club:"Toronto FC (CAN)"},
    {num:9,name:"Cyle Larin",pos:"FWD",club:"Valladolid (ESP)"},{num:11,name:"Buchanan",pos:"FWD",club:"Inter Milán (ITA)"},{num:14,name:"David",pos:"FWD",club:"Lille (FRA)"},
  ]},
};

// Equipos sin plantilla completa
["Sudáfrica","Corea del Sur","Chequia","Bosnia","Qatar","Suiza","Marruecos","Haití","Escocia","Paraguay","Australia","Turquía","Curazao","Costa de Marfil","Ecuador","Japón","Suecia","Túnez","Egipto","Irán","N.Zelanda","Cabo Verde","Arabia Saudita","Uruguay","Senegal","Irak","Noruega","Argelia","Austria","Jordania","DR Congo","Uzbekistán","Colombia","Croacia","Ghana","Panamá"].forEach(name=>{
  if(!PLAYERS[name]) {
    const t = TEAMS.find(x=>x.name===name);
    PLAYERS[name]={flag:t?.flag||"🏳️",players:[
      {num:1,name:"Portero 1",pos:"GK",club:"Por confirmar"},{num:4,name:"Defensa 1",pos:"DEF",club:"Por confirmar"},
      {num:8,name:"Mediocampista 1",pos:"MID",club:"Por confirmar"},{num:9,name:"Delantero 1",pos:"FWD",club:"Por confirmar"},
    ]};
  }
});

const COLORS = {
  "México":["#006847","#CE1126"],"Argentina":["#74ACDF","#2D6DB3"],"Brasil":["#009C3B","#FFDF00"],
  "Francia":["#002395","#ED2939"],"España":["#AA151B","#F1BF00"],"Portugal":["#006600","#FF0000"],
  "Alemania":["#333","#DD0000"],"Inglaterra":["#012169","#CF091B"],"Canadá":["#CC0000","#8B0000"],
  "USA":["#B22234","#3C3B6E"],"Sudáfrica":["#007A4D","#FFB81C"],"Corea del Sur":["#C60C30","#003478"],
  "Chequia":["#D7141A","#11457E"],"Bosnia":["#002395","#FFCD00"],"Qatar":["#8D1B3D","#C8A217"],
  "Suiza":["#FF0000","#8B0000"],"Marruecos":["#C1272D","#006233"],"Haití":["#00209F","#D21034"],
  "Escocia":["#003087","#001F5F"],"Paraguay":["#D52B1E","#0038A8"],"Australia":["#00843D","#FFD700"],
  "Turquía":["#E30A17","#8B0000"],"Curazao":["#003DA5","#F9E814"],"Costa de Marfil":["#F77F00","#009A44"],
  "Ecuador":["#FFD100","#003893"],"Países Bajos":["#FF4500","#CC3700"],"Japón":["#BC002D","#8B001F"],
  "Suecia":["#006AA7","#004F7C"],"Túnez":["#E70013","#8B000A"],"Bélgica":["#EF3340","#111"],
  "Egipto":["#CE1126","#8B000B"],"Irán":["#239F40","#DA0000"],"N.Zelanda":["#00247D","#CC142B"],
  "Cabo Verde":["#003893","#CF2027"],"Arabia Saudita":["#006C35","#004A24"],"Uruguay":["#75AADB","#4A88CC"],
  "Senegal":["#00853F","#FDEF42"],"Irak":["#CE1126","#007A3D"],"Noruega":["#EF2B2D","#003680"],
  "Argelia":["#006233","#D21034"],"Austria":["#ED2939","#B71C1C"],"Jordania":["#007A3D","#CE1126"],
  "DR Congo":["#007FFF","#0057B3"],"Uzbekistán":["#1EB53A","#009A2E"],"Colombia":["#FCD116","#003087"],
  "Croacia":["#FF0000","#171796"],"Ghana":["#006B3F","#CF0921"],"Panamá":["#DA121A","#001689"],
  "USA":["#B22234","#3C3B6E"],"Canadá":["#CC0000","#8B0000"],
};

const PC = {GK:"#F59E0B",DEF:"#3B82F6",MID:"#10B981",FWD:"#EF4444"};
const PL = {GK:"Portero",DEF:"Defensa",MID:"Mediocampista",FWD:"Delantero"};
const TIPS = ["¿Quién ganará el Mundial 2026?","¿Cuáles son los favoritos?","Analiza México vs Sudáfrica","¿Quién será el goleador?","¿Cómo funciona la Ronda de 32?","Compara Messi y Mbappé"];

// ─── NOTIFICACIONES ────────────────────────────────────────────────────────────
function scheduleNotif(match, minsBefore) {
  if(!("Notification" in window) || Notification.permission !== "granted") return;
  const [h,m] = match.time.replace(" ET","").split(":").map(Number);
  const dateStr = `2026-${match.date.replace("Jun","06").replace("Jul","07").trim()}-${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`;
  const matchTime = new Date(`2026-06-${match.date.includes("Jun") ? match.date.split(" ")[1].padStart(2,"0") : "11"}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00`);
  const notifTime = new Date(matchTime.getTime() - minsBefore * 60000);
  const now = new Date();
  const delay = notifTime - now;
  if(delay > 0 && delay < 86400000) {
    setTimeout(()=>{
      new Notification(`⚽ ${minsBefore === 30 ? "30 min para" : "¡Arranca en 5 min!"} ${match.home} vs ${match.away}`, {
        body: minsBefore === 30 ? `${match.venue} · ${match.time} ET` : "¡Ya casi! Cierra tus predicciones ahora",
        icon: "⚽"
      });
    }, delay);
  }
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("es");
  const [notifs, setNotifs] = useState(true);
  const [user, setUser] = useState(null);
  const [showOnboard, setShowOnboard] = useState(false);
  const [anim, setAnim] = useState(false);
  const [matches, setMatches] = useState(() => { try{const s=localStorage.getItem("wc26_m");return s?JSON.parse(s):MATCHES;}catch(e){return MATCHES;} });
  const [preds, setPreds] = useState(() => { try{const s=localStorage.getItem("wc26_p");return s?JSON.parse(s):{};}catch(e){return {};} });
  const [rooms, setRooms] = useState(() => { try{const s=localStorage.getItem("wc26_r");return s?JSON.parse(s):[];}catch(e){return [];} });

  const t = (es,en) => lang==="es"?es:en;

  useEffect(()=>{
    try{const u=localStorage.getItem("wc26_user");if(u)setUser(JSON.parse(u));else setShowOnboard(true);}
    catch(e){setShowOnboard(true);}
  },[]);

  useEffect(()=>{
    if(notifs && "Notification" in window && Notification.permission==="granted") {
      matches.forEach(m => {
        if(m.hs===null) { scheduleNotif(m,30); scheduleNotif(m,5); }
      });
    }
  },[notifs,matches]);

  const saveM=(m)=>{setMatches(m);try{localStorage.setItem("wc26_m",JSON.stringify(m));}catch(e){}};
  const saveP=(p)=>{setPreds(p);try{localStorage.setItem("wc26_p",JSON.stringify(p));}catch(e){}};
  const saveR=(r)=>{setRooms(r);try{localStorage.setItem("wc26_r",JSON.stringify(r));}catch(e){}};

  const handlePred=(id,pick)=>{if(!user){setShowOnboard(true);return;}saveP({...preds,[id]:pick});};
  const handleResult=(id,hs,as2)=>saveM(matches.map(m=>m.id===id?{...m,hs,as:as2}:m));
  const handleUser=(u)=>{
    const userData={...u,flag:typeof u.flag==="string"?u.flag:"🌍",id:u.id||u.user_id||Date.now()+""};
    if(!u.isGuest){try{localStorage.setItem("wc26_user",JSON.stringify(userData));}catch(e){}}
    setUser(userData);setShowOnboard(false);
  };
  const goTab=(id)=>{setAnim(true);setTimeout(()=>{setTab(id);setAnim(false);},120);};

  const tabs=[
    {id:"home",icon:"🏠",label:t("Inicio","Home")},
    {id:"calendar",icon:"📅",label:t("Partidos","Matches")},
    {id:"groups",icon:"👥",label:t("Grupos","Groups")},
    {id:"album",icon:"🃏",label:t("Álbum","Album")},
    {id:"stats",icon:"📊",label:t("Stats","Stats")},
    {id:"bracket",icon:"🏆",label:"Bracket"},
    {id:"ai",icon:"🤖",label:"IA"},
  ];

  if(showOnboard) return <Onboarding t={t} onDone={handleUser}/>;

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif",color:C.white,maxWidth:480,margin:"0 auto"}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:rgba(255,215,0,0.2);border-radius:3px}
        input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
      `}</style>
      <div style={{background:"linear-gradient(135deg,#080f1f,#12213a)",padding:"10px 14px 8px",borderBottom:`2px solid ${C.gold}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:22,filter:"drop-shadow(0 0 8px rgba(255,215,0,0.5))"}}>🏆</span>
            <div><div style={{fontSize:14,fontWeight:900,color:C.gold,letterSpacing:2,lineHeight:1}}>MUNDIAL 2026</div><div style={{fontSize:9,color:C.gray,letterSpacing:2}}>🇲🇽 🇺🇸 🇨🇦</div></div>
          </div>
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            {user&&<button onClick={()=>{try{localStorage.removeItem("wc26_user");}catch(e){}window.location.reload();}} style={{fontSize:10,color:C.gold,background:C.goldDim,padding:"2px 8px",borderRadius:20,border:`1px solid ${C.goldBorder}`,cursor:"pointer"}}>{user.flag} {user.name} ✕</button>}
            <button onClick={()=>setLang(l=>l==="es"?"en":"es")} style={{background:C.grayDark,border:"none",color:C.white,padding:"3px 7px",borderRadius:20,fontSize:11,cursor:"pointer",fontWeight:700}}>{lang==="es"?"EN":"ES"}</button>
            <button onClick={async()=>{
              if("Notification" in window){
                const p=await Notification.requestPermission();
                setNotifs(p==="granted");
              }
            }} style={{background:"none",border:"none",fontSize:16,cursor:"pointer"}}>{notifs?"🔔":"🔕"}</button>
          </div>
        </div>
      </div>
      <div style={{padding:"0 0 80px",opacity:anim?0:1,transition:"opacity 0.15s"}}>
        {tab==="home"&&<HomeTab t={t} matches={matches} preds={preds} onPred={handlePred} rooms={rooms} user={user}/>}
        {tab==="calendar"&&<CalendarTab t={t} matches={matches} preds={preds} onPred={handlePred} onResult={handleResult}/>}
        {tab==="groups"&&<GroupsTab t={t} rooms={rooms} setRooms={saveR} user={user} preds={preds} matches={matches}/>}
        {tab==="album"&&<AlbumTab t={t}/>}
        {tab==="stats"&&<StatsTab t={t}/>}
        {tab==="bracket"&&<BracketTab t={t}/>}
        {tab==="ai"&&<AITab t={t} lang={lang}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(8,13,24,0.97)",borderTop:`1px solid ${C.grayDark}`,display:"flex",zIndex:100}}>
        {tabs.map(tb=>(
          <button key={tb.id} onClick={()=>goTab(tb.id)} style={{flex:1,padding:"7px 2px 9px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:tab===tb.id?18:16,filter:tab===tb.id?"none":"grayscale(1) opacity(0.35)",transition:"all 0.2s"}}>{tb.icon}</span>
            <span style={{fontSize:7,color:tab===tb.id?C.gold:C.gray,fontWeight:tab===tb.id?800:400}}>{tb.label}</span>
            <div style={{width:tab===tb.id?16:0,height:2,background:C.gold,borderRadius:2,transition:"width 0.25s"}}/>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function Onboarding({t,onDone}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");const [pass,setPass]=useState("");
  const [name,setName]=useState("");const [flag,setFlag]=useState("");
  const [q,setQ]=useState("");const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");const [authData,setAuthData]=useState(null);
  const [forgotSent,setForgotSent]=useState(false);
  const filtered=TEAMS.filter(tm=>q===""||tm.name.toLowerCase().includes(q.toLowerCase()));

  const doLogin=async()=>{
    if(!email.trim()||!pass.trim())return;
    setLoading(true);setErr("");
    try{
      const res=await fetch(SB_URL+"/auth/v1/token?grant_type=password",{method:"POST",headers:{"Content-Type":"application/json","apikey":SB_KEY},body:JSON.stringify({email:email.trim(),password:pass.trim()})});
      const d=await res.json();
      if(!d.access_token){setErr(d.error_description||d.msg||t("Email o contrasena incorrectos","Wrong email or password"));setLoading(false);return;}
      const pRes=await fetch(SB_URL+"/rest/v1/profiles?user_id=eq."+d.user.id+"&limit=1",{headers:{"apikey":SB_KEY,"Authorization":"Bearer "+d.access_token}});
      const prof=await pRes.json();
      if(Array.isArray(prof)&&prof[0]){
        const u={...prof[0],flag:String(prof[0].flag||"🌍"),token:d.access_token,id:d.user.id};
        try{localStorage.setItem("wc26_user",JSON.stringify(u));}catch(e){}
        onDone(u);
      }else{setAuthData(d);setMode("profile");}
    }catch(e){setErr("Error: "+e.message);}
    setLoading(false);
  };

  const doRegister=async()=>{
    if(!email.trim()||pass.length<6){setErr(t("Contrasena min 6 caracteres","Password min 6 chars"));return;}
    setLoading(true);setErr("");
    try{
      const res=await fetch(SB_URL+"/auth/v1/signup",{method:"POST",headers:{"Content-Type":"application/json","apikey":SB_KEY},body:JSON.stringify({email:email.trim(),password:pass.trim()})});
      const d=await res.json();
      if(d.error){setErr(d.error_description||d.error);setLoading(false);return;}
      if(d.access_token){setAuthData(d);setMode("profile");}
      else setErr(t("Revisa tu email","Check your email"));
    }catch(e){setErr("Error: "+e.message);}
    setLoading(false);
  };

  const doProfile=async()=>{
    if(!name.trim()||!flag||!authData)return;
    setLoading(true);setErr("");
    try{
      const flagStr=typeof flag==="string"?flag:"🌍";
      const username=name.trim().toLowerCase().replace(/ +/g,"_")+"_"+Date.now().toString().slice(-4);
      const body={user_id:authData.user.id,name:name.trim(),flag:flagStr,username};
      const res=await fetch(SB_URL+"/rest/v1/profiles",{method:"POST",headers:{"Content-Type":"application/json","apikey":SB_KEY,"Authorization":"Bearer "+authData.access_token,"Prefer":"return=minimal"},body:JSON.stringify(body)});
      if(!res.ok&&res.status!==201){const e2=await res.json().catch(()=>({}));setErr(t("Error guardando perfil","Error saving profile")+": "+(e2.message||res.status));setLoading(false);return;}
      const u={...body,token:authData.access_token,id:authData.user.id};
      try{localStorage.setItem("wc26_user",JSON.stringify(u));}catch(e){}
      onDone(u);
    }catch(e){setErr("Error: "+e.message);}
    setLoading(false);
  };

  const doGuest=()=>onDone({id:"g"+Date.now(),name:t("Invitado","Guest"),flag:"🌍",username:"guest",isGuest:true});

  const doForgot=async()=>{
    if(!email.trim()){setErr(t("Escribe tu email primero","Enter your email first"));return;}
    setLoading(true);setErr("");
    try{
      const res=await fetch(SB_URL+"/auth/v1/recover",{
        method:"POST",
        headers:{"Content-Type":"application/json","apikey":SB_KEY},
        body:JSON.stringify({email:email.trim()})
      });
      if(res.ok){setForgotSent(true);}
      else{setErr(t("Error al enviar email","Error sending email"));}
    }catch(e){setErr("Error: "+e.message);}
    setLoading(false);
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060b16,#0d1b3e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"18px 14px 40px",overflowY:"auto"}}>
      <div style={{textAlign:"center",marginBottom:20,paddingTop:14}}>
        <div style={{fontSize:52,filter:"drop-shadow(0 0 24px rgba(255,215,0,0.5))"}}>🏆</div>
        <div style={{fontSize:24,fontWeight:900,color:C.gold,letterSpacing:4,marginTop:6}}>MUNDIAL 2026</div>
        <div style={{fontSize:11,color:C.gray,letterSpacing:3,marginTop:3}}>🇲🇽 🇺🇸 🇨🇦 JUN-JUL 2026</div>
      </div>
      <div style={{width:"100%",maxWidth:400,background:C.bgCard,borderRadius:20,padding:20,border:`1px solid ${C.grayDark}`}}>
        {mode!=="profile"?(
          <>
            <div style={{display:"flex",gap:6,marginBottom:16,background:C.grayDark,borderRadius:12,padding:4}}>
              {[["login",t("Iniciar sesion","Sign in")],["register",t("Registrarse","Sign up")]].map(([m,l])=>(
                <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"8px",borderRadius:9,border:"none",background:mode===m?C.bgCard:"transparent",color:mode===m?C.gold:C.gray,fontSize:13,fontWeight:mode===m?700:400,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
            <div style={{fontSize:11,color:C.gray,marginBottom:5}}>Email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="tu@email.com" onKeyDown={e=>e.key==="Enter"&&(mode==="login"?doLogin():doRegister())}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${email?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
            <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{t("Contrasena","Password")}</div>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&(mode==="login"?doLogin():doRegister())}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${pass?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}}/>
            {err&&<div style={{background:"rgba(230,57,70,0.15)",border:"1px solid rgba(230,57,70,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#FF6B7A",marginBottom:12}}>{err}</div>}
            <button onClick={mode==="login"?doLogin:doRegister} disabled={loading||!email.trim()||!pass.trim()}
              style={{width:"100%",padding:12,background:email&&pass?`linear-gradient(135deg,${C.gold},#FFA500)`:C.grayDark,border:"none",borderRadius:12,color:email&&pass?"#000":C.gray,fontSize:14,fontWeight:900,cursor:email&&pass?"pointer":"default",marginBottom:10}}>
              {loading?"⏳...":mode==="login"?t("Entrar","Sign in"):t("Crear cuenta","Create account")}
            </button>
            {mode==="login"&&(
              <div style={{textAlign:"center",marginBottom:8}}>
                {forgotSent?(
                  <div style={{background:"rgba(0,200,100,0.1)",border:"1px solid rgba(0,200,100,0.3)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#00C864"}}>
                    ✅ {t("Email enviado. Revisa tu bandeja de entrada","Email sent. Check your inbox")} 📧
                  </div>
                ):(
                  <button onClick={doForgot} disabled={loading}
                    style={{background:"transparent",border:"none",color:C.gold,fontSize:12,cursor:"pointer",textDecoration:"underline",padding:"4px 0"}}>
                    🔑 {t("Olvidé mi contraseña","Forgot my password")}
                  </button>
                )}
              </div>
            )}
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:10,color:C.gray,marginBottom:8}}>— {t("o continua sin cuenta","or continue without account")} —</div>
              <button onClick={doGuest} style={{background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:10,padding:"8px 20px",color:C.gray,fontSize:12,cursor:"pointer"}}>👤 {t("Modo invitado","Guest mode")}</button>
            </div>
          </>
        ):(
          <>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:28,marginBottom:6}}>👤</div>
              <div style={{fontSize:16,fontWeight:800,color:C.white}}>{t("Crea tu perfil","Create your profile")}</div>
              <div style={{fontSize:11,color:C.green,marginTop:2}}>✓ {t("Cuenta creada","Account created!")}</div>
            </div>
            <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>1 {t("Como te llamas?","Your name?")}</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder={t("Tu nombre...","Your name...")}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${name.trim()?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}}/>
            <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:8}}>2 {t("A que seleccion le vas?","Your team?")}</div>
            {flag&&(<div style={{display:"flex",alignItems:"center",gap:10,background:C.goldDim,borderRadius:10,padding:"8px 12px",marginBottom:10,border:`1px solid ${C.goldBorder}`}}>
              <span style={{fontSize:28}}>{flag}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:C.white}}>{TEAMS.find(x=>x.flag===flag)?.name}</div><div style={{fontSize:10,color:C.green}}>OK</div></div>
              <button onClick={()=>setFlag("")} style={{background:"none",border:"none",color:C.gray,cursor:"pointer",fontSize:16}}>✕</button>
            </div>)}
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t("Buscar seleccion...","Search team...")}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${C.grayDark}`,borderRadius:9,padding:"8px 12px",color:C.white,fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:14,maxHeight:180,overflowY:"auto",padding:"2px"}}>
              {filtered.map(team=>(<button key={team.name} onClick={()=>setFlag(team.flag)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:flag===team.flag?C.goldDim:"rgba(255,255,255,0.03)",border:`2px solid ${flag===team.flag?C.gold:"transparent"}`,borderRadius:9,cursor:"pointer",padding:"7px 3px"}}>
                <span style={{fontSize:24}}>{team.flag}</span>
                <span style={{fontSize:7,color:flag===team.flag?C.gold:C.gray,textAlign:"center",lineHeight:1.2}}>{team.name}</span>
              </button>))}
            </div>
            {err&&<div style={{background:"rgba(230,57,70,0.15)",border:"1px solid rgba(230,57,70,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#FF6B7A",marginBottom:10}}>{err}</div>}
            <button onClick={doProfile} disabled={loading||!name.trim()||!flag}
              style={{width:"100%",padding:12,background:name.trim()&&flag?`linear-gradient(135deg,${C.gold},#FFA500)`:C.grayDark,border:"none",borderRadius:12,color:name.trim()&&flag?"#000":C.gray,fontSize:14,fontWeight:900,cursor:name.trim()&&flag?"pointer":"default"}}>
              {loading?"⏳...":flag?`${flag} ${t("Guardar y entrar","Save and enter")} 🚀`:t("Elige tu seleccion","Choose your team")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────────────
function HomeTab({t,matches,preds,onPred,rooms,user}){
  const total=Object.keys(preds).length;
  const pts=matches.reduce((acc,m)=>{const pred=preds[m.id];if(!pred||m.hs===null)return acc;const actual=m.hs>m.as?"home":m.as>m.hs?"away":"draw";return acc+(pred===actual?3:0);},0);
  return(
    <div style={{padding:16}}>
      <div style={{background:"linear-gradient(135deg,#0d1f4e,#1a3570)",borderRadius:18,padding:20,marginBottom:14,border:"1px solid rgba(255,215,0,0.35)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-20,fontSize:120,opacity:0.07}}>🏆</div>
        <div style={{fontSize:10,color:C.gold,letterSpacing:3,fontWeight:800,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulse 1s ease infinite"}}/>
          MUNDIAL 2026 · {t("EN JUEGO","LIVE")}
        </div>
        <div style={{fontSize:17,fontWeight:900,marginBottom:2}}>🇲🇽 México vs Sudáfrica 🇿🇦</div>
        <div style={{fontSize:11,color:C.gray}}>Jun 11 · 15:00 ET · Estadio Azteca</div>
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <div style={{background:"rgba(255,215,0,0.15)",border:`1px solid ${C.gold}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:C.gold,fontWeight:700}}>{t("En vivo","Live")}</div>
          <a href="https://www.youtube.com/results?search_query=Mexico+Sudafrica+Mundial+2026+resumen+goles" target="_blank" rel="noopener noreferrer"
            style={{background:"rgba(255,0,0,0.15)",border:"1px solid rgba(255,0,0,0.4)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"#FF4444",fontWeight:700,textDecoration:"none"}}>▶ YouTube</a>
        </div>
      </div>
      {user&&(
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{icon:"🎯",val:total,label:t("predicciones","preds"),color:C.gold},{icon:"🏅",val:pts,label:t("puntos","points"),color:C.blueLight},{icon:"👥",val:rooms.length,label:t("grupos","groups"),color:C.green}].map((s,i)=>(
            <div key={i} style={{flex:1,background:C.bgCard,borderRadius:12,padding:"10px 8px",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
              <div style={{fontSize:18}}>{s.icon}</div>
              <div style={{fontSize:16,fontWeight:900,color:s.color}}>{s.val}</div>
              <div style={{fontSize:9,color:C.gray,marginTop:1}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
      <Sec icon="⚽" title={t("Partidos del dia","Today matches")}/>
      {matches.slice(0,3).map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t}/>)}
      <Sec icon="📅" title={t("Proximos","Upcoming")}/>
      {matches.slice(3,6).map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t}/>)}
    </div>
  );
}

// ─── CALENDAR ──────────────────────────────────────────────────────────────────
function CalendarTab({t,matches,preds,onPred,onResult}){
  const [filter,setFilter]=useState("ALL");
  const [editId,setEditId]=useState(null);
  const visible=filter==="ALL"?matches:matches.filter(m=>m.country===filter);
  const grouped=visible.reduce((acc,m)=>{if(!acc[m.date])acc[m.date]=[];acc[m.date].push(m);return acc;},{});
  return(
    <div style={{padding:16}}>
      <Sec icon="📅" title={t("Calendario","Calendar")}/>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {[["ALL",t("Todos","All"),"🌎"],["México","México","🇲🇽"],["USA","USA","🇺🇸"],["Canadá","Canadá","🇨🇦"]].map(([k,l,e])=>(
          <button key={k} onClick={()=>setFilter(k)} style={{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1px solid ${filter===k?C.gold:C.grayDark}`,background:filter===k?C.goldDim:C.bgCard,color:filter===k?C.gold:C.gray,fontSize:11,cursor:"pointer",fontWeight:filter===k?700:400}}>{e} {l}</button>
        ))}
      </div>
      {Object.entries(grouped).map(([date,ms])=>(
        <div key={date}>
          <div style={{fontSize:10,color:C.gold,fontWeight:800,letterSpacing:2,marginBottom:6,marginTop:10,paddingLeft:8,borderLeft:`3px solid ${C.gold}`}}>{date.toUpperCase()}</div>
          {ms.map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t} editId={editId} setEditId={setEditId} onResult={onResult} showEdit/>)}
        </div>
      ))}
    </div>
  );
}

// ─── MATCH CARD ────────────────────────────────────────────────────────────────
function MatchCard({match:m,pred,onPred,t,editId,setEditId,onResult,showEdit}){
  const [hg,setHg]=useState("");const [ag,setAg]=useState("");
  const isEditing=editId===m.id;
  const hasResult=m.hs!==null&&m.as!==null;
  const submit=()=>{
    const h=parseInt(hg),a=parseInt(ag);
    if(isNaN(h)||isNaN(a)||h<0||a<0)return;
    onResult&&onResult(m.id,h,a);setHg("");setAg("");setEditId&&setEditId(null);
  };
  const ytUrl=`https://www.youtube.com/results?search_query=${encodeURIComponent(m.home+" vs "+m.away+" Mundial 2026 resumen goles")}`;
  return(
    <div style={{background:C.bgCard,borderRadius:14,padding:"12px 14px",marginBottom:10,border:`1px solid ${hasResult?C.green:pred?C.blueLight:C.grayDark}`,transition:"border-color 0.3s"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:10,color:C.gray}}>{t("Grupo","Group")} {m.group} · {m.time} · {m.venue}</div>
        <div style={{fontSize:11}}>{m.country==="México"?"🇲🇽":m.country==="USA"?"🇺🇸":"🇨🇦"}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>onPred&&onPred(m.id,"home")} style={{flex:1,background:pred==="home"?"rgba(74,127,232,0.2)":"rgba(255,255,255,0.02)",border:`2px solid ${pred==="home"?C.blueLight:"transparent"}`,borderRadius:12,padding:"10px 6px",cursor:"pointer",transform:pred==="home"?"scale(1.03)":"scale(1)",transition:"all 0.2s"}}>
          <div style={{fontSize:26,marginBottom:3}}>{m.hf}</div>
          <div style={{fontSize:11,color:pred==="home"?C.white:C.gray,fontWeight:pred==="home"?700:400,textAlign:"center",lineHeight:1.3}}>{m.home}</div>
          {pred==="home"&&<div style={{fontSize:9,color:C.blueLight,marginTop:2}}>✓ pick</div>}
        </button>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:54}}>
          {hasResult?<div style={{fontSize:14,fontWeight:800,color:C.gold,background:C.goldDim,padding:"4px 8px",borderRadius:8,border:`1px solid ${C.goldBorder}`}}>{m.hs}-{m.as}</div>:<div style={{fontSize:11,color:C.gray,fontWeight:700}}>VS</div>}
          <button onClick={()=>onPred&&onPred(m.id,"draw")} style={{fontSize:10,padding:"3px 8px",borderRadius:10,border:`1px solid ${pred==="draw"?C.gold:C.grayDark}`,background:pred==="draw"?C.goldDim:"transparent",color:pred==="draw"?C.gold:C.gray,cursor:"pointer"}}>{t("Empate","Draw")}</button>
        </div>
        <button onClick={()=>onPred&&onPred(m.id,"away")} style={{flex:1,background:pred==="away"?"rgba(74,127,232,0.2)":"rgba(255,255,255,0.02)",border:`2px solid ${pred==="away"?C.blueLight:"transparent"}`,borderRadius:12,padding:"10px 6px",cursor:"pointer",transform:pred==="away"?"scale(1.03)":"scale(1)",transition:"all 0.2s"}}>
          <div style={{fontSize:26,marginBottom:3}}>{m.af}</div>
          <div style={{fontSize:11,color:pred==="away"?C.white:C.gray,fontWeight:pred==="away"?700:400,textAlign:"center",lineHeight:1.3}}>{m.away}</div>
          {pred==="away"&&<div style={{fontSize:9,color:C.blueLight,marginTop:2}}>✓ pick</div>}
        </button>
      </div>
      <a href={ytUrl} target="_blank" rel="noopener noreferrer"
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginTop:8,padding:"5px",background:"rgba(255,0,0,0.06)",border:"1px solid rgba(255,0,0,0.2)",borderRadius:7,color:"#FF4444",fontSize:10,textDecoration:"none"}}>
        ▶ {hasResult?t("Ver resumen","Watch recap"):t("Buscar en YouTube","Search YouTube")}
      </a>
      {showEdit&&(
        <div style={{marginTop:8}}>
          {isEditing?(
            <div style={{background:C.grayDark,borderRadius:10,padding:12}}>
              <div style={{fontSize:11,color:C.gray,textAlign:"center",marginBottom:8}}>{t("Marcador final","Final score")}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:11,color:C.gray,marginBottom:4}}>{m.hf}</div><input type="number" min="0" max="20" value={hg} onChange={e=>setHg(e.target.value)} placeholder="0" style={{width:50,textAlign:"center",background:C.bgCard,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}}/></div>
                <div style={{fontSize:18,color:C.gray}}>-</div>
                <div style={{textAlign:"center"}}><div style={{fontSize:11,color:C.gray,marginBottom:4}}>{m.af}</div><input type="number" min="0" max="20" value={ag} onChange={e=>setAg(e.target.value)} placeholder="0" style={{width:50,textAlign:"center",background:C.bgCard,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}}/></div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={submit} style={{flex:1,padding:"8px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:8,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>✅ {t("Guardar","Save")}</button>
                <button onClick={()=>setEditId&&setEditId(null)} style={{flex:1,padding:"8px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setEditId&&setEditId(m.id)} style={{width:"100%",marginTop:2,padding:"6px",background:"rgba(255,255,255,0.02)",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:11,cursor:"pointer"}}>
              {hasResult?t("Editar resultado","Edit result"):t("Agregar resultado","Add result")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── GROUPS ────────────────────────────────────────────────────────────────────
function GroupsTab({t,rooms,setRooms,user,preds,matches}){
  const [sel,setSel]=useState(null);
  const [showCreate,setShowCreate]=useState(false);
  const [newName,setNewName]=useState("");
  const [newEmoji,setNewEmoji]=useState("👫");
  const [joinCode,setJoinCode]=useState("");
  const [showJoin,setShowJoin]=useState(false);
  const emojis=["👫","💼","🌍","🔥","⚽","🏆","🎯","🎮","🍺","👊","🇲🇽","🌮"];

  const calcPts=(userId)=>{
    const userPreds=preds;
    let pts=0;
    matches.forEach(m=>{
      const pred=userPreds[m.id];
      if(!pred||m.hs===null)return;
      const actual=m.hs>m.as?"home":m.as>m.hs?"away":"draw";
      if(pred===actual)pts+=3;
    });
    return pts;
  };

  const createRoom=()=>{
    if(!newName.trim())return;
    const code=Math.random().toString(36).substr(2,6).toUpperCase();
    setRooms([...rooms,{id:Date.now()+"",name:newName.trim(),emoji:newEmoji,code,members:[{name:user?.name,flag:user?.flag,pts:0}]}]);
    setShowCreate(false);setNewName("");
  };

  if(sel){
    const room=rooms.find(r=>r.id===sel);
    const myPts=calcPts(user?.id);
    const played=matches.filter(m=>m.hs!==null&&preds[m.id]).length;
    const correct=matches.filter(m=>{const pred=preds[m.id];if(!pred||m.hs===null)return false;const actual=m.hs>m.as?"home":m.as>m.hs?"away":"draw";return pred===actual;}).length;
    return(
      <div style={{padding:16}}>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,cursor:"pointer",marginBottom:12}}>{"<"} {t("Volver","Back")}</button>
        <div style={{background:"linear-gradient(135deg,#1a2f6e,#0a1428)",borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:36}}>{room?.emoji}</div>
          <div style={{fontSize:20,fontWeight:800,marginTop:6}}>{room?.name}</div>
          <div style={{fontSize:12,color:C.gold,marginTop:4}}>{t("Codigo","Code")}: <span style={{fontWeight:900,letterSpacing:3}}>{room?.code}</span></div>
          <div style={{fontSize:11,color:C.gray,marginTop:2}}>{t("Comparte con tus amigos","Share with friends")}</div>
        </div>

        <Sec icon="🏅" title={t("Mi desempeno","My performance")}/>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{icon:"⭐",val:myPts,label:"pts",color:C.gold},{icon:"✅",val:correct,label:t("aciertos","correct"),color:C.green},{icon:"⚽",val:played,label:t("jugados","played"),color:C.blueLight}].map((s,i)=>(
            <div key={i} style={{flex:1,background:C.bgCard,borderRadius:12,padding:"12px 8px",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
              <div style={{fontSize:22}}>{s.icon}</div>
              <div style={{fontSize:20,fontWeight:900,color:s.color}}>{s.val}</div>
              <div style={{fontSize:9,color:C.gray,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>

        <Sec icon="📊" title={t("Tabla de posiciones","Leaderboard")}/>
        <div style={{background:C.bgCard,borderRadius:14,overflow:"hidden",border:`1px solid ${C.grayDark}`,marginBottom:14}}>
          <div style={{display:"flex",padding:"8px 12px",borderBottom:`1px solid ${C.grayDark}`,fontSize:10,color:C.gray,fontWeight:700}}>
            <div style={{width:30}}>#</div>
            <div style={{flex:1}}>{t("Jugador","Player")}</div>
            <div style={{width:50,textAlign:"center"}}>{t("Aciertos","Correct")}</div>
            <div style={{width:40,textAlign:"right"}}>Pts</div>
          </div>
          {[{name:user?.name||t("Tú","You"),flag:user?.flag||"🌍",pts:myPts,correct}].map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 12px",background:i===0?"rgba(255,215,0,0.05)":"transparent",borderBottom:`1px solid ${C.grayDark}`}}>
              <div style={{width:30,fontSize:14,fontWeight:800,color:i===0?C.gold:C.gray}}>{i+1}</div>
              <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:20}}>{p.flag}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:i===0?C.white:C.gray}}>{p.name}</div>
                  <div style={{fontSize:9,color:C.gray}}>{p.correct} {t("aciertos","correct")}</div>
                </div>
              </div>
              <div style={{width:50,textAlign:"center",fontSize:11,color:C.gray}}>{p.correct}</div>
              <div style={{width:40,textAlign:"right",fontSize:18,fontWeight:900,color:C.gold}}>{p.pts}</div>
            </div>
          ))}
          <div style={{padding:"10px 12px",fontSize:11,color:C.gray,textAlign:"center"}}>
            {t("Invita amigos con el codigo para ver su tabla","Invite friends with the code to see full leaderboard")} 🔗 {room?.code}
          </div>
        </div>

        <div style={{background:C.bgCard,borderRadius:10,padding:12,border:`1px solid ${C.grayDark}`,fontSize:11,color:C.gray,lineHeight:1.9}}>
          <div style={{color:C.gold,fontWeight:700,marginBottom:4}}>⏱ {t("Reglas","Rules")}</div>
          ✅ {t("Acierto = 3 puntos","Correct = 3 points")}<br/>
          ⏱ {t("Predicciones cierran 5 min antes","Predictions close 5 min before")}<br/>
          🔒 {t("No puedes cambiar despues","Cannot change after kickoff")}
        </div>
      </div>
    );
  }

  return(
    <div style={{padding:16}}>
      <Sec icon="👥" title={t("Mis Grupos","My Groups")}/>
      {rooms.map(room=>(
        <div key={room.id} onClick={()=>setSel(room.id)} style={{background:C.bgCard,borderRadius:14,padding:"13px 16px",marginBottom:10,border:`1px solid ${C.grayDark}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:28}}>{room.emoji}</div>
          <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700}}>{room.name}</div><div style={{fontSize:11,color:C.gold,marginTop:2}}>{room.code}</div></div>
          <div style={{fontSize:18,color:C.gray}}>{">"}</div>
        </div>
      ))}
      {rooms.length===0&&<div style={{textAlign:"center",padding:20,color:C.gray,fontSize:12}}>{t("Crea o unete a un grupo","Create or join a group")} 👥</div>}
      {showCreate?(
        <div style={{background:C.bgCard,borderRadius:14,padding:16,marginBottom:10,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t("Nuevo grupo","New group")}</div>
          <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={t("Nombre del grupo...","Group name...")} style={{width:"100%",background:C.grayDark,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:"8px 12px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>{emojis.map(e=><button key={e} onClick={()=>setNewEmoji(e)} style={{fontSize:22,padding:5,borderRadius:8,border:`2px solid ${newEmoji===e?C.gold:"transparent"}`,background:newEmoji===e?C.goldDim:"transparent",cursor:"pointer"}}>{e}</button>)}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={createRoom} disabled={!newName.trim()} style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:8,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>{t("Crear","Create")}</button>
            <button onClick={()=>setShowCreate(false)} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      ):showJoin?(
        <div style={{background:C.bgCard,borderRadius:14,padding:16,marginBottom:10,border:"1px solid rgba(74,127,232,0.3)"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t("Unirse con codigo","Join with code")}</div>
          <input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} placeholder="ABC123" style={{width:"100%",background:C.grayDark,border:"1px solid rgba(74,127,232,0.3)",borderRadius:8,padding:"8px 12px",color:C.white,fontSize:18,fontWeight:700,outline:"none",boxSizing:"border-box",marginBottom:10,letterSpacing:4,textAlign:"center"}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{const r=rooms.find(x=>x.code===joinCode);alert(r?t("Ya eres miembro","Already member"):t("Codigo no encontrado","Code not found"));setShowJoin(false);setJoinCode("");}} style={{flex:1,padding:"9px",background:C.blueLight,border:"none",borderRadius:8,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>{t("Unirme","Join")}</button>
            <button onClick={()=>setShowJoin(false)} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      ):(
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button onClick={()=>setShowCreate(true)} style={{flex:1,background:C.goldDim,borderRadius:12,padding:"13px 8px",border:`1px solid ${C.goldBorder}`,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:22}}>+</div><div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>{t("Crear grupo","Create group")}</div>
          </button>
          <button onClick={()=>setShowJoin(true)} style={{flex:1,background:C.blueDim,borderRadius:12,padding:"13px 8px",border:"1px solid rgba(74,127,232,0.3)",cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:22}}>🔗</div><div style={{fontSize:12,color:C.blueLight,fontWeight:700,marginTop:4}}>{t("Unirme","Join")}</div>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ALBUM ─────────────────────────────────────────────────────────────────────
function AlbumTab({t}){
  const [selTeam,setSelTeam]=useState(null);
  const [posFilter,setPosFilter]=useState("ALL");
  const [search,setSearch]=useState("");
  const [gf,setGf]=useState("ALL");
  const [selPlayer,setSelPlayer]=useState(null);
  // ── Supabase players state ──────────────────────────────────────────────────
  const [teamPlayers,setTeamPlayers]=useState([]);
  const [loadingPlayers,setLoadingPlayers]=useState(false);
  const groups=["ALL","A","B","C","D","E","F","G","H","I","J","K","L"];

  // Cargar jugadores de Supabase cuando se selecciona un equipo
  useEffect(()=>{
    if(!selTeam) return;
    setLoadingPlayers(true);
    setTeamPlayers([]);
    const url=`${SB_URL}/rest/v1/players?team=eq.${encodeURIComponent(selTeam.name)}&select=name,number,position,club,goals,assists,yellow_cards,red_cards&order=number.asc&limit=50`;
    fetch(url,{
      headers:{"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY}
    })
    .then(r=>r.json())
    .then(data=>{
      if(Array.isArray(data)&&data.length>0){
        setTeamPlayers(data.map(p=>({
          num: p.number||0,
          name: p.name||"",
          pos: p.position||"FWD",
          club: p.club||"",
          goals: p.goals||0,
          assists: p.assists||0,
          yellow_cards: p.yellow_cards||0,
          red_cards: p.red_cards||0
        })));
      }
    })
    .catch(e=>console.error("Players fetch error:",e))
    .finally(()=>setLoadingPlayers(false));
  },[selTeam?.name]);

  if(selPlayer){
    const tc=COLORS[selTeam?.name]||["#1D3D8F","#FFD700"];
    const posEmoji={GK:"🧤",DEF:"🛡️",MID:"⚙️",FWD:"⚽"};
    return(
      <div style={{padding:16}}>
        <button onClick={()=>setSelPlayer(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,cursor:"pointer",marginBottom:12}}>{"<"} {t("Volver","Back")}</button>
        <div style={{background:`linear-gradient(135deg,${tc[0]},${tc[1]})`,borderRadius:20,padding:20,marginBottom:16,boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:70,height:70,borderRadius:"50%",background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{posEmoji[selPlayer.pos]||"⚽"}</div>
            <div>
              <div style={{fontSize:22,fontWeight:900,color:"#fff",textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>{selPlayer.name}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:4}}>{PL[selPlayer.pos]} · #{selPlayer.num}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2}}>{selTeam?.flag} {selTeam?.name}</div>
            </div>
          </div>
        </div>
        <div style={{background:C.bgCard,borderRadius:14,padding:16,border:`1px solid ${C.grayDark}`,marginBottom:12}}>
          <div style={{fontSize:12,color:C.gold,fontWeight:700,marginBottom:8}}>🏟️ {t("Club actual","Current club")}</div>
          <div style={{fontSize:16,fontWeight:800,color:C.white,marginBottom:4}}>{selPlayer.club||t("Por confirmar","TBD")}</div>
          <div style={{fontSize:11,color:C.gray}}>{PL[selPlayer.pos]} · {selTeam?.flag} {selTeam?.name}</div>
        </div>
        <div style={{background:C.bgCard,borderRadius:14,padding:16,border:`1px solid ${C.grayDark}`,marginBottom:12}}>
          <div style={{fontSize:12,color:C.gold,fontWeight:700,marginBottom:8}}>📊 {t("Estadísticas del torneo","Tournament stats")}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[{icon:"⚽",label:t("Goles","Goals"),val:selPlayer.goals||0},{icon:"🎯",label:t("Asistencias","Assists"),val:selPlayer.assists||0},{icon:"🟨",label:t("Tarjetas","Cards"),val:(selPlayer.yellow_cards||0)+(selPlayer.red_cards||0)}].map((s,i)=>(
              <div key={i} style={{background:C.grayDark,borderRadius:10,padding:"10px 6px",textAlign:"center"}}>
                <div style={{fontSize:18}}>{s.icon}</div>
                <div style={{fontSize:20,fontWeight:900,color:C.gold}}>{s.val}</div>
                <div style={{fontSize:9,color:C.gray,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selPlayer.name+" mejores jugadas Mundial 2026")}`} target="_blank" rel="noopener noreferrer"
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px",background:"rgba(255,0,0,0.08)",border:"1px solid rgba(255,0,0,0.25)",borderRadius:10,color:"#FF4444",fontSize:13,textDecoration:"none",fontWeight:600}}>
          ▶ {t("Ver highlights en YouTube","Watch highlights on YouTube")}
        </a>
      </div>
    );
  }

  if(selTeam){
    const cols=COLORS[selTeam.name]||["#1D3D8F","#FFD700"];
    const filtered=teamPlayers.filter(p=>(posFilter==="ALL"||p.pos===posFilter)&&(search===""||p.name.toLowerCase().includes(search.toLowerCase())));
    const byPos={GK:[],DEF:[],MID:[],FWD:[]};
    filtered.forEach(p=>{if(byPos[p.pos])byPos[p.pos].push(p);});
    return(
      <div style={{padding:16}}>
        <button onClick={()=>{setSelTeam(null);setPosFilter("ALL");setSearch("");setTeamPlayers([]);}} style={{background:"none",border:"none",color:C.gold,fontSize:13,cursor:"pointer",marginBottom:12}}>{"<"} {t("Equipos","Teams")}</button>
        <div style={{background:`linear-gradient(135deg,${cols[0]},${cols[1]})`,borderRadius:16,padding:18,marginBottom:14,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:52}}>{selTeam.flag}</div>
            <div>
              <div style={{fontSize:20,fontWeight:900,color:"#fff",textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>{selTeam.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:3}}>{t("Grupo","Group")} {selTeam.group} · {teamPlayers.length} {t("jugadores","players")}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginTop:2,letterSpacing:1}}>🃏 PANINI · FIFA 2026</div>
            </div>
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("Buscar jugador...","Search player...")} style={{width:"100%",background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:10,padding:"8px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {["ALL","GK","DEF","MID","FWD"].map(pos=>(
            <button key={pos} onClick={()=>setPosFilter(pos)} style={{flex:1,padding:"5px 2px",borderRadius:8,border:`1px solid ${posFilter===pos?(PC[pos]||C.gold):C.grayDark}`,background:posFilter===pos?(PC[pos]||C.gold)+"22":C.bgCard,color:posFilter===pos?(PC[pos]||C.gold):C.gray,fontSize:10,cursor:"pointer",fontWeight:posFilter===pos?700:400}}>
              {pos==="ALL"?t("Todos","All"):pos}
            </button>
          ))}
        </div>
        {loadingPlayers&&(
          <div style={{textAlign:"center",padding:30,color:C.gray}}>
            <div style={{fontSize:28,marginBottom:8}}>⏳</div>
            <div style={{fontSize:12}}>{t("Cargando plantilla...","Loading squad...")}</div>
          </div>
        )}
        {!loadingPlayers&&teamPlayers.length===0&&<div style={{textAlign:"center",padding:20,color:C.gray,fontSize:12}}>⚠️ {t("Sin jugadores en la base de datos","No players found")}</div>}
        {!loadingPlayers&&Object.entries(byPos).map(([pos,group])=>group.length>0&&(
          <div key={pos} style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:800,color:PC[pos],letterSpacing:2,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:PC[pos]}}/>{PL[pos]?.toUpperCase()} · {group.length}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {group.map((player,i)=>{
                const tc=COLORS[selTeam.name]||["#1D3D8F","#FFD700"];
                const posEmoji={GK:"🧤",DEF:"🛡️",MID:"⚙️",FWD:"⚽"};
                return(
                  <div key={i} onClick={()=>setSelPlayer(player)} style={{borderRadius:12,overflow:"hidden",border:"1.5px solid rgba(255,215,0,0.25)",background:`linear-gradient(160deg,${tc[0]},${tc[1]})`,boxShadow:"0 4px 12px rgba(0,0,0,0.4)",position:"relative",cursor:"pointer"}}>
                    <div style={{position:"absolute",top:4,left:5,fontSize:11,fontWeight:900,color:"rgba(255,255,255,0.9)",textShadow:"0 1px 4px rgba(0,0,0,0.8)",zIndex:2}}>{player.num}</div>
                    <div style={{position:"absolute",top:4,right:4,background:PC[player.pos],borderRadius:3,padding:"1px 4px",fontSize:7,fontWeight:800,color:"#000",zIndex:2}}>{player.pos}</div>
                    <div style={{height:65,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.15)",fontSize:28}}>{posEmoji[player.pos]||"⚽"}</div>
                    <div style={{background:"rgba(0,0,0,0.75)",padding:"4px 4px"}}>
                      <div style={{fontSize:9,fontWeight:800,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"center"}}>{player.name.split(" ").slice(-1)[0].toUpperCase()}</div>
                      <div style={{fontSize:7,color:"rgba(255,255,255,0.5)",textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{player.club?player.club.split("(")[0].trim():PL[player.pos]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const filteredTeams=gf==="ALL"?TEAMS:TEAMS.filter(t2=>t2.group===gf);
  return(
    <div style={{padding:16}}>
      <Sec icon="🃏" title={t("Álbum Panini · FIFA 2026","Panini Album · FIFA 2026")}/>
      <div style={{fontSize:10,color:C.gray,marginBottom:10,textAlign:"center"}}>🗄️ {t("1,248 jugadores · 48 selecciones · Supabase","1,248 players · 48 teams · Supabase")}</div>
      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {groups.map(g=><button key={g} onClick={()=>setGf(g)} style={{flexShrink:0,padding:"4px 10px",borderRadius:16,border:`1px solid ${gf===g?C.gold:C.grayDark}`,background:gf===g?C.goldDim:C.bgCard,color:gf===g?C.gold:C.gray,fontSize:11,cursor:"pointer",fontWeight:gf===g?700:400}}>{g==="ALL"?t("Todos","All"):`G${g}`}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
        {filteredTeams.map(team=>{
          const cols=COLORS[team.name]||["#1D3D8F","#FFD700"];
          return(
            <div key={team.name} onClick={()=>setSelTeam(team)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)"}}>
              <div style={{background:`linear-gradient(135deg,${cols[0]},${cols[1]})`,padding:"14px 14px 10px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",bottom:-8,right:-8,fontSize:56,opacity:0.12}}>{team.flag}</div>
                <div style={{fontSize:36,marginBottom:6}}>{team.flag}</div>
                <div style={{fontSize:13,fontWeight:800,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.2}}>{team.name}</div>
              </div>
              <div style={{background:"rgba(0,0,0,0.8)",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>G{team.group}</div>
                <div style={{fontSize:10,color:C.gold}}>26 ⚽</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── BRACKET ───────────────────────────────────────────────────────────────────
function StatsTab({t}){
  const [active,setActive]=useState("goals");
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [lastUpdate,setLastUpdate]=useState(null);
  const [error,setError]=useState(null);

  const tabs=[
    {id:"goals",icon:"⚽",label:t("Goleadores","Top Scorers")},
    {id:"yellow_cards",icon:"🟨",label:t("Amarillas","Yellow")},
    {id:"clean_sheets",icon:"🧤",label:t("Portería Imbatible","Clean Sheets")},
  ];

  const fetchFromAPI = (endpoint) => {
    return fetch(`${AF_URL}/${endpoint}&league=${WC_LEAGUE}&season=${WC_SEASON}`,{
      headers:{"x-apisports-key": AF_KEY}
    }).then(r=>r.json());
  };

  useEffect(()=>{
    setLoading(true);
    setError(null);
    setData([]);

    let endpoint = "";
    if(active==="goals") endpoint="players/topscorers?";
    else if(active==="yellow_cards") endpoint="players/topyellowcards?";
    else if(active==="clean_sheets") endpoint="clean_sheets"; // Supabase

    // Portería imbatible → Supabase
    if(active==="clean_sheets"){
      fetch(`${SB_URL}/rest/v1/tournament_stats?select=player_name,team,flag,pos,club,clean_sheets,goals_conceded,matches_played&pos=eq.GK&order=clean_sheets.desc&limit=20`,{
        headers:{"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY}
      })
      .then(r=>r.json())
      .then(d=>{
        if(Array.isArray(d)) setData(d);
        setLastUpdate(new Date().toLocaleTimeString());
      })
      .catch(()=>setError("Error cargando porteros"))
      .finally(()=>setLoading(false));
      return;
    }

    // Goles y Amarillas → Supabase (completo y actualizado)
    const col=active==="goals"?"goals":"yellow_cards";
    fetch(`${SB_URL}/rest/v1/tournament_stats?select=player_name,team,flag,pos,club,goals,yellow_cards,matches_played&${col}=gt.0&order=${col}.desc&limit=50`,{
      headers:{"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY}
    })
    .then(r=>r.json())
    .then(sb=>{
      if(Array.isArray(sb)&&sb.length>0){
        setData(sb.map(p=>({
          player:{name:p.player_name},
          statistics:[{
            team:{name:p.team},
            goals:{total:p.goals||0},
            cards:{yellow:p.yellow_cards||0},
            games:{appearences:p.matches_played||0},
            flag:p.flag,
            club:p.club,
            pos:p.pos
          }]
        })));
        setLastUpdate(new Date().toLocaleTimeString());
      }
    })
    .catch(()=>setError("Error cargando datos"))
    .finally(()=>setLoading(false));
  },[active]);

  const getVal=(p)=>{
    const s=p.statistics?.[0];
    if(active==="clean_sheets") return {val:p.clean_sheets||0,icon:"🛡️",sub:`${p.goals_conceded||0} goles recibidos`};
    if(!s) return {val:0,icon:"⚽"};
    if(active==="goals") return {val:s.goals?.total||0,icon:"⚽",sub:s.games?.appearences?`${s.games.appearences} partidos`:""};
    if(active==="yellow_cards") return {val:s.cards?.yellow||0,icon:"🟨",sub:s.games?.appearences?`${s.games.appearences} partidos`:""};
    return {val:0,icon:""};
  };

  const getFlag=(p)=>{
    if(p.statistics?.[0]?.flag) return p.statistics[0].flag;
    // Mapear nationality a flag emoji
    const flags={"France":"🇫🇷","Brazil":"🇧🇷","Argentina":"🇦🇷","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Germany":"🇩🇪","Spain":"🇪🇸","Portugal":"🇵🇹","Mexico":"🇲🇽","Morocco":"🇲🇦","USA":"🇺🇸","Norway":"🇳🇴","Egypt":"🇪🇬","South Korea":"🇰🇷","Netherlands":"🇳🇱","Croatia":"🇭🇷","Uruguay":"🇺🇾","Colombia":"🇨🇴","Ecuador":"🇪🇨","Senegal":"🇸🇳","Japan":"🇯🇵"};
    return flags[p.player?.nationality]||"🏳️";
  };

  const filtered=data.filter(p=>Number(getVal(p).val)>0);
  const medals=["🥇","🥈","🥉"];
  const posEmoji={GK:"🧤",DEF:"🛡️",MID:"⚙️",FWD:"⚽"};

  return(
    <div style={{padding:16}}>
      <Sec icon="📊" title={t("Estadísticas del Torneo","Tournament Stats")}/>
      <div style={{fontSize:10,color:C.gray,textAlign:"center",marginBottom:12}}>
        ⚡ {t("Datos en tiempo real · API-Football","Live data · API-Football")}
        {lastUpdate&&<span> · {t("Actualizado","Updated")}: {lastUpdate}</span>}
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {tabs.map(tb=>(
          <button key={tb.id} onClick={()=>setActive(tb.id)}
            style={{flexShrink:0,display:"flex",alignItems:"center",gap:5,padding:"7px 12px",
              borderRadius:20,border:`1px solid ${active===tb.id?C.gold:C.grayDark}`,
              background:active===tb.id?C.goldDim:C.bgCard,
              color:active===tb.id?C.gold:C.gray,
              fontSize:11,cursor:"pointer",fontWeight:active===tb.id?700:400}}>
            <span>{tb.icon}</span><span>{tb.label}</span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading&&(
        <div style={{textAlign:"center",padding:40}}>
          <div style={{fontSize:40,marginBottom:12,animation:"pulse 1s infinite"}}>⚽</div>
          <div style={{fontSize:13,color:C.gold,fontWeight:700}}>{t("Jalando datos del Mundial...","Fetching World Cup data...")}</div>
          <div style={{fontSize:10,color:C.gray,marginTop:4}}>API-Football · FIFA 2026</div>
        </div>
      )}

      {/* Error */}
      {!loading&&error&&(
        <div style={{textAlign:"center",padding:30,background:C.bgCard,borderRadius:14,border:`1px solid ${C.grayDark}`}}>
          <div style={{fontSize:28,marginBottom:8}}>⚠️</div>
          <div style={{fontSize:12,color:C.gray}}>{error}</div>
        </div>
      )}

      {/* Sin datos */}
      {!loading&&!error&&filtered.length===0&&(
        <div style={{textAlign:"center",padding:40,color:C.gray}}>
          <div style={{fontSize:32,marginBottom:8}}>📋</div>
          <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:4}}>{t("Sin datos aún","No data yet")}</div>
          <div style={{fontSize:11}}>{t("El torneo está comenzando","Tournament is just starting")}</div>
        </div>
      )}

      {/* Lista jugadores */}
      {!loading&&!error&&filtered.map((p,i)=>{
        const {val,icon,extra="",sub=""}=getVal(p);
        const isTop3=i<3;
        const flag=getFlag(p);
        const s=p.statistics?.[0];
        const teamName=s?.team?.name||p.player?.nationality||"";
        const clubName=s?.club||(s?.team?.name?s.team.name.split("(")[0].trim():"");
        const playerPos=s?.pos||"FWD";
        return(
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:12,
            padding:"12px 14px",marginBottom:8,borderRadius:14,
            background:isTop3?`linear-gradient(135deg,${C.bgCard},${C.grayDark})`:C.bgCard,
            border:`1px solid ${isTop3?C.goldBorder:C.grayDark}`,
            boxShadow:isTop3?"0 4px 16px rgba(255,215,0,0.08)":"none"
          }}>
            {/* Posición */}
            <div style={{width:28,textAlign:"center",fontSize:isTop3?20:13,
              fontWeight:900,color:isTop3?C.gold:C.gray,flexShrink:0}}>
              {i<3?medals[i]:i+1}
            </div>

            {/* Flag */}
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{fontSize:28}}>{flag}</div>
              <div style={{position:"absolute",bottom:-2,right:-4,fontSize:10,
                background:C.bgCard,borderRadius:4,padding:"0 2px"}}>
                {posEmoji[playerPos]||"⚽"}
              </div>
            </div>

            {/* Info */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:800,color:C.white,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {p.player?.name||p.player_name}
              </div>
              <div style={{fontSize:10,color:C.gray,marginTop:2,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {flag} {teamName}
              </div>
              {sub&&<div style={{fontSize:9,color:C.gray,marginTop:1}}>{sub}</div>}
              <div style={{fontSize:9,color:C.gray,marginTop:1}}>
                {s?.games?.appearences||s?.games?.lineups||0} {t("partidos","matches")}
              </div>
            </div>

            {/* Valor */}
            <div style={{textAlign:"center",flexShrink:0,minWidth:48}}>
              <div style={{fontSize:active==="rating"?22:28,fontWeight:900,
                color:isTop3?C.gold:C.white,lineHeight:1}}>{val}</div>
              <div style={{fontSize:14}}>{icon}</div>
              {extra&&<div style={{fontSize:9,color:C.gray}}>{extra}</div>}
            </div>
          </div>
        );
      })}

      {!loading&&filtered.length>0&&(
        <div style={{textAlign:"center",marginTop:8,padding:"6px",
          background:C.bgCard,borderRadius:10,border:`1px solid ${C.grayDark}`}}>
          <div style={{fontSize:9,color:C.gray}}>
            ⚡ API-Football · v3.football.api-sports.io · Liga 1 · 2026
          </div>
        </div>
      )}
    </div>
  );
}


function BracketTab({t}){
  const [bracket,setBracket]=useState(()=>{
    try{const s=localStorage.getItem("wc26_bracket");return s?JSON.parse(s):null;}catch(e){return null;}
  });
  const [editMatch,setEditMatch]=useState(null);
  const [h,setH]=useState("");const [a,setA]=useState("");

  const rounds=[
    {id:"r32",name:t("Ronda de 32","Round of 32"),matches:16},
    {id:"r16",name:t("Octavos","Round of 16"),matches:8},
    {id:"qf",name:t("Cuartos","Quarterfinals"),matches:4},
    {id:"sf",name:t("Semifinales","Semifinals"),matches:2},
    {id:"final",name:t("Final","Final"),matches:1},
  ];

  const [activeRound,setActiveRound]=useState("r32");

  const initBracket=()=>{
    const b={};
    rounds.forEach(r=>{
      b[r.id]=Array.from({length:r.matches},(_,i)=>({id:`${r.id}_${i}`,home:"TBD",away:"TBD",hf:"🏳️",af:"🏳️",hs:null,as:null}));
    });
    // Pre-fill R32 with group winners
    const groupPairs=[
      ["A","B"],["C","D"],["E","F"],["G","H"],["I","J"],["K","L"],
      ["A","C"],["B","D"],["E","G"],["F","H"],["I","K"],["J","L"],
      ["A","D"],["B","C"],["E","H"],["F","G"]
    ];
    b["r32"]=groupPairs.map((pair,i)=>({
      id:`r32_${i}`,
      home:`1er Grupo ${pair[0]}`,away:`2do Grupo ${pair[1]}`,
      hf:"🏳️",af:"🏳️",hs:null,as:null
    }));
    setBracket(b);
    try{localStorage.setItem("wc26_bracket",JSON.stringify(b));}catch(e){}
  };

  const saveResult=()=>{
    const hs=parseInt(h),as2=parseInt(a);
    if(isNaN(hs)||isNaN(as2)||!editMatch||!bracket)return;
    const newB={...bracket};
    const [round,idx]=editMatch.split("_").reduce((acc,v,i)=>i===0?[v,null]:[acc[0],acc[1]===null?parseInt(v):acc[1]],[null,null]);
    if(newB[round]&&newB[round][idx]){
      newB[round][idx]={...newB[round][idx],hs,as:as2};
    }
    setBracket(newB);
    try{localStorage.setItem("wc26_bracket",JSON.stringify(newB));}catch(e){}
    setEditMatch(null);setH("");setA("");
  };

  if(!bracket){
    return(
      <div style={{padding:16,textAlign:"center"}}>
        <Sec icon="🏆" title={t("Bracket Eliminatorias","Knockout Bracket")}/>
        <div style={{fontSize:64,marginBottom:16}}>🏆</div>
        <div style={{fontSize:15,fontWeight:700,color:C.white,marginBottom:8}}>{t("Bracket del Mundial 2026","World Cup 2026 Bracket")}</div>
        <div style={{fontSize:12,color:C.gray,marginBottom:24,lineHeight:1.8}}>
          {t("Ronda de 32 → Octavos → Cuartos → Semifinales → Final","Round of 32 → R16 → QF → SF → Final")}
        </div>
        <button onClick={initBracket} style={{padding:"14px 32px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:14,color:"#000",fontSize:15,fontWeight:900,cursor:"pointer"}}>
          🏆 {t("Iniciar Bracket","Start Bracket")}
        </button>
      </div>
    );
  }

  const currentMatches=bracket[activeRound]||[];

  return(
    <div style={{padding:16}}>
      <Sec icon="🏆" title={t("Bracket Eliminatorias","Knockout Bracket")}/>
      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {rounds.map(r=>(
          <button key={r.id} onClick={()=>setActiveRound(r.id)} style={{flexShrink:0,padding:"5px 10px",borderRadius:16,border:`1px solid ${activeRound===r.id?C.gold:C.grayDark}`,background:activeRound===r.id?C.goldDim:C.bgCard,color:activeRound===r.id?C.gold:C.gray,fontSize:10,cursor:"pointer",fontWeight:activeRound===r.id?700:400,whiteSpace:"nowrap"}}>
            {r.name}
          </button>
        ))}
      </div>

      {editMatch&&(
        <div style={{background:C.bgCard,borderRadius:14,padding:14,marginBottom:12,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:10}}>✏️ {t("Registrar resultado","Add result")}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
            <input type="number" min="0" max="20" value={h} onChange={e=>setH(e.target.value)} placeholder="0" style={{width:52,textAlign:"center",background:C.grayDark,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}}/>
            <div style={{fontSize:16,color:C.gray}}>-</div>
            <input type="number" min="0" max="20" value={a} onChange={e=>setA(e.target.value)} placeholder="0" style={{width:52,textAlign:"center",background:C.grayDark,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={saveResult} style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:8,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>✅ {t("Guardar","Save")}</button>
            <button onClick={()=>{setEditMatch(null);setH("");setA("");}} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      )}

      {currentMatches.map((m,i)=>{
        const hasRes=m.hs!==null&&m.as!==null;
        const winner=hasRes?(m.hs>m.as?m.home:m.as>m.hs?m.away:"Penales"):"";
        return(
          <div key={m.id} style={{background:C.bgCard,borderRadius:14,padding:"12px 14px",marginBottom:10,border:`1px solid ${hasRes?C.green:C.grayDark}`}}>
            <div style={{fontSize:10,color:C.gray,marginBottom:8}}>{rounds.find(r=>r.id===activeRound)?.name} · {t("Partido","Match")} {i+1}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:22,marginBottom:3}}>{m.hf}</div>
                <div style={{fontSize:12,fontWeight:700,color:winner===m.home?C.gold:C.white,lineHeight:1.3}}>{m.home}</div>
                {winner===m.home&&<div style={{fontSize:9,color:C.gold,marginTop:2}}>🏆 {t("Ganador","Winner")}</div>}
              </div>
              <div style={{textAlign:"center",minWidth:60}}>
                {hasRes?<div style={{fontSize:18,fontWeight:900,color:C.gold,background:C.goldDim,padding:"4px 10px",borderRadius:10,border:`1px solid ${C.goldBorder}`}}>{m.hs}-{m.as}</div>:<div style={{fontSize:13,color:C.gray,fontWeight:700}}>VS</div>}
              </div>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:22,marginBottom:3}}>{m.af}</div>
                <div style={{fontSize:12,fontWeight:700,color:winner===m.away?C.gold:C.white,lineHeight:1.3}}>{m.away}</div>
                {winner===m.away&&<div style={{fontSize:9,color:C.gold,marginTop:2}}>🏆 {t("Ganador","Winner")}</div>}
              </div>
            </div>
            <button onClick={()=>setEditMatch(m.id)} style={{width:"100%",marginTop:8,padding:"6px",background:"rgba(255,255,255,0.02)",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:11,cursor:"pointer"}}>
              {hasRes?t("Editar resultado","Edit result"):t("Agregar resultado","Add result")}
            </button>
          </div>
        );
      })}
      <button onClick={()=>{if(confirm(t("Reiniciar bracket?","Reset bracket?")))setBracket(null);try{localStorage.removeItem("wc26_bracket");}catch(e){}}} style={{width:"100%",marginTop:4,padding:"8px",background:"rgba(230,57,70,0.08)",border:"1px solid rgba(230,57,70,0.2)",borderRadius:10,color:"#FF6B7A",fontSize:11,cursor:"pointer"}}>
        🔄 {t("Reiniciar bracket","Reset bracket")}
      </button>
    </div>
  );
}

// ─── AI ────────────────────────────────────────────────────────────────────────
function AITab({t,lang}){
  const [msgs,setMsgs]=useState([{role:"assistant",content:lang==="es"?"Hola! Soy tu asistente del Mundial 2026. En que te ayudo?":"Hello! I'm your World Cup 2026 assistant. How can I help?"}]);
  const [input,setInput]=useState("");const [loading,setLoading]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async(text)=>{
    const msg=text||input.trim();if(!msg||loading)return;
    setInput("");const newMsgs=[...msgs,{role:"user",content:msg}];setMsgs(newMsgs);setLoading(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        system:`Eres experto en futbol y asistente del Mundial 2026 en Mexico, USA, Canada. Conoces todos los jugadores y sus clubes actuales. Responde en ${lang==="es"?"espanol":"English"} de forma concisa y apasionada con emojis. Max 3 parrafos.`,
        messages:newMsgs.map(m=>({role:m.role,content:m.content}))
      })});
      const d=await r.json();
      setMsgs(prev=>[...prev,{role:"assistant",content:d.content?.[0]?.text||t("Error","Error")}]);
    }catch(e){setMsgs(prev=>[...prev,{role:"assistant",content:t("Error de conexion","Connection error")}]);}
    setLoading(false);
  };
  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 140px)"}}>
      <div style={{padding:"12px 16px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1D3D8F,#4A7FE8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🤖</div>
          <div><div style={{fontSize:14,fontWeight:800,color:C.white}}>Mundial AI</div><div style={{fontSize:10,color:C.green}}>Online · Claude</div></div>
          <button onClick={()=>setMsgs([{role:"assistant",content:t("Chat reiniciado","Chat reset")}])} style={{marginLeft:"auto",background:C.grayDark,border:"none",color:C.gray,padding:"4px 10px",borderRadius:16,fontSize:11,cursor:"pointer"}}>Reset</button>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8}}>
          {TIPS.map((s,i)=><button key={i} onClick={()=>send(s)} style={{flexShrink:0,padding:"5px 10px",borderRadius:20,border:`1px solid ${C.grayDark}`,background:C.bgCard,color:C.gray,fontSize:10,cursor:"pointer",whiteSpace:"nowrap"}}>{s}</button>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
        {msgs.map((msg,i)=>(
          <div key={i} style={{marginBottom:12,display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role==="assistant"&&<div style={{fontSize:18,marginBottom:4}}>🤖</div>}
            <div style={{maxWidth:"85%",background:msg.role==="user"?"linear-gradient(135deg,#1D3D8F,#4A7FE8)":C.bgCard,border:msg.role==="assistant"?`1px solid ${C.grayDark}`:"none",borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",fontSize:13,color:C.white,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{msg.content}</div>
          </div>
        ))}
        {loading&&(<div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:12}}>
          <div style={{fontSize:18}}>🤖</div>
          <div style={{background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:"18px 18px 18px 4px",padding:"12px 16px",display:"flex",gap:4,alignItems:"center"}}>
            {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.blueLight,animation:`pulse 1.2s ease ${i*0.2}s infinite`}}/>)}
          </div>
        </div>)}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"10px 16px 14px",background:C.bg,borderTop:`1px solid ${C.grayDark}`}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder={t("Pregunta sobre el Mundial...","Ask about the World Cup...")} style={{flex:1,background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:20,padding:"10px 16px",color:C.white,fontSize:13,outline:"none"}}/>
          <button onClick={()=>send()} disabled={!input.trim()||loading} style={{width:42,height:42,borderRadius:"50%",background:input.trim()&&!loading?"linear-gradient(135deg,#1D3D8F,#4A7FE8)":C.grayDark,border:"none",cursor:input.trim()&&!loading?"pointer":"default",fontSize:18,flexShrink:0}}>{loading?"...":">"}</button>
        </div>
        <div style={{fontSize:9,color:C.gray,textAlign:"center",marginTop:6}}>Powered by Claude · Anthropic</div>
      </div>
    </div>
  );
}

function Sec({icon,title}){
  return(<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:8}}>
    <span style={{fontSize:14}}>{icon}</span>
    <span style={{fontSize:13,fontWeight:800,color:C.white}}>{title}</span>
    <div style={{flex:1,height:1,background:"rgba(255,255,255,0.05)"}}/>
  </div>);
}
