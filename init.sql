-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" TEXT,
    "birthYear" INTEGER,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeType" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BikeType_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Brand" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "BikeModel" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandCode" TEXT NOT NULL,

    CONSTRAINT "BikeModel_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "BicycleTemplate" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandCode" TEXT NOT NULL,
    "modelCode" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "typeCode" TEXT NOT NULL,

    CONSTRAINT "BicycleTemplate_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "TemplateComponent" (
    "id" TEXT NOT NULL,
    "templateCode" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "TemplateComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBicycle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isGhost" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "templateCode" TEXT,
    "brandId" TEXT,
    "modelId" TEXT,
    "inputBrandName" TEXT,
    "inputModelName" TEXT,
    "year" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBicycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBicycleComponent" (
    "id" TEXT NOT NULL,
    "bicycleId" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "UserBicycleComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeModel" ADD CONSTRAINT "BikeModel_brandCode_fkey" FOREIGN KEY ("brandCode") REFERENCES "Brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BicycleTemplate" ADD CONSTRAINT "BicycleTemplate_brandCode_fkey" FOREIGN KEY ("brandCode") REFERENCES "Brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BicycleTemplate" ADD CONSTRAINT "BicycleTemplate_modelCode_fkey" FOREIGN KEY ("modelCode") REFERENCES "BikeModel"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BicycleTemplate" ADD CONSTRAINT "BicycleTemplate_typeCode_fkey" FOREIGN KEY ("typeCode") REFERENCES "BikeType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComponent" ADD CONSTRAINT "TemplateComponent_templateCode_fkey" FOREIGN KEY ("templateCode") REFERENCES "BicycleTemplate"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBicycle" ADD CONSTRAINT "UserBicycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBicycleComponent" ADD CONSTRAINT "UserBicycleComponent_bicycleId_fkey" FOREIGN KEY ("bicycleId") REFERENCES "UserBicycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

