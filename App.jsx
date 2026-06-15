import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#080d18", bgCard:"#0f1623", goldDim:"rgba(255,215,0,0.1)", goldBorder:"rgba(255,215,0,0.25)",
  gold:"#FFD700", blue:"#1D3D8F", blueLight:"#4A7FE8", blueDim:"rgba(74,127,232,0.15)",
  green:"#2ECC71", white:"#EFF4FF", gray:"#7A8599", grayDark:"#1E2A3E",
};

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

const PLAYERS = {
  "México":{flag:"🇲🇽",players:[
    {id:1,name:"Guillermo Ochoa",pos:"GK",num:1},{id:2,name:"Luis Malagón",pos:"GK",num:13},
    {id:3,name:"Jorge Sánchez",pos:"DEF",num:2},{id:4,name:"César Montes",pos:"DEF",num:3},{id:5,name:"Edson Álvarez",pos:"DEF",num:4},{id:6,name:"Arteaga",pos:"DEF",num:5},
    {id:7,name:"H. Herrera",pos:"MID",num:16},{id:8,name:"O. Pineda",pos:"MID",num:8},{id:9,name:"Luis Romo",pos:"MID",num:18},{id:10,name:"C. Rodríguez",pos:"MID",num:7},
    {id:11,name:"H. Lozano",pos:"FWD",num:9},{id:12,name:"R. Jiménez",pos:"FWD",num:10},{id:13,name:"H. Martín",pos:"FWD",num:21},{id:14,name:"S. Giménez",pos:"FWD",num:17},
  ]},
  "Argentina":{flag:"🇦🇷",players:[
    {id:20,name:"E. Martínez",pos:"GK",num:1},{id:21,name:"F. Armani",pos:"GK",num:23},
    {id:22,name:"Molina",pos:"DEF",num:26},{id:23,name:"C. Romero",pos:"DEF",num:13},{id:24,name:"L. Martínez",pos:"DEF",num:14},{id:25,name:"Tagliafico",pos:"DEF",num:3},
    {id:26,name:"De Paul",pos:"MID",num:7},{id:27,name:"E. Fernández",pos:"MID",num:24},{id:28,name:"Mac Allister",pos:"MID",num:20},{id:29,name:"Paredes",pos:"MID",num:5},
    {id:30,name:"Lionel Messi",pos:"FWD",num:10},{id:31,name:"J. Álvarez",pos:"FWD",num:9},{id:32,name:"L. Martínez",pos:"FWD",num:22},{id:33,name:"Di María",pos:"FWD",num:11},
  ]},
  "Brasil":{flag:"🇧🇷",players:[
    {id:40,name:"Alisson",pos:"GK",num:1},{id:41,name:"Ederson",pos:"GK",num:23},
    {id:42,name:"Danilo",pos:"DEF",num:2},{id:43,name:"Marquinhos",pos:"DEF",num:4},{id:44,name:"Thiago Silva",pos:"DEF",num:3},{id:45,name:"Militão",pos:"DEF",num:14},
    {id:46,name:"Casemiro",pos:"MID",num:5},{id:47,name:"Paquetá",pos:"MID",num:10},{id:48,name:"B. Guimarães",pos:"MID",num:17},
    {id:49,name:"Vinicius Jr.",pos:"FWD",num:20},{id:50,name:"Rodrygo",pos:"FWD",num:11},{id:51,name:"Richarlison",pos:"FWD",num:9},{id:52,name:"Neymar Jr.",pos:"FWD",num:10},
  ]},
  "Francia":{flag:"🇫🇷",players:[
    {id:60,name:"H. Lloris",pos:"GK",num:1},{id:61,name:"M. Maignan",pos:"GK",num:16},
    {id:62,name:"Pavard",pos:"DEF",num:2},{id:63,name:"Varane",pos:"DEF",num:4},{id:64,name:"Konaté",pos:"DEF",num:5},{id:65,name:"T. Hernández",pos:"DEF",num:22},
    {id:66,name:"Tchouaméni",pos:"MID",num:8},{id:67,name:"Rabiot",pos:"MID",num:14},{id:68,name:"Camavinga",pos:"MID",num:17},
    {id:69,name:"K. Mbappé",pos:"FWD",num:10},{id:70,name:"Griezmann",pos:"FWD",num:7},{id:71,name:"M. Thuram",pos:"FWD",num:11},
  ]},
  "España":{flag:"🇪🇸",players:[
    {id:80,name:"Unai Simón",pos:"GK",num:1},{id:81,name:"R. Sánchez",pos:"GK",num:13},
    {id:82,name:"Carvajal",pos:"DEF",num:2},{id:83,name:"Laporte",pos:"DEF",num:14},{id:84,name:"Pau Torres",pos:"DEF",num:4},{id:85,name:"Balde",pos:"DEF",num:3},
    {id:86,name:"Pedri",pos:"MID",num:8},{id:87,name:"Gavi",pos:"MID",num:6},{id:88,name:"Busquets",pos:"MID",num:5},
    {id:89,name:"Á. Morata",pos:"FWD",num:7},{id:90,name:"F. Torres",pos:"FWD",num:11},{id:91,name:"N. Williams",pos:"FWD",num:20},
  ]},
  "Portugal":{flag:"🇵🇹",players:[
    {id:100,name:"Rui Patrício",pos:"GK",num:1},{id:101,name:"D. Costa",pos:"GK",num:12},
    {id:102,name:"Cancelo",pos:"DEF",num:20},{id:103,name:"Rúben Dias",pos:"DEF",num:4},{id:104,name:"Pepe",pos:"DEF",num:3},{id:105,name:"N. Mendes",pos:"DEF",num:19},
    {id:106,name:"B. Silva",pos:"MID",num:10},{id:107,name:"Vitinha",pos:"MID",num:16},{id:108,name:"João Félix",pos:"MID",num:11},
    {id:109,name:"C. Ronaldo",pos:"FWD",num:7},{id:110,name:"R. Leão",pos:"FWD",num:17},{id:111,name:"G. Ramos",pos:"FWD",num:9},
  ]},
  "Alemania":{flag:"🇩🇪",players:[
    {id:120,name:"M. Neuer",pos:"GK",num:1},{id:121,name:"Ter Stegen",pos:"GK",num:22},
    {id:122,name:"Kimmich",pos:"DEF",num:6},{id:123,name:"Rüdiger",pos:"DEF",num:2},{id:124,name:"Schlotterbeck",pos:"DEF",num:4},{id:125,name:"Raum",pos:"DEF",num:13},
    {id:126,name:"Goretzka",pos:"MID",num:8},{id:127,name:"Gündogan",pos:"MID",num:21},{id:128,name:"F. Wirtz",pos:"MID",num:10},
    {id:129,name:"K. Havertz",pos:"FWD",num:9},{id:130,name:"L. Sané",pos:"FWD",num:19},{id:131,name:"J. Musiala",pos:"FWD",num:14},
  ]},
  "Inglaterra":{flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",players:[
    {id:140,name:"J. Pickford",pos:"GK",num:1},{id:141,name:"Nick Pope",pos:"GK",num:22},
    {id:142,name:"R. James",pos:"DEF",num:2},{id:143,name:"Maguire",pos:"DEF",num:6},{id:144,name:"Stones",pos:"DEF",num:5},{id:145,name:"Luke Shaw",pos:"DEF",num:23},
    {id:146,name:"D. Rice",pos:"MID",num:4},{id:147,name:"Bellingham",pos:"MID",num:22},{id:148,name:"M. Mount",pos:"MID",num:19},
    {id:149,name:"H. Kane",pos:"FWD",num:9},{id:150,name:"B. Saka",pos:"FWD",num:17},{id:151,name:"P. Foden",pos:"FWD",num:20},
  ]},
};

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
};

const PC = {GK:"#F59E0B",DEF:"#3B82F6",MID:"#10B981",FWD:"#EF4444"};
const PL = {GK:"Portero",DEF:"Defensa",MID:"Mediocampista",FWD:"Delantero"};

const TIPS = [
  "¿Quién ganará el Mundial 2026?","¿Cuáles son los favoritos?",
  "Analiza México vs Sudáfrica","¿Quién será el goleador?",
  "¿Cómo funciona la Ronda de 32?","Compara Messi y Mbappé",
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("es");
  const [notifs, setNotifs] = useState(true);
  const [user, setUser] = useState(null);
  const [showOnboard, setShowOnboard] = useState(false);
  const [anim, setAnim] = useState(false);
  const [matches, setMatches] = useState(() => { try { const s=localStorage.getItem("wc26_m"); return s?JSON.parse(s):MATCHES; } catch(e){return MATCHES;} });
  const [preds, setPreds] = useState(() => { try { const s=localStorage.getItem("wc26_p"); return s?JSON.parse(s):{}; } catch(e){return {};} });
  const [rooms, setRooms] = useState(() => { try { const s=localStorage.getItem("wc26_r"); return s?JSON.parse(s):[]; } catch(e){return [];} });

  const t = (es, en) => lang==="es" ? es : en;

  useEffect(()=>{
    try {
      const u=localStorage.getItem("wc26_user");
      if(u) {
        const parsed = JSON.parse(u);
        setUser(parsed);
      } else {
        setShowOnboard(true);
      }
    }
    catch(e){ setShowOnboard(true); }
  },[]);

  const saveM = (m) => { setMatches(m); try{localStorage.setItem("wc26_m",JSON.stringify(m));}catch(e){} };
  const saveP = (p) => { setPreds(p); try{localStorage.setItem("wc26_p",JSON.stringify(p));}catch(e){} };
  const saveR = (r) => { setRooms(r); try{localStorage.setItem("wc26_r",JSON.stringify(r));}catch(e){} };

  const handlePred = (id, pick) => { if(!user){setShowOnboard(true);return;} saveP({...preds,[id]:pick}); };
  const handleResult = (id, hs, as2) => saveM(matches.map(m=>m.id===id?{...m,hs,as:as2}:m));
  const handleUser = (name, flag) => {
    const u={id:Date.now()+"",name,flag,username:name.toLowerCase().replace(/\s+/g,"_")};
    try{localStorage.setItem("wc26_user",JSON.stringify(u));}catch(e){}
    setUser(u); setShowOnboard(false);
  };
  const goTab = (id) => { setAnim(true); setTimeout(()=>{setTab(id);setAnim(false);},120); };

  const tabs = [
    {id:"home",icon:"🏠",label:t("Inicio","Home")},
    {id:"calendar",icon:"📅",label:t("Partidos","Matches")},
    {id:"groups",icon:"👥",label:t("Grupos","Groups")},
    {id:"album",icon:"🃏",label:t("Álbum","Album")},
    {id:"ai",icon:"🤖",label:"IA"},
    {id:"settings",icon:"⚙️",label:t("Ajustes","Settings")},
  ];

  if(showOnboard) return <Onboarding t={t} onDone={handleUser} />;

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"system-ui,sans-serif",color:C.white,maxWidth:480,margin:"0 auto"}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(255,215,0,0.2);border-radius:3px}
        input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
      `}</style>

      <div style={{background:"linear-gradient(135deg,#080f1f,#12213a)",padding:"12px 16px 10px",borderBottom:`2px solid ${C.gold}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:24,filter:"drop-shadow(0 0 8px rgba(255,215,0,0.5))"}}>🏆</span>
            <div>
              <div style={{fontSize:15,fontWeight:900,color:C.gold,letterSpacing:2,lineHeight:1}}>MUNDIAL 2026</div>
              <div style={{fontSize:9,color:C.gray,letterSpacing:3}}>🇲🇽 🇺🇸 🇨🇦</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {user&&(
              <button onClick={()=>{
                try{localStorage.removeItem("wc26_user");}catch(e){}
                window.location.reload();
              }} style={{fontSize:10,color:C.gold,background:C.goldDim,padding:"2px 8px",borderRadius:20,border:`1px solid ${C.goldBorder}`,cursor:"pointer"}}>
                {user.flag} {user.name} ✕
              </button>
            )}
            <button onClick={()=>setLang(l=>l==="es"?"en":"es")} style={{background:C.grayDark,border:"none",color:C.white,padding:"3px 8px",borderRadius:20,fontSize:11,cursor:"pointer",fontWeight:700}}>{lang==="es"?"EN":"ES"}</button>
            <button onClick={()=>setNotifs(n=>!n)} style={{background:"none",border:"none",fontSize:17,cursor:"pointer"}}>{notifs?"🔔":"🔕"}</button>
          </div>
        </div>
      </div>

      <div style={{padding:"0 0 80px",opacity:anim?0:1,transition:"opacity 0.15s"}}>
        {tab==="home"     && <HomeTab t={t} matches={matches} preds={preds} onPred={handlePred} rooms={rooms} user={user} />}
        {tab==="calendar" && <CalendarTab t={t} matches={matches} preds={preds} onPred={handlePred} onResult={handleResult} />}
        {tab==="groups"   && <GroupsTab t={t} rooms={rooms} setRooms={saveR} user={user} preds={preds} matches={matches} />}
        {tab==="album"    && <AlbumTab t={t} />}
        {tab==="ai"       && <AITab t={t} lang={lang} />}
        {tab==="settings" && <SettingsTab t={t} lang={lang} setLang={setLang} notifs={notifs} setNotifs={setNotifs} user={user} />}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(8,13,24,0.97)",borderTop:`1px solid ${C.grayDark}`,display:"flex",zIndex:100}}>
        {tabs.map(tb=>(
          <button key={tb.id} onClick={()=>goTab(tb.id)} style={{flex:1,padding:"7px 2px 9px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:tab===tb.id?19:17,filter:tab===tb.id?"none":"grayscale(1) opacity(0.35)",transition:"all 0.2s"}}>{tb.icon}</span>
            <span style={{fontSize:8,color:tab===tb.id?C.gold:C.gray,fontWeight:tab===tb.id?800:400}}>{tb.label}</span>
            <div style={{width:tab===tb.id?18:0,height:2,background:C.gold,borderRadius:2,transition:"width 0.25s"}} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────
const SB_URL = "https://asntocdbpqnawneyszpx.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbnRvY2RicHFuYXduZXlzenB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDAwMjQsImV4cCI6MjA5NjExNjAyNH0.PKBJ6s2zEbETWmzKlqhaQGNMH6yfrlCgbZdZWKZdDjo";

const sbFetch = async (path, opts={}) => {
  const res = await fetch(SB_URL + path, {
    ...opts,
    headers: { "Content-Type":"application/json", "apikey":SB_KEY, "Authorization":"Bearer "+SB_KEY, ...(opts.headers||{}) }
  });
  return res.json();
};

const authFetch = async (path, body, token) => {
  const res = await fetch(SB_URL + "/auth/v1" + path, {
    method:"POST",
    headers:{"Content-Type":"application/json","apikey":SB_KEY,"Authorization":"Bearer "+(token||SB_KEY)},
    body:JSON.stringify(body)
  });
  return res.json();
};

function Onboarding({t, onDone}) {
  const [mode, setMode] = useState("login"); // login | register | profile
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [authData, setAuthData] = useState(null);

  const filtered = TEAMS.filter(tm=>q===""||tm.name.toLowerCase().includes(q.toLowerCase()));

  const handleLogin = async () => {
    if(!email.trim()||!pass.trim()) return;
    setLoading(true); setErr("");
    try {
      const res = await fetch(SB_URL + "/auth/v1/token?grant_type=password", {
        method:"POST",
        headers:{"Content-Type":"application/json","apikey":SB_KEY},
        body:JSON.stringify({email:email.trim(), password:pass.trim()})
      });
      const data = await res.json();
      if(data.error || !data.access_token) {
        setErr(data.error_description || data.msg || data.error || t("Email o contrasena incorrectos","Wrong email or password"));
        setLoading(false); return;
      }
      // Get profile from DB
      const profRes = await fetch(SB_URL + "/rest/v1/profiles?user_id=eq." + data.user.id + "&limit=1", {
        headers:{"apikey":SB_KEY,"Authorization":"Bearer "+data.access_token}
      });
      const profile = await profRes.json();
      if(profile && profile[0]) {
        const u = {...profile[0], token: data.access_token, supabaseId: data.user.id, id: data.user.id};
        try{localStorage.setItem("wc26_user", JSON.stringify(u));}catch(e){}
        onDone(u);
      } else {
        setAuthData(data);
        setMode("profile");
      }
    } catch(e) { setErr("Error: " + e.message); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if(!email.trim()||!pass.trim()||pass.length<6) { setErr(t("Contrasena min 6 caracteres","Password min 6 chars")); return; }
    setLoading(true); setErr("");
    try {
      const data = await authFetch("/signup", {email:email.trim(), password:pass.trim()});
      if(data.error) { setErr(data.error_description||data.error); setLoading(false); return; }
      if(data.access_token) {
        setAuthData(data);
        setMode("profile");
      } else {
        setErr(t("Revisa tu email para confirmar","Check your email to confirm"));
      }
    } catch(e) { setErr(t("Error de conexion","Connection error")); }
    setLoading(false);
  };

  const handleProfile = async () => {
    if(!name.trim()||!flag||!authData) return;
    setLoading(true); setErr("");
    try {
      const flagVal = typeof flag === "string" ? flag : (flag?.flag || "🌍");
      const username = name.trim().toLowerCase().replace(/ +/g,"_") + "_" + Date.now().toString().slice(-4);
      const profileData = { user_id: authData.user.id, name: name.trim(), flag: flagVal, username };
      const res = await fetch(SB_URL + "/rest/v1/profiles", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "apikey": SB_KEY,
          "Authorization":"Bearer "+authData.access_token,
          "Prefer":"return=minimal"
        },
        body: JSON.stringify(profileData)
      });
      if(!res.ok) {
        const errData = await res.json().catch(()=>({}));
        // If duplicate username, try with different suffix
        if(errData.code === "23505") {
          profileData.username = name.trim().toLowerCase().replace(/ +/g,"_") + "_" + Math.random().toString(36).slice(2,6);
          await fetch(SB_URL + "/rest/v1/profiles", {
            method:"POST",
            headers:{"Content-Type":"application/json","apikey":SB_KEY,"Authorization":"Bearer "+authData.access_token,"Prefer":"return=minimal"},
            body: JSON.stringify(profileData)
          });
        } else {
          setErr("Error: " + (errData.message || errData.hint || JSON.stringify(errData)));
          setLoading(false);
          return;
        }
      }
      const u = {...profileData, token: authData.access_token, supabaseId: authData.user.id, id: authData.user.id};
      try{localStorage.setItem("wc26_user", JSON.stringify(u));}catch(e){}
      onDone(u);
    } catch(e) { setErr(t("Error guardando perfil: ","Error saving profile: ") + e.message); }
    setLoading(false);
  };

  const guestMode = () => {
    const u = {id:"guest_"+Date.now(), name:t("Invitado","Guest"), flag:"🌍", username:"guest", isGuest:true};
    // Don't save guest to localStorage so next visit shows login
    onDone(u);
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060b16,#0d1b3e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"18px 14px 40px",overflowY:"auto"}}>
      <div style={{textAlign:"center",marginBottom:20,paddingTop:14}}>
        <div style={{fontSize:52,filter:"drop-shadow(0 0 24px rgba(255,215,0,0.5))"}}>🏆</div>
        <div style={{fontSize:24,fontWeight:900,color:C.gold,letterSpacing:4,marginTop:6}}>MUNDIAL 2026</div>
        <div style={{fontSize:11,color:C.gray,letterSpacing:3,marginTop:3}}>🇲🇽 🇺🇸 🇨🇦 JUN-JUL 2026</div>
      </div>

      <div style={{width:"100%",maxWidth:400,background:C.bgCard,borderRadius:20,padding:20,border:`1px solid ${C.grayDark}`}}>

        {mode !== "profile" && (
          <>
            {/* Tab selector */}
            <div style={{display:"flex",gap:6,marginBottom:18,background:C.grayDark,borderRadius:12,padding:4}}>
              {[["login",t("Iniciar sesion","Sign in")],["register",t("Registrarse","Sign up")]].map(([m,l])=>(
                <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"8px",borderRadius:9,border:"none",background:mode===m?C.bgCard:"transparent",color:mode===m?C.gold:C.gray,fontSize:13,fontWeight:mode===m?700:400,cursor:"pointer",transition:"all 0.2s"}}>
                  {l}
                </button>
              ))}
            </div>

            <div style={{fontSize:11,color:C.gray,marginBottom:6}}>Email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="tu@email.com"
              style={{width:"100%",background:C.grayDark,border:`1px solid ${email?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10}} />

            <div style={{fontSize:11,color:C.gray,marginBottom:6}}>{t("Contrasena","Password")}</div>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder={mode==="register"?t("Min 6 caracteres","Min 6 chars"):"••••••••"}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${pass?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}} />

            {err && <div style={{background:"rgba(230,57,70,0.15)",border:"1px solid rgba(230,57,70,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#FF6B7A",marginBottom:12}}>{err}</div>}

            <button onClick={mode==="login"?handleLogin:handleRegister} disabled={loading||!email.trim()||!pass.trim()}
              style={{width:"100%",padding:12,background:email&&pass?`linear-gradient(135deg,${C.gold},#FFA500)`:C.grayDark,border:"none",borderRadius:12,color:email&&pass?"#000":C.gray,fontSize:14,fontWeight:900,cursor:email&&pass?"pointer":"default",marginBottom:10}}>
              {loading?"⏳ ...":mode==="login"?t("Entrar","Sign in"):t("Crear cuenta","Create account")}
            </button>

            <div style={{textAlign:"center",marginBottom:10}}>
              <div style={{fontSize:10,color:C.gray,marginBottom:8}}>— {t("o continua sin cuenta","or continue without account")} —</div>
              <button onClick={guestMode} style={{background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:10,padding:"8px 20px",color:C.gray,fontSize:12,cursor:"pointer"}}>
                👤 {t("Modo invitado","Guest mode")}
              </button>
            </div>
          </>
        )}

        {mode === "profile" && (
          <>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:28,marginBottom:6}}>👤</div>
              <div style={{fontSize:16,fontWeight:800,color:C.white}}>{t("Crea tu perfil","Create your profile")}</div>
              <div style={{fontSize:11,color:C.green,marginTop:2}}>✓ {t("Cuenta creada con exito","Account created!")}</div>
            </div>

            <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>1 {t("Como te llamas?","Your name?")}</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder={t("Tu nombre o apodo...","Your name or nickname...")}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${name.trim()?C.goldBorder:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}} />

            <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:8}}>2 {t("A que seleccion le vas?","Your team?")}</div>
            {flag&&(
              <div style={{display:"flex",alignItems:"center",gap:10,background:C.goldDim,borderRadius:10,padding:"8px 12px",marginBottom:10,border:`1px solid ${C.goldBorder}`}}>
                <span style={{fontSize:28}}>{flag}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:800,color:C.white}}>{TEAMS.find(x=>x.flag===flag)?.name}</div>
                  <div style={{fontSize:10,color:C.green}}>OK</div>
                </div>
                <button onClick={()=>setFlag("")} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}>X</button>
              </div>
            )}
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t("Buscar seleccion...","Search team...")}
              style={{width:"100%",background:C.grayDark,border:`1px solid ${C.grayDark}`,borderRadius:9,padding:"8px 12px",color:C.white,fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:8}} />
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:14,maxHeight:180,overflowY:"auto",padding:"2px"}}>
              {filtered.map(team=>(
                <button key={team.name} onClick={()=>setFlag(team.flag)}
                  style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:flag===team.flag?C.goldDim:"rgba(255,255,255,0.03)",border:`2px solid ${flag===team.flag?C.gold:"transparent"}`,borderRadius:9,cursor:"pointer",padding:"7px 3px"}}>
                  <span style={{fontSize:24}}>{team.flag}</span>
                  <span style={{fontSize:7,color:flag===team.flag?C.gold:C.gray,textAlign:"center",lineHeight:1.2}}>{team.name}</span>
                </button>
              ))}
            </div>

            {err&&<div style={{background:"rgba(230,57,70,0.15)",border:"1px solid rgba(230,57,70,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#FF6B7A",marginBottom:10}}>{err}</div>}

            <button onClick={handleProfile} disabled={loading||!name.trim()||!flag}
              style={{width:"100%",padding:12,background:name.trim()&&flag?`linear-gradient(135deg,${C.gold},#FFA500)`:C.grayDark,border:"none",borderRadius:12,color:name.trim()&&flag?"#000":C.gray,fontSize:14,fontWeight:900,cursor:name.trim()&&flag?"pointer":"default"}}>
              {loading?"⏳ ...":flag?`${flag} ${t("Guardar y entrar","Save and enter")} 🚀`:t("Elige tu seleccion","Choose your team")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function HomeTab({t, matches, preds, onPred, rooms, user}) {
  const total = Object.keys(preds).length;
  return (
    <div style={{padding:16}}>
      <div style={{background:"linear-gradient(135deg,#0d1f4e,#1a3570)",borderRadius:18,padding:20,marginBottom:14,border:"1px solid rgba(255,215,0,0.35)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-20,fontSize:120,opacity:0.07}}>🏆</div>
        <div style={{fontSize:10,color:C.gold,letterSpacing:3,fontWeight:800,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulse 1s ease infinite"}} />
          MUNDIAL 2026 · {t("EN VIVO","LIVE")}
        </div>
        <div style={{fontSize:17,fontWeight:900,marginBottom:2}}>Mexico vs Sudafrica</div>
        <div style={{fontSize:11,color:C.gray}}>Jun 11 · 15:00 ET · Estadio Azteca</div>
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <div style={{background:"rgba(255,215,0,0.15)",border:`1px solid ${C.gold}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:C.gold,fontWeight:700}}>
            {t("En vivo","Live")}
          </div>
          <a href="https://www.youtube.com/results?search_query=Mexico+Sudafrica+Mundial+2026+resumen" target="_blank" rel="noopener noreferrer"
            style={{background:"rgba(255,0,0,0.15)",border:"1px solid rgba(255,0,0,0.4)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"#FF4444",fontWeight:700,textDecoration:"none"}}>
            YouTube
          </a>
        </div>
      </div>
      {user&&(
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{icon:"🎯",val:total,label:t("predicciones","predictions"),color:C.gold},{icon:"🏅",val:rooms.length,label:t("grupos","groups"),color:C.blueLight},{icon:"💾",val:"OK",label:t("guardado","saved"),color:C.green}].map((s,i)=>(
            <div key={i} style={{flex:1,background:C.bgCard,borderRadius:12,padding:"10px 8px",border:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
              <div style={{fontSize:18}}>{s.icon}</div>
              <div style={{fontSize:16,fontWeight:900,color:s.color}}>{s.val}</div>
              <div style={{fontSize:9,color:C.gray,marginTop:1}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
      <Sec icon="⚽" title={t("Partidos del dia","Today matches")} />
      {matches.slice(0,3).map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t} />)}
      <Sec icon="📅" title={t("Proximos","Upcoming")} />
      {matches.slice(3,6).map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t} />)}
    </div>
  );
}

function CalendarTab({t, matches, preds, onPred, onResult}) {
  const [filter, setFilter] = useState("ALL");
  const [editId, setEditId] = useState(null);
  const visible = filter==="ALL"?matches:matches.filter(m=>m.country===filter);
  const grouped = visible.reduce((acc,m)=>{if(!acc[m.date]) acc[m.date]=[];acc[m.date].push(m);return acc;},{});
  return (
    <div style={{padding:16}}>
      <Sec icon="📅" title={t("Calendario","Calendar")} />
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {[["ALL",t("Todos","All"),"🌎"],["México","México","🇲🇽"],["USA","USA","🇺🇸"],["Canadá","Canadá","🇨🇦"]].map(([k,l,e])=>(
          <button key={k} onClick={()=>setFilter(k)}
            style={{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1px solid ${filter===k?C.gold:C.grayDark}`,background:filter===k?C.goldDim:C.bgCard,color:filter===k?C.gold:C.gray,fontSize:11,cursor:"pointer",fontWeight:filter===k?700:400}}>
            {e} {l}
          </button>
        ))}
      </div>
      {Object.entries(grouped).map(([date,ms])=>(
        <div key={date}>
          <div style={{fontSize:10,color:C.gold,fontWeight:800,letterSpacing:2,marginBottom:6,marginTop:10,paddingLeft:8,borderLeft:`3px solid ${C.gold}`}}>{date.toUpperCase()}</div>
          {ms.map(m=><MatchCard key={m.id} match={m} pred={preds[m.id]} onPred={onPred} t={t} editId={editId} setEditId={setEditId} onResult={onResult} showEdit />)}
        </div>
      ))}
    </div>
  );
}

function MatchCard({match:m, pred, onPred, t, editId, setEditId, onResult, showEdit}) {
  const [hg, setHg] = useState("");
  const [ag, setAg] = useState("");
  const isEditing = editId===m.id;
  const hasResult = m.hs!==null&&m.as!==null;
  const submit = () => {
    const h=parseInt(hg),a=parseInt(ag);
    if(isNaN(h)||isNaN(a)||h<0||a<0) return;
    onResult&&onResult(m.id,h,a);
    setHg("");setAg("");
    setEditId&&setEditId(null);
  };
  return (
    <div style={{background:C.bgCard,borderRadius:14,padding:"12px 14px",marginBottom:10,border:`1px solid ${hasResult?C.green:pred?C.blueLight:C.grayDark}`,transition:"border-color 0.3s"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:10,color:C.gray}}>{t("Grupo","Group")} {m.group} · {m.time} · {m.venue}</div>
        <div style={{fontSize:11}}>{m.country==="México"?"🇲🇽":m.country==="USA"?"🇺🇸":"🇨🇦"}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>onPred&&onPred(m.id,"home")}
          style={{flex:1,background:pred==="home"?"rgba(74,127,232,0.2)":"rgba(255,255,255,0.02)",border:`2px solid ${pred==="home"?C.blueLight:"transparent"}`,borderRadius:12,padding:"10px 6px",cursor:"pointer",transform:pred==="home"?"scale(1.03)":"scale(1)",transition:"all 0.2s"}}>
          <div style={{fontSize:26,marginBottom:3}}>{m.hf}</div>
          <div style={{fontSize:11,color:pred==="home"?C.white:C.gray,fontWeight:pred==="home"?700:400,textAlign:"center",lineHeight:1.3}}>{m.home}</div>
          {pred==="home"&&<div style={{fontSize:9,color:C.blueLight,marginTop:2}}>OK {t("Tu pick","Your pick")}</div>}
        </button>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:54}}>
          {hasResult
            ?<div style={{fontSize:14,fontWeight:800,color:C.gold,background:C.goldDim,padding:"4px 8px",borderRadius:8,border:`1px solid ${C.goldBorder}`}}>{m.hs}-{m.as}</div>
            :<div style={{fontSize:11,color:C.gray,fontWeight:700}}>VS</div>
          }
          <button onClick={()=>onPred&&onPred(m.id,"draw")}
            style={{fontSize:10,padding:"3px 8px",borderRadius:10,border:`1px solid ${pred==="draw"?C.gold:C.grayDark}`,background:pred==="draw"?C.goldDim:"transparent",color:pred==="draw"?C.gold:C.gray,cursor:"pointer"}}>
            {t("Empate","Draw")}
          </button>
        </div>
        <button onClick={()=>onPred&&onPred(m.id,"away")}
          style={{flex:1,background:pred==="away"?"rgba(74,127,232,0.2)":"rgba(255,255,255,0.02)",border:`2px solid ${pred==="away"?C.blueLight:"transparent"}`,borderRadius:12,padding:"10px 6px",cursor:"pointer",transform:pred==="away"?"scale(1.03)":"scale(1)",transition:"all 0.2s"}}>
          <div style={{fontSize:26,marginBottom:3}}>{m.af}</div>
          <div style={{fontSize:11,color:pred==="away"?C.white:C.gray,fontWeight:pred==="away"?700:400,textAlign:"center",lineHeight:1.3}}>{m.away}</div>
          {pred==="away"&&<div style={{fontSize:9,color:C.blueLight,marginTop:2}}>OK {t("Tu pick","Your pick")}</div>}
        </button>
      </div>
      {hasResult&&(
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(m.home+" "+m.away+" Mundial 2026")}`} target="_blank" rel="noopener noreferrer"
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginTop:8,padding:"5px",background:"rgba(255,0,0,0.06)",border:"1px solid rgba(255,0,0,0.2)",borderRadius:7,color:"#FF4444",fontSize:10,textDecoration:"none"}}>
          YouTube {t("Resumen","Recap")}
        </a>
      )}
      {showEdit&&(
        <div style={{marginTop:8}}>
          {isEditing?(
            <div style={{background:C.grayDark,borderRadius:10,padding:12}}>
              <div style={{fontSize:11,color:C.gray,textAlign:"center",marginBottom:8}}>{t("Marcador final","Final score")}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:11,color:C.gray,marginBottom:4}}>{m.hf}</div>
                  <input type="number" min="0" max="20" value={hg} onChange={e=>setHg(e.target.value)} placeholder="0"
                    style={{width:50,textAlign:"center",background:C.bgCard,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}} />
                </div>
                <div style={{fontSize:18,color:C.gray}}>-</div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:11,color:C.gray,marginBottom:4}}>{m.af}</div>
                  <input type="number" min="0" max="20" value={ag} onChange={e=>setAg(e.target.value)} placeholder="0"
                    style={{width:50,textAlign:"center",background:C.bgCard,border:`2px solid ${C.gold}`,borderRadius:10,padding:"8px 4px",color:C.white,fontSize:22,fontWeight:900,outline:"none"}} />
                </div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={submit} style={{flex:1,padding:"8px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:8,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>OK {t("Guardar","Save")}</button>
                <button onClick={()=>setEditId&&setEditId(null)} style={{flex:1,padding:"8px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setEditId&&setEditId(m.id)}
              style={{width:"100%",marginTop:2,padding:"6px",background:"rgba(255,255,255,0.02)",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:11,cursor:"pointer"}}>
              {hasResult?t("Editar resultado","Edit result"):t("Agregar resultado","Add result")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}


function MatchHosting({t, room, user, matches}) {
  const [events, setEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wc26_events_"+room?.id)||"[]"); } catch(e){return [];}
  });
  const [showAdd, setShowAdd] = useState(false);
  const [selMatch, setSelMatch] = useState("");
  const [host, setHost] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [attendees, setAttendees] = useState([]);

  const save = (ev) => {
    try{localStorage.setItem("wc26_events_"+room?.id, JSON.stringify(ev));}catch(e){}
  };

  const addEvent = () => {
    if(!selMatch||!host.trim()) return;
    const match = matches.find(m=>m.id===parseInt(selMatch));
    if(!match) return;
    const ev = {
      id: Date.now()+"",
      matchId: match.id,
      matchLabel: match.hf+" "+match.home+" vs "+match.away+" "+match.af,
      matchDate: match.date,
      matchTime: match.time,
      host: host.trim(),
      address: address.trim(),
      note: note.trim(),
      attendees: [user?.name||t("Tu","You")],
      createdBy: user?.name,
    };
    const updated = [...events, ev];
    setEvents(updated); save(updated);
    setShowAdd(false); setSelMatch(""); setHost(""); setAddress(""); setNote("");
  };

  const toggleAttend = (evId) => {
    const myName = user?.name||t("Invitado","Guest");
    const updated = events.map(ev => {
      if(ev.id!==evId) return ev;
      const isIn = ev.attendees.includes(myName);
      return {...ev, attendees: isIn?ev.attendees.filter(a=>a!==myName):[...ev.attendees,myName]};
    });
    setEvents(updated); save(updated);
  };

  const deleteEvent = (evId) => {
    const updated = events.filter(ev=>ev.id!==evId);
    setEvents(updated); save(updated);
  };

  return (
    <div style={{marginTop:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <Sec icon="🏠" title={t("Ver partido en casa","Watch party")} />
        <button onClick={()=>setShowAdd(s=>!s)}
          style={{flexShrink:0,background:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:10,padding:"5px 12px",color:C.gold,fontSize:11,cursor:"pointer",fontWeight:700,marginBottom:10}}>
          + {t("Organizar","Host")}
        </button>
      </div>

      {showAdd&&(
        <div style={{background:C.bgCard,borderRadius:14,padding:14,marginBottom:12,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:12}}>🏠 {t("Organizar partido","Host a watch party")}</div>

          <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{t("Partido","Match")}</div>
          <select value={selMatch} onChange={e=>setSelMatch(e.target.value)}
            style={{width:"100%",background:C.grayDark,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:"8px 10px",color:C.white,fontSize:12,outline:"none",marginBottom:10,boxSizing:"border-box"}}>
            <option value="">{t("Selecciona un partido...","Select a match...")}</option>
            {matches.map(m=><option key={m.id} value={m.id}>{m.hf} {m.home} vs {m.away} {m.af} · {m.date}</option>)}
          </select>

          <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{t("Quien organiza?","Who hosts?")}</div>
          <input value={host} onChange={e=>setHost(e.target.value)} placeholder={user?.name||t("Tu nombre","Your name")}
            style={{width:"100%",background:C.grayDark,border:`1px solid ${C.grayDark}`,borderRadius:8,padding:"8px 10px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:8}} />

          <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{t("Direccion (opcional)","Address (optional)")}</div>
          <input value={address} onChange={e=>setAddress(e.target.value)} placeholder={t("Calle y colonia...","Street and area...")}
            style={{width:"100%",background:C.grayDark,border:`1px solid ${C.grayDark}`,borderRadius:8,padding:"8px 10px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:8}} />

          <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{t("Nota (pizza, cervezas, etc)","Note (pizza, drinks, etc)")}</div>
          <input value={note} onChange={e=>setNote(e.target.value)} placeholder={t("Ej: se pide pizza, traer silla","e.g. ordering pizza, bring a chair")}
            style={{width:"100%",background:C.grayDark,border:`1px solid ${C.grayDark}`,borderRadius:8,padding:"8px 10px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:12}} />

          <div style={{display:"flex",gap:8}}>
            <button onClick={addEvent} disabled={!selMatch||!host.trim()}
              style={{flex:1,padding:"9px",background:selMatch&&host.trim()?`linear-gradient(135deg,${C.gold},#FFA500)`:C.grayDark,border:"none",borderRadius:8,color:selMatch&&host.trim()?"#000":C.gray,fontSize:13,fontWeight:800,cursor:selMatch&&host.trim()?"pointer":"default"}}>
              🏠 {t("Crear evento","Create event")}
            </button>
            <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      )}

      {events.length===0&&!showAdd&&(
        <div style={{textAlign:"center",padding:"16px 0",color:C.gray,fontSize:12}}>
          🏠 {t("Nadie ha organizado un partido todavia","No watch parties yet")}
        </div>
      )}

      {events.map(ev=>{
        const isAttending = ev.attendees.includes(user?.name||t("Invitado","Guest"));
        return(
          <div key={ev.id} style={{background:C.bgCard,borderRadius:14,padding:14,marginBottom:10,border:`1px solid ${isAttending?C.green:C.grayDark}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:C.white}}>{ev.matchLabel}</div>
                <div style={{fontSize:11,color:C.gray,marginTop:2}}>{ev.matchDate} · {ev.matchTime}</div>
              </div>
              {ev.createdBy===user?.name&&(
                <button onClick={()=>deleteEvent(ev.id)} style={{background:"none",border:"none",color:C.gray,cursor:"pointer",fontSize:16,flexShrink:0}}>✕</button>
              )}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                <span style={{fontSize:16}}>🏠</span>
                <span style={{color:C.white,fontWeight:600}}>{t("Casa de","At")}: {ev.host}</span>
              </div>
              {ev.address&&(
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                  <span style={{fontSize:16}}>📍</span>
                  <span style={{color:C.gray}}>{ev.address}</span>
                </div>
              )}
              {ev.note&&(
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                  <span style={{fontSize:16}}>📝</span>
                  <span style={{color:C.gray}}>{ev.note}</span>
                </div>
              )}
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:C.gray,marginBottom:4}}>
                  👥 {ev.attendees.length} {t("van","going")}: {ev.attendees.join(", ")}
                </div>
                <div style={{display:"flex",gap:4}}>
                  {ev.attendees.slice(0,6).map((a,i)=>(
                    <div key={i} style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.blueLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",flexShrink:0}}>
                      {a[0]?.toUpperCase()}
                    </div>
                  ))}
                  {ev.attendees.length>6&&<div style={{width:24,height:24,borderRadius:"50%",background:C.grayDark,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.gray}}>+{ev.attendees.length-6}</div>}
                </div>
              </div>
              <button onClick={()=>toggleAttend(ev.id)}
                style={{padding:"7px 14px",background:isAttending?"rgba(46,204,113,0.15)":C.goldDim,border:`1px solid ${isAttending?C.green:C.goldBorder}`,borderRadius:10,color:isAttending?C.green:C.gold,fontSize:12,cursor:"pointer",fontWeight:700,flexShrink:0}}>
                {isAttending?("✓ "+t("Voy","Going")):t("Confirmar","I'm going")}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GroupsTab({t, rooms, setRooms, user, preds, matches}) {
  const [sel, setSel] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("👫");
  const [joinCode, setJoinCode] = useState("");
  const [showJoin, setShowJoin] = useState(false);
  const emojis = ["👫","💼","🌍","🔥","⚽","🏆","🎯","🎮","🍺","👊","🇲🇽","🌮"];

  const myPts = () => {
    let pts=0;
    matches.forEach(m=>{
      const pred=preds[m.id];
      if(!pred||m.hs===null) return;
      const actual=m.hs>m.as?"home":m.as>m.hs?"away":"draw";
      if(pred===actual) pts+=3;
    });
    return pts;
  };

  const createRoom = () => {
    if(!newName.trim()) return;
    const code=Math.random().toString(36).substr(2,6).toUpperCase();
    setRooms([...rooms,{id:Date.now()+"",name:newName.trim(),emoji:newEmoji,code}]);
    setShowCreate(false); setNewName("");
  };

  if(sel) {
    const room=rooms.find(r=>r.id===sel);
    const pts=myPts();
    return (
      <div style={{padding:16}}>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,cursor:"pointer",marginBottom:12}}>{"<"} {t("Volver","Back")}</button>
        <div style={{background:"linear-gradient(135deg,#1a2f6e,#0a1428)",borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:36}}>{room?.emoji}</div>
          <div style={{fontSize:20,fontWeight:800,marginTop:6}}>{room?.name}</div>
          <div style={{fontSize:12,color:C.gold,marginTop:4}}>{t("Codigo","Code")}: <span style={{fontWeight:900,letterSpacing:3}}>{room?.code}</span></div>
          <div style={{fontSize:11,color:C.gray,marginTop:2}}>{t("Comparte con tus amigos","Share with friends")}</div>
        </div>
        <Sec icon="🏅" title={t("Mis puntos","My points")} />
        <div style={{background:C.goldDim,borderRadius:14,padding:16,border:`1px solid ${C.goldBorder}`,display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
          <div style={{fontSize:36}}>{user?.flag}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:700}}>{user?.name}</div>
            <div style={{fontSize:12,color:C.gray}}>{matches.filter(m=>m.hs!==null&&preds[m.id]).length} {t("partidos","matches")}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:28,fontWeight:900,color:C.gold}}>{pts}</div>
            <div style={{fontSize:10,color:C.gray}}>pts</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:16}}>
      <Sec icon="👥" title={t("Mis Grupos","My Groups")} />
      {rooms.map(room=>(
        <div key={room.id} onClick={()=>setSel(room.id)}
          style={{background:C.bgCard,borderRadius:14,padding:"13px 16px",marginBottom:10,border:`1px solid ${C.grayDark}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:28}}>{room.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700}}>{room.name}</div>
            <div style={{fontSize:11,color:C.gold,marginTop:2}}>{room.code}</div>
          </div>
          <div style={{fontSize:18,color:C.gray}}>{">"}</div>
        </div>
      ))}
      {rooms.length===0&&<div style={{textAlign:"center",padding:20,color:C.gray,fontSize:12}}>{t("Crea o unete a un grupo","Create or join a group")}</div>}
      {showCreate?(
        <div style={{background:C.bgCard,borderRadius:14,padding:16,marginBottom:10,border:`1px solid ${C.goldBorder}`}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t("Nuevo grupo","New group")}</div>
          <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={t("Nombre del grupo...","Group name...")}
            style={{width:"100%",background:C.grayDark,border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:"8px 12px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10}} />
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {emojis.map(e=><button key={e} onClick={()=>setNewEmoji(e)} style={{fontSize:22,padding:5,borderRadius:8,border:`2px solid ${newEmoji===e?C.gold:"transparent"}`,background:newEmoji===e?C.goldDim:"transparent",cursor:"pointer"}}>{e}</button>)}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={createRoom} disabled={!newName.trim()} style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${C.gold},#FFA500)`,border:"none",borderRadius:8,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>{t("Crear","Create")}</button>
            <button onClick={()=>setShowCreate(false)} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      ):showJoin?(
        <div style={{background:C.bgCard,borderRadius:14,padding:16,marginBottom:10,border:"1px solid rgba(74,127,232,0.3)"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t("Unirse con codigo","Join with code")}</div>
          <input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} placeholder="ABC123"
            style={{width:"100%",background:C.grayDark,border:"1px solid rgba(74,127,232,0.3)",borderRadius:8,padding:"8px 12px",color:C.white,fontSize:18,fontWeight:700,outline:"none",boxSizing:"border-box",marginBottom:10,letterSpacing:4,textAlign:"center"}} />
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{const r=rooms.find(x=>x.code===joinCode);alert(r?t("Ya eres miembro","Already member"):t("Codigo no encontrado","Code not found"));setShowJoin(false);setJoinCode("");}}
              style={{flex:1,padding:"9px",background:C.blueLight,border:"none",borderRadius:8,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>{t("Unirme","Join")}</button>
            <button onClick={()=>setShowJoin(false)} style={{flex:1,padding:"9px",background:"transparent",border:`1px solid ${C.grayDark}`,borderRadius:8,color:C.gray,fontSize:12,cursor:"pointer"}}>{t("Cancelar","Cancel")}</button>
          </div>
        </div>
      ):(
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button onClick={()=>setShowCreate(true)} style={{flex:1,background:C.goldDim,borderRadius:12,padding:"13px 8px",border:`1px solid ${C.goldBorder}`,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:22}}>+</div>
            <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>{t("Crear grupo","Create group")}</div>
          </button>
          <button onClick={()=>setShowJoin(true)} style={{flex:1,background:C.blueDim,borderRadius:12,padding:"13px 8px",border:"1px solid rgba(74,127,232,0.3)",cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:22}}>🔗</div>
            <div style={{fontSize:12,color:C.blueLight,fontWeight:700,marginTop:4}}>{t("Unirme","Join")}</div>
          </button>
        </div>
      )}
    </div>
  );
}

function AlbumTab({t}) {
  const [selTeam, setSelTeam] = useState(null);
  const [posFilter, setPosFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [gf, setGf] = useState("ALL");
  const groups = ["ALL","A","B","C","D","E","F","G","H","I","J","K","L"];

  if(selTeam) {
    const data = PLAYERS[selTeam.name]||{flag:selTeam.flag,players:[]};
    const cols = COLORS[selTeam.name]||["#1D3D8F","#FFD700"];
    const filtered = data.players.filter(p=>
      (posFilter==="ALL"||p.pos===posFilter)&&
      (search===""||p.name.toLowerCase().includes(search.toLowerCase()))
    );
    const byPos = {GK:[],DEF:[],MID:[],FWD:[]};
    filtered.forEach(p=>{ if(byPos[p.pos]) byPos[p.pos].push(p); });
    return (
      <div style={{padding:16}}>
        <button onClick={()=>{setSelTeam(null);setPosFilter("ALL");setSearch("");}} style={{background:"none",border:"none",color:C.gold,fontSize:13,cursor:"pointer",marginBottom:12}}>{"<"} {t("Equipos","Teams")}</button>
        <div style={{background:`linear-gradient(135deg,${cols[0]},${cols[1]})`,borderRadius:16,padding:18,marginBottom:14,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:52}}>{selTeam.flag}</div>
            <div>
              <div style={{fontSize:20,fontWeight:900,color:"#fff",textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>{selTeam.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:3}}>{t("Grupo","Group")} {selTeam.group} · {data.players.length} {t("jugadores","players")}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginTop:2,letterSpacing:1}}>PANINI · MUNDIAL 2026</div>
            </div>
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("Buscar jugador...","Search player...")}
          style={{width:"100%",background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:10,padding:"8px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:10}} />
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {["ALL","GK","DEF","MID","FWD"].map(pos=>(
            <button key={pos} onClick={()=>setPosFilter(pos)}
              style={{flex:1,padding:"5px 2px",borderRadius:8,border:`1px solid ${posFilter===pos?(PC[pos]||C.gold):C.grayDark}`,background:posFilter===pos?(PC[pos]||C.gold)+"22":C.bgCard,color:posFilter===pos?(PC[pos]||C.gold):C.gray,fontSize:10,cursor:"pointer",fontWeight:posFilter===pos?700:400}}>
              {pos==="ALL"?t("Todos","All"):pos}
            </button>
          ))}
        </div>
        {data.players.length===0&&<div style={{textAlign:"center",padding:20,color:C.gray,fontSize:12}}>{t("Plantilla disponible pronto","Squad available soon")}</div>}
        {Object.entries(byPos).map(([pos,group])=>group.length>0&&(
          <div key={pos} style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:800,color:PC[pos],letterSpacing:2,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:PC[pos]}} />
              {PL[pos]?.toUpperCase()} · {group.length}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {group.map(player=>{
                const tc=COLORS[selTeam.name]||["#1D3D8F","#FFD700"];
                return(
                  <div key={player.id} style={{borderRadius:12,overflow:"hidden",border:"1.5px solid rgba(255,215,0,0.25)",background:`linear-gradient(160deg,${tc[0]},${tc[1]})`,boxShadow:"0 4px 12px rgba(0,0,0,0.4)",position:"relative"}}>
                    <div style={{position:"absolute",top:4,left:5,fontSize:11,fontWeight:900,color:"rgba(255,255,255,0.9)",textShadow:"0 1px 4px rgba(0,0,0,0.8)",zIndex:2}}>{player.num}</div>
                    <div style={{position:"absolute",top:4,right:4,background:PC[player.pos],borderRadius:3,padding:"1px 4px",fontSize:7,fontWeight:800,color:"#000",zIndex:2}}>{player.pos}</div>
                    <div style={{height:70,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.15)",fontSize:30}}>{player.pos==="GK"?"🧤":"⚽"}</div>
                    <div style={{background:"rgba(0,0,0,0.75)",padding:"5px 4px",textAlign:"center"}}>
                      <div style={{fontSize:9,fontWeight:800,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{player.name.split(" ").slice(-1)[0].toUpperCase()}</div>
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

  const filteredTeams = gf==="ALL"?TEAMS:TEAMS.filter(t2=>t2.group===gf);
  return (
    <div style={{padding:16}}>
      <Sec icon="🃏" title={t("Album Panini · Mundial 2026","Panini Album · World Cup 2026")} />
      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {groups.map(g=>(
          <button key={g} onClick={()=>setGf(g)}
            style={{flexShrink:0,padding:"4px 10px",borderRadius:16,border:`1px solid ${gf===g?C.gold:C.grayDark}`,background:gf===g?C.goldDim:C.bgCard,color:gf===g?C.gold:C.gray,fontSize:11,cursor:"pointer",fontWeight:gf===g?700:400}}>
            {g==="ALL"?t("Todos","All"):`G${g}`}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
        {filteredTeams.map(team=>{
          const cols=COLORS[team.name]||["#1D3D8F","#FFD700"];
          const hp=!!(PLAYERS[team.name]?.players?.length);
          return(
            <div key={team.name} onClick={()=>setSelTeam(team)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)"}}>
              <div style={{background:`linear-gradient(135deg,${cols[0]},${cols[1]})`,padding:"14px 14px 10px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",bottom:-8,right:-8,fontSize:56,opacity:0.12}}>{team.flag}</div>
                <div style={{fontSize:36,marginBottom:6}}>{team.flag}</div>
                <div style={{fontSize:13,fontWeight:800,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.2}}>{team.name}</div>
              </div>
              <div style={{background:"rgba(0,0,0,0.8)",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>G{team.group}</div>
                <div style={{fontSize:10,color:hp?C.gold:C.gray}}>{hp?PLAYERS[team.name].players.length+" jug":"Ver"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AITab({t, lang}) {
  const [msgs, setMsgs] = useState([{role:"assistant",content:lang==="es"?"Hola! Soy tu asistente del Mundial 2026. En que te ayudo?":"Hello! I'm your World Cup 2026 assistant. How can I help?"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const send = async(text)=>{
    const msg=text||input.trim();
    if(!msg||loading) return;
    setInput("");
    const newMsgs=[...msgs,{role:"user",content:msg}];
    setMsgs(newMsgs);
    setLoading(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1000,
        system:`Eres experto en futbol y asistente del Mundial 2026 en Mexico, USA, Canada. Responde en ${lang==="es"?"espanol":"English"} de forma concisa con emojis. Max 3 parrafos.`,
        messages:newMsgs.map(m=>({role:m.role,content:m.content}))
      })});
      const d=await r.json();
      setMsgs(prev=>[...prev,{role:"assistant",content:d.content?.[0]?.text||t("Error","Error")}]);
    }catch(e){
      setMsgs(prev=>[...prev,{role:"assistant",content:t("Error de conexion","Connection error")}]);
    }
    setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 140px)"}}>
      <div style={{padding:"12px 16px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1D3D8F,#4A7FE8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🤖</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:C.white}}>Mundial AI</div>
            <div style={{fontSize:10,color:C.green}}>Online · Claude</div>
          </div>
          <button onClick={()=>setMsgs([{role:"assistant",content:t("Chat reiniciado","Chat reset")}])} style={{marginLeft:"auto",background:C.grayDark,border:"none",color:C.gray,padding:"4px 10px",borderRadius:16,fontSize:11,cursor:"pointer"}}>Reset</button>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8}}>
          {TIPS.map((s,i)=>(
            <button key={i} onClick={()=>send(s)} style={{flexShrink:0,padding:"5px 10px",borderRadius:20,border:`1px solid ${C.grayDark}`,background:C.bgCard,color:C.gray,fontSize:10,cursor:"pointer",whiteSpace:"nowrap"}}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
        {msgs.map((msg,i)=>(
          <div key={i} style={{marginBottom:12,display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role==="assistant"&&<div style={{fontSize:18,marginBottom:4}}>🤖</div>}
            <div style={{maxWidth:"85%",background:msg.role==="user"?"linear-gradient(135deg,#1D3D8F,#4A7FE8)":C.bgCard,border:msg.role==="assistant"?`1px solid ${C.grayDark}`:"none",borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",fontSize:13,color:C.white,lineHeight:1.6,whiteSpace:"pre-wrap"}}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:12}}>
            <div style={{fontSize:18}}>🤖</div>
            <div style={{background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:"18px 18px 18px 4px",padding:"12px 16px",display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.blueLight,animation:`pulse 1.2s ease ${i*0.2}s infinite`}} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{padding:"10px 16px 14px",background:C.bg,borderTop:`1px solid ${C.grayDark}`}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
            placeholder={t("Pregunta sobre el Mundial...","Ask about the World Cup...")}
            style={{flex:1,background:C.bgCard,border:`1px solid ${C.grayDark}`,borderRadius:20,padding:"10px 16px",color:C.white,fontSize:13,outline:"none"}} />
          <button onClick={()=>send()} disabled={!input.trim()||loading}
            style={{width:42,height:42,borderRadius:"50%",background:input.trim()&&!loading?"linear-gradient(135deg,#1D3D8F,#4A7FE8)":C.grayDark,border:"none",cursor:input.trim()&&!loading?"pointer":"default",fontSize:18,flexShrink:0}}>
            {loading?"...":">"}
          </button>
        </div>
        <div style={{fontSize:9,color:C.gray,textAlign:"center",marginTop:6}}>Powered by Claude · Anthropic</div>
      </div>
    </div>
  );
}

function SettingsTab({t, lang, setLang, notifs, setNotifs, user}) {
  const Toggle=({icon,title,sub,val,onChange})=>(
    <div style={{background:C.bgCard,borderRadius:12,padding:"12px 14px",marginBottom:8,border:`1px solid ${C.grayDark}`,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:20}}>{icon}</span>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:600}}>{title}</div>
        <div style={{fontSize:11,color:C.gray,marginTop:1}}>{sub}</div>
      </div>
      <button onClick={()=>onChange(!val)} style={{width:44,height:24,borderRadius:12,background:val?C.gold:C.grayDark,border:"none",cursor:"pointer",position:"relative",transition:"background 0.3s",flexShrink:0}}>
        <div style={{width:18,height:18,borderRadius:"50%",background:"white",position:"absolute",top:3,left:val?23:3,transition:"left 0.3s"}} />
      </button>
    </div>
  );
  return(
    <div style={{padding:16}}>
      <Sec icon="⚙️" title={t("Ajustes","Settings")} />
      {user&&(
        <div style={{background:"linear-gradient(135deg,#1a2f6e,#0a1428)",borderRadius:12,padding:14,marginBottom:16,border:`1px solid ${C.goldBorder}`,display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:36}}>{user.flag}</div>
          <div>
            <div style={{fontSize:16,fontWeight:700}}>{user.name}</div>
            <div style={{fontSize:11,color:C.gray}}>@{user.username}</div>
            <div style={{fontSize:10,color:C.green,marginTop:2}}>{t("Guardado localmente","Saved locally")}</div>
          </div>
        </div>
      )}
      <div style={{fontSize:10,color:C.gold,letterSpacing:2,fontWeight:700,marginBottom:6}}>{t("IDIOMA","LANGUAGE")}</div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["es","Espanol"],["en","English"]].map(([l,label])=>(
          <button key={l} onClick={()=>setLang(l)}
            style={{flex:1,padding:"9px",borderRadius:10,border:`1px solid ${lang===l?C.gold:C.grayDark}`,background:lang===l?C.goldDim:C.bgCard,color:lang===l?C.gold:C.gray,fontSize:13,cursor:"pointer",fontWeight:lang===l?700:400}}>
            {label}
          </button>
        ))}
      </div>
      <div style={{fontSize:10,color:C.gold,letterSpacing:2,fontWeight:700,marginBottom:6}}>{t("NOTIFICACIONES","NOTIFICATIONS")}</div>
      <Toggle icon="🔔" title={t("Alertas de partidos","Match alerts")} sub={t("1 hora antes del partido","1 hour before kickoff")} val={notifs} onChange={setNotifs} />
      <div style={{background:C.goldDim,borderRadius:12,padding:14,marginTop:8,border:`1px solid ${C.goldBorder}`,textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:700,color:C.gold}}>🏆 Mundial 2026</div>
        <div style={{fontSize:11,color:C.gray,marginTop:4}}>Jun 11 - Jul 19 · 48 {t("equipos","teams")} · 104 {t("partidos","matches")}</div>
        <div style={{fontSize:10,color:C.gray,marginTop:2}}>v5.0 · Made with Claude</div>
      </div>
      {user&&(
        <button onClick={()=>{
          try{
            localStorage.removeItem("wc26_user");
            localStorage.removeItem("wc26_m");
            localStorage.removeItem("wc26_p");
            localStorage.removeItem("wc26_r");
          }catch(e){}
          window.location.reload();
        }} style={{width:"100%",marginTop:10,padding:"9px",background:"rgba(230,57,70,0.1)",border:"1px solid rgba(230,57,70,0.3)",borderRadius:10,color:"#FF6B7A",fontSize:13,cursor:"pointer",fontWeight:600}}>
          🚪 {user?.isGuest ? t("Iniciar sesion / Registrarse","Sign in / Register") : t("Cerrar sesion","Sign out")}
        </button>
      )}
    </div>
  );
}

function Sec({icon, title}) {
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:8}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{fontSize:13,fontWeight:800,color:C.white}}>{title}</span>
      <div style={{flex:1,height:1,background:"rgba(255,255,255,0.05)"}} />
    </div>
  );
}
