import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Bike types
  await prisma.bikeType.createMany({
    data: [
      { code: "TYPE-BMX", name: "BMX" },
      { code: "TYPE-DIRT", name: "Dirt" },
      { code: "TYPE-CITY", name: "City" },
      { code: "TYPE-CX", name: "Cyclocross" },
      { code: "TYPE-FIT", name: "Fitness" },
      { code: "TYPE-GRV", name: "Gravel" },
      { code: "TYPE-HYB", name: "Hybrid" },
      { code: "TYPE-KIDS", name: "Kids" },
      { code: "TYPE-MTB", name: "Mountain" },
      { code: "TYPE-TRVL", name: "Travel" },
      { code: "TYPE-ROAD", name: "Road" },
      { code: "TYPE-TRNG", name: "Touring" },
      { code: "TYPE-TRI", name: "Triathlon" },
    ],
    skipDuplicates: true,
  });

  // Brands
  await prisma.brand.createMany({
    data: [
      { code: "BR-AXESS", name: "Axess" },
      { code: "BR-BH", name: "BH" },
      { code: "BR-BMC", name: "BMC" },
      { code: "BR-CANNONDALE", name: "Cannondale" },
      { code: "BR-CUBE", name: "Cube" },
      { code: "BR-EIGHTSHOT", name: "Eightshot" },
      { code: "BR-GHOST", name: "Ghost" },
      { code: "BR-GIANT", name: "Giant" },
      { code: "BR-LAPIERRE", name: "Lapierre" },
      { code: "BR-MARIN", name: "Marin" },
      { code: "BR-NORCO", name: "Norco" },
      { code: "BR-ORBEA", name: "Orbea" },
      { code: "BR-ROCKY", name: "Rocky Mountain" },
      { code: "BR-SANTACRUZ", name: "Santa Cruz" },
      { code: "BR-SCOR", name: "SCOR" },
      { code: "BR-SCOTT", name: "Scott" },
      { code: "BR-SPECIALIZED", name: "Specialized" },
      { code: "BR-SURLY", name: "Surly" },
      { code: "BR-TOUTTERRAIN", name: "Tout Terrain" },
      { code: "BR-TRANSITION", name: "Transition" },
      { code: "BR-TREK", name: "Trek" },
      { code: "BR-VSF", name: "VSF Fahrradmanufaktur" },
    ],
    skipDuplicates: true,
  });

  // Models
  await prisma.bikeModel.createMany({
    data: [
      { code: "MDL-OIZ-H30", brandCode: "BR-ORBEA", name: "OIZ H30" },
      { code: "MDL-OIZ-M21", brandCode: "BR-ORBEA", name: "OIZ M21" },
    ],
    skipDuplicates: true,
  });

  // Templates
  await prisma.bicycleTemplate.createMany({
    data: [
      {
        code: "TPL-ORBEA-OIZ-H30-2026",
        brandCode: "BR-ORBEA",
        modelCode: "MDL-OIZ-H30",
        year: 2026,
        typeCode: "TYPE-MTB",
        name: "Orbea OIZ H30 2026",
      },
      {
        code: "TPL-ORBEA-OIZ-M21-2026",
        brandCode: "BR-ORBEA",
        modelCode: "MDL-OIZ-M21",
        year: 2026,
        typeCode: "TYPE-MTB",
        name: "Orbea OIZ M21 2026",
      },
    ],
    skipDuplicates: true,
  });

  // Template components
  await prisma.templateComponent.createMany({
    data: [
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-FRAME",
        value: "Orbea Oiz Carbon OMR, Fiberlink, Boost, BSA, SIC, UFO, I-line shock",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-SHOCK",
        value: "Fox Float SL Performance 120mm Remote Push-lock Evol custom tune 190x45mm",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-FORK",
        value: "Fox 34 Float SL Performance 120 Grip Remote QR15x110",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-STEERER_TUBE",
        value: "Alloy 1-1/2\" Black Oxidated Bearing",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-CRANKSET",
        value: "Shimano MT511 32t",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-SHIFTER",
        value: "Shimano Deore M6100 I-Spec EV",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-CASSETTE",
        value: "Shimano CS-M6100 10-51t 12-Speed",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-REAR_DERAILLEUR",
        value: "Shimano SLX M7100 SGS Shadow Plus",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-H30-2026",
        component: "CMP-CHAIN",
        value: "Shimano M6100",
      },

      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-FRAME",
        value: "Orbea Oiz Carbon OMR, Fiberlink, Boost, BSA, SIC, UFO, I-line shock",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-SHOCK",
        value: "RockShox SID Luxe Select+ 120mm 190x45mm",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-FORK",
        value: "RockShox SID Select 120 DebonAir+ RL 15x110 Boost",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-STEERER_TUBE",
        value: "Alloy 1-1/2\" Black Oxidated Bearing",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-CRANKSET",
        value: "Sram Eagle 70 Dub Black 32t",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-SHIFTER",
        value: "Sram AXS Pod",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-CASSETTE",
        value: "Sram XS-1270 Eagle 10-52t 12-Speed",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-REAR_DERAILLEUR",
        value: "Sram S1000 Eagle AXS",
      },
      {
        templateCode: "TPL-ORBEA-OIZ-M21-2026",
        component: "CMP-CHAIN",
        value: "Sram GX Eagle 12-Speed",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });