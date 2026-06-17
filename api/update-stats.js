const AF_KEY = "a70341b45b99eafecf1871bb317700b3";
const AF_URL = "https://v3.football.api-sports.io";
const SB_URL = "https://asntocdbpqnawneyszpx.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbnRvY2RicHFuYXduZXlzenB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDAwMjQsImV4cCI6MjA5NjExNjAyNH0.PKBJ6s2zEbETWmzKlqhaQGNMH6yfrlCgbZdZWKZdDjo";

const TEAMS={"France":{n:"Francia",f:"🇫🇷"},"Brazil":{n:"Brasil",f:"🇧🇷"},"Argentina":{n:"Argentina",f:"🇦🇷"},"England":{n:"Inglaterra",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},"Germany":{n:"Alemania",f:"🇩🇪"},"Spain":{n:"España",f:"🇪🇸"},"Portugal":{n:"Portugal",f:"🇵🇹"},"Mexico":{n:"México",f:"🇲🇽"},"Morocco":{n:"Marruecos",f:"🇲🇦"},"United States":{n:"USA",f:"🇺🇸"},"USA":{n:"USA",f:"🇺🇸"},"Norway":{n:"Noruega",f:"🇳🇴"},"Egypt":{n:"Egipto",f:"🇪🇬"},"South Korea":{n:"Corea del Sur",f:"🇰🇷"},"Netherlands":{n:"Países Bajos",f:"🇳🇱"},"Croatia":{n:"Croacia",f:"🇭🇷"},"Uruguay":{n:"Uruguay",f:"🇺🇾"},"Colombia":{n:"Colombia",f:"🇨🇴"},"Ecuador":{n:"Ecuador",f:"🇪🇨"},"Senegal":{n:"Senegal",f:"🇸🇳"},"Japan":{n:"Japón",f:"🇯🇵"},"Belgium":{n:"Bélgica",f:"🇧🇪"},"Canada":{n:"Canadá",f:"🇨🇦"},"Australia":{n:"Australia",f:"🇦🇺"},"Austria":{n:"Austria",f:"🇦🇹"},"Algeria":{n:"Argelia",f:"🇩🇿"},"Bosnia":{n:"Bosnia",f:"🇧🇦"},"Sweden":{n:"Suecia",f:"🇸🇪"},"Switzerland":{n:"Suiza",f:"🇨🇭"},"Turkey":{n:"Turquía",f:"🇹🇷"},"Czech Republic":{n:"Chequia",f:"🇨🇿"},"Czechia":{n:"Chequia",f:"🇨🇿"},"Ghana":{n:"Ghana",f:"🇬🇭"},"Qatar":{n:"Qatar",f:"🇶🇦"},"Saudi Arabia":{n:"Arabia Saudita",f:"🇸🇦"},"Tunisia":{n:"Túnez",f:"🇹🇳"},"Iran":{n:"Irán",f:"🇮🇷"},"Iraq":{n:"Irak",f:"🇮🇶"},"Jordan":{n:"Jordania",f:"🇯🇴"},"DR Congo":{n:"DR Congo",f:"🇨🇩"},"Scotland":{n:"Escocia",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},"New Zealand":{n:"N.Zelanda",f:"🇳🇿"},"Paraguay":{n:"Paraguay",f:"🇵🇾"},"Panama":{n:"Panamá",f:"🇵🇦"},"Curaçao":{n:"Curazao",f:"🇨🇼"},"Haiti":{n:"Haití",f:"🇭🇹"},"South Africa":{n:"Sudáfrica",f:"🇿🇦"},"Uzbekistan":{n:"Uzbekistán",f:"🇺🇿"},"Cape Verde":{n:"Cabo Verde",f:"🇨🇻"}};

async function fetchAF(endpoint){
  const r=await fetch(`${AF_URL}/${endpoint}&league=1&season=2026`,{headers:{"x-apisports-key":AF_KEY}});
  const d=await r.json();
  return d.response||[];
}

async function upsert(player){
  await fetch(`${SB_URL}/rest/v1/tournament_stats`,{
    method:"POST",
    headers:{"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},
    body:JSON.stringify(player)
  });
}

export default async function handler(req,res){
  try{
    const now=new Date().toISOString();

    // Goles
    const scorers=await fetchAF("players/topscorers?");
    for(const i of scorers){
      const s=i.statistics?.[0];if(!s)continue;
      const t=TEAMS[s.team?.name]||{n:s.team?.name,f:"🏳️"};
      await upsert({player_name:i.player.name,team:t.n,flag:t.f,pos:"FWD",club:s.team?.name||"",goals:s.goals?.total||0,matches_played:s.games?.appearences||0,updated_at:now});
    }

    // Asistencias
    const assists=await fetchAF("players/topassists?");
    for(const i of assists){
      const s=i.statistics?.[0];if(!s)continue;
      const t=TEAMS[s.team?.name]||{n:s.team?.name,f:"🏳️"};
      await upsert({player_name:i.player.name,team:t.n,flag:t.f,pos:"MID",club:s.team?.name||"",assists:s.goals?.assists||0,matches_played:s.games?.appearences||0,updated_at:now});
    }

    // Tarjetas amarillas
    const yellows=await fetchAF("players/topyellowcards?");
    for(const i of yellows){
      const s=i.statistics?.[0];if(!s)continue;
      const t=TEAMS[s.team?.name]||{n:s.team?.name,f:"🏳️"};
      await upsert({player_name:i.player.name,team:t.n,flag:t.f,pos:"MID",club:s.team?.name||"",yellow_cards:s.cards?.yellow||0,matches_played:s.games?.appearences||0,updated_at:now});
    }

    // Tarjetas rojas
    const reds=await fetchAF("players/topredcards?");
    for(const i of reds){
      const s=i.statistics?.[0];if(!s)continue;
      const t=TEAMS[s.team?.name]||{n:s.team?.name,f:"🏳️"};
      await upsert({player_name:i.player.name,team:t.n,flag:t.f,pos:"DEF",club:s.team?.name||"",red_cards:s.cards?.red||0,matches_played:s.games?.appearences||0,updated_at:now});
    }

    res.status(200).json({ok:true,updated_at:now});
  }catch(e){
    res.status(500).json({ok:false,error:e.message});
  }
}
