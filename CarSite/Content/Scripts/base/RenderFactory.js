
var RenderFactory = {

    renderModels: function (firm, elementId) {
        
        var input = "Tất cả";

        switch (firm) {
            case "Acura": input = "Tất cả,CL,EL,ILX,Intergra,Legend,MDX,RDX,TL,TSX,Vigor,ZDX,Khác"; break;
            case "Audi": input = "Tất cả,100,200,80,90, A1,A2,A3,A4,A5,A6,A7,A8,Cabriolet,Coupe,Q3,Q5,Q7,Quattro,TT,V8,Khác"; break;
            case "BMW": input = "Tất cả,1 Series,2 Series,3 Series,4 Series,5 Series,6 Series,7 Series,8 Series,Alpina,i3,i8,M couper,M3,M4,M5,M6,X1,X3,X4,X5,X6,Z3,Z4,Z8,Khác"; break;
            case "Chevrolet": input = "Tất cả,Astro,Avanlanche,Aveo,Beretta,Camaro,Caprice,Captiva,Cavalier,Chevyvan,Colorado,Corsica,Corvette,Cruze,Explorer,Express,Impala,Ipanema,Kalos,Lacetti,Lumina,Malibu,Matiz,Nubira,Orlando,Prizm,S 10,Silverado,Spark,SSR, Suburban,Tracker,Venture,Vivant,Khác"; break;
            case "Daewoo": input = "Tất cả,Aranos,Arcadia,Brougham,Chairman,Cielo,Damas,Espero,Evanda,Gentra,GentraX,Istana,Kalos,Karando,Labo,Lacetti,Lanos,Leganza,Lublin,Magnus,Matiz,Musso,Nubira,Polonez,Prince,Racer,Rexton,Rezzo,Tico,Winstorm,Suburban,Khác"; break;
            case "Daihatsu": input = "Tất cả,Charade,Citivan,Hijet,Terios,Khác"; break;
            case "Fiat": input = "Tất cả,126,500,Albea,Bravo,Cinquecento,Coupe,Doblo,Ducato,Punto,Regata,Seicento,Siena,Strada,Talento,Tempra,Tipo,Uno,Khác"; break;
            case "Ford": input = "Tất cả,Acononline,Aerostar,Aspire,Bronco,Capri,Caravan,Cargo,Club wagon,Contour,Courier,Crown victoria,EcoSport,Edge,Escape,Escort,Espedition,Everest,Explorer,Express,F 150,F 700,Fiesta,Flex,Focus,Focus C Max,Ka,Laser,Maverick,Mondeo,Mustang,Probe,Puma,Ranger,Sierra, Taurus,Express,Tempo,Transit,Wind star,Khác"; break;
            case "Honda": input = "Tất cả,Accord,City,Civic,Concerto,CR V,CR X,CR Z,Domani,Element,FIT,Insight,Integra,Jazz,Legend,Mobilo,NSX,Odyssey,Passport,Pilot,Prelude,S2000,Stream,Torneo,Vigor,Z,Khác"; break;
            case "Hyundai": input = "Tất cả,Azera,Accent,Atos,Avante,Centennial,Click,County,Coupe,Dynasty,Elantra,Eon,Equus,Excel,Galloper,Genesis,Getz,Gold,Grand Starex,Grandeur,H 1,H 100,HD,i10,i20,i30,i40,Innovation,Lantra,Lavita,Libero,Maxcruz,Pony,Porter,S coupe,Santa Fe,Sonata,Starex,Terracan,Tiburon,Trajet,Tucson,Tuscani,Universe,Universe Xpress Luxury,Veloster,Veracruz,Verna,Xcent,XG,Khác"; break;
            case "Isuzu": input = "Tất cả,Amigo,Ascender,Aska,D Cargo,Dmax,FVR,Gemini,Hi lander,Midi,NLR,NMR,NPR,NQR,Pick up,QKR,Rodeo,Trooper,Khác"; break;
            case "Kia": input = "Tất cả,Avella,Bongo,Cadenza,Carens,Carnival,Cerato,Clarus,Concord,Forte,Frontier,Jeep,Joice,K2700,K3,K3000S,K5,K7,Lotze,Magentis,Morning,Opirus,Optima,Picanto,Potentia,Pregio,Pride,Ray,Retona,Rio,Roadster,Rondo,Sedona,Sephia,Sorento,Soul,Spectra,Sportage,Visto,Khác"; break;
            case "LandRover": input = "Tất cả,Defender,Discovery,Freelander,LR2,Range rover,Khác"; break;
            case "Lexus": input = "Tất cả,CT,ES,GS,GX,HS,IS,LS,LX,NX,RX,SC,SL,Khác"; break;
            case "Mazda": input = "Tất cả,2,3,323,323F,5,6,626,929,Atenza,AZ,B series,BT 50,Carol,CX 5,CX 7,CX 9,Eunos,Millenia,MPV,MX 3,MX 5,MX 6,Pickup,Premacy,RX 7,RX 8,Tribute,Xedos 9,Khác"; break;
            case "MercedesBenz": input = "Tất cả,190,A class,Atego,B class,C class,CL class,CLA class,CLK class,CLS class,E class,G class,GL,GLA class,GLC,GLE Class,GLK Class,M class,MB,ML Class,R class,S class,SL class,SLK class,SLR Mclaren,Sprinter,SR class,V class,Vaneo,Viano,Vito,Khác"; break;
            case "Mitsubishi": input = "Tất cả,3000GT,Airtek,Atego,Attrage,Canter,Challenger,Chariot,Colt,Diamante,Dion,Eclipse,EK wagon,Galant,Grandis,Grunder,Hover,IO,Jeep,Jolie,L200,L300,Lancer,Libero,Mirage,Montero,Outlander,Pajero,Santamo,Savrin,Sigma,Space Gear,Starion,Triton,Veryca,Zinger,Khác"; break;
            case "Nissan": input = "Tất cả,100NX,200SX,240SX,300ZX,350Z,370Z,Altima,Avenir,Bluebird,Cedric,Cefiro,Cima,Elgrand,Frontier,Gloria,Grand livina,GT R,Juke,Lago,Laurel,Leaf,Liberty,Livina,Maxima,Micra,Murano,Navara,NV,Pathfinder,Patrol,Pick up,Pixo,Prairie,Presage,President,Primastar,Primera,Pulsar,Qashqai,Quest,Rasheen,Rogue,Safari,Sentra,Serena,Silvia,Skyline,Stagea,Sunny,Teana,Terrano,Tiida,Tino,Urvan,Vanette,X Terra,X trail,Khác"; break;
            case "Peugeot": input = "Tất cả,107,205,206,207,208,3008,305,307,309,404,405,406,408,505,508,607,Boxer,J5,RCZ,Khác"; break;
            case "Porsche": input = "Tất cả,Boxster,Carrera,Cayenne,Cayman,Macan,Panamera,Khác"; break;
            case "Renault": input = "Tất cả,11,19,21,25,Clio,Fluence,Kangoo,Koleos,Laguna,Latitude,Megane,Safrane,Sport Spider,Trafic,Wind,Khác,mera,Khác"; break;
            case "Ssangyong": input = "Tất cả,Chairman,Family,Istana,Korando,Kyron,Musso,Rexton,Khác"; break;
            case "Suzuki": input = "Tất cả,Aerio,Alto,APV,Balenno,Carry,Cultis wagon,Ertiga,Grand vitara,Liana,Samirai,SJ,Super Carry Truck,Super Carry Van,Swift,Twin,Vitara,Wagon R+,XL 7,Khác"; break;
            case "Toyota": input = "Tất cả,4 Runner,86,Allion,Alphard,Altezza,Aristo,Aurion,Avalon,Avensis,Aygo,Brevis,Caldina,Cami,Camry,Carina,Celica,Century,Chaser,Corolla,Corolla altis,Corona,Cressida,Cresta,Crown,Estima,Fj cruiser,Fortuner,Hiace,Highlander,Hilux,Innova,Ipsum,IQ,Land Cruiser,Liteace,Mark II,Matrix,MR 2,Picnic,Platz,Prado,Previa,Prius,Progres,Raum,RAV4,Sequoia,Sera,Sienna,Soarer,Solara,Starlet,Supra,Tacoma,Tercel,Townace,Tundra,Venza,Vios,Vista,Wish,XA,Yaris,Yaris Verso,Zace,Khác"; break;
            case "Volkswagen": input = "Tất cả,Beetle,Bora,California,Eos,Golf,Jetta,Multivan,New Beetle,Passat,Phaeton,Polo,Routan,Scirocco,Sharan,Solo,Tiguan,Touareg,Transporter,Vento,Khác"; break;
            case "AlfaRomeo": input = "Tất cả,GT,Spider,Khác"; break;
            case "AstonMartin": input = "Tất cả,DB7,Lagonda,Vantage,Virage,Zagato,Khác"; break;
            case "Asia": input = "Tất cả"; break;
            case "Baic": input = "Tất cả,S3,Bentley,Azure,Brooklands,Continental,Mulsanne,Khác"; break;
            case "Buick": input = "Tất cả,Electra,Lasabre,Skylark,Khác"; break;
            case "BYD": input = "Tất cả,F0,Khác"; break;
            case "Cadillac": input = "Tất cả,Allante,ATS,Catera,CTS,Deville,Escalade,Fleetwood,Seville,SRX,STS,Khác"; break;
            case "Changan": input = "Tất cả,CX20,Eado,Honor"; break;
            case "Chery": input = "Tất cả,QQ3,Khác"; break;
            case "Chrysler": input = "Tất cả,200,300C,300M,Cruiser,Grand Voyager,Intrepid,Jeep cherokee,LeBaron,Neon,New Yorker,Ptcruise,Sebring,Stratus,Voyager,Khác"; break;
            case "Citroen": input = "Tất cả,AX,C1,C2,C3,CX,DS3,XM,ZX,Khác"; break;
            case "Dodge": input = "Tất cả,Caravan,Dakota,Durango,Grand caravan,Journey,Neon,Ram,Stealth,Voyager,Khác"; break;
            case "Ferrari": input = "Tất cả,456,458,575,California,F 355,F 360,F 512,Maranello,Testarossa,Khác"; break;
            case "Gaz": input = "Tất cả,69,Volga,Khác"; break;
            case "Geely": input = "Tất cả,Emgrand,Englon,Khác"; break;
            case "GMC": input = "Tất cả,Savana,Khác"; break;
            case "Haima": input = "Tất cả,2,3,7,Freema,Fstar,M3,M8,S5,S7,Khác"; break;
            case "Hummer": input = "Tất cả,H2,H3,Khác"; break;
            case "Infiniti": input = "Tất cả,EX,FX,G35,G37,Q45,QX,Khác"; break;
            case "Jaguar": input = "Tất cả,S Type,X Type,XF,XJ series,XK series,Khác"; break;
            case "Lada": input = "Tất cả,2104,2105,2106,2107,2108,2109,2112,2121,Niva,Samara,Khác"; break;
            case "Lifan": input = "Tất cả,520,620,Khác"; break;
            case "Lincoln": input = "Tất cả,Continental,Town car,Khác"; break;
            case "Luxgen": input = "Tất cả,5,7 MPV,7 SUV,M7,U7,Khác"; break;
            case "Man": input = "Tất cả,CLA,Khác"; break;
            case "Maserati": input = "Tất cả,Quatroporte,Khác"; break;
            case "Maybach": input = "Tất cả,57,Khác"; break;
            case "Mekong": input = "Tất cả,Paso,Premio,Pronto,Khác"; break;
            case "Mercury": input = "Tất cả,Sable,Topaz,Villager,Khác"; break;
            case "Mini": input = "Tất cả,Cooper,One,Khác"; break;
            case "Opel": input = "Tất cả,Antara,Astra,Combo,Corsa,Omega,Record,Tigra,Vectra,Khác"; break;
            case "Pontiac": input = "Tất cả,Aztek,Fiero,Firebird,Solstice,Trans sport,Khác"; break;
            case "RollsRoyce": input = "Tất cả,Ghost,Phantom,Wraith,Khác"; break;
            case "Rover": input = "Tất cả,100,200,400,800,Khác"; break;
            case "Samsung": input = "Tất cả,QM5,SM3,SM5,SM7,Khác"; break;
            case "Scion": input = "Tất cả,Xd,Khác"; break;
            case "Smart": input = "Tất cả,Coupe,Forfour,Fortwo,Roadster,Khác"; break;
            case "Proton": input = "Tất cả,Arena,Perdana,Tiara,Wira,Khác"; break;
            case "Subaru": input = "Tất cả,Forester,Impreza,Legacy,Levorg,Outback,Tribeca,XV,Khác"; break;
            case "SYM": input = " Tất cả,T1000,T880,V11,V5,Khác"; break;
            case "Tesla": input = "Tất cả,S"; break;
            case "Aston Martin": input = "Tất cả,DB7,Lagonda,Rapide,Vanquish,Vantage,Virage,Zagato,Khác"; break;
            case "Bentley": input = "Tất cả,Azure,Brooklands,Continental,Flying Spur,Mulsanne, Khác"; break;
            case "Fuso": input = "Tất cả,Canter, Fighter,FV,Rosa,Tractor, Khác"; break;
            case "Hino": input = "Tất cả,300 Series,500 Series, 700 Series, Khác"; break;
            case "Jeep": input = "Tất cả,A2,Cherokee,CJ,Grand,Liberty,Wrangler,Khác"; break;
            case "Lamborghini": input = "Tất cả,Aventador, Diablo, Gallado, Murcielago, Khác"; break;
            case "MG": input = "Tất cả,350C,5,6,Express, ZT,Khác"; break;
            case "Thaco": input = "Tất cả,Auman,Aumark,Forland,Foton,Frontier,Mobihome,Ollin,Towner,Khác"; break;
            case "Vinaxuki": input = "Tất cả,1200B,1240T,1490T,1980T,1990BA,2500BA,3450T,35000TL,4500BA,50000BA,5500TL,7000BA,990T,Hafei,Jinbei,Khác"; break;
            case "Volvo": input = "Tất cả,340,360,460,740,760,850,940,960,C70,S60,V70,XC90,Khác"; break;
            case "Zotye": input = "Tất cả,T600,Z100,Z300,Z500,Khác"; break;
        }
                
        var inputIds = input;
        var inputNames = input;
        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderTypes: function (elementId, isBuy) {        
        var inputIds = "Conver,Coupe,Crossover,Hatchback,Minivan,Sedan,SUV,Truck,Wagon";
        var inputNames = "Convertible,Coupe,Crossover,Hatchback,Van/Minivan,Sedan,SUV,Truck,Wagon";
        
        if (isBuy == true) {
            inputIds = "All, " + inputIds;
            inputNames = "Tất cả, " + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderProvinces: function (elementId, isBuy) {        
        var inputIds = "08,04,076,064,0281,0240,0781,0241,075,056,0650,0651,062,0780,0710,026,0511,0500,0501,0230,061,067,059,0219,0351,039,0320,031,0711,0218,0321,058,077,060,0231,063,025,020,072,0350,038,030,068,0210,057,052,0510,055,033,053,079,022,066,036,0280,037,054,073,074,027,070,0211,029";
        var inputNames = "TPHCM, Hà Nội, An Giang,Bà Rịa Vũng Tàu,Bắc Cạn,Bắc Giang,Bạc Liêu,Bắc Ninh,Bến Tre,Bình Định,Bình Dương,Bình Phước,Bình Thuận,Cà Mau,Cần Thơ,Cao Bằng,Đà Nẵng,Đắc Lắc,Đắc Nông,Điện Biên,Đồng Nai,Đồng Tháp,Gia Lai,Hà Giang,Hà Nam,Hà Tĩnh,Hải Dương,Hải Phòng,Hậu Giang,Hòa Bình,Hưng Yên,Khánh Hòa,Kiên Giang,Kom Tum,Lai Châu,Lâm Đồng,Lạng Sơn,Lào Cai,Long An,Nam Định,Nghệ An,Ninh Bình,Ninh Thuận,Phú Thọ,Phú Yên,Quảng Bình,Quảng Nam,Quảng Ngãi,Quảng Ninh,Quảng Trị,Sóc Trăng,Sơn La,Tây Ninh,Thái Bình,Thái Nguyên,Thanh Hóa,Thừa Thiên Huế,Tiền Giang,Trà Vinh,Tuyên Quang,Vĩnh Long,Vĩnh Phúc,Yên Bái";
        
        if (isBuy == true) {
            inputIds = "0, " + inputIds;
            inputNames = "Tất cả, " + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderColors: function (elementId, isBuy) {
        var inputIds = "#979692,#FF7F50,#F0E68C,#000000,#FF0000,#FAFAD2,#C9BEAA,#FF69B4,#FFFFF0,#785947,#9400D3,#FFFFFF,#FFD700,#B5BACO,#00BFFF";
        var inputNames = "BẠC,Cam,Cát,Đen,Đỏ,Đồng,GHI,Hồng,Kem,Nâu,Tím,Trắng,Vàng,Xám,Xanh,Xanh";        

        if (isBuy == true) {
            inputIds = "0," + inputIds;
            inputNames = "Tất cả," + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderFuels: function (elementId, isBuy) {
        var inputIds = "Diesel,Electric,gasoline,Hybrid,Other";
        var inputNames = "Diesel,Điện,Xăng,Hybrid,Loại khác";

        if (isBuy == true) {
            inputIds = "All," + inputIds;
            inputNames = "Tất cả," + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderFuelSystems: function (elementId, isBuy) {
        var inputIds = "Phun xăng điện tử,bec phun";
        var inputNames = "Phun xăng điện tử,bec phun";

        if (isBuy == true) {
            inputIds = "All," + inputIds;
            inputNames = "Tất cả," + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderWheelDrive: function (elementId, isBuy) {
        var inputIds = "AWD,4WD,RWD,FWD";
        var inputNames = "4 bánh toàn thời gian,Dẫn động 4 bánh,Dẫn động cầu sau,Dẫn động cầu trước";

        if (isBuy == true) {
            inputIds = "All," + inputIds;
            inputNames = "Tất cả," + inputNames;
        }


        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderGearBox: function (elementId, isBuy)
    {
        var inputIds = "0,4,1";
        var inputNames = "Tự động, Số sàn, Số hỗn hợp";

        if (isBuy == true)
        {
            inputIds = "-1, " + inputIds;
            inputNames = "Tất cả, " + inputNames;
        }

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },

    renderGearBoxNumber: function (elementId) {        
        var inputIds = "4,5,6,7";
        var inputNames = "4 số,5 số,6 số,7 số";

        RenderFactory.renderItems(inputIds, inputNames, elementId);
    },
    
    renderItems : function(inputIds, inputNames, elementId)
    {
        var item = "<option value='@itemId'>@itemName</option>";        
        var ouput = "";
        
        var arrayIds = inputIds.trim().split(',');
        var arrayNames = inputNames.split(',');
        
        for (var i = 0 ; i < arrayIds.length; i++) {

            if (arrayNames[i] == "Tất cả") {
                arrayIds[i] = "All";                
            }

            ouput += item.replace(new RegExp("@itemId", 'g'), arrayIds[i]).replace(new RegExp("@itemName", 'g'), arrayNames[i]);
        }

        $(elementId).html(ouput);
    },

    renderYear: function (elementId, isBuy)
    {
        var min = new Date().getFullYear() - 10,
        max = min + 10,
        select = document.getElementById(elementId);

        if (isBuy == true)
        {
            var opt = document.createElement('option');
            opt.value = 0;
            opt.innerHTML = "Tất cả";
            select.appendChild(opt);
        }

        var opt = document.createElement('option');
        opt.value = 2005;
        opt.innerHTML = "<" + min;
        select.appendChild(opt);

        for (var i = min; i <= max; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    }   
}

