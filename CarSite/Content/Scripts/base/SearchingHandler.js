var SearchingHandler = {
    expandSearching : function () {        
        $("#div-center").removeClass("div-center").addClass("div-center-searching");
    },

    collapseSearching : function () {        
        $("#div-center").removeClass("div-center-searching").addClass("div-center");
    },

    renderModels: function (firm) {

        var modelItem = "<div><input type='checkbox' class='checkbox-model' checked='checked' /> <label>@carModel</label></div>";
        var modelsName = "";

        switch (firm) {
            case "Acura": modelsName = " CL,EL,ILX,Intergra,Legend,MDX,RDX,TL,TSX,Vigor,ZDX,Khác,"; break;
            case "Audi": modelsName = "100,200,80,90, A1,A2,A3,A4,A5,A6,A7,A8,Cabriolet,Coupe,Q3,Q5,Q7,Quattro,TT,V8,Khác,"; break;
            case "BMW": modelsName = " 1 Series,2 Series,3 Series,4 Series,5 Series,6 Series,7 Series,8 Series,Alpina,i3,i8,M couper,M3,M4,M5,M6,X1,X3,X4,X5,X6,Z3,Z4,Z8,Khác,"; break;
            case "Chevrolet": modelsName = "Astro,Avanlanche,Aveo,Beretta,Camaro,Caprice,Captiva,Cavalier,Chevyvan,Colorado,Corsica,Corvette,Cruze,Explorer,Express,Impala,Ipanema,Kalos,Lacetti,Lumina,Malibu,Matiz,Nubira,Orlando,Prizm,S 10,Silverado,Spark,SSR, Suburban,Tracker,Venture,Vivant,Khác,"; break;
            case "Daewoo": modelsName = "Aranos,Arcadia,Brougham,Chairman,Cielo,Damas,Espero,Evanda,Gentra,GentraX,Istana,Kalos,Karando,Labo,Lacetti,Lanos,Leganza,Lublin,Magnus,Matiz,Musso,Nubira,Polonez,Prince,Racer,Rexton,Rezzo,Tico,Winstorm,Suburban,Khác,"; break;
            case "Daihatsu": modelsName = "Charade,Citivan,Hijet,Terios,Khác,"; break;
            case "Fiat": modelsName = "126,500,Albea,Bravo,Cinquecento,Coupe,Doblo,Ducato,Punto,Regata,Seicento,Siena,Strada,Talento,Tempra,Tipo,Uno,Khác,"; break;
            case "Ford": modelsName = "Acononline,Aerostar,Aspire,Bronco,Capri,Caravan,Cargo,Club wagon,Contour,Courier,Crown victoria,EcoSport,Edge,Escape,Escort,Espedition,Everest,Explorer,Express,F 150,F 700,Fiesta,Flex,Focus,Focus C Max,Ka,Laser,Maverick,Mondeo,Mustang,Probe,Puma,Ranger,Sierra, Taurus,Express,Tempo,Transit,Wind star,Khác,"; break;
            case "Honda": modelsName = "Accord,City,Civic,Concerto,CR V,CR X,CR Z,Domani,Element,FIT,Insight,Integra,Jazz,Legend,Mobilo,NSX,Odyssey,Passport,Pilot,Prelude,S2000,Stream,Torneo,Vigor,Z,Khác,"; break;
            case "Hyundai": modelsName = "Azera,Accent,Atos,Avante,Centennial,Click,County,Coupe,Dynasty,Elantra,Eon,Equus,Excel,Galloper,Genesis,Getz,Gold,Grand Starex,Grandeur,H 1,H 100,HD,i10,i20,i30,i40,Innovation,Lantra,Lavita,Libero,Maxcruz,Pony,Porter,S coupe,Santa Fe,Sonata,Starex,Terracan,Tiburon,Trajet,Tucson,Tuscani,Universe,Universe Xpress Luxury,Veloster,Veracruz,Verna,Xcent,XG,Khác,"; break;
            case "Isuzu": modelsName = "Amigo,Ascender,Aska,D Cargo,Dmax,FVR,Gemini,Hi lander,Midi,NLR,NMR,NPR,NQR,Pick up,QKR,Rodeo,Trooper,Khác,"; break;
            case "Kia": modelsName = "Avella,Bongo,Cadenza,Carens,Carnival,Cerato,Clarus,Concord,Forte,Frontier,Jeep,Joice,K2700,K3,K3000S,K5,K7,Lotze,Magentis,Morning,Opirus,Optima,Picanto,Potentia,Pregio,Pride,Ray,Retona,Rio,Roadster,Rondo,Sedona,Sephia,Sorento,Soul,Spectra,Sportage,Visto,Khác,"; break;
            case "LandRover": modelsName = "Defender,Discovery,Freelander,LR2,Range rover,Khác,"; break;
            case "Lexus": modelsName = "CT,ES,GS,GX,HS,IS,LS,LX,NX,RX,SC,SL, Khác,"; break;
            case "Mazda": modelsName = "2,3,323,323F,5,6,626,929,Atenza,AZ,B series,BT 50,Carol,CX 5,CX 7,CX 9,Eunos,Millenia,MPV,MX 3,MX 5,MX 6,Pickup,Premacy,RX 7,RX 8,Tribute,Xedos 9,Khác,"; break;
            case "MercedesBenz": modelsName = "190,A class,Atego,B class,C class,CL class,CLA class,CLK class,CLS class,E class,G class,GL,GLA class,GLC,GLE Class,GLK Class,M class,MB,ML Class,R class,S class,SL class,SLK class,SLR Mclaren,Sprinter,SR class,V class,Vaneo,Viano,Vito,Khác,"; break;
            case "Mitsubishi": modelsName = "3000GT,Airtek,Atego,Attrage,Canter,Challenger,Chariot,Colt,Diamante,Dion,Eclipse,EK wagon,Galant,Grandis,Grunder,Hover,IO,Jeep,Jolie,L200,L300,Lancer,Libero,Mirage,Montero,Outlander,Pajero,Santamo,Savrin,Sigma,Space Gear,Starion,Triton,Veryca,Zinger,Khác,"; break;
            case "Nissan": modelsName = "100NX,200SX,240SX,300ZX,350Z,370Z,Altima,Avenir,Bluebird,Cedric,Cefiro,Cima,Elgrand,Frontier,Gloria,Grand livina,GT R,Juke,Lago,Laurel,Leaf,Liberty,Livina,Maxima,Micra,Murano,Navara,NV,Pathfinder,Patrol,Pick up,Pixo,Prairie,Presage,President,Primastar,Primera,Pulsar,Qashqai,Quest,Rasheen,Rogue,Safari,Sentra,Serena,Silvia,Skyline,Stagea,Sunny,Teana,Terrano,Tiida,Tino,Urvan,Vanette,X Terra,X trail,Khác,"; break;
            case "Peugeot": modelsName = "107,205,206,207,208,3008,305,307,309,404,405,406,408,505,508,607,Boxer,J5,RCZ,Khác,"; break;
            case "Porsche": modelsName = "Boxster,Carrera,Cayenne,Cayman,Macan,Panamera,Khác,"; break;
            case "Renault": modelsName = "11,19,21,25,Clio,Fluence,Kangoo,Koleos,Laguna,Latitude,Megane,Safrane,Sport Spider,Trafic,Wind,Khác,mera,Khác,"; break;
            case "Ssangyong": modelsName = "Chairman,Family,Istana,Korando,Kyron,Musso,Rexton,Khác,"; break;
            case "Suzuki": modelsName = "Aerio,Alto,APV,Balenno,Carry,Cultis wagon,Ertiga,Grand vitara,Liana,Samirai,SJ,Super Carry Truck,Super Carry Van,Swift,Twin,Vitara,Wagon R+,XL 7,Khác,"; break;
            case "Toyota": modelsName = "4 Runner,86,Allion,Alphard,Altezza,Aristo,Aurion,Avalon,Avensis,Aygo,Brevis,Caldina,Cami,Camry,Carina,Celica,Century,Chaser,Corolla,Corolla altis,Corona,Cressida,Cresta,Crown,Estima,Fj cruiser,Fortuner,Hiace,Highlander,Hilux,Innova,Ipsum,IQ,Land Cruiser,Liteace,Mark II,Matrix,MR 2,Picnic,Platz,Prado,Previa,Prius,Progres,Raum,RAV4,Sequoia,Sera,Sienna,Soarer,Solara,Starlet,Supra,Tacoma,Tercel,Townace,Tundra,Venza,Vios,Vista,Wish,XA,Yaris,Yaris Verso,Zace,Khác,"; break;
            case "Volkswagen": modelsName = "Beetle,Bora,California,Eos,Golf,Jetta,Multivan,New Beetle,Passat,Phaeton,Polo,Routan,Scirocco,Sharan,Solo,Tiguan,Touareg,Transporter,Vento,Khác,"; break;
            case "AlfaRomeo": modelsName = "GT,Spider,Khác"; break;
            case "AstonMartin": modelsName ="DB7,Lagonda,Vantage,Virage,Zagato,Khác"; break;
            case "Asia": modelsName ="Khác"; break;
            case "Baic": modelsName = "S3,Bentley,Azure,Brooklands,Continental,Mulsanne,Khác"; break;
            case "Buick": modelsName = "Electra,Lasabre,Skylark,Khác"; break;
            case "BYD": modelsName = "F0,Khác"; break;
            case "Cadillac": modelsName = "Allante,ATS,Catera,CTS,Deville,Escalade,Fleetwood,Seville,SRX,STS,Khác"; break;
            case "Changan": modelsName = "CX20,Eado,Honor"; break;
            case "Chery": modelsName = "QQ3,Khác"; break;
            case "Chrysler": modelsName = "200,300C,300M,Cruiser,Grand Voyager,Intrepid,Jeep cherokee,LeBaron,Neon,New Yorker,Ptcruise,Sebring,Stratus,Voyager,Khác"; break;
            case "Citroen": modelsName = "AX,C1,C2,C3,CX,DS3,XM,ZX,Khác"; break;
            case "Dodge": modelsName = "Caravan,Dakota,Durango,Grand caravan,Journey,Neon,Ram,Stealth,Voyager,Khác"; break;
            case "Ferrari": modelsName = "456,458,575,California,F 355,F 360,F 512,Maranello,Testarossa,Khác"; break;
            case "Gaz": modelsName = "69,Volga,Khác"; break;
            case "Geely": modelsName = "Emgrand,Englon,Khác"; break;
            case "GMC": modelsName = "Savana,Khác"; break;
            case "Haima": modelsName = "2,3,7,Freema,Fstar,M3,M8,S5,S7,Khác"; break;
            case "Hummer": modelsName = "H2,H3,Khác"; break;
            case "Infiniti": modelsName = "EX,FX,G35,G37,Q45,QX,Khác"; break;
            case "Jaguar": modelsName = "S Type,X Type,XF,XJ series,XK series,Khác"; break;   
            case "Lada": modelsName = "2104,2105,2106,2107,2108,2109,2112,2121,Niva,Samara,Khác"; break;    
            case "Lifan": modelsName = "520,620,Khác"; break;
            case "Lincoln": modelsName = "Continental,Town car,Khác"; break;
            case "Luxgen": modelsName = "5,7 MPV,7 SUV,M7,U7,Khác"; break;
            case "Man": modelsName = "CLA,Khác"; break;
            case "Maserati": modelsName = "Quatroporte,Khác"; break;
            case "Maybach": modelsName = "57,Khác"; break;
            case "Mekong": modelsName = "Paso,Premio,Pronto,Khác"; break;
            case "Mercury": modelsName = "Sable,Topaz,Villager,Khác"; break;
            case "Mini": modelsName = "Cooper,One,Khác"; break;
            case "Opel": modelsName = "Antara,Astra,Combo,Corsa,Omega,Record,Tigra,Vectra,Khác"; break;
            case "Pontiac": modelsName = "Aztek,Fiero,Firebird,Solstice,Trans sport,Khác"; break;               
            case "RollsRoyce": modelsName = "Ghost,Phantom,Wraith,Khác"; break;
            case "Rover": modelsName = "100,200,400,800,Khác"; break;
            case "Samsung": modelsName = "QM5,SM3,SM5,SM7,Khác"; break;
            case "Scion": modelsName = "Xd,Khác"; break;
            case "Smart": modelsName = "Coupe,Forfour,Fortwo,Roadster,Khác"; break;
            case "Proton": modelsName = "Arena,Perdana,Tiara,Wira,Khác"; break;
            case "Subaru": modelsName = "Forester,Impreza,Legacy,Levorg,Outback,Tribeca,XV,Khác"; break;
            case "SYM": modelsName = " T1000,T880,V11,V5,Khác"; break;
            case "Tesla": modelsName = "S"; break;
            case "Aston Martin": modelsName = "DB7,Lagonda,Rapide,Vanquish,Vantage,Virage,Zagato,Khác"; break;
            case "Bentley": modelsName = "Azure,Brooklands,Continental,Flying Spur,Mulsanne, Khác"; break;
            case "Fuso": modelsName = "Canter, Fighter,FV,Rosa,Tractor, Khác"; break;
            case "Hino": modelsName = "300 Series,500 Series, 700 Series, Khác"; break;
            case "Jeep": modelsName = "A2,Cherokee,CJ,Grand,Liberty,Wrangler,Khác"; break;
            case "Lamborghini": modelsName = "Aventador, Diablo, Gallado, Murcielago, Khác"; break;
            case "MG": modelsName = "350C,5,6,Express, ZT,Khác"; break;
            case "Thaco": modelsName = "Auman,Aumark,Forland,Foton,Frontier,Mobihome,Ollin,Towner,Khác"; break;
            case "Vinaxuki": modelsName = "1200B,1240T,1490T,1980T,1990BA,2500BA,3450T,35000TL,4500BA,50000BA,5500TL,7000BA,990T,Hafei,Jinbei,Khác"; break;
            case "Volvo": modelsName = "340,360,460,740,760,850,940,960,C70,S60,V70,XC90,Khác"; break;
            case "Zotye": modelsName = "T600,Z100,Z300,Z500,Khác"; break;
               
                

                

                
                
                
               
                
                
               
                

                
                
                
               
                

               
               
                
               

                
               
               
                
               
                
                
                

                
                
                
               
               

               
                
               
                
                
               

               
    
                
     
                
               
                           
                
                
                                             
            default: modelsName = "";
        }

        var models = "";
        if (modelsName != "") {
            var modelsArray = modelsName.split(',');
            for (var i = 0 ; i < modelsArray.length; i++) {
                models += modelItem.replace("@carModel", modelsArray[i]);
            }
        }
        $("#search_model_box").html(models);
    }
}

