$(function () {
    AddCar.renderModels('Acura');
    AddCar.renderTypes();
    AddCar.renderProvinces();
    AddCar.renderColors();
    AddCar.renderFuels();
    AddCar.renderFuelSystems();
    AddCar.renderWheelDrive();
    AddCar.hideElements();
    AddCar.adjustWidth(200);
});

$("#select_firm").change(
           function () {
               AddCar.renderModels(this.value);
               $("#Firm").val(this.value);
           }
       );

var AddCar = {

    renderModels: function (firm) {

        var item = "<option value='@item'>@item</option>";
        var input = "";

        switch (firm) {
            case "Acura": input = "CL,EL,ILX,Intergra,Legend,MDX,RDX,TL,TSX,Vigor,ZDX,Khác"; break;
            case "Audi": input = "100,200,80,90, A1,A2,A3,A4,A5,A6,A7,A8,Cabriolet,Coupe,Q3,Q5,Q7,Quattro,TT,V8,Khác"; break;
            case "BMW": input = " 1 Series,2 Series,3 Series,4 Series,5 Series,6 Series,7 Series,8 Series,Alpina,i3,i8,M couper,M3,M4,M5,M6,X1,X3,X4,X5,X6,Z3,Z4,Z8,Khác"; break;
            case "Chevrolet": input = "Astro,Avanlanche,Aveo,Beretta,Camaro,Caprice,Captiva,Cavalier,Chevyvan,Colorado,Corsica,Corvette,Cruze,Explorer,Express,Impala,Ipanema,Kalos,Lacetti,Lumina,Malibu,Matiz,Nubira,Orlando,Prizm,S 10,Silverado,Spark,SSR, Suburban,Tracker,Venture,Vivant,Khác"; break;
            case "Daewoo": input = "Aranos,Arcadia,Brougham,Chairman,Cielo,Damas,Espero,Evanda,Gentra,GentraX,Istana,Kalos,Karando,Labo,Lacetti,Lanos,Leganza,Lublin,Magnus,Matiz,Musso,Nubira,Polonez,Prince,Racer,Rexton,Rezzo,Tico,Winstorm,Suburban,Khác"; break;
            case "Daihatsu": input = "Charade,Citivan,Hijet,Terios,Khác"; break;
            case "Fiat": input = "126,500,Albea,Bravo,Cinquecento,Coupe,Doblo,Ducato,Punto,Regata,Seicento,Siena,Strada,Talento,Tempra,Tipo,Uno,Khác"; break;
            case "Ford": input = "Acononline,Aerostar,Aspire,Bronco,Capri,Caravan,Cargo,Club wagon,Contour,Courier,Crown victoria,EcoSport,Edge,Escape,Escort,Espedition,Everest,Explorer,Express,F 150,F 700,Fiesta,Flex,Focus,Focus C Max,Ka,Laser,Maverick,Mondeo,Mustang,Probe,Puma,Ranger,Sierra, Taurus,Express,Tempo,Transit,Wind star,Khác"; break;
            case "Honda": input = "Accord,City,Civic,Concerto,CR V,CR X,CR Z,Domani,Element,FIT,Insight,Integra,Jazz,Legend,Mobilo,NSX,Odyssey,Passport,Pilot,Prelude,S2000,Stream,Torneo,Vigor,Z,Khác"; break;
            case "Hyundai": input = "Azera,Accent,Atos,Avante,Centennial,Click,County,Coupe,Dynasty,Elantra,Eon,Equus,Excel,Galloper,Genesis,Getz,Gold,Grand Starex,Grandeur,H 1,H 100,HD,i10,i20,i30,i40,Innovation,Lantra,Lavita,Libero,Maxcruz,Pony,Porter,S coupe,Santa Fe,Sonata,Starex,Terracan,Tiburon,Trajet,Tucson,Tuscani,Universe,Universe Xpress Luxury,Veloster,Veracruz,Verna,Xcent,XG,Khác"; break;
            case "Isuzu": input = "Amigo,Ascender,Aska,D Cargo,Dmax,FVR,Gemini,Hi lander,Midi,NLR,NMR,NPR,NQR,Pick up,QKR,Rodeo,Trooper,Khác"; break;
            case "Kia": input = "Avella,Bongo,Cadenza,Carens,Carnival,Cerato,Clarus,Concord,Forte,Frontier,Jeep,Joice,K2700,K3,K3000S,K5,K7,Lotze,Magentis,Morning,Opirus,Optima,Picanto,Potentia,Pregio,Pride,Ray,Retona,Rio,Roadster,Rondo,Sedona,Sephia,Sorento,Soul,Spectra,Sportage,Visto,Khác"; break;
            case "LandRover": input = "Defender,Discovery,Freelander,LR2,Range rover,Khác"; break;
            case "Lexus": input = "CT,ES,GS,GX,HS,IS,LS,LX,NX,RX,SC,SL,Khác"; break;
            case "Mazda": input = "2,3,323,323F,5,6,626,929,Atenza,AZ,B series,BT 50,Carol,CX 5,CX 7,CX 9,Eunos,Millenia,MPV,MX 3,MX 5,MX 6,Pickup,Premacy,RX 7,RX 8,Tribute,Xedos 9,Khác"; break;
            case "MercedesBenz": input = "190,A class,Atego,B class,C class,CL class,CLA class,CLK class,CLS class,E class,G class,GL,GLA class,GLC,GLE Class,GLK Class,M class,MB,ML Class,R class,S class,SL class,SLK class,SLR Mclaren,Sprinter,SR class,V class,Vaneo,Viano,Vito,Khác"; break;
            case "Mitsubishi": input = "3000GT,Airtek,Atego,Attrage,Canter,Challenger,Chariot,Colt,Diamante,Dion,Eclipse,EK wagon,Galant,Grandis,Grunder,Hover,IO,Jeep,Jolie,L200,L300,Lancer,Libero,Mirage,Montero,Outlander,Pajero,Santamo,Savrin,Sigma,Space Gear,Starion,Triton,Veryca,Zinger,Khác"; break;
            case "Nissan": input = "100NX,200SX,240SX,300ZX,350Z,370Z,Altima,Avenir,Bluebird,Cedric,Cefiro,Cima,Elgrand,Frontier,Gloria,Grand livina,GT R,Juke,Lago,Laurel,Leaf,Liberty,Livina,Maxima,Micra,Murano,Navara,NV,Pathfinder,Patrol,Pick up,Pixo,Prairie,Presage,President,Primastar,Primera,Pulsar,Qashqai,Quest,Rasheen,Rogue,Safari,Sentra,Serena,Silvia,Skyline,Stagea,Sunny,Teana,Terrano,Tiida,Tino,Urvan,Vanette,X Terra,X trail,Khác"; break;
            case "Peugeot": input = "107,205,206,207,208,3008,305,307,309,404,405,406,408,505,508,607,Boxer,J5,RCZ,Khác"; break;
            case "Porsche": input = "Boxster,Carrera,Cayenne,Cayman,Macan,Panamera,Khác"; break;
            case "Renault": input = "11,19,21,25,Clio,Fluence,Kangoo,Koleos,Laguna,Latitude,Megane,Safrane,Sport Spider,Trafic,Wind,Khác,mera,Khác"; break;
            case "Ssangyong": input = "Chairman,Family,Istana,Korando,Kyron,Musso,Rexton,Khác"; break;
            case "Suzuki": input = "Aerio,Alto,APV,Balenno,Carry,Cultis wagon,Ertiga,Grand vitara,Liana,Samirai,SJ,Super Carry Truck,Super Carry Van,Swift,Twin,Vitara,Wagon R+,XL 7,Khác"; break;
            case "Toyota": input = "4 Runner,86,Allion,Alphard,Altezza,Aristo,Aurion,Avalon,Avensis,Aygo,Brevis,Caldina,Cami,Camry,Carina,Celica,Century,Chaser,Corolla,Corolla altis,Corona,Cressida,Cresta,Crown,Estima,Fj cruiser,Fortuner,Hiace,Highlander,Hilux,Innova,Ipsum,IQ,Land Cruiser,Liteace,Mark II,Matrix,MR 2,Picnic,Platz,Prado,Previa,Prius,Progres,Raum,RAV4,Sequoia,Sera,Sienna,Soarer,Solara,Starlet,Supra,Tacoma,Tercel,Townace,Tundra,Venza,Vios,Vista,Wish,XA,Yaris,Yaris Verso,Zace,Khác"; break;
            case "Volkswagen": input = "Beetle,Bora,California,Eos,Golf,Jetta,Multivan,New Beetle,Passat,Phaeton,Polo,Routan,Scirocco,Sharan,Solo,Tiguan,Touareg,Transporter,Vento,Khác"; break;
            case "AlfaRomeo": input = "GT,Spider,Khác"; break;
            case "AstonMartin": input = "DB7,Lagonda,Vantage,Virage,Zagato,Khác"; break;
            case "Asia": input = "Khác"; break;
            case "Baic": input = "S3,Bentley,Azure,Brooklands,Continental,Mulsanne,Khác"; break;
            case "Buick": input = "Electra,Lasabre,Skylark,Khác"; break;
            case "BYD": input = "F0,Khác"; break;
            case "Cadillac": input = "Allante,ATS,Catera,CTS,Deville,Escalade,Fleetwood,Seville,SRX,STS,Khác"; break;
            case "Changan": input = "CX20,Eado,Honor"; break;
            case "Chery": input = "QQ3,Khác"; break;
            case "Chrysler": input = "200,300C,300M,Cruiser,Grand Voyager,Intrepid,Jeep cherokee,LeBaron,Neon,New Yorker,Ptcruise,Sebring,Stratus,Voyager,Khác"; break;
            case "Citroen": input = "AX,C1,C2,C3,CX,DS3,XM,ZX,Khác"; break;
            case "Dodge": input = "Caravan,Dakota,Durango,Grand caravan,Journey,Neon,Ram,Stealth,Voyager,Khác"; break;
            case "Ferrari": input = "456,458,575,California,F 355,F 360,F 512,Maranello,Testarossa,Khác"; break;
            case "Gaz": input = "69,Volga,Khác"; break;
            case "Geely": input = "Emgrand,Englon,Khác"; break;
            case "GMC": input = "Savana,Khác"; break;
            case "Haima": input = "2,3,7,Freema,Fstar,M3,M8,S5,S7,Khác"; break;
            case "Hummer": input = "H2,H3,Khác"; break;
            case "Infiniti": input = "EX,FX,G35,G37,Q45,QX,Khác"; break;
            case "Jaguar": input = "S Type,X Type,XF,XJ series,XK series,Khác"; break;
            case "Lada": input = "2104,2105,2106,2107,2108,2109,2112,2121,Niva,Samara,Khác"; break;
            case "Lifan": input = "520,620,Khác"; break;
            case "Lincoln": input = "Continental,Town car,Khác"; break;
            case "Luxgen": input = "5,7 MPV,7 SUV,M7,U7,Khác"; break;
            case "Man": input = "CLA,Khác"; break;
            case "Maserati": input = "Quatroporte,Khác"; break;
            case "Maybach": input = "57,Khác"; break;
            case "Mekong": input = "Paso,Premio,Pronto,Khác"; break;
            case "Mercury": input = "Sable,Topaz,Villager,Khác"; break;
            case "Mini": input = "Cooper,One,Khác"; break;
            case "Opel": input = "Antara,Astra,Combo,Corsa,Omega,Record,Tigra,Vectra,Khác"; break;
            case "Pontiac": input = "Aztek,Fiero,Firebird,Solstice,Trans sport,Khác"; break;
            case "RollsRoyce": input = "Ghost,Phantom,Wraith,Khác"; break;
            case "Rover": input = "100,200,400,800,Khác"; break;
            case "Samsung": input = "QM5,SM3,SM5,SM7,Khác"; break;
            case "Scion": input = "Xd,Khác"; break;
            case "Smart": input = "Coupe,Forfour,Fortwo,Roadster,Khác"; break;
            case "Proton": input = "Arena,Perdana,Tiara,Wira,Khác"; break;
            case "Subaru": input = "Forester,Impreza,Legacy,Levorg,Outback,Tribeca,XV,Khác"; break;
            case "SYM": input = " T1000,T880,V11,V5,Khác"; break;
            case "Tesla": input = "S"; break;
            case "Aston Martin": input = "DB7,Lagonda,Rapide,Vanquish,Vantage,Virage,Zagato,Khác"; break;
            case "Bentley": input = "Azure,Brooklands,Continental,Flying Spur,Mulsanne, Khác"; break;
            case "Fuso": input = "Canter, Fighter,FV,Rosa,Tractor, Khác"; break;
            case "Hino": input = "300 Series,500 Series, 700 Series, Khác"; break;
            case "Jeep": input = "A2,Cherokee,CJ,Grand,Liberty,Wrangler,Khác"; break;
            case "Lamborghini": input = "Aventador, Diablo, Gallado, Murcielago, Khác"; break;
            case "MG": input = "350C,5,6,Express, ZT,Khác"; break;
            case "Thaco": input = "Auman,Aumark,Forland,Foton,Frontier,Mobihome,Ollin,Towner,Khác"; break;
            case "Vinaxuki": input = "1200B,1240T,1490T,1980T,1990BA,2500BA,3450T,35000TL,4500BA,50000BA,5500TL,7000BA,990T,Hafei,Jinbei,Khác"; break;
            case "Volvo": input = "340,360,460,740,760,850,940,960,C70,S60,V70,XC90,Khác"; break;
            case "Zotye": input = "T600,Z100,Z300,Z500,Khác"; break;
            default: input = "";
        }
        
        if (input != "") {
            AddCar.renderItems(input, '#select_model');
        }        
    },

    renderTypes: function () {        
        var input = "Convertible,Coupe,Crossover,Hatchback,Van/Minivan,Sedan,SUV,Truck,Wagon";
        
        AddCar.renderItems(input, '#select_type');
    },

    renderProvinces: function () {        
        var input = "Lào Cai,Phú Thọ,Vĩnh Phúc,Hòa Bình,Hà Giang,Sơn La,Điện Biên,Lai Châu,Bắc Giang,Bắc Ninh,Lạng Sơn,Cao Bằng,Tuyên Quang,Thái Nguyên,Bắc Cạn,Yên Bái,Ninh Bình,Hải Phòng,Hải Dương,Hưng Yên,Quảng Ninh,Nam Định,Hà Nam,Thái Bình,Thanh Hóa,Nghệ An,Hà Tĩnh,HÀ NỘI,Đắc Lắc,Đắc Nông,Quảng Nam,Đà Nẵng,Quảng Bình,Quảng Trị,Thừa Thiên Huế,Quảng Ngãi,Bình Định,Phú Yên,Khánh Hòa,Gia Lai,Kom Tum,Đồng Nai,Bình Thuận,Lâm Đồng,Bà Rịa Vũng Tàu,Bình Dương,Bình Phước,Tây Ninh,Đồng Tháp,Ninh Thuận,Vĩnh Long,Cần Thơ,Hậu Giang,Long An,Tiền Giang,Trà Vinh,Bến Tre,An Giang,Kiên Giang,Cà Mau,Bạc Liêu,Sóc Trăng,TPHCM";
        
        AddCar.renderItems(input, '#select_province');
    },

    renderColors: function () {
        var input = "Đen,Xanh,Nâu,Xanh,Tím,BẠC,Xám,GHI,Cát,Đồng,Đỏ,Hồng,Cam,Vàng,Kem,Trắng";        

        AddCar.renderItems(input, '#select_interior_color');
        AddCar.renderItems(input, '#select_exterior_color');        
    },

    renderFuels: function () {
        var input = "Diesel,Điện,Xăng,Hybrid,Loại khác";
        AddCar.renderItems(input, '#select_Fuel');
    },

    renderFuelSystems: function () {
        var input = "Phun xăng điện tử,bec phun";
        AddCar.renderItems(input, '#select_FuelSystem');
    },

    renderWheelDrive: function () {
        var input = "Dẫn động 4 bánh,4 bánh toàn thời gian,Dẫn động cầu trước,Dẫn động cầu sau";
        AddCar.renderItems(input, '#select_WheelDrive');
    },    
    
    renderItems : function(input, id)
    {
        var item = "<option value='@item'>@item</option>";        
        var ouput = "";
        
        var array = input.split(',').sort();
        
        for (var i = 0 ; i < array.length; i++) {
            ouput += item.replace(new RegExp("@item", 'g'), array[i]);
        }

        $(id).html(ouput);
    },

    hideElements: function () {
        $("#Firm").hide();
        $("#Model").hide();
        $("#Type").hide();
        $("#ProvinceId").hide();
        $("#InteriorColorId").hide();
        $("#ExteriorColorId").hide();
        $("#FuelId").hide();
        $("#FuelSystem").hide();
        $("#WheelDriveId").hide();
    },

    adjustWidth: function(width)
    {
        $("#divCarInsert input").width(width);
        $("#divCarInsert select").width(width);        
    }

}

